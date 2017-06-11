$('#targ').hide();
// $('.form-areatwo').hide();
// $('.form-areathree').hide();

$('#search-input').focus(function(){
  var hey = $(".fa-search");
  hey.hide();
})
$('#search-input').blur(function(){
  var hey = $(".fa-search");
  hey.show();
})

function commentboxshow(){
  $('#targ').toggle();
}
$("#textarea").focus(function(){
  var text = $("#textarea").val("");
})

function formchanger(){
  // let formsignup = $(".form-area");
  // formsignup.hide();
  // $(".form-areatwo").show();
  // $(".form-areathree").show();
}
