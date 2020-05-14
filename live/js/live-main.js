$(function () {
    $.ajax({
        type: 'GET',
        url: './schedule.json',
        dataType: 'json',
        success: function (data) {
            var exp = '';
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var xOffset = 100 + 200 * d['xs'];
                var width = (d['xe'] - d['xs']) * 200;
                var yOffset = 95 + 80 * d['y'];
                exp += '<div style="left: ' + xOffset + 'px; top: ' + yOffset + 'px; width: ' + width + 'px !important; background-color: ' + d['color'] + ';" class="schedule-label">' +
                    '<div class="inner-label">' +
                    '<p class="label-caption"><b>' + d['caption'] + '</b></p>' +
                    '<p class="label-description">' + d['start'] + ' - ' + d['end'] + ' | ' + d['location'] + '</p>' +
                    '</div></div>';
            }
            document.getElementById("label-container").innerHTML = exp

        }
    })

    $('#schedule-outer').hScroll();
})