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
const eventInfoSelector = document.querySelector('#eventInfo');

function createLocalEventCard(events) {
    const localEventsSelector = document.querySelector('#localEvents');

    events.forEach(event => {
        const eventInfo = {
            "name": event.name,
            "venue": event.location,
            "date": event.date,
            "priceRange": `$${event.fee}`
        }

        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'event-card rounded-border');
        newEvent.innerHTML = `
            <h3>${eventInfo.name}</h3>
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
        const eventInfo = {
            "name": event.name,
            "venue": event._embedded.venues[0].name,
            "date": event.dates.start.localDate,
            "priceRange": `$${event.priceRanges[0].min}-$${event.priceRanges[0].max}`
        }

        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'event-card rounded-border');
        newEvent.innerHTML = `
            <h3>${eventInfo.name}</h3>
            <p>Click for more details</p>
        `;

        newEvent.addEventListener('click', () => {
            displayEventInfo(eventInfo);
        });

        atlantaEventsSelector.appendChild(newEvent); 
    });
}

function displayEventInfo(eventInfo) {
    eventInfoSelector.innerHTML = `
        <button id="closeModal">X</button>
        <h4>${eventInfo.name}</h4>
        <p><strong>Venue:</strong> ${eventInfo.venue}</p>
        <p><strong>Date:</strong> ${eventInfo.date}</p>
        <p><strong>Fee:</strong> ${eventInfo.priceRange}</p>
    `;

    eventInfoSelector.showModal();

    document.querySelector('#closeModal').addEventListener('click', () => {
        eventInfoSelector.close();
    });
}

async function fetchLocalEventData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const events = data.localEvents;
        createLocalEventCard(events);
    } catch (e) {
        console.error(e);
    }
}

async function fetchAtlantaEventData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const events = data._embedded.events;
        createAtlantaEventCard(events);
    } catch (e) {
        console.error(e);
    }
}

if (newsAndEventsSelector) {
    // Create and display local event cards
    const localUrl = 'https://eworsham.github.io/wdd231/project/data/events.json'; //FIXME
    fetchLocalEventData(localUrl);
    
    
    // Create and display Atlanta event cards
    const atlantaUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=3&city=Atlanta&apikey=SYT8UN9ZN1ayqnA94BwPsxEFcwA0veU1'
    fetchAtlantaEventData(atlantaUrl);
}

/**************************************************** 
*
*           Thank You page
*
****************************************************/

const urlData = window.location.href;
const thankYouSelector = document.querySelector('#thankYou')
const thanksData = document.createElement('div');

if (thankYouSelector) {
    const infoArray = urlData.split('?')[1].split('&');

    function show(field) {
        infoArray.forEach(element => {
            if (element.startsWith(field)) {
                result = element.split('=')[1];
                result = result.replaceAll('%40', '@');
                result = result.replaceAll('+', ' ');
            }
        });
        return result
    }

    thanksData.innerHTML = `
        <p><span class="thank-you-label">First Name: </span>${show("firstName")}</p>
        <p><span class="thank-you-label">Last Name: </span>${show("lastName")}</p>
        <p><span class="thank-you-label">Email: </span>${show("email")}</p>
    `;

    thankYouSelector.appendChild(thanksData);
}
