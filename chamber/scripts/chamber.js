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

// Selectors
const homeSelector = document.querySelector('.home');

// Display current weather and forecast
const currentWeatherSelector = document.querySelector('#currentWeather');
const weatherForecastSelector = document.querySelector('#weatherForecast');
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=34.23&lon=-84.48&appid=7bf9a045a7e358e0909cb880c445a24d&units=imperial';
const weatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.23&lon=-84.48&appid=7bf9a045a7e358e0909cb880c445a24d&units=imperial';

async function getCurrentWeather(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
}

async function getWeatherForecast(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherForecast(data.list);
}

const displayCurrentWeather = data => {
    const img = document.createElement('img');
    const info = document.createElement('div');
    const temp = document.createElement('p');
    const desc = document.createElement('p');
    const tempHigh = document.createElement('p');
    const tempLow = document.createElement('p');
    const humidity = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');

    img.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    img.setAttribute('alt', `${data.weather[0].main} icon`);
    currentWeatherSelector.appendChild(img);

    temp.innerHTML = `<strong>${data.main.temp}<span>&#176;</span> F</strong>`;
    info.appendChild(temp);

    desc.textContent = data.weather[0].description;
    info.appendChild(desc);

    tempHigh.innerHTML = `High: ${data.main.temp_max}<span>&#176;</span> F`;
    info.appendChild(tempHigh);

    tempLow.innerHTML = `Low: ${data.main.temp_min}<span>&#176;</span> F`
    info.appendChild(tempLow);

    humidity.textContent = `Humidity: ${data.main.humidity}%`
    info.appendChild(humidity);

    const timeSunrise = new Date(data.sys.sunrise);
    let sunriseFormatted = timeSunrise.toLocaleTimeString();
    sunrise.textContent = `Sunrise: ${sunriseFormatted}`;
    info.appendChild(sunrise);

    const timeSunset = new Date(data.sys.sunset);
    let sunsetFormatted = timeSunset.toLocaleTimeString();
    sunset.textContent = `Sunset: ${sunsetFormatted}`;
    info.appendChild(sunset);

    currentWeatherSelector.appendChild(info);
}

const displayWeatherForecast = data => {
    const day0 = document.createElement('p');
    const day1 = document.createElement('p');
    const day2 = document.createElement('p');

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    
    const day0Value = 0;
    const day1Value = 8;
    const day2Value = 16;

    const day0Date = new Date(data[day0Value].dt_txt);
    const day0Index = day0Date.getDay();
    day0.innerHTML = `${dayNames[day0Index]}: <strong>${data[day0Value].main.temp}<span>&#176;</span> F</strong>`;

    const day1Date = new Date(data[day1Value].dt_txt);
    const day1Index = day1Date.getDay();
    day1.innerHTML = `${dayNames[day1Index]}: <strong>${data[day1Value].main.temp}<span>&#176;</span> F</strong>`;

    const day2Date = new Date(data[day2Value].dt_txt);
    const day2Index = day2Date.getDay();
    day2.innerHTML = `${dayNames[day2Index]}: <strong>${data[day2Value].main.temp}<span>&#176;</span> F</strong>`;

    weatherForecastSelector.appendChild(day0);
    weatherForecastSelector.appendChild(day1);
    weatherForecastSelector.appendChild(day2);
}

if (homeSelector) {
    getCurrentWeather(currentWeatherUrl);
    getWeatherForecast(weatherForecastUrl);
}

// Display business info
const businessesSelector = document.querySelector('#businesses');
const url = 'https://eworsham.github.io/wdd231/chamber/data/members.json';

if (homeSelector) {
    getCompanyCards(url, businessesSelector, true);
}

/**************************************************** 
*
*           Directory Page only
*
****************************************************/

// Fetch company data
const directorySelector = document.querySelector('.directory');
const companiesSelector = document.querySelector('#companies');
const cardViewSelector = document.querySelector('#cardView');
const listViewSelector = document.querySelector('#listView');

async function getCompanyCards(url, selector, silverOrGold = false) {
    const response = await fetch(url);
    const data = await response.json();
    
    if (silverOrGold) {
        const dataFiltered = data.companies.filter(company => company.membershipLevel > 1);
        
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * dataFiltered.length);
            dataFiltered.splice(randomIndex, 1);
        }
        displayCompanyCards(dataFiltered, selector);
    } else {
        displayCompanyCards(data.companies, selector);
    }
}

async function getCompanyList(url) {
    const response = await fetch(url);
    const data = await response.json();

    displayCompanyList(data.companies);
}

const displayCompanyCards = (companies, selector) => {
    selector.textContent = "";

    companies.forEach(company => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const name = document.createElement('h3');
        const image = document.createElement('img');
        const address = document.createElement('div');
        address.setAttribute('class', 'address');
        const address1 = document.createElement('p');
        const address2 = document.createElement('p');
        const phoneNumber = document.createElement('p');
        const website = document.createElement('p');
        const membershipLevel = document.createElement('p');

        name.textContent = company.name;
        card.appendChild(name);
        
        image.setAttribute('src', company.image);
        image.setAttribute('alt', `${company.name} image`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');
        card.appendChild(image);

        address1.textContent = company.address.street;
        address.appendChild(address1)
        address2.textContent = `${company.address.city}, ${company.address.state} ${company.address.zip}`;
        address.appendChild(address2);
        card.appendChild(address);

        phoneNumber.textContent = company.phoneNumber;
        card.appendChild(phoneNumber);

        website.textContent = company.website;
        card.appendChild(website);

        membershipLevel.textContent = `Membership Level: ${company.membershipLevel}`;
        card.appendChild(membershipLevel);

        selector.appendChild(card);
    });
    selector.setAttribute('class', 'companies-grid');
}

const displayCompanyList = companies => {
    companiesSelector.textContent = "";

    companies.forEach(company => {
        const card = document.createElement('div');
        card.setAttribute('class', 'list');
        const name = document.createElement('h3');
        const address = document.createElement('div');
        address.setAttribute('class', 'address');
        const address1 = document.createElement('p');
        const address2 = document.createElement('p');
        const info =document.createElement('div');
        const phoneNumber = document.createElement('p');
        const website = document.createElement('p');

        name.textContent = company.name;
        card.appendChild(name);
        
        address1.textContent = company.address.street;
        address.appendChild(address1)
        address2.textContent = `${company.address.city}, ${company.address.state} ${company.address.zip}`;
        address.appendChild(address2);
        card.appendChild(address);

        phoneNumber.textContent = company.phoneNumber;
        info.appendChild(phoneNumber);
        website.textContent = company.website;
        info.appendChild(website);
        card.appendChild(info);

        companiesSelector.appendChild(card);
    });
    companiesSelector.removeAttribute('class', 'companies-grid');
}

if (directorySelector) {
    cardViewSelector.addEventListener('click', () => {
        getCompanyCards(url, companiesSelector);
    });

    listViewSelector.addEventListener('click', () => {
        getCompanyList(url);
    });

    getCompanyCards(url, companiesSelector);
}

/**************************************************** 
*
*           Join Page only
*
****************************************************/

const timestampSelector = document.querySelector('#timestamp');

if (timestampSelector) {
    const today = new Date();
    timestampSelector.value = today.toLocaleString();
}

/**************************************************** 
*
*           Thank You Page only
*
****************************************************/

const urlData = window.location.href
const thankyouSelector = document.querySelector('.thankyou');
const thanksData = document.createElement('div');

if (thankyouSelector) {
    const infoArray = urlData.split('?')[1].split('&');
    
    function show(cup) {
        infoArray.forEach(element => {
            if (element.startsWith(cup)) {
                result = element.split('=')[1];
                result = result.replaceAll('%40', '@');
                result = result.replaceAll('+', ' ');
                result = result.replaceAll('%2F', '/');
                result = result.replaceAll('%2C', ',');
                result = result.replaceAll('%3A', ':');
            }
        });
        return result;
    }
    
    thanksData.innerHTML = `
        <p><span class="thankyou-label">First Name: </span>${show("firstName")}</p>
        <p><span class="thankyou-label">Last Name: </span>${show("lastName")}</p>
        <p><span class="thankyou-label">Email: </span>${show("email")}</p>
        <p><span class="thankyou-label">Phone Number: </span>${show("phone")}</p>
        <p><span class="thankyou-label">Business Name: </span>${show("business")}</p>
        <p><span class="thankyou-label">Timestamp: </span>${show("timestamp")}</p>
    `;
    
    thankyouSelector.appendChild(thanksData);
}


/**************************************************** 
*
*           Discover Page only
*
****************************************************/