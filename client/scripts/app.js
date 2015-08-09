var currentTime = moment().format();

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
            getData();
        }
    });
  });

  getData();
});

function getData(){
    $.ajax({
        type:"GET",
        url: "/messenger",
        success: function(data){
            writeToDom(data);
        }
    })
}

function writeToDom(data){
    $('.display').empty();
    for (var i = 0; i < data.length; i++) {
        $('.display').prepend('<div class="card"></div>');
        var $el = $('.display .card').first();
        $el.append('<div class="name">'+data[i].name+'</div>');
        $el.append('<div class="time">'+moment(data[i].timestamp).fromNow(true)+'</div>');
        $el.append('<div class="message">'+data[i].message+'</div>');
        $el.hide().delay(i*100).slideDown();

    };

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
