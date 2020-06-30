var host = location.origin.replace(/^http/, 'ws')
// console.log(host)
var socket = new WebSocket("ws://cosmodrome2020.herokuapp.com:8081")

// When a connection is made
socket.onopen = function () {
    console.log('Opened connection 🎉');

    // send data to the server
    var json = JSON.stringify({ message: 'Hello 👋' });
    socket.send(json);
}

// When data is received
socket.onmessage = function (event) {
    var arrayBuffer = event.data
    $('.sketchListContainer').append('<div class="sketchList"><img src="' + 
    URL.createObjectURL(arrayBuffer) + '"></div>')

}

// A connection could not be made
socket.onerror = function (event) {
    console.log(event);
}

// A connection was closed
socket.onclose = function (code, reason) {
    console.log(code, reason);
}

// Close the connection when the window is closed
window.addEventListener('beforeunload', function () {
    socket.close();
});


$(async function () {

    $('.topicList ul li').click(function () {
        var route = $(this).text()
        $('header').css('height', '0');
        $('.frontPageContainer').fadeOut('slow', function () {
            window.location = "/projects/" + route
        });
    })

    //go back to frontPage(by clicking goback button )
    $('#goback').click(function () {
        $('body').fadeOut(function () {
            window.location = "/"
        })
    });

    //student list hover and click color
    $(".studentListContainer ul li").hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    $(".studentListContainer ul li").click(function () {
        $(this).addClass('click');
    }, function () {
        let text = $(this).text()
        let title = $(this).siblings('.titleContainer').text()

        window.location = '/projects/' + title + "/" + text
        $(".studentListContainer ul li").removeClass("click");
        $(this).removeClass("hover").addClass("click");
    });

    $('.sketchList').on('click', function () {
        let filename = $(this).text().trim()
        $("#sketchContainer").empty()
        window.location = window.location.href + "/" + filename
    })

})

$(document).ready(function () {
    $('body').css('display', 'none')
    $('body').fadeIn('slow')
});

