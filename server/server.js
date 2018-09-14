const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const request = require('request-promise')

app.use(express.static('build'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
