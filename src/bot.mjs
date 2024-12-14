import TeleBot from "telebot"
import db from './db.js';
import methods from './methods.js';
import locales from "./locales.js";

const { handleLanguageSelection, handleModeSelection, handleAnswer, sendQuestion, sendExplanation, sendFinalStats } = methods;
const { connectToDB, addUserToDB, updateUserFields, getUserById } = db;

await connectToDB();
const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)



bot.on('/start', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const msgId = msg.message_id;

    let userData = await getUserById(userId);

    try {
        await bot.deleteMessage(chatId, msgId - 1);

    } catch (error) {
        console.error(`Failed to delete message: ${error}`);
    }


    if (userData && userData.startMessageId && userData.welcomeMessageId) {
        try {
            await bot.deleteMessage(chatId, userData.welcomeMessageId);

        } catch (error) {
            console.error(`Failed to delete previos welcome message: ${error}`);
        }
        try {
            await bot.deleteMessage(chatId, userData.startMessageId);
        } catch (error) {
            console.error(`Failed to delete previous start message: ${error}`);
        }
    }

    if (!userData) {
        await addUserToDB({ userId, msgId, fullName: msg.from.first_name + ' ' + msg.from.last_name });
        userData = await getUserById(userId);
    }
    await updateUserFields(userId, { currentIndex: 0, correctAnswers: 0, incorrectAnswers: 0, startMessageId: msgId, welcomeMessageId: msgId + 1 });



    try {
        const replyKeyboard = bot.keyboard([
            ['/start']
        ], { resize: true, once: false });

        const firstName = msg.from.first_name || '';
        const lastName = msg.from.last_name || '';
        await bot.sendMessage(chatId, `Welcome ${firstName} ${lastName}\!`, {
            notification: false,
            parse_mode: "MarkdownV2",
            replyMarkup: replyKeyboard
        });

        await bot.sendMessage(chatId, `🌍${locales['en'].choose_language}:`, {
            notification: false,
            parse_mode: "MarkdownV2",
            replyMarkup: bot.inlineKeyboard([
                [bot.inlineButton("Українська", { callback: "lang_uk" })],
                [bot.inlineButton("Русский", { callback: "lang_ru" })],
                [bot.inlineButton("English", { callback: "lang_en" })],
            ])
        });
    } catch (error) {
        console.error(`Failed to send message: ${error}`);
    }

    console.log(`User ${msg.from.first_name || ''} ${msg.from.last_name || ''} started the bot`);
});
bot.on('text', async (msg) => {
    const chatId = msg.chat.id;
    const msgId = msg.message_id;

    if (!msg.text.startsWith('/start')) {
        await bot.deleteMessage(chatId, msgId).catch((error) => {
            console.error(`Failed to delete message: ${error}`);
        });
    }
});
// Обработчик callback-запросов
bot.on("callbackQuery", async (msg) => {
    const chatId = msg.message.chat.id;
    const userId = msg.from.id;
    const data = msg.data;
    let userData = await getUserById(userId);
    const msgId = msg.message.message_id;
    if (!userData) {
        console.log(`User data not found for userId: ${userId}. Creating a new user.`);
        await addUserToDB({ userId, msgId, fullName: msg.from.first_name + ' ' + msg.from.last_name });
        userData = await getUserById(userId);
    }

    const language = userData?.language || 'en';
    const params = {
        bot,
        userId,
        userData,
        chatId,
        data,
        msgId,
        language
    }
    console.log(language)
    try {
        await bot.deleteMessage(chatId, msgId).catch((error) => {
            console.error(`Failed to delete message: ${error} `);
        });
    } catch (error) {
        console.error(`Failed to delete message: ${error} `);
    }
    const callbackHandlers = {
        "lang_": handleLanguageSelection,
        "mode_": handleModeSelection,
        "answer_": handleAnswer,
        "next_question": sendQuestion,
        "show_explanation": sendExplanation,
        "finish_training": sendFinalStats,
        "start": async (params) => {
            if (userData && userData.startMessageId && userData.welcomeMessageId) {
                try {
                    await bot.deleteMessage(chatId, userData.welcomeMessageId);
                } catch (error) {
                    console.error(`Failed to delete previous start message: ${error}`);
                }
            }

            try {
                const firstName = msg.from.first_name || '';
                const lastName = msg.from.last_name || '';

                await updateUserFields(userId, { currentIndex: 0, correctAnswers: 0, incorrectAnswers: 0, welcomeMessageId: msgId + 1 });

                const replyKeyboard = bot.keyboard([
                    ['/start']
                ], { resize: true, once: false });

                await bot.sendMessage(chatId, `Welcome ${firstName} ${lastName}\!`, {
                    notification: false,
                    parse_mode: "MarkdownV2",
                    replyMarkup: replyKeyboard
                });

                await bot.sendMessage(chatId, `🌍${locales['en'].choose_language}:`, {
                    notification: false,
                    parse_mode: "MarkdownV2",
                    replyMarkup: bot.inlineKeyboard([
                        [bot.inlineButton("Українська", { callback: "lang_uk" })],
                        [bot.inlineButton("Русский", { callback: "lang_ru" })],
                        [bot.inlineButton("English", { callback: "lang_en" })],
                    ])
                });
            } catch (error) {
                console.error(`Failed to send message: ${error} `);
                console.error(`User named ${params.userData.fullName} with id ${params.userId} failed to start the bot.`);
            }
            try {
                await bot.deleteMessage(chatId, msgId - 1);
            } catch (error) {
                console.error(`Failed to delete message: ${error}`);
            }
        },
    };

    const matchingHandler = Object.entries(callbackHandlers).find(([key]) => data.startsWith(key));
    if (matchingHandler) {
        try {
            await matchingHandler[1](params);
        } catch (error) {
            console.error(`Failed to handle callback query: ${error} `);
            console.error(`Question code: ${userData.questions[userData.currentIndex].code} `);
        }
    }

    await updateUserFields(userId, { lastMessageId: msgId });

    try {
        await bot.answerCallbackQuery(msg.id);
    } catch (error) {
        console.error(`Failed to answer callback query: ${error} `);
        console.error(`Question code: ${userData.questions[userData.currentIndex].code} `);
    }
});

export default bot
