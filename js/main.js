let faq = {
  currentIndex: 0,
  available: [["What is the admission cost?", "Admission to MasseyHacks VI is $25. If you require a subsidy, please email us at <a href=\"mailto:hello@masseyhacks.ca\">hello@masseyhacks.ca</a>."], ["Is Apple any good?","Apple products are inferior to all other products on the market due to their extremely low quality material and stuck-up way of treating their customers"], ["This is a very long question that does not have any true meaning other than the fact that it is an extremely long question.", "hlello!"]]
};

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