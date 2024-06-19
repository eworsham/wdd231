const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = prophets => {
    cards.innerHTML = "";

    prophets.forEach(prophet => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const cardBirthDate = document.createElement('p');
        const cardBirthPlace = document.createElement('p');

        const firstName = prophet.name;
        const lastName = prophet.lastname;
        fullName.textContent = `${firstName} ${lastName}`;
        card.appendChild(fullName);
        
        const birthDate = prophet.birthdate;
        cardBirthDate.textContent = `Date of Birth: ${birthDate}`;
        card.appendChild(cardBirthDate);

        const birthPlace = prophet.birthplace;
        cardBirthPlace.textContent = `Place of Birth: ${birthPlace}`;
        card.appendChild(cardBirthPlace);

        const imgUrl = prophet.imageurl;
        portrait.setAttribute('src', imgUrl);
        portrait.setAttribute('alt', 'Prophet image');
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '300px');
        portrait.setAttribute('height', '400px');
        card.appendChild(portrait);


        cards.appendChild(card);
    });
}

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);

    displayProphets(data.prophets);
}

getProphetData(url);