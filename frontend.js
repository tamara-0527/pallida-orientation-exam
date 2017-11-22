'use strict';

let ulElement = document.querySelector('ul');
let tableElement = document.querySelector('tbody');
let buttonForSearching = document.getElementById('submit');
let inputTheString = document.getElementById('searching');
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
  console.log(searchedElement)
  ajax('GET', 'http://localhost:8080/search?plate=' + searchedElement, listDetails)
  if (inputTheString === '') {
      alert('Fill the input field!');
  } else if (inputTheString === 'police') {
      listDetails();
  }
}

function listDetails(arr) {
    let table = document.querySelector(".szia");
    table.innerHTML = ""
    arr.forEach(function(element) {
      let listData = document.createElement("tr");
      listData.innerHTML = '<td>' + element.plate +
                         '</td><td>' + element.car_brand +
                         '</td><td>' + element.car_model +
                         '</td><td>' + element.color +
                         '</td><td>' + element.year +
                         '</td>';
        table.appendChild(listData);
    });
};

function listByFilter(res) {
    res.forEach(function(elements) {
        const listedData = '<li>' + elements.car_brand + '</li>';
        ulElement.innerHTML += listedData;
    });
};;

