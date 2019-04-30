$(function() {

    //Switch to hamburger menu when mobile device
    $(".hamburger-menu").click(function () {
        $("nav ul").toggleClass("show");
    });

    //Number counter starts when in 'about' section reached (only once)
    $("#about").one("mouseenter", function(){
        $("#about td").removeClass("transparent");
        $("td.about-number").each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

});
