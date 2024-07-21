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

/**************************************************** 
*
*           News and Events page
*
****************************************************/
const newsAndEventsSelector = document.querySelector('.news-and-events');

function createLocalEventCard(events) {
    const localEventsSelector = document.querySelector('#localEvents');

    events.forEach(event => {
        const name = event.name;
        const eventInfo = {
            "venue": event.location,
            "date": event.date,
            "priceRange": `$${event.fee}`
        }

        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'event-card rounded-border');
        newEvent.innerHTML = `
            <h3>${name}</h3>
            <p>Click for more details</p>
        `;

        newEvent.addEventListener('click', () => {
            displayEventInfo(eventInfo);
        });

        localEventsSelector.appendChild(newEvent);
    });
}

function createAtlantaEventCard(events) {
    const atlantaEventsSelector = document.querySelector('#atlantaEvents');

    events.forEach(event => {
        const name = event.name;
        const eventInfo = {
            "venue": event._embedded.venues[0].name,
            "date": event.dates.start.localDate,
            "priceRange": `$${event.priceRanges[0].min}-$${event.priceRanges[0].max}`
        }

        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'event-card rounded-border');
        newEvent.innerHTML = `
            <h3>${name}</h3>
            <p>Click for more details</p>
        `;

        newEvent.addEventListener('click', () => {
            displayEventInfo(eventInfo);
        });

        atlantaEventsSelector.appendChild(newEvent); 
    });
}

function displayEventInfo(eventInfo) {
    console.log(eventInfo); //FIXME
}

async function fetchLocalEventData(url) {
    const response = await fetch(url);
    const data = await response.json();
    const events = data.localEvents;
    createLocalEventCard(events);
}

async function fetchAtlantaEventData(url) {
    const response = await fetch(url);
    const data = await response.json();
    const events = data._embedded.events;
    createAtlantaEventCard(events);
}

if (newsAndEventsSelector) {
    // Create and display local event cards
    const localUrl = 'https://eworsham.github.io/wdd231/project/data/events.json'; //FIXME
    fetchLocalEventData(localUrl);
    
    
    // Create and display Atlanta event cards
    const atlantaUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=3&city=Atlanta&apikey=SYT8UN9ZN1ayqnA94BwPsxEFcwA0veU1'
    fetchAtlantaEventData(atlantaUrl);
}
