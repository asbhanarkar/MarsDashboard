// https://api.nasa.gov/planetary/apod?api_key=hskZZgTfavb3vplmoybaBEedYWNB9QScbdQPdjh6

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const {application} = require("express")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.post("/images", async function(req, res){
    let data = req.body
    try {
        let img = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.body.data}/photos?sol=1000&api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        res.send(img.photos)
    } 
    catch (error) {
        console.log("Error!!! Please check post method", error)
        
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))