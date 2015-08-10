var testObjIndex = 0; //hold index of last message
var testObjId; //hold the last object id so we can make sure the data hasn't changed

//get data and load all
function getData(){
    $.ajax({
        type:"GET",
        url: "/messenger",
        success: function(data){
            loadDisplay(data);
        }
    })
}

//load all messages to .display
function loadDisplay(data){
    $('.display').empty();
    for (var i = 0; i < data.length; i++) {
        writeCard(data, i);
    };
}

//get data and load new
function updateData(){
    $.ajax({
        type:"GET",
        url: "/messenger",
        success: function(data){
            //if the  database has changed reload the display instead of a partial update
                //Are there less records in the db than the last time
                if(testObjIndex > data.length-1){
                    console.log("Data missmatch");
                    loadDisplay(data);
                }
                //Does the last saved record still match
                else if(data[testObjIndex]._id == testObjId) {
                    console.log("Data Match");
                    updateDisplay(data);
                }
                //If it doesn't match do a full display reload
                else {
                    console.log("Data missmatch");
                    console.log(data[testObjIndex]._id +' Doesn\'t equal '+ testObjId)
                    loadDisplay(data);
                }
            }
        })
}
//load new messages to .display
function updateDisplay(data) {
    for (var i = testObjIndex+1; i < data.length; i++) {
        writeCard(data, i);
        $('.display .card').first().hide().delay(500*i).slideDown();
    };
    //fix time on the non-reloaded messages
    recalcTime();
}

//create the message card
function writeCard(data, i) {
    $('.display').prepend('<div class="card col-xs-12"></div>');
    $('.display .card').first().append('<div class="content"></div>')
    var $el = $('.display .content').first();
    $el.append('<img src="/assets/imgs/blank_user.jpg" alt="user avatar" class="avatar">');
    $el.append('<div class="name">'+data[i].name+'</div>');
    $el.append('<div class="time" data-timestamp="'+data[i].timestamp+'">'+moment(data[i].timestamp).fromNow()+'</div>');
    $el.append('<div class="message">'+data[i].message+'</div>');
    testObjId = data[i]._id;
    testObjIndex = i;
}

//recalculate the time when the page is updated
function recalcTime() {
    $('.time').each(function() {
        var msgTime = $(this).attr("data-timestamp");
        $(this).text(moment(msgTime).fromNow());
    });
}

//use custom formating for time display
moment.locale('en-my-settings', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "%ds",
        m:  "%dm",
        mm: "%dm",
        h:  "%dh",
        hh: "%dh",
        d:  "%dd",
        dd: "%dd",
        M:  "%dm",
        MM: "%dm",
        y:  "%dy",
        yy: "%dy"
    }
});

$(document).ready(function (){
    $('#inputForm').submit(function(event) {
        event.preventDefault();
        var formData = $("#inputForm").serialize();
        $('textarea').val('');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/messenger",
            data: formData,
            success: function(){
                updateData();
            }
        });
    });

    $('.refresh-btn').on('click', function() {
        updateData();
    });

    //display messages on page load
    getData();

    //update the display every 30 seconds
    var refreshDisplay = setInterval(function () {
        updateData();
    }, 30000);

});
