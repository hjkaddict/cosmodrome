const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const http = require('http')
var WebSocketServer = require("ws").Server
const PORT = process.env.PORT || 3001;

require('dotenv').config()

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')

const middle = require('./middleware/middle')

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const { createClient } = require("webdav");

app.get('/', (req, res) => {

    try {
        res.render('index', {
            files: req.values,
            thumbnails: req.thumbnails
        })
    } catch (e) {

    }
})

app.get('/projects/:id/', middle, async (req, res) => {
    try {
        res.render('projects', {
            title: req.params.id,
            files: req.values
        })

    } catch (e) {

    }
})

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

        res.render('projects', {
            title: req.params.id,
            files: sketchFolders
        })

    } catch (e) {
        res.send(e)
    }
})

app.get('/projects/:id/:name/:sketch', async (req, res) => {
    try {
        const client = createClient(
            "https://cloud.udk-berlin.de/remote.php/webdav",
            {
                username: process.env.NEXTCLOUD_USERNAME,
                password: process.env.NEXTCLOUD_PASSWORD
            })

        let sketchFolders = [];
        let directoryItems = await client.getDirectoryContents("/cosmodrome2020/" + req.params.id + "/" + req.params.name);
        await directoryItems.forEach(async (v) => {
            await sketchFolders.push(v.basename)
        })

        let txt = await client.getFileContents("/cosmodrome2020/" + req.params.id + "/" + req.params.name + "/" + req.params.sketch + "/sketch.js", { format: "text" });

        res.render('sketch', {
            sketch: txt
        })

    } catch (e) {
        res.send(e)
    }
})

app.listen(PORT, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


var server = http.createServer(app)
// var port = process.env.PORT || 3001
// server.listen(port)

// console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server, port: 443})
console.log("websocket server created")


wss.on('connection', async function (socket) {
    console.log('Opened connection in Server 🎉');

    const client = await createClient(
        "https://cloud.udk-berlin.de/remote.php/webdav",
        {
            username: process.env.NEXTCLOUD_USERNAME,
            password: process.env.NEXTCLOUD_PASSWORD
        })

    const directoryItems = await client.getDirectoryContents("/cosmodrome2020/projectFiles");

    directoryItems.forEach(async (item) => {
        var thumbnail = await client.getFileContents("/cosmodrome2020/projectFiles/" + item.basename + "/thumbnail.png")

        // console.log(thumbnail)
        socket.send(thumbnail)
    })

    // Send data back to the client
    // var json = JSON.stringify({ message: directoryItems });
    // socket.send(json);

    // When data is received
    socket.on('message', function (message) {
        console.log('Received: ' + message);
    });

    // The connection was closed
    socket.on('close', function () {
        console.log('Closed Connection 😱');
    });


});