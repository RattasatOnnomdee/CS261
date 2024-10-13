const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path');

app.use(express.static(path.join(__dirname, '../')));

app.get('/' ,(req,res) => {
    // res.send('The server is connected.');
    res.sendFile(path.join(__dirname,'../' ,'index.html'))
    // res.sendFile(path.join(__dirname,'../' ,'style.css'))
})

app.get('/api/student-info',async (req,res) => {
    try {
        //GET Student ID
        const id = req.query.id

        if (!id) {
            return res.status(400).send('Student ID is required.');
        }
        console.log('Fetching info for ID:', id);
        // console.log(id);
        const response = await axios.get(`https://restapi.tu.ac.th/api/v2/profile/std/info/?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU17280452c92fdda53fe4bee4ab6996a81c425e62c21c9eb4740d52ca4e1c67cb60b35edfc465ee4f69bacf835892f4e3' // แทนที่ด้วย token ที่ถูกต้อง
            }
        });


        const apiData = response.data
        const output = {
            timestamp: Date.now(),
            status: apiData.status,
            message: apiData.message,
            data: apiData.data
        };
        console.log(apiData.data.displayname_th)
        res.json(output);

        // res.sendFile(path.join(__dirname, '../' , 'printdata.html'))
    } catch (err) {
        console.error('Error fetching student info:', err); 
        
        if (err.response) {err
            console.error('Response data:', err.response.data); // Log the response data
            return res.status(err.response.status).send(err.response.data); // Send back the error response
        }

        res.status(500).send('An error occurred while fetching student info.');
    }
    
})

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running at ${port}`);
})