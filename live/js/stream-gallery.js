function myFunction(imgs) {
    // Get the expanded image
    // let expandImg = document.getElementById("expandedImg");
    // Get the image text
    let expandImg = $("#expandedImage")
    let imgText = $("#imgtext")
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.attr('src', "https://www.youtube-nocookie.com/embed/" + imgs.dataset.youtubeid)
    // console.log(imgs.dataset.streamurl)
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    // expandImg.parentElement.style.display = "block";
}

$(() => {
    $(".stream-thumbnail").each(function (index) {
        $(this).attr('src', `https://img.youtube.com/vi/${$(this).data('youtubeid')}/maxresdefault.jpg`)
    })
})