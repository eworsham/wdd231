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
*           Home Page only
*
****************************************************/



/**************************************************** 
*
*           Directory Page only
*
****************************************************/

// Fetch company data
const url = 'https://eworsham.github.io/wdd231/chamber/data/members.json'

async function getCompanyCards(url) {

}

/**************************************************** 
*
*           Join Page only
*
****************************************************/



/**************************************************** 
*
*           Discover Page only
*
****************************************************/