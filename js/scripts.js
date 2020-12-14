// global variables

const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
const searchContainer = document.getElementsByClassName('search-container')[0];
let headerText = document.getElementsByClassName('header-text-container')[0].firstElementChild;


// dynamically generated HTML

function generateGallery(people) {
    // iterates over the array of user objects to build each card
    people.forEach(
        person => {
            const cardHTML = `<div class="card">
                                <div class="card-img-container">
                                <img class="card-img" src="${person.picture.large}" alt="profile picture"></div>
                                <div class="card-info-container">
                                <h3 id="${person.name.first}${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                                <p class="card-text">${person.email}</p>
                                <p class="card-text cap">${person.location.city}, ${person.location.state}</p></div></div>`;
            gallery.insertAdjacentHTML('beforeend', cardHTML);
        }
    )
    return people
}

// convert phone number to US format

function usFormat(phone) {
    phone = phone.replace(/[^\d]/g, "");
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

// convert date to US format

function usStyle(dateOfBirth) {
    dateOfBirth = dateOfBirth.replace(/[^\d]/g, "");
    return dateOfBirth.replace(/(\d{4})(\d{2})(\d{2})/, "$2/$3/$1").slice(0, 10)
}

// build the modal
function generateModals(people) {
    people.forEach(
        person => {
            const modalHTML = `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                    <h3 id="${person.name.first}${person.name.last}" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${usFormat(person.cell)}</p>
                    <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, OR ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${usStyle(person.dob.date)}</p>
            </div>
            </div>
                <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
            body.insertAdjacentHTML('beforeend', modalHTML);
        }
    );
    return people
}