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
  $('.display').on('click', '.remove-card', function(){
        $.ajax({
            type: "DELETE",
            url: "/messenger/" + $(this).data("id"),
            success: function(){
                console.log("Deleting");

            },
            error: function(xhr, status){
                alert("Error: ", status);
            },
            complete: function(){
                console.log("Delete Complete")
            }
        });
      $(this).parent().remove();
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
    $.each(data, function(){
        console.log(this.name);
        $('.display').append('<div class="card"></div>');
        var $el = $('.display .card').last();
        $el.append('<div class="name">'+this.name+'</div>');
        $el.append('<div class="message">'+this.message+'</div>');
        $el.append('<button data-id="'+this._id+'" class="remove-card">Remove</button>');

    })
}
