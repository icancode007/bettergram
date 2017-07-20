$('.like-btn').click(
  function(event){
    let newVal = clickedValidator(event.target.getAttribute('clicked'))
    event.target.setAttribute('clicked',newVal)

})

 function clickedValidator(currentBool){
  //properties of html tags can only be strings
  if(currentBool== 'false'){
    currentBool = 'true';
  }else {
    currentBool= 'false';
  }
  console.log('from clickedValidator check', currentBool)
  return(currentBool)
}


