
var forEach = require('async-foreach').forEach;

const middle = async (req, res, next) => {
    const { createClient } = require("webdav");
    const client = createClient(
        "https://cloud.udk-berlin.de/remote.php/webdav",
        {
            username: process.env.NEXTCLOUD_USERNAME,
            password: process.env.NEXTCLOUD_PASSWORD
        })

    try {
        const directoryItems = await client.getDirectoryContents("/cosmodrome2020/projectFiles");

        function allDone(notAborted, arr) {
            console.log("done", notAborted);
            req.values = sketchList;
            req.thumbnails = thumbnailList
            next()
        }

        var sketchList = [];
        var thumbnailList = [];

        forEach(directoryItems, async function (item) {
            var done = this.async();

            let text = item.basename
            let title = text.substring(text.lastIndexOf("]") + 1)
            let topic = text.substring(0, text.indexOf('_['))
            let author = text.slice(text.indexOf('[') + 1, text.indexOf(']'))
            sketchList.push({ title, topic, author })

            var thumbnail = await client.getFileContents("/cosmodrome2020/projectFiles/" + text + "/thumbnail.png")
            thumbnailList.push(thumbnail)
            // console.log(thumbnail)

            done();
        }, allDone);


    }
    catch (e) {
        res.send(e)
    }
}

module.exports = middle