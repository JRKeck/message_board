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

function writeToDisplay(data){
    $('.display').empty();
    $.each(data, function(){
        console.log(this.name);
        $('.display').append('<div class="card"></div>');
        var $el = $('.display .card').last();
        $el.append('<div class="name">'+this.name+'</div>');
        $el.append('<div class="time">'+moment(this.timestamp).fromNow(true)+'</div>');
        $el.append('<div class="message">'+this.message+'</div>');
        $el.append('<button data-id="'+this._id+'" class="remove-card">Remove</button>');
    })
}

