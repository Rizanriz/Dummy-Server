require('dotenv').config()
const express = require('express') 
const cors = require('cors')
const router = require("./routes/router")
require("./db/connection")

const dummyServer = express() 

dummyServer.use(cors())
dummyServer.use(express.json())
dummyServer.use(router)

const PORT = 3000 || process.env.PORT

dummyServer.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})

dummyServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>server started at port 3000....</h1>`)
})

dummyServer.post('/',(req,res)=>{
    res.status(200).send("Heloooooo")
})