$(document).ready(function() {
  $('.display').on('click', '.remove-card', function(){
        var $el = $(this);
        $.ajax({
            type: "DELETE",
            url: "/messenger/" + $el.data("id"),
            success: function(){
                console.log("Deleting");
                $el.parent().parent().remove();
                //deleting will mess up the index so reset it
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
  $('.display').prepend('<div class="card col-xs-12"></div>');
  $('.display .card').first().append('<div class="content"></div>')
  var $el = $('.display .content').first();
  $el.append('<img src="/assets/imgs/blank_user.jpg" alt="user avatar" class="avatar">');
  $el.append('<div class="name">'+data[i].name+'</div>');
  $el.append('<div class="time" data-timestamp="'+data[i].timestamp+'">'+moment(data[i].timestamp).fromNow()+'</div>');
  $el.append('<div class="message">'+data[i].message+'</div>');
  $el.append('<button data-id="'+data[i]._id+'" class="remove-card"><i class="fa fa-trash-o"></i></button>');
  testObjId = data[i]._id;
  testObjIndex = i;
}
