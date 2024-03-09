import OpenAI from 'openai';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// const express = require('express');
// const dotenv = require('dotenv');


dotenv.config();
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.get('/', (req, res) => {
    return res.status(200).send("Server is up")
})

app.post('/generateimg', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt)
    if (!prompt) {
        return res.status(400).send('Bad Request')
    }
    try {
        const response = await openai.images.generate({
            // model: "dall-e-2",
            prompt,
            n: 1,
            size:"1024x1024"
        });
        const image_url = response.data[0].url;
        return res.status(200).send({
            src: image_url
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }

})

app.post('/generatetext', async (req, res) => {
    console.log(req.body.prompt)
    const inputdata = req.body.prompt;
    console.log(inputdata)
    if (!inputdata) {
        return res.status(400).send('Bad Request');
    }

    try {
        const result = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct', // Adjust the model according to your preference
            prompt: `Generate title,content in json object for ${inputdata}.Content must be HTML. Make sure there is no new line character in the json. Every time generate new content and title`,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0
        });
        const jsonData = result.choices[0].text;
        const parsedData = JSON.parse(jsonData);

        return res.status(200).json(parsedData);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
});


const port = process.env.PORT || 8200;

app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})
