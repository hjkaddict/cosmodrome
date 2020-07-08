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
        var topic = str.slice(0, str.indexOf("_["))

        var newDOM2 = $('<div/>', {
            class: 'sketchInfo',
            html:
                "<p class='title'>" + title + "</p>" +
                "<p class='author' style='font-size:15px'>" +
                author + "</p>",
            click: () => $('.frontPageContainer').fadeOut('fast', function () { window.location = "/sketches/" + str })
        })
        $('.' + objectID).addClass(title);
        $('.' + objectID).addClass(topic);
        $('.' + objectID).append(newDOM2).hide().fadeIn(1500)
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

    $('.filterBtn').click(function () {
        if ($('.filterOpened').length === 0) {
            $('.projectContainer').animate({
                height: '310px'
            }, 500)
            $('.projectContainer').css('border-bottom', '2px solid black')
            $(this).addClass('filterOpened')
        } else {
            $('.projectContainer').animate({
                height: '0'
            }, 500, function () {
                $('.projectContainer').css('border-bottom', 'none')
            })
            $(this).removeClass('filterOpened')
        }

    })

    $('.showAllSketches').click(function () {
        $('.topicTitle').css('color', 'lightgray')
        $(this).css('color', 'black')
        $('.topicList ul li').css('color', 'lightgray')
        $('.sketchList').fadeIn();
    })

    $('.topicList ul li').click(function () {
        let topic = $(this).text()
        $('.sketchList').hide();
        $('.' + topic).fadeIn()

        $('.showAllSketches').css('color', 'lightgray')
        $('.topicList ul li').css('color', 'lightgray')

        $('.topicTitle').css('color', 'lightgray')
        $(this).parent().parent().siblings('.topicTitle').css('color', 'black')

        $(this).css('color', 'black')

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

    
    $('.mobileMenuBtn img').click(function() {
        if($('.projectContainer').hasClass('open')) {
            $('.projectContainer').removeClass('open')
            $('.projectContainer').css('height', '0')
            $('.mobileMenuBtn img').attr('src', 'img/menu.png')
            console.log('closed')
        } else {
            $('.projectContainer').addClass('open')
            $('.projectContainer').css('height', '85vh')
            $('.mobileMenuBtn img').attr('src', 'img/close.png')
            console.log('opened')
        }
    })

    // $('.mobileMenu').append($('.projectContainer'))





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



