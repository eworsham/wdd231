// Selectors
const currentYearSelector = document.querySelector('#currentYear');
const lastModifiedSelector = document.querySelector("#lastModified");

const today = new Date();

// Year and time stamp for footer
currentYearSelector.innerHTML = today.getFullYear();
lastModifiedSelector.innerHTML = `Last Modification: ${document.lastModified}`;
