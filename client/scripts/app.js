var messageIndex = 0; //hold index of last message

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
    messageIndex = i;
}

//get data and load new
function updateData(){
    if (messageIndex == 0) {
        getData();
    }
    else {
        $.ajax({
            type:"GET",
            url: "/messenger",
            success: function(data){
                updateDisplay(data);
            }
        })
    }
}
//load new messages to .display
function updateDisplay(data) {
    for (var i = messageIndex; i < data.length; i++) {
        writeCard(data, i);
        $('.display .card').first().hide().delay(500).slideDown();
    };
    messageIndex = i;
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
//display messages on page load
getData();
var refreshDisplay = setInterval(function () {
    updateData();
}, 30000);

});
