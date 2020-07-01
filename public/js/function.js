var host = location.origin.replace(/^http/, 'ws')
var socket = new WebSocket(host)

// When a connection is made
socket.onopen = function () {
    console.log('Opened connection');

    // send data to the server
    var json = JSON.stringify({ message: 'Hello 👋' });
    socket.send(json);
}

// When data is received

var objectID = 0;

socket.onmessage = function (event) {
    console.log(event.data)
    if (typeof (event.data) === 'object') {
        objectID++;
        var newDOM = $('<div/>', {
            class: 'sketchList ' + objectID,
            html:
                $('<img>', {
                    src: URL.createObjectURL(event.data)
                })
        });
        $('.sketchListContainer').append(newDOM)

    } else if (typeof (event.data) === 'string') {
        var str = event.data;
        
        var author = str.slice(str.indexOf("[") + 1, str.lastIndexOf("]"));
        var title = str.slice(str.indexOf("]") + 1)

        var newDOM2 = $('<div/>', {
            class: 'sketchInfo',
            html: "<p class='title'>" + title + "</p>" +
                "<p class='author' style='font-size:15px'>" + author + "</p>",
            click: () => window.location = "/" + str
        })

        $('.' + objectID).append(newDOM2).hide().fadeIn(500)

    }
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

    // $('.sketchList').on('click', function () {
    //     let filename = $(this).text().trim()
    //     $("#sketchContainer").empty()
    //     window.location = window.location.href + "/" + filename
    // })


})


$(document).ready(function () {
    $('body').css('display', 'none')
    $('body').fadeIn('slow')

    $('.sketchListContainer').on({
        mouseenter: function () {
            $(this).find('.sketchInfo').fadeIn('fast')
            $(this).find('img').css('opacity', '0.3')
        },
        mouseleave: function () {
            $(this).find('.sketchInfo').fadeOut('fast')
            $(this).find('img').css('opacity', '1.0')
        }
    }, '.sketchList');
});



