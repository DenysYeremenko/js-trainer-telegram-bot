
import questions from "./questions.js";
import locales from "./locales.js";
import TeleBot from 'telebot';
import db from './db.js';
const { updateUserFields } = db;


function escapeMarkdownV2(text) {
    return text.replace(/[\[\]()~>#+\-={}.!|<>@&^]/g, '\\$&');
}

/**
 * Перемешивает массив
 */
function shuffleArray(array) {
    const shuffled = [...array];
    let m = shuffled.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = shuffled[m];
        shuffled[m] = shuffled[i];
        shuffled[i] = t;
    }
    return shuffled;
}

async function handleLanguageSelection({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
}) {
    const language = data.split("_")[1];
    const userQuestions = questions[language];

    await updateUserFields(userId, { language: language, questions: userQuestions });
    try {
        await bot.sendMessage(
            chatId,
            locales[language].language_choosed,
            {
                notification: false,
                parseMode: "MarkdownV2",
                replyMarkup: {
                    inline_keyboard: [
                        [{ text: locales[language].sequential, callback_data: "mode_sequential" }],
                        [{ text: locales[language].random, callback_data: "mode_random" }],
                    ],
                },
            }
        );
    } catch (error) {
        console.error(`Failed to send message: ${error}`);
    }
}

async function handleModeSelection({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
    language
}) {
    const mode = data.split("_")[1];
    const shuffledQuestions = mode === "random" ? shuffleArray([...questions[language]]) : [...questions[language]];

    await updateUserFields(userId, { mode: mode || 'sequential', currentIndex: 0, questions: mode === "random" ? shuffledQuestions : [...questions[language]] });

    userData.mode = mode;
    userData.currentIndex = 0;
    userData.questions = shuffledQuestions;

    await sendQuestion({
        bot,
        userId,
        userData,
        chatId,
        data,
        msgId,
        language
    });
}

async function sendQuestion({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
    language
}) {
    if (data === "prev_question" && userData.currentIndex > 0) {
        userData.currentIndex--;
        await updateUserFields(userId, { currentIndex: userData.currentIndex });
    } else if (data === "next_question") {
        userData.currentIndex++;
        await updateUserFields(userId, { currentIndex: userData.currentIndex });
    }

    const correctAnswers = userData.correctAnswers;
    const incorrectAnswers = userData.incorrectAnswers || 0;
    const totalAnswers = correctAnswers + incorrectAnswers;
    const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

    if (userData.currentIndex >= userData.questions.length) {
        await bot.sendMessage(chatId,
            `🏁 ${locales[language].questions_ended}\\.\n\n*${locales[language].results}*\n📋 ${locales[language].total_questions} *${totalAnswers}*\n\n✅ ${locales[language].correct_answers} *${correctAnswers}*\n\n❌ ${locales[language].incorrect_answers} *${incorrectAnswers}*\n\n📊 ${locales[language].accuracy} *${accuracy}%*`, {
            replyMarkup: {
                inline_keyboard: [[{ text: locales[language].start_over, callback_data: "start" }]],
            },
            parseMode: "MarkdownV2",
            notification: false,
        });
        return;
    }

    const question = userData.questions[userData.currentIndex];
    const inlineKeyboard = question.answers.map((answer, index) => ({
        text: `${answer}`,
        callback_data: `answer_${index}`
    }));

    await bot.sendMessage(
        chatId,
        `*${locales[language].question} ${userData.currentIndex + 1}*: \`${escapeMarkdownV2(question.title)}\`\n${escapeMarkdownV2(question.code) && escapeMarkdownV2(question.code)}\n\n☑️ ${locales[language].select_answer}`,
        {
            notification: false,
            parseMode: "MarkdownV2",
            replyMarkup: {
                inline_keyboard: [inlineKeyboard]
            },
        }
    );
}

async function handleAnswer({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
    language
}) {
    const selectedAnswer = parseInt(data.split("_")[1], 10);
    const question = userData.questions[userData.currentIndex];
    const isCorrect = question.answers[selectedAnswer] === question.correct;

    if (isCorrect) {
        userData.correctAnswers++;
    } else {
        userData.incorrectAnswers = (userData.incorrectAnswers || 0) + 1;
    }

    await updateUserFields(userId, { correctAnswers: userData.correctAnswers, incorrectAnswers: userData.incorrectAnswers });

    await bot.sendMessage(
        chatId,
        `*${locales[language].question} ${userData.currentIndex + 1}*: \`${escapeMarkdownV2(question.title)}\`\n${escapeMarkdownV2(question.code) && escapeMarkdownV2(question.code)}\n${locales[language].your_answer} *${question.answers[selectedAnswer]}* \\- ${isCorrect ? `${locales[language].answer_correct}\\! ✅` : `${locales[language].answer_incorrect}\\! ❌`}`,
        {
            notification: false,
            parseMode: "MarkdownV2",
            replyMarkup: {
                inline_keyboard: [
                    [{ text: `${locales[language].show_explanation} ℹ️`, callback_data: "show_explanation" }],
                    [{ text: `${locales[language].next_question} ➡️`, callback_data: "next_question" }],
                    [{ text: `${locales[language].finish_training} 🏁`, callback_data: "finish_training" }],
                ],
            },
        }
    );
}

async function sendExplanation({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
    language
}) {
    const question = userData.questions[userData.currentIndex];
    await bot.sendMessage(
        chatId,
        `*${locales[language].question} ${userData.currentIndex + 1}*: \`${escapeMarkdownV2(question.title)}\` ${escapeMarkdownV2(question.code) || ""}\n✅ *${locales[language].correct_answer}*:  ${question.correct}\nℹ️ *${locales[language].explanation}*: ${escapeMarkdownV2(question.explanation)}`,
        {
            notification: false,
            parseMode: "MarkdownV2",
            replyMarkup: {
                inline_keyboard: [
                    [{ text: `${locales[language].next_question} ➡️`, callback_data: "next_question" }],
                    [{ text: `${locales[language].finish_training} 🏁`, callback_data: "finish_training" }],
                ],
            },
        }
    );
}

async function sendFinalStats({
    bot,
    userId,
    userData,
    chatId,
    data,
    msgId,
    language
}) {
    const correctAnswers = userData.correctAnswers;
    const incorrectAnswers = userData.incorrectAnswers;
    const totalAnswers = correctAnswers + incorrectAnswers;

    const accuracy = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
    await bot.sendMessage(
        chatId,
        `🏁 *${locales[language].training_finished}\\!*\n\n*${locales[language].results}*\n📋 ${locales[language].total_questions} *${totalAnswers}*\n\n✅ ${locales[language].correct_answers} *${correctAnswers}*\n\n❌ ${locales[language].incorrect_answers} *${incorrectAnswers}*\n\n📊 ${locales[language].accuracy} *${accuracy}*%`,
        {
            notification: false,
            parseMode: "MarkdownV2",
            replyMarkup: {
                inline_keyboard: [
                    [{ text: `${locales[language].start_over} 🔄`, callback_data: "start" }],
                ],
            },
        }
    );

    await updateUserFields(userData.userId, {
        currentIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
    });
}

export default {
    handleLanguageSelection,
    handleModeSelection,
    sendQuestion,
    handleAnswer,
    sendExplanation,
    sendFinalStats
}