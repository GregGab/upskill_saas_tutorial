/* global $, Stripe */
//Document ready.

$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name:="stripe-key"]').attr('content') );
  
  //When user clicks form submit btn.
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    
    //Collect the credit cards fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#Card_year').val();
    
    //Send the card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc : cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler)
  });
  
  
  //Collect the credit cards fields.
  //Send the card info to Stripe.
  //Stripe will return a card token.
  //Inject card token as hidden field into form.
  //Submit forms to our rails app.   
});
