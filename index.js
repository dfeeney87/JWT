// 'use-strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();

const PORT = process.env.PORT || 8888;

const users = [
    {id: 1, username: 'admin', password: '123'}
    {id: 2, username: 'big papa', password: '456'}
    {id: 3, username: 'scrappy doo', password: '789'}
]

app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(401).send('You must provide user name and password!!!')
    }
    const user = req.body.username;

    res.status(200).send(`You logged in with ${user}`)
})

app.get('/status', (req, res) => {
    const localTime = (new Date()).toLocaleTimeString('en-US');
    res.status(200).send(`Server time is ${localTime}`)
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
