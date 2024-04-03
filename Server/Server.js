const express = require('express')
const app = express()
const path  = require('path')

app.use(express.static(path.join(__dirname,'../Frontend/dist')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.post('/submit',(req,res)=>{
    console.log(req.body)
    res.json({'message':req.body.task})
})

app.listen(5002,(req,res)=>{
    console.log('Server is listening port 5002')
})