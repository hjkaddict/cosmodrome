const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
    })
})



app.listen(process.env.PORT || 3001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});