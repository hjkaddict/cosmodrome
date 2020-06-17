const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.render('test')
    res.render('index')
})

const { createClient } = require("webdav");

app.get('/test', async (req, res) => {
    try {
        const client = createClient(
            "https://cloud.udk-berlin.de/remote.php/webdav",
            {
                username: process.env.NEXTCLOUD_USERNAME,
                password: process.env.NEXTCLOUD_PASSWORD
            })
        const directoryItems = await client.getDirectoryContents("/cosmodrome2020/06_diffuseLimitedAggregation/Dirk Erdmann");
        res.send(directoryItems)
    } catch (e) {
        res.send(e)
    }
})


app.listen(process.env.PORT || 3001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});