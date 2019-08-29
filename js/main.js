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
var navState = false;
var modalDataset = ["https://devpost.com/software/hydrolife","https://devpost.com/software/lag-sq2cmo","https://devpost.com/software/strest","https://devpost.com/software/wave-t6zv4k"];

$(function () {
    var rellax = new Rellax('.rellax');
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

    var $mainNav = $("#main-nav");
    var $mainNavLinks = $("#main-nav-links");

    $mainNav.click(function () {
        if(!navState){
            $(this).removeClass("nav-closed");
            $(this).addClass("nav-open");
            $mainNavLinks.fadeIn(150);
        }
        else {
            $(this).removeClass("nav-open");
            $(this).addClass("nav-closed");
            $mainNavLinks.fadeOut(50);
        }
        navState = !navState;
    });

    $(".project").each(function () {
       $(this).click(function (){
           var url = modalDataset[parseInt($(this).data("dataset-index"))];
           window.open(url,'_blank');
       })
    });

    $(document).mouseup(e => {
        if (!$mainNav.is(e.target) // if the target of the click isn't the container...
            && $mainNav.has(e.target).length === 0 && navState)// ... nor a descendant of the container
        {
            $mainNav.removeClass("nav-open");
            $mainNav.addClass("nav-closed");
            $mainNavLinks.fadeOut(50);
            navState = !navState;
        }
    });

});
