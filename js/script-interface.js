var apiKey = require('./../.env').apiKey;


$(document).ready(function() {

  let score = 0;

  setTimeout(function(){
  $(".question1").hide();
  $(".question2").show();
  $(".buttons").show();
  }, 5000);

  setTimeout(function(){
  $(".question2").hide();
  $(".question3").show();
  $(".buttons").show();
  }, 10000);

  setTimeout(function(){
  $(".question3").hide();
  $(".score").show();
  $("#yourscore").text(score);
  }, 15000);

  $(".correct").click(function(){
    score += 1;
    $(".buttons").hide();
  });

  $(".wrong").click(function(){
    score -= 1;
    $(".buttons").hide();
  });
});

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.showSpeed').text(`The speed in miles is ${response.wind.speed} mph.`);
    }
  });
});
