const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'ejs')
app.use(express.static('public'));

const fileList = [];
const getAllFiles = function (dirPath, fileList) {
    files = fs.readdirSync(dirPath).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));;
    files.forEach((value, index) => {
        subfiles = fs.readdirSync(dirPath + '/' + value);
        fileList.push({
            name: value,
            files: subfiles
        })
    })
    return fileList;
}

console.log(getAllFiles("public/p5js", fileList));

app.get('/', (req, res) => {
    res.render('index', {
        fileList: fileList
    })
})



app.listen(process.env.PORT || 3001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});