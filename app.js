const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const http = require('http')
var WebSocket = require("ws").Server
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

// app.get('/:id', async (req, res) => {
//     try {
//         const client = createClient(
//             "https://cloud.udk-berlin.de/remote.php/webdav",
//             {
//                 username: process.env.NEXTCLOUD_USERNAME,
//                 password: process.env.NEXTCLOUD_PASSWORD
//             })
//         const directoryItems = await client.getDirectoryContents("/cosmodrome2020/projectFiles/" + req.params.id);

//         let txt = await client.getFileContents("/cosmodrome2020/projectFiles/" + req.params.id + "/sketch.js", { format: "text" });

//         res.render('sketch', {
//             title: 'sketch', 
//             sketch: txt
//         })

//     } catch (e) {
//         console.log(e)
//     }
// })

// app.listen(PORT, function () {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });


var server = app.listen(PORT, function () {
    //listening
})

var wss = new WebSocket({ server })
console.log("websocket server created")




wss.on('connection', async function (socket) {
    console.log('Opened connection in Server');

    const client = await createClient(
        "https://cloud.udk-berlin.de/remote.php/webdav",
        {
            username: process.env.NEXTCLOUD_USERNAME,
            password: process.env.NEXTCLOUD_PASSWORD
        })

    const directoryItems = await client.getDirectoryContents("/cosmodrome2020/projectFiles");
    console.log(directoryItems)
    // directoryItems.forEach(async (item) => {
    //     var thumbnail = await client.getFileContents("/cosmodrome2020/projectFiles/" + item.basename + "/thumbnail.png")

    //     socket.send(thumbnail)
    //     socket.send(item.basename)
    // })

    // Send data back to the client
    // var json = JSON.stringify({ message: directoryItems });
    // socket.send(json);

    // When data is received
    socket.on('message', function (message) {
        // console.log('Received: ' + message);
    });

    // The connection was closed
    socket.on('close', function () {
        console.log('Closed Connection');
    });


});