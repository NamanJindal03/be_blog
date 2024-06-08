const express = require('express');
require('dotenv').config()
const app = express();

require('./db')

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use('/', require('./routes'))


app.listen(PORT, ()=>{
    console.log(`server is up and running at port ${PORT}`)
})