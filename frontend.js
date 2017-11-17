'use strict';

let ulElement = document.querySelector('ul');
let tableElement = document.querySelector('tbody');
let buttonForSearching = document.getElementById('searching');
let inputTheString = document.getElementsByTagName('input');
buttonForSearching.addEventListener('click', ListTheResult);

function ajax (command, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(command, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  console.log(xhr.responseText);
    var data = JSON.parse(xhr.responseText);
    callback(data);
  };
  xhr.send();
};

function appendResults(element) {
  let findTheResult = document.createElement('p');
  findTheResult.innerText = element.car_brand;
  document.body.appendChild(findTheResult); 
}

function handleQueryResult(findTheResult) {
  findTheResult.forEach(function(element) {
    appendResults(element);
  });
};

function ListTheResult() {
  console.log('click event');
  var searchedElement = inputTheString.value;
  if (inputTheString === '') {
      alert('Fill the input field!');
  } else if (inputTheString === 'police') {
      listDetails();
  }
}

function listDetails(res) {
    res.plates.forEach(function(element) {
        const listData = '<tr><td>' + element.plate +
                         '</td><td>' + element.car_brand +
                         '</td><td>' + element.car_model +
                         '</td><td>' + element.color +
                         '</td><td>' + element.year +
                         '</td></tr>';
        tableElement.innerHTML += listData;
    });
};

function listByFilter(res) {
    res.forEach(function(elements) {
        const listedData = '<li>' + elements.car_brand + '</li>';
        ulElement.innerHTML += listedData;
    });
};;

ajax('GET', 'http://localhost:8080/search', appendResults);
ajax('GET', '/search/:brand', ListTheResult);