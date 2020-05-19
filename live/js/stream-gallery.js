function myFunction(imgs) {
    // Get the expanded image
    // let expandImg = document.getElementById("expandedImg");
    // Get the image text
    let expandImg = $("#expandedImage")
    let imgText = $("#imgtext")
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.attr('src', `https://www.youtube.com/embed/${$(imgs).data('youtubeid')}?&autoplay=1`)
    // console.log(imgs.dataset.streamurl)
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.html(imgs.alt);
    //$(imgs).css('border','5px, solid, black')

    for(let ele of document.getElementsByClassName('thumb-group-1')){
        ele.style.border = '';
    }
    imgs.style.border = '5px solid black';
    // Show the container element (hidden with CSS)
    // expandImg.parentElement.style.display = "block";
}

function getIDFromURL(url){
    return url.substring(url.lastIndexOf("/")+1);
}

$(() => {
    $.get({
        url: "https://eventdata.masseyhacks.ca/streams.json",
        dataType: "json",
        cache: false,
        success: function(data){
            $("#expandedImage").attr('src', data["general"]);
            $("#thumb-general").data('youtubeid', getIDFromURL(data["general"]));
            $("#thumb-yellow").data('youtubeid', getIDFromURL(data["yellow"]));
            $("#thumb-green").data('youtubeid', getIDFromURL(data["green"]));
            $("#thumb-magenta").data('youtubeid', getIDFromURL(data["magenta"]));

            $(".stream-thumbnail").each(function (index) {
                $(this).attr('src', `https://img.youtube.com/vi/${$(this).data('youtubeid')}/maxresdefault.jpg`)
            });
        }
    })
})