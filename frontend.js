'use strict';

let ulElement = document.querySelector('ul');
let tableElement = document.querySelector('tbody');
const buttonForSearching = document.createElement('button');
const inputTheString = document.createElement('input');

function ajax (command, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(command, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  console.log(xhr.responseText);
    callback(JSON.parse(xhr.responseText));
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

function listDetails(response) {
    response.licence_plates.forEach(function(element) {
        const listData = '<tr><td>' + element.plate +
                         '</td><td>' + element.car_brand +
                         '</td><td>' + element.car_model +
                         '</td><td>' + element.color +
                         '</td><td>' + element.year +
                         '</td></tr>';
        tableElement.innerHTML += listData;
    });
};


function listByFilter(response) {
    response.forEach(function(elements) {
        const listedData = '<li>' + elements.car_brand + '</li>';
        ulElement.innerHTML += listedData;
    });
};;

ajax('GET', 'http://localhost:8080/search', appendResults);
// ajax('GET', '/search/:brand', listByFilter);