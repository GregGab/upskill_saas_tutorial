/* global $, Stripe */
//Document ready.

$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit btn.
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("processing").prop('disabled', true);
    
    //Collect the credit cards fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#Card_year').val();
        
    //Use Stripe JS library to check card errors.
    var error = false;
    
    //validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    //validate card code.
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC appears to be invalid');
    }
    
    //validate expiration date.
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
      //If there are card errors, dont send to stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
  
    return false;
  });
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    // Get the token from the response
    var token = response.id;
    
    //Inject card token as hidden field into form.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit forms to our rails app.
    theForm.get(0).sumbit();
  }
});

