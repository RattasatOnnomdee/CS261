const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path');
app.use(express.json());


app.use(express.static(path.join(__dirname, './Frontend/public')));

app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname,'./Frontend/public' ,'index.html'))
})


app.post('/api/v1/auth/Ad/verify', async (req, res) => {
    const { UserName, PassWord } = req.body;  // Get UserName and PassWord from request body

    if (!UserName || !PassWord) {
        return res.status(400).send('UserName and PassWord are required.');
    }

    try {
        console.log('Verifying credentials for UserName:', UserName);

        // Sending the POST request to the external API with the credentials
        const response = await axios.post(`https://restapi.tu.ac.th/api/v1/auth/Ad/verify`, {
            UserName,
            PassWord
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU0ca85e6f7659be986931f5c0dbeb5948ef456f63b2f9822e05cef3df86fdf309e1fd3aa579aa1917d47a85f69b8dd5d1'
            }
        });

        const apiData = response.data;

        const output = {
            timestamp: Date.now(),
            status: apiData.status,
            message: apiData.message,
            data: apiData,
        };
        console.log(output.data)
        res.json(output)
        // res.json(springAPIResponse.data);
    } catch (err) {
        console.error('Error verifying credentials:', err);

        // Handle errors from the external API
        if (err.response) {
            return res.status(err.response.status).send(err.response.data);
        }

        res.status(500).send('An error occurred while verifying credentials.');
    }
});

// app.post("/api/students"(req,res) => {
//     res.send()
// })

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running at ${port}`);
    // console.log(path.join(__dirname,'/Frontend/public'))
})