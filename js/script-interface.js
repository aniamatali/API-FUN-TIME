var apiKey = require('./../.env').apiKey;
var apiKey2 = require('./../.env').apiKey2;

let capitals = ["seattle", "portland", "new york", "wichita", "austin", "baltimore", "augusta", "atlanta", "raleigh", "chicago", "sacramento", "tampa", "albany"];
let capitals2 = [];

capitals.forEach(function(string){
  string = string.toUpperCase();
  capitals2 = capitals2.sort();
  capitals2.push(string);
});



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
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.showSpeed').text(`The speed in miles is ${response.wind.speed} mph.`);
      $('.showClouds').text(`The cloud coverage is ${response.clouds.all} %`);
    };
  });
});

$(document).ready(function(){
  const capitals3 = [];
  $('#majorCities').click(function() {
    capitals2.forEach(function(city) {

      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          getElements(response);
        }
      };
      request.open("GET", url, true);
      request.send();

      const getElements = function(response) {
        capitals3.push(city+" "+response.main.humidity);

    };
  });
  capitals3.sort();
  capitals3.forEach(function(element) {
    $('.city1').append("<li>"+element+"%</li>");
  });
});
});

$(document).ready(function() {
  $('#getGif').click(function() {
    let gifSearch = $('#gifSearch').val();
    $('#gifSearch').val("");

    let request = new XMLHttpRequest();
    let url = `http://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${apiKey2}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      console.log(response.data);
      response.data.forEach(function(image) {
        $('.gif1').append("<img src="+image.images.downsized.url+" height=200px>")
      })
      // $('.gif1').append("<img src="+response.data.images.fixed_height_still.url+">")
    };
    });
  });
