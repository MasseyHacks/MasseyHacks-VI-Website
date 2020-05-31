// Set the date we're counting down to
let countDownDate = new Date("May 30, 2020 13:00:00").getTime();
let eventDoneDate = new Date("May 31, 2020 11:00:00").getTime();

let clockComplete = false;
let scheduleCache;

let oldEvents = [];
let oldEventsUp = [];
let hasRun = false;



function updateClock() {
    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="date-time"
    document.getElementById("date-time").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s " + "until hacking begins!";

    // If the count down is finished, write some text
    if (distance < 0) {
        // Get today'ss date and time
        now = new Date().getTime();

        // Find the distance between now and the count down date
        distance = eventDoneDate - now;

        // Time calculations for days, hours, minutes and seconds
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="date-time"
        document.getElementById("date-time").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s " + "left!";
        if (distance < 0){
            clockComplete = true;
            document.getElementById("date-time").innerHTML = "Thanks for another great season!";
        }
    }
}

function to24(time){
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s?(AM|PM)/)[1];
    if(AMPM === "PM" && hours<12) hours = hours+12;
    if(AMPM === "AM" && hours===12) hours = hours-12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    return `${sHours}:${sMinutes}`
}

function randomString(length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function getCardHTML(name, start, end, body){
    let id = "card"+randomString(15);
    let cardHTML = `
	<div class="activity-card" id="${id}">
		<h6>${name}: ${start} - ${end}</h6>
		<p>${body}</p>
	</div>
	`
    return [id,cardHTML]
}

function fetchSchedule(){
    if(!scheduleCache){
        $.ajax({
            type: 'GET',
            url: './schedule.json',
            dataType: 'json',
            success: function (data) {
                scheduleCache = data;
                //console.log(data);
                drawSchedule(scheduleCache);
                updateActivities(scheduleCache);
            },
            error: function (data) {
                $.ajax({
                    type: 'GET',
                    url: './live/schedule.json',
                    dataType: 'json',
                    success: function (ndata) {
                        scheduleCache = ndata;
                        //console.log(data);
                        drawSchedule(scheduleCache);
                        updateActivities(scheduleCache);
                    },
                    error: function (data) {
                        $('#schedulenow').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
                        $('#scheduleupcoming').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
                    }
                })
                // $('#schedulenow').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
                // $('#scheduleupcoming').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
            }
        })
    }
    else {
        updateActivities(scheduleCache)
    }
}

function updateActivities(data) {
    document.getElementById("schedulenow").innerHTML = "There are no activities";
    document.getElementById("scheduleupcoming").innerHTML = "There are no activities";

    let exp = '';
    let currentDate = new Date();
    let addedEvents = [];
    let addedEventsUp = [];
    let nowModded, upModded = false;
    for (let i = 0; i < data.length; i++) {
        let d = data[i];
        let actStart = new Date(d['date'] + " " + to24(d['start']));
        if(!d['dateEnd']){
            d['dateEnd']  = d['date']
        }
        let actEnd = new Date(d['dateEnd'] + " " + to24(d['end']));

        //console.log(d['caption'])
        //console.log(actStart-currentDate);
        if(actStart < currentDate && actEnd > currentDate){
            //console.log("hello")
            if(!nowModded){
                document.getElementById("schedulenow").innerHTML = "";
            }
            nowModded = true;
            let eventCard = getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
            document.getElementById("schedulenow").innerHTML += eventCard[1];
            if(oldEvents.indexOf(d['caption']) === -1){
                $("#"+eventCard[0]).fadeIn(250);
                if(hasRun){
                    toastr["info"](`${d['caption']}: ${d['start'].toLowerCase()} - ${d['end'].toLowerCase()} in ${d['location']}`, "Activity starting!");
                }
            }
            else{
                $("#"+eventCard[0]).toggle(true);
            }
            if(d['important']){
                $("#"+eventCard[0]).addClass("important-card")
            }
            addedEvents.push(d['caption'])
            //document.getElementById("schedulenow").innerHTML += getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
        }
        else if(actStart-currentDate <= 3600000 && actEnd > currentDate){
            if(!upModded){
                //console.log("boo!")
                document.getElementById("scheduleupcoming").innerHTML = "";
            }
            upModded = true;
            let eventCard = getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
            //console.log(eventCard)
            document.getElementById("scheduleupcoming").innerHTML += eventCard[1];
            if(oldEventsUp.indexOf(d['caption']) === -1){
                $("#"+eventCard[0]).fadeIn(250);
            }
            else{
                $("#"+eventCard[0]).toggle(true);
            }
            if(d['important']){
                $("#"+eventCard[0]).addClass("important-card")
            }
            addedEventsUp.push(d['caption'])
        }

    }
    //$("#schedulenow").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //$("#scheduleupcoming").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    oldEvents = addedEvents;
    oldEventsUp = addedEventsUp;
    hasRun = true;
}

function drawSchedule(data) {
    let exp = '';
    for (let i = 0; i < data.length; i++) {
        let d = data[i];
        let xOffset = 100 + 200 * d['xs'];
        let width = (d['xe'] - d['xs']) * 200;
        let yOffset = 95 + 80 * d['y'];
        exp += '<div style="left: ' + xOffset + 'px; top: ' + yOffset + 'px; width: ' + width + 'px !important; background-color: ' + d['color'] + ';" class="schedule-label">' +
            '<div class="inner-label">' +
            '<p class="label-caption"><b>' + d['caption'] + '</b></p>' +
            '<p class="label-description">' + d['start'] + ' - ' + d['end'] + ' | ' + d['location'] + '</p>' +
            '</div></div>';
    }
    document.getElementById("label-container").innerHTML = exp;
}

$(function () {
    fetchSchedule();
    setInterval(fetchSchedule, 60000)

    // Update the count down every 1 second
    try {
        updateClock();
        let x = setInterval(function() {
            if(clockComplete){
                clearInterval(x);
            }
            else{
                updateClock();
            }
        }, 1000);
    } catch (e) {
        console.log(e)
    }

})
