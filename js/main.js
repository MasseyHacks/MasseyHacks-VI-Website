function countUp() {
    $('.js-counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count'),
            countDur = parseInt($this.attr('data-duration'));

        $({ countNum: $this.text()}).animate({
                countNum: countTo
            },
            {
                duration: countDur,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }

            });



    });
}

$(function () {
    var rellax = new Rellax('.rellax')
    AOS.init();
    var scroll = new SmoothScroll('a[href*="#"]',{
        speed: 200
    });
    var waypoint = new Waypoint({
        element: document.getElementById('about'),
        handler: function() {
            countUp();
        },
        offset: '60%'
    });
});
