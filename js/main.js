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
    console.log(`

███╗   ███╗██╗  ██╗ ██████╗
████╗ ████║██║  ██║██╔════╝
██╔████╔██║███████║███████╗
██║╚██╔╝██║██╔══██║██╔═══██╗
██║ ╚═╝ ██║██║  ██║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝
                            
Developed by: David Hui and James Xu.
Made in Canada.

Copyright (c) 2019 MasseyHacks.
Website text and code licensed under MIT. Audiovisual assets are not to be used on other sites without written permission from MasseyHacks.`);
    
    var rellax = new Rellax('.rellax');
    AOS.init();
    var scroll = new SmoothScroll('a[href*="#"]',{
        speed: 200,
        updateURL: false
    });
    var waypoint = new Waypoint({
        element: document.getElementById('about'),
        handler: function() {
            countUp();
        },
        offset: '60%'
    });

    var $mainNav = $("#main-nav");
    var $mainNavIcon = $("#main-nav-icon-container");
    var $mainNavLinks = $("#main-nav-links");

    $mainNavIcon.click(function () {
        if(!navState){
            $mainNav.removeClass("nav-closed");
            $mainNav.addClass("nav-open");
            $mainNavLinks.fadeIn(150);
        }
        else {
            $mainNav.removeClass("nav-open");
            $mainNav.addClass("nav-closed");
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
