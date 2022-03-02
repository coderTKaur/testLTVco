$(document).ready(function () {
  /*
    hide loader on page load
  */
  $('#wait').hide();
  $('#phone').hide();
  $('input[type="text"]').val("");
  localStorage.setItem('searchQuery', 'email');

  /*
    fn to select email as default search
  */
  $('#search-by-eml').addClass('search-type-active');
  modifyInput()
  
  /*
    toggle fn to switch selection btw email/phone
  */
  $('.search-type-eml').on('click', function(e){
    modifyErrorHtml('remove');
    modifyInput()
    $('input[type="text"]').val("");
    $('.search-type-eml').toggleClass("search-type-active");
    if(e.target.valueOf().id.includes('phn')){
      localStorage.setItem('searchQuery', 'phone');
      modifyInput()
    } else {
      localStorage.setItem('searchQuery', 'email');
      modifyInput()
    }
  })
  
  /* 
    add class to Go button on hover
  */
  $("#btn-search").hover(function () {
    $(this).toggleClass("btn-search-hover");
  });

  /* 
    add/remove error messages based on validations
  */
  function modifyErrorHtml(param){
    const {searchQuery} = localStorage;

    switch(param){
      case 'add': {
        let errorText = ''
        if(searchQuery === 'email') {
          errorText= "Please enter a valid email address";
        } else {
          errorText= "Please enter a valid phone number";
        }
        document.querySelector('input[type="text"]').parentNode.classList.add("error")
        $(".error-msg").text(errorText);
        break;
      }
      case 'remove': {
        document.querySelector('input[type="text"]').parentNode.classList.remove("error")
        break;  
      }
      default: break;
    }
  }

  /* 
    toggle between email/phone number on the basis of user selection
  */
  function modifyInput(){
    const {searchQuery} = localStorage;
    $('input[type="text"]').attr("id", searchQuery);

    if(searchQuery === 'phone') {
      $('input[type="text"]').attr("placeholder", "Enter a Phone number");
    } else{
      $('input[type="text"]').attr("placeholder", "Enter an email address");
    }
  }

  /* 
    validate email/phone values entered
    check it follows the rules
  */
  function checkRegex(searchQuery, query){
    var x;
    regEx = searchQuery === 'email'
    ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    : /^[0-9]{10}$/;
    if (query.match(regEx)) {
      x = true;
    } else {
      x = false;
    }
    return x;
  }

  /* 
    function to make API request
    create query on the basis of email/phone and input value added
    hides container other than loader
    show loader while awaiting API response
  */
  function createQuery(searchQuery, query){
    modifyErrorHtml('remove');
    const proxyurl = "";
    // alert(`https://ltv-data-api.herokuapp.com/api/v1/records.json?${searchQuery}=` + query)
    const url =
      `https://ltv-data-api.herokuapp.com/api/v1/records.json?${searchQuery}=` + query;
    $('.above-the-fold').hide();
    $('.features').hide();
    $('.result').hide();
    $('.search-again').hide();
    $('#wait').show();
    
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        $('#wait').hide();
        localStorage.setItem("userObject", contents);
        window.location.href = "result.html";
      })
      .catch((e) => console.log(e));
  }

  /* 
    triggered when Go button is clicked
    add disable property to button while awaiting API response
  */
  $("#btn-search").on("click", function (e) {
    $("#btn-search").addClass("active disabled");
    e.preventDefault();
    const {searchQuery} = localStorage;
    const query= $('input[type="text"]').val().toLowerCase();
    localStorage.clear(); //Clears storage for next request
    localStorage.setItem('searchQuery', searchQuery); // storing searchQuery again
    modifyInput()
    x = checkRegex(searchQuery, query)
      if (x) {
        createQuery(searchQuery, query)
      } else {
        modifyErrorHtml('add')
        $("#btn-search").removeClass("active disabled");
      }
  });

  /* 
    triggered on keypress evt
  */
  $('input[type="text"]').keypress(function (event) {
    const query = $('input[type="text"]').val().toLowerCase();
    const {searchQuery} = localStorage;
    x = checkRegex(searchQuery, query);

    if (x) {modifyErrorHtml('remove')}
    
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      if (x) {
        createQuery(searchQuery, query)
      } else {modifyErrorHtml('add')}
    }
  });
});
