

const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const path = require('path')

app.use(express.static('../Frontend/dist'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api/v1/tasks',tasks)
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'../Frontend/dist/index.html'))
})

require('dotenv').config()

const start = async()=>{

    try{
    await connectDB(process.env.MONGO_URL)
    app.listen(5000,(req,res)=>{
        console.log('The app is listening to server 5000')
    })
}
catch(error){
    console.log(error)
}
    
}

start()

