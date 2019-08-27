function countUp() {
    $('.js-counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count'),
            countDur = $this.attr('data-duration');

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
    var waypoint = new Waypoint({
        element: document.getElementById('pitch-container'),
        handler: function() {
            countUp();
        },
        offset: '50%'
    });
});