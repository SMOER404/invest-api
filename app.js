const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

// чтобы работал req, res
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit()
    }
}



app.listen(PORT, () => console.log('Сервачок: ' + PORT))

start();