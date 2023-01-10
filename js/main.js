"use strict"

function renderCoffee(coffee) {
    let html = '<div class="d-flex me-5">';
    html += '<h2 class="me-2 text-capitalize">' + coffee.name + '</h2>';
    html += '<p class="text-secondary">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        if(coffees[i].display === true) {
            html += renderCoffee(coffees[i]);
        }
    }
    return html;
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [{id: 1, name: 'Light City', roast: 'light', display: true},
    {id: 2, name: 'Half City', roast: 'light', display: true},
    {id: 3, name: 'Cinnamon', roast: 'light', display: true},
    {id: 4, name: 'City', roast: 'medium', display: true},
    {id: 5, name: 'American', roast: 'medium', display: true},
    {id: 6, name: 'Breakfast', roast: 'medium', display: true},
    {id: 7, name: 'High', roast: 'dark', display: true},
    {id: 8, name: 'Continental', roast: 'dark', display: true},
    {id: 9, name: 'New Orleans', roast: 'dark', display: true},
    {id: 10, name: 'European', roast: 'dark', display: true},
    {id: 11, name: 'Espresso', roast: 'dark', display: true},
    {id: 12, name: 'Viennese', roast: 'dark', display: true},
    {id: 13, name: 'Italian', roast: 'dark', display: true},
    {id: 14, name: 'French', roast: 'dark', display: true},
];

document.querySelector('#submit-add')
    .addEventListener('click', (event) => {
        event.preventDefault();
        let newCoffee = {
            id: coffees.length+1,
            name: document.querySelector('#coffee-name-2').value.trim().toLowerCase(),
            roast: document.querySelector("#roast-add").value,
            display: true
        };
        coffees.push(newCoffee);
        main_content.innerHTML = renderCoffees(coffees);
    });

let main_content = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');
main_content.innerHTML = renderCoffees(coffees);

document.querySelector("#roast-selection")
    .addEventListener("change", () => {
        roastSelection = document.querySelector('#roast-selection');
        coffees.forEach((coffee) => {
            coffee.display = coffee.roast === roastSelection.value || roastSelection.value === "all";
        });
        main_content.innerHTML = renderCoffees(coffees);
    });

document.querySelector("#coffee-name")
    .addEventListener("change", () => {
        let coffeeName = document.querySelector('#coffee-name').value;
        coffees.forEach((coffee) => {
            coffee.display = coffee.name.toLowerCase().includes(coffeeName.toLowerCase());
        });
        main_content.innerHTML = renderCoffees(coffees);
    });

