const popupEl = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseButton = document.querySelector('.popup__close');
const userameEl = document.querySelector('.profile__username');
const userDescriptionEl = document.querySelector('.profile__description');
const popupUsername = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form');
const cardsTemplate = document.querySelector('#cards-template').content;
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

function addCards() {
  const addCards = cardsTemplate.querySelector('cards').cloneNode(true);
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  popupUsername.value = userameEl.textContent;
  popupDescription.value = userDescriptionEl.textContent;
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', function () {
  openPopup(popupEl);
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popupEl);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userameEl.textContent = popupUsername.value;
  userDescriptionEl.textContent = popupDescription.value;
  closePopup(popupEl);
});
