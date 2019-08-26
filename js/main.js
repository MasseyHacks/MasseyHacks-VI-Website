let faq = {
  currentIndex: 0,
  available: [["What is the admission cost?", "Admission to MasseyHacks VI is $25. If you require a subsidy, please email us at <a href=\"mailto:hello@masseyhacks.ca\">hello@masseyhacks.ca</a>."], ["Is Apple any good?","Apple products are inferior to all other products on the market due to their extremely low quality material and stuck-up way of treating their customers"], ["This is a very long question that does not have any true meaning other than the fact that it is an extremely long question.", "hlello!"]]
};
function updateFaq(){
    $("#faq-question").html(faq["available"][faq["currentIndex"]][0]);
    $("#faq-answer").html(faq["available"][faq["currentIndex"]][1]);
    faq["currentIndex"] = faq["currentIndex"] === faq["available"].length-1 ? 0 : faq["currentIndex"]+1;
    //faq["currentIndex"]++;
    console.log(faq["currentIndex"]);
}
$(function () {
   setInterval(updateFaq, 5000);
   updateFaq();
});