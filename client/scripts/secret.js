$(document).ready(function() {
  $('.display').on('click', '.remove-card', function(){
        var $el = $(this);
        $.ajax({
            type: "DELETE",
            url: "/messenger/" + $el.data("id"),
            success: function(){
                console.log("Deleting");
                $el.parent().remove();

            },
            error: function(xhr, status){
                alert("Error: ", status);
            },
            complete: function(){
                console.log("Delete Complete")
            }
        });
    });
});

function writeCard(data, i) {
  $('.display').prepend('<div class="card"></div>');
  var $el = $('.display .card').first();
  $el.append('<div class="name">'+data[i].name+'</div>');
  $el.append('<div class="time" data-timestamp="'+data[i].timestamp+'">'+moment(data[i].timestamp).fromNow(true)+'</div>');
  $el.append('<div class="message">'+data[i].message+'</div>');
  $el.append('<button data-id="'+data[i]._id+'" class="remove-card">Remove</button>');

}
