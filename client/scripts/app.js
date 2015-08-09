var currentTime = moment().format();//get time
var messageIndex =  0; //hold index of last message

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
        $('.display .card').delay(i*10).slideDown();
    };
    messageIndex = i;
}

//get data and load new
function updateData(){
    $.ajax({
        type:"GET",
        url: "/messenger",
        success: function(data){
            updateDisplay(data);
        }
    })
}
//load new messages to .display
function updateDisplay(data) {
    for (var i = messageIndex; i < data.length; i++) {
        writeCard(data, i);
        $('.display .card').first().hide().slideDown();
    };
    messageIndex = i;
}

//create the message card
function writeCard(data, i) {
  $('.display').prepend('<div class="card"></div>');
  var $el = $('.display .card').first();
  $el.append('<div class="name">'+data[i].name+'</div>');
  $el.append('<div class="time" data-timestamp="'+data[i].timestamp+'">'+moment(data[i].timestamp).fromNow(true)+'</div>');
  $el.append('<div class="message">'+data[i].message+'</div>');

}
moment.locale('en-my-settings', {
    relativeTime : {
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

    getData();
});
