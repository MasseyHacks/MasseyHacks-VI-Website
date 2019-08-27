let countUpI;

function countUp() {
    let prizeE = $("#countup-prizes");
    let attendE = $("#countup-attend");

    let prizeNum = parseInt(prizeE.text());
    let attendNum = parseInt(attendE.text());

    prizeE.text(prizeNum + 17 > 3300 ? 3300 : prizeNum+17);
    attendE.text(attendNum + 7 > 800 ? 800 : attendNum+7);

    console.log(prizeNum);
    if(prizeNum === 3300){
        clearInterval(countUpI);
    }
}

$(function () {
    countUpI = setInterval(countUp, 1);
});