import { MongoClient } from "mongodb";
import questions from "./questions.js";

// Подключение к MongoDB
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

let db, usersCollection;
const userCache = new Map();

async function connectToDB() {
    try {
        await client.connect();
        db = client.db("JS_TRAINER_BOT");
        usersCollection = db.collection("users");
        console.log("Data base connected");
    } catch (err) {
        console.error("Data base connecting error: ", err);
    }
}

// Функция для получения коллекции пользователей
function getUsersCollection() {
    return usersCollection;
}

async function getUserById(userId) {
    if (userCache.has(userId)) {
        const cachedUser = userCache.get(userId);
        if (cachedUser.language && cachedUser.questions) {
            return cachedUser;
        }
    }
    const user = await usersCollection.findOne({ userId });
    if (!user) {
        return null;
    }
    userCache.set(userId, user);
    return user;
}

async function addUserToDB({ userId, msgId, fullName }) {
    const usersCollection = getUsersCollection();
    const existingUser = await usersCollection.findOne({ userId });

    if (!existingUser) {
        await usersCollection.insertOne({
            userId,
            language: "en",
            mode: "sequential",
            currentIndex: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            questions: questions["en"],
            lastMessageId: msgId,
            fullName
        });
        console.log(`User ${userId} added to db.`);
    } else {
        console.log(`User ${userId} has already added in db.`);
    }
}

async function updateUserFields(userId, updateFields) {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.updateOne(
        { userId },
        { $set: updateFields }
    );

    const updatedUser = await usersCollection.findOne({ userId });
    userCache.set(userId, updatedUser);
    if (result.matchedCount > 0) {
        console.log(`User ${userId} updated successfully.`);
    } else {
        console.log(`User ${userId} not found.`);
    }
}

export default {
    connectToDB,
    getUserById,
    addUserToDB,
    updateUserFields
};
