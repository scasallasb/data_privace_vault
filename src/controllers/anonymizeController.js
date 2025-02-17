const { anonymizeMessage, unanonymizeMessage } = require('../utils/anonymize');
const axios = require('axios');

exports.anonymize = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const anonymizedMessage = await anonymizeMessage(message);
        res.json({ anonymizedMessage });
    } catch (error) {
        console.error('Error in anonymize controller:', error);
        res.status(500).json({ error: 'An error occurred while anonymizing the message' });
    }
};

exports.unanonymize = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const unanonymizedMessage = await unanonymizeMessage(message);
        res.json({ unanonymizedMessage });
    } catch (error) {
        console.error('Error in unanonymize controller:', error);
        res.status(500).json({ error: 'An error occurred while unanonymizing the message' });
    }
};

exports.secureChatGPT = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        // Anonymize the prompt
        const anonymizedPrompt = await anonymizeMessage(prompt);

        // Send the anonymized prompt to ChatGPT
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            //messages: [{ role: 'system', content: 'crea una oferta de trabajo para el rol de data engineer con un salario de 25 M COP para un empresa de tecnologia atractiva con la siguiente informacion:' }],
            messages: [{ role: 'user', content: anonymizedPrompt }],
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            }
        });

        // Unanonymize the response from ChatGPT
        const unanonymizedResponse = await unanonymizeMessage(response.data.choices[0].message.content);

        // Send the unanonymized response to the client
        res.json({ response: unanonymizedResponse });
    } catch (error) {
        console.error('Error in secureChatGPT controller:', error);
        res.status(500).json({ error: 'An error occurred while processing the prompt' });
    }
};