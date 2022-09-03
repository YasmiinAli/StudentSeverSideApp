const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();  
})

app.use(cors());
app.use(bodyParser.json());

// GET words
app.get('/words', (req, res) => {
    const TestData = getTestData()
    let wordList = TestData.wordList;
      let words =
    wordList &&
    wordList.length > 0 &&
    wordList
      .map((item) => ({ item, r: Math.random() }))
      .map((a) => a.item)
      .slice(0, 10);
      console.log(words);

      res.send(words)
})

//  scoresList
app.post('/rank', (req, res) => {
    const TestData = getTestData();
    let scoresList = TestData.scoresList;
    let score = req.body.score;
    // console.log('body', req.body);
    // console.log(scoresList);
    let count =0;
    for(let i=0; i<scoresList.length; i++) {
        if(scoresList[i] < score) {
        count++; 
        };
    }
    let rank = (count/scoresList.length)*100;
    let newRank = rank.toFixed(2);
    console.log(newRank);
    res.send(newRank);
})


//get the data from json file
const getTestData = () => {
    const jsonData = fs.readFileSync('TestData.json')
    return JSON.parse(jsonData);
    
}


//configure the server port
app.listen(8080, () => {
    console.log('Server runs on port 8080')
})



//Not found MW
app.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});


//Error MW
app.use((error,request,response,next)=>{   
    let status=error.status || 500;
    response.status(status).json({Error:error+""});
})