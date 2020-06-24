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
    res.render('index')
})

app.get('/projects/:id/', (req, res) => {
    res.render('projects', {
        title: req.params.id,
        files: '',
        thumbnails: ''
    })
})

const { createClient } = require("webdav");

app.get('/projects/:id/:name', async (req, res) => {
    try {
        const client = createClient(
            "https://cloud.udk-berlin.de/remote.php/webdav",
            {
                username: process.env.NEXTCLOUD_USERNAME,
                password: process.env.NEXTCLOUD_PASSWORD
            })

        const sketchFolders = [];
        const directoryItems = await client.getDirectoryContents("/cosmodrome2020/" + req.params.id + "/" + req.params.name);
        await directoryItems.forEach(async (v) => {
            await sketchFolders.push(v.basename)
        })

        // console.log(sketchFolders)
        const thumbnailList = [];

        // sketchFolders.forEach(async (v) => {
        //     var thumbnailItems = await client.getFileContents("/cosmodrome2020/" + req.params.id + "/" + req.params.name + "/" + v + "/thumbnail.png")
        //     console.log(thumbnailItems)
        //     thumbnailList.push(thumbnailItems)
        // })

        res.render('projects', {
            title: req.params.id,
            files: sketchFolders,
            thumbnails: thumbnailList
        })

    } catch (e) {
        res.send(e)
    }
})


app.listen(process.env.PORT || 3001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});