'use-strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const app = express();

const PORT = process.env.PORT || 8888;

// const users = [
//     {id: 1, username: 'admin', password: '123'},
//     {id: 2, username: 'big papa', password: '456'},
//     {id: 3, username: 'scrappy doo', password: '789'}
// ];

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
const jwtCheck = expressjwt({
    secret: 'mysupersecretkey'
})

// app.post('/login', (req, res) => {
//     if (!req.body.username || !req.body.password){
//         res.status(401).send('You must provide user name and password!!!');
//         return;
//     }
//     const user = users.find( (u) => {
//         return u.username === req.body.username && u.password === req.body.password;
//     });

//     if (!user) {
//         res.status(401).send('User not found');
//         return;
//     }

//     const token = jwt.sign({
//         sub: user.id,
//         username: user.username
//     }, 'mysupersecretkey', {expiresIn: '2 hours'})

//     res.status(200).send({access_token: token});
// })

app.get('/resource', (req, res) => {
    res.status(200).send('This is a public resource, you can see this');
});

//this endpoint has a security check, the JWT check requires a token with a 'mysupersecretkey' as the access token type, from above we see the validations
app.get('/resource/secret', jwtCheck, (req, res) => {
    res.status(200).send('This is a secret resource, you need to be logged in to see this')
})

app.get('/status', (req, res) => {
    const localTime = (new Date()).toLocaleTimeString('en-US');
    res.status(200).send(`Server time is ${localTime}`)
});

app.get('*', (req, res) => {
    res.sendStatus(404)
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
