$('.targ').hide();
$(".smallLogout").hide()

$('#search-input').focus(function(){
  var hey = $(".fa-search");
  hey.hide();
})
$('#search-input').blur(function(){
  var hey = $(".fa-search");
  hey.show();
})

$('.btn-comment').click(
 function(event){
  var selector = event.target.classList[event.target.classList.length-1];
  $('.'+selector).toggle();
  $('.fa.fa-comment-o').show()
  }
)
$("#textarea").focus(function(){
  var text = $("#textarea").val("");
})
$('.userlink').mouseenter(
  function() {
    $(".smallLogout").show()
    setTimeout(function() {
      $(".smallLogout").hide()      
    }, 2000);
  }
);
$('.userlink').click(
  function() {
    $(".smallLogout").hide()
  }
);
// $(document).ready(function(){
//   $('.image-comment').keypress(function(e){
//     if(e.which == 13){
//       $('form').submit();
//     }
//   })
// })


//html
//  <div class="sepia"> 
//         <i class="fa fa-heart-o" aria-hidden="true" count='1' clicked='false'>
          
//         </i>
//     </div>
//css
// .on{
//   color: red;
// }
//js

// $('.fa-heart-o').click(
//   function(event){
//     let clickVal = event.target.getAttribute('clicked');
//     let countVal = event.target.getAttribute('count')
//     event.target.setAttribute('clicked',clickedValidator(clickVal));
//     heartSwitch(event.target.getAttribute('clicked'));
//     event.target.setAttribute('count',keepCount(event.target.getAttribute('clicked'),countVal))
// })

//  function clickedValidator(currentBool){
//   //properties of html tags can only be strings
//   if(currentBool== 'false'){
//     currentBool = 'true';
//   }else {
//     currentBool= 'false';
//   }
//   console.log('from clickedValidator check', currentBool)
//   return(currentBool)
// }
// function keepCount(clickVal,currentCount){
//   if(clickVal=='true'){
//     currentCount = parseInt(currentCount) + 1;
//   }
//   else if(clickVal == 'false' && currentCount > 0){
//     currentCount = currentCount - 1;
//   }
//   else{
//     console.log('no decresing')
//   }
//   return(currentCount);
// }
// function heartSwitch(currentBool){

//     if( currentBool == 'true'){
//       event.target.setAttribute('class','fa fa-heart-o on')
//     }
//     else{
//       event.target.setAttribute('class','fa fa-heart-o')
//     }
// }