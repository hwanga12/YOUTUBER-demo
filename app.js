const express = require('express')
const app = express()

app.listen(7777)

const userRouter = require('./routes/users') //유저 데모 소환?
const channelRouter = require('./routes/channels') // 채널 데모 소환?

app.use("/", userRouter)
app.use("/channels", channelRouter)
