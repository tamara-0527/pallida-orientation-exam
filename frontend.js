'use strict';

let url = "http://localhost:8080";
let ulElement = document.querySelector('ul');
let tableElement = document.querySelector('tbody');

function ajax (command, endpoint, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(command, url + endpoint);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  console.log(xhr.responseText);
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send();
};

function createList(response) {
  response.books.forEach(function(element) {
        const listItems = '<li>' + element.brand + '</li>';
        ulElement.innerHTML += listItems;
    });
};


function listDetails(response) {
    response.licence_plates.forEach(function(element) {
        const listData = '<tr><td>' + element.plate +
                         '</td><td>' + element.car_brand+
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

ajax('GET', '/search', listByFilter);