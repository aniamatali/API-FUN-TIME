var apiKey = require('./../.env').apiKey;
var apiKey2 = require('./../.env').apiKey2;

let capitals = ["seattle", "portland", "new york", "wichita", "austin", "baltimore", "augusta", "atlanta", "raleigh", "chicago", "sacramento", "tampa", "albany"];
let capitals2 = [];

// capitals.forEach(function(string){
//   string = string.toUpperCase();
//   capitals2 = capitals2.sort();
//   capitals2.push(string);
// });

$(document).ready(function() {
  $('#submit').click(function() {
    let city = $('#address').val();
    $('#address').val("");

    capitals2.push(city);

    let promise = new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      console.log(response);
      response = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.showSpeed').text(`The speed in miles is ${response.wind.speed} mph.`);
      $('.showClouds').text(`The cloud coverage is ${response.clouds.all} %`);
    },function(error) {
      $('.showErrors').text(`There was an error processing ${error.message}`);
    });
  });
});


//BIG CITIES ALPHALIST
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

//GIF SEARCH
$(document).ready(function() {
  $('#getGif').click(function() {
    let gifSearch = $('#gifSearch').val();
    $('#gifSearch').val("");

    let request = new XMLHttpRequest();
    let url = `http://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${apiKey2}&limit=20&rating=g`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
        console.log(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      response.data.forEach(function(image) {
        $('.gif1').prepend("<div class='col-md-4'><img class='crop' src="+image.images.downsized.url+"></div>")
      })
    };
  });
});

//GIF SEARCH RANDOM
$(document).ready(function() {
  $('#getRand').click(function() {
    let gifSearch = $('#gifSearch').val();
    $('#gifSearch').val("");

    let request = new XMLHttpRequest();
    let url = `http://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${apiKey2}&limit=20&rating=R`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      let randomResponse = response.data[Math.floor(Math.random()*response.data.length)];
      $('.randResult').prepend("<div class='col-md-12'><img class='crop' src="+randomResponse.images.downsized.url+"></div>")
    };
  });
});

//BASIC FLASHCARD TEST
$(document).ready(function() {

  let score = 0;

  $(".intervaltest").click(function(){
    setInterval(function(){
      score += 100;
      $("#yourscore").text(score);
    }, 1000);
  });

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
