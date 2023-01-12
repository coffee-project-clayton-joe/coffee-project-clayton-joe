"use strict"

function renderCoffee(coffee) {
    let html = '<div style="height: 60px" class="coffee-block d-flex p-2 me-5 w-100">';
    html += '<div class="d-flex flex-fill">'
    html += '<h2 class="p-0 pe-2 m-0 text-capitalize">' + coffee.name + '</h2>';
    html += '<p class="p-0 m-0 text-secondary">' + coffee.roast + '</p>';
    html += '</div>';
    html += '<div class="align-items-center remove-btn-div">'
    html += '<button class="btn btn-warning p-0 m-0 d-flex justify-content-center align-items-center remove-btn" onclick="remove(event)" db-id="' + coffee.id + '" type="button">x</button>'
    html += '</div></div>';

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

const MAIN_CONTENT = document.querySelector('#coffees');
const ROAST_SELECTION = document.querySelector('#roast-selection');
const COFFEE_NAME = document.querySelector('#coffee-name');
const ROAST_ADD_SELECTION = document.querySelector('#roast-add-selection');
const COFFEE_ADD_NAME = document.querySelector('#coffee-name-2');

MAIN_CONTENT.innerHTML = renderCoffees(coffees);

function remove(event) {
    let dbId = event.target.getAttribute('db-id');
    coffees.splice(coffees.indexOf(coffees.find(coffee => coffee.id === parseInt(dbId))), 1)
    localStorage.setItem("coffees", JSON.stringify(coffees));
    MAIN_CONTENT.innerHTML = renderCoffees(coffees);
}

function add() {
    return (event) => {
        event.preventDefault();
        let newCoffee = {
            id: coffees[coffees.length - 1].id + 1,
            name: COFFEE_ADD_NAME.value.trim().toLowerCase(),
            roast: ROAST_ADD_SELECTION.value,
            display: true
        };

        //if filter returns 0 matches then this is a new coffee, therefore add it
        if (coffees.filter(coffee => coffee.name === newCoffee.name && coffee.roast === newCoffee.roast).length === 0) {
            // safe to add
            coffees.push(newCoffee);
            localStorage.setItem("coffees", JSON.stringify(coffees));
            ROAST_ADD_SELECTION.value = 'light';
            COFFEE_ADD_NAME.value = '';
            MAIN_CONTENT.innerHTML = renderCoffees(coffees);
        }
    };
}

ROAST_SELECTION.addEventListener("change", () => {
    coffees.forEach((coffee) => {
        coffee.display = COFFEE_NAME.value.length === 0 ?
            ROAST_SELECTION.value === 'all' || coffee.roast === ROAST_SELECTION.value :
            coffee.name.toLowerCase().includes(COFFEE_NAME.value.toLowerCase()) &&
                (ROAST_SELECTION.value === 'all' || coffee.roast === ROAST_SELECTION.value);
    });
    MAIN_CONTENT.innerHTML = renderCoffees(coffees);
});

COFFEE_NAME.addEventListener("keyup", () => {
    coffees.forEach((coffee) => {
        coffee.display =
            coffee.name.toLowerCase().includes(COFFEE_NAME.value.toLowerCase()) &&
                (ROAST_SELECTION.value === 'all' || coffee.roast === ROAST_SELECTION.value);
    });
    MAIN_CONTENT.innerHTML = renderCoffees(coffees);
});

document.querySelector('#submit-add')
    .addEventListener('click', add());

document.querySelector("#restore-btn")
    .addEventListener("click", () => {
        localStorage.removeItem("coffees");
        coffees = getCoffees();
        MAIN_CONTENT.innerHTML = renderCoffees(coffees);
    });
