const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', false)

const MONGOOSE_API = 'mongodb+srv://hriDev:plcR3WNQn6iMETa2@hri.gb755zn.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app)

mongoose.connection.on('open', ()=>{
    console.log('MONGODB CONNECTION READY')
})

mongoose.connection.on('error', ()=>{
    console.log('MONGOOSE CONNECTION ERROR')
})

async function startServer(){
    await mongoose.connect(MONGOOSE_API)

    server.listen(PORT, ()=>{
        console.log(`server running at http://localhost:${PORT}`)
    })
}

startServer()
