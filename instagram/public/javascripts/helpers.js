$('#targ').hide();
$('#search-input').focus(function(){
  var hey = $(".fa-search");
  hey.hide();
})
$('#search-input').blur(function(){
  var hey = $(".fa-search");
  hey.show();
})

function commentboxshow(){
  $('#targ').show();
}
$("#textarea").focus(function(){
  var text = $("#textarea").val("");
})
