

$(function () {

    $('.topicList ul li').click(function () {
        var route = $(this).text()
        $('header').css('height', '0');
        $('.frontPageContainer').fadeOut('slow', function () {
            // $('.sketchPageContainer').fadeIn();
            // window.location="/" + route
            window.location = "/projects/" + route
        });
    })

    //go back to frontPage(by clicking goback button )
    $('#goback').click(function () {
        window.location = "/"
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
})

