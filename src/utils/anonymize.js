const crypto = require('crypto');
const db = require('./db');

async function generateToken() {
    return crypto.randomBytes(4).toString('hex');
}

async function saveToken(token, value) {
    try {
        await db.query('INSERT INTO tokens (token, value) VALUES ($1, $2)', [token, value]);
    } catch (error) {
        console.error('Error saving token:', error);
        throw error;
    }
}

async function getTokenValue(token) {
    try {
        const res = await db.query('SELECT value FROM tokens WHERE token = $1', [token]);
        return res.rows.length ? res.rows[0].value : null;
    } catch (error) {
        console.error('Error getting token value:', error);
        throw error;
    }
}

async function anonymizeMessage(message) {
    const nameRegex = /\b[A-Z][a-z]*\s[A-Z][a-z]*\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /\b\d{10}\b/g;

    const replaceAsync = async (str, regex, asyncFn) => {
        const promises = [];
        str.replace(regex, (match) => {
            promises.push(asyncFn(match));
            return match;
        });
        const data = await Promise.all(promises);
        return str.replace(regex, () => data.shift());
    };

    try {
        let anonymizedMessage = await replaceAsync(message, nameRegex, async (match) => {
            const token = await generateToken();
            await saveToken(token, match);
            return token;
        });

        anonymizedMessage = await replaceAsync(anonymizedMessage, emailRegex, async (match) => {
            const token = await generateToken();
            await saveToken(token, match);
            return token;
        });

        anonymizedMessage = await replaceAsync(anonymizedMessage, phoneRegex, async (match) => {
            const token = await generateToken();
            await saveToken(token, match);
            return token;
        });

        return anonymizedMessage;
    } catch (error) {
        console.error('Error anonymizing message:', error);
        throw error;
    }
}

async function unanonymizeMessage(message) {
    let unanonymizedMessage = message;
    const tokens = message.match(/\b[0-9a-f]{8}\b/g);
    if (tokens) {
        for (const token of tokens) {
            const value = await getTokenValue(token);
            if (value) {
                unanonymizedMessage = unanonymizedMessage.replace(token, value);
            }
        }
    }
    return unanonymizedMessage;
}

module.exports = {
    anonymizeMessage,
    unanonymizeMessage,
};