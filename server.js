// const http = require('http');
const express = require('express')
const port = 4444; 
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})
// app.get('/login',(req,res) => {
//     res.sendFile(path.join(__dirname,"index.html"))
// })

app.post('/',(req,res) => {
    // res.sendFile(path.join(__dirname,"index.html"))
    const {username,password} = req.body;

    if (req.query.username === 'user' && req.query.password === 'pass') {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password');
    }
})

app.listen(port,() => {
    console.log(`Server is running at ${port}`);
})