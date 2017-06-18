$('.targ').hide();
// $(document).ready(function(){
//   $('.image-comment').keypress(function(e){
//     if(e.which == 13){
//       $('form').submit();
//     }
//   })
// })
$('#search-input').focus(function(){
  var hey = $(".fa-search");
  hey.hide();
})
$('#search-input').blur(function(){
  var hey = $(".fa-search");
  hey.show();
})

function commentboxshow(){
  $('.targ').toggle();
}
$("#textarea").focus(function(){
  var text = $("#textarea").val("");
})



