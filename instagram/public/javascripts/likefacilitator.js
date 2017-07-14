$('.fa-heart-o').click(
  function(event){
    let clickVal = event.target.getAttribute('clicked');
    heartSwitch(event.target.getAttribute('clicked'));
    event.target.setAttribute('clicked',clickedValidator(clickVal));

    // event.target.setAttribute('count',keepCount(event.target.getAttribute('clicked'),countVal))
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

function heartSwitch(currentBool){

    if( currentBool == 'true'){
      event.target.setAttribute('class','fa fa-heart-o on')
    }
    else{
      event.target.setAttribute('class','fa fa-heart-o')
    }
}

