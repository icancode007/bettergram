function clearfunc(){


  console.log(hey);
}

$('#search-input').focus(function(){
  var hey = $(".fa-search");
  hey.hide();
})
$('#search-input').blur(function(){
  var hey = $(".fa-search");
  hey.show();
})
