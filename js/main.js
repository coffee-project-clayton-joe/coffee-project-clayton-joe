"use strict"

function renderCoffee(coffee) {
    let html = '<div style="height: 60px" class="coffee-block d-flex p-2 me-5 w-100">';
    html += '<div class="d-flex flex-fill">'
    html += '<h2 class="p-0 pe-2 m-0 text-capitalize">' + coffee.name + '</h2>';
    html += '<p class="p-0 m-0 text-secondary">' + coffee.roast + '</p>';
    html += '</div>';
    html += '<div id="remove-btn-div" class="align-items-center"><button id="remove-btn" style="width: 20px; height: 20px" type="button" class="btn btn-warning p-0 m-0 d-flex justify-content-center align-items-center">x</button></div>'
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    coffees.sort((a, b) => (a.id > b.id) ? 1 : -1);
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        if(coffees[i].display === true) {
            html += renderCoffee(coffees[i]);
        }
    }
    return html;
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = getCoffees();

function getCoffees() {
    return JSON.parse(localStorage.getItem('coffees')) ||
    [{id: 1, name: 'Light City', roast: 'light', display: true},
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
}

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
        localStorage.setItem("coffees", JSON.stringify(coffees));
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
    .addEventListener("keyup", () => {
        let coffeeName = document.querySelector('#coffee-name').value;
        coffees.forEach((coffee) => {
            coffee.display = coffee.name.toLowerCase().includes(coffeeName.toLowerCase());
        });
        main_content.innerHTML = renderCoffees(coffees);
    });

document.querySelector("#restore-btn")
    .addEventListener("click", () => {
        localStorage.removeItem("coffees");
        coffees = getCoffees();
        main_content.innerHTML = renderCoffees(coffees);
    });