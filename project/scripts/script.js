/**************************************************** 
*
*           Common for all pages
*
****************************************************/

// Populate Current Year and Last Modified Date
const currentYearSelector = document.querySelector('#currentYear');
const lastModifiedSelector = document.querySelector('#lastModified');

const today = new Date();

currentYearSelector.textContent = today.getFullYear();
lastModifiedSelector.textContent = `Last Modified: ${document.lastModified}`;

// Navigation for mobile view
const menuButtonSelector = document.querySelector('#menu');
const animatedMenuSelector = document.querySelector('#animatedMenu');

menuButtonSelector.addEventListener('click', () => {
    menuButtonSelector.classList.toggle('open');
    animatedMenuSelector.classList.toggle('open');
});






// Messing around with ticketmaster api
const atlantaEventsSelector = document.querySelector('#atlantaEvents');
const url = 'https://app.ticketmaster.com/discovery/v2/events.json?size=3&city=Atlanta&apikey=SYT8UN9ZN1ayqnA94BwPsxEFcwA0veU1'

async function getEvents(url) {
    const response = await fetch(url);
    const data = await response.json();

    const events = data._embedded.events;
    console.log(events);

    events.forEach(event => {
        const name = event.name;
        const venue = event._embedded.venues[0].name
        const date = event.dates.start.localDate;
        const priceLow = event.priceRanges[0].min;
        const priceHigh = event.priceRanges[0].max;

        console.log(`
            Event Name: ${name},
            Event Date: ${date},
            Event Location: ${venue},
            Event Fee: $${priceLow}-$${priceHigh}
        `);

        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'event shadow rounded-border');
        newEvent.innerHTML = `
            <p>Event Name: ${name}</p>
            <p>Event Date: ${date}</p>
            <p>Event Location: ${venue}</p>
            <p>Event Fee: $${priceLow}-$${priceHigh}</p>
        `;

        atlantaEventsSelector.appendChild(newEvent);
    });
}

getEvents(url);