"use strict"

function renderCoffee(coffee) {
    var html = '';
    if (coffee.roast === "light") {
        html = '<div class="coffee roast-light">';
        html += '<h2>' + coffee.name + '</h2>';
        html += '<p class="badge rounded-pill bg-dark">' + coffee.roast + '</p>';
        html += '<button type="button" class="btn remove-btn btn-danger">X</button>'
        html += '</div>';
    } else if (coffee.roast === "medium") {
        html = '<div class="coffee roast-medium">';
        html += '<h2>' + coffee.name + '</h2>';
        html += '<p class="badge rounded-pill bg-dark">' + coffee.roast + '</p>';
        html += '<button type="button" class="btn remove-btn btn-danger">X</button>'
        html += '</div>';
    } else if (coffee.roast === "dark") {
        html = '<div class="coffee roast-dark">';
        html += '<h2>' + coffee.name + '</h2>';
        html += '<p class="badge rounded-pill bg-dark">' + coffee.roast + '</p>';
        html += '<button type="button" class="btn remove-btn btn-danger">X</button>'
        html += '</div>';
    }

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    COFFEE_DISPLAY.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const COFFEE_DISPLAY = document.querySelector('#coffees');
//var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

COFFEE_DISPLAY.innerHTML = renderCoffees(coffees);

//submitButton.addEventListener('click', updateCoffees);
