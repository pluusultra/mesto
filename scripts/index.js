const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupList = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const profileNameEl = document.querySelector('.profile__username');
const profileDescriptionEl = document.querySelector('.profile__description');
const formProfile = document.forms['formProfile'];

const popupAddNewCard = document.querySelector('#popup-cards');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add');
const templateCard = document.querySelector('#cards-template');
const templateCardContent = templateCard.content;
const cardsContainer = document.querySelector('.cards');
const cardEl = templateCardContent.querySelector('.card');
const formAddNewCard = document.forms['formAdd'];
const popupFullImage = document.querySelector('#popup-photo');
const popupFullImageDescriptionText = document.querySelector('.popup__caption');
const popupFullImagePhoto = document.querySelector('.popup__big-photo');

import { Card } from './Card.js';

const createCards = () => {
  initialCards.forEach(item => {
    const card = new Card(item, '#cards-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });
};

createCards();

function handleCardClick(name, link) {
  popupFullImagePhoto.src = link;
  popupFullImagePhoto.alt = name;
  popupFullImageDescriptionText.textContent = name;
  openPopup(popupFullImage);
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEsc);
}

function closePopupByCrossAndOverlay(popupList) {
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  });
}

function closePopupByEsc(evt) {
  popupList.forEach(item => {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  });
}
function setDefaultValuesInProfilePopup(popupName) {
  formProfile.elements.profileName.value = profileNameEl.textContent;
  formProfile.elements.profileDescription.value = profileDescriptionEl.textContent;
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEsc);
}

function editProfile(firstVal, secondVal) {
  firstVal.textContent = formProfile.elements.profileName.value;
  secondVal.textContent = formProfile.elements.profileDescription.value;
}

function resetForm(form) {
  form.reset();
  form.elements.buttonFormAdd.classList.add('popup__button_disabled');
  form.elements.buttonFormAdd.setAttribute('disabled', true);
}

closePopupByCrossAndOverlay(popupList);

buttonOpenPopupProfile.addEventListener('click', function () {
  setDefaultValuesInProfilePopup(popupProfile);
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', function (event) {
  event.preventDefault();
  editProfile(profileNameEl, profileDescriptionEl);
  closePopup(popupProfile);
});

buttonOpenPopupAddNewCard.addEventListener('click', function () {
  openPopup(popupAddNewCard);
});

formAddNewCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('popup-name');
  const link = formData.get('popup-link');
  const newCard = { name: name, link: link };
  const card = new Card(newCard, '#cards-template', handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddNewCard);
  resetForm(formAddNewCard);
});
