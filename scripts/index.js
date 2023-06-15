const popupProfile = document.querySelector('#popup-edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const buttonClosePopupProfile = document.querySelector('#popup-edit-close');
const profileNameEl = document.querySelector('.profile__username');
const profileDescriptionEl = document.querySelector('.profile__description');
const formProfile = document.querySelector('#edit-form');
const formPopupProfileName = document.querySelector('.popup__input_type_name');
const formPopupProfileDescription = document.querySelector('.popup__input_type_description');

const popupAddNewCard = document.querySelector('#popup-cards');
const buttonClosePopupAddNewCard = document.querySelector('#popup-add-close');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add');
const templateCard = document.querySelector('#cards-template');
const templateCardContent = templateCard.content;
const cardsContainer = document.querySelector('.cards');
const cardEl = templateCardContent.querySelector('.card');
const formAddNewCard = document.querySelector('#add-form');

const popupFullImage = document.querySelector('#popup-photo');
const popupFullImageDescriptionText = document.querySelector('.popup__caption');
const buttonClosePopupFullImage = document.querySelector('#popup-photo-close');
const popupFullImagePhoto = document.querySelector('.popup__big-photo');
const popupList = document.querySelectorAll('.popup');

initialCards.forEach(function (item) {
  const newCard = addCards(item);
  cardsContainer.append(newCard);
});

function addCards(item) {
  const newCard = cardEl.cloneNode(true);
  const textEl = newCard.querySelector('.card__description');
  const imageEl = newCard.querySelector('.card__image');

  textEl.textContent = item.name;
  imageEl.src = item.link;
  imageEl.alt = item.name;

  const cardLike = newCard.querySelector('.card__like');
  cardLike.addEventListener('click', function () {
    cardLike.classList.toggle('card_active');
  });

  const cardDelete = newCard.querySelector('.card__delete');
  cardDelete.addEventListener('click', function () {
    newCard.remove();
  });

  const cardImage = newCard.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    popupFullImagePhoto.src = item.link;
    popupFullImagePhoto.alt = item.name;
    popupFullImageDescriptionText.textContent = item.name;
    openPopup(popupFullImage);
  });

  return newCard;
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEsc);
  closePopupByClickOverlay();
}

function closePopupByEsc(evt) {
  popupList.forEach(item => {
    if (evt.key === 'Escape') {
      closePopup(item);
      document.body.removeEventListener('keydown', closePopupByEsc);
    }
  });
}

function closePopupByClickOverlay() {
  popupList.forEach(item => {
    item.addEventListener('mousedown', evt => {
      if (evt.currentTarget === evt.target) {
        closePopup(item);
      }
    });
  });
}

function openPropfilePopup(popupName) {
  formPopupProfileName.value = profileNameEl.textContent;
  formPopupProfileDescription.value = profileDescriptionEl.textContent;
  openPopup(popupName);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

function editProfile(firstVal, secondVal) {
  firstVal.textContent = formPopupProfileName.value;
  secondVal.textContent = formPopupProfileDescription.value;
}

buttonOpenPopupProfile.addEventListener('click', function () {
  openPropfilePopup(popupProfile);
});

buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

formProfile.addEventListener('submit', function (event) {
  event.preventDefault();
  editProfile(profileNameEl, profileDescriptionEl);
  closePopup(popupProfile);
});

buttonOpenPopupAddNewCard.addEventListener('click', function () {
  openPopup(popupAddNewCard);
});

buttonClosePopupAddNewCard.addEventListener('click', function () {
  closePopup(popupAddNewCard);
});

formAddNewCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('popup-name');
  const link = formData.get('popup-link');
  const newCard = { name: name, link: link };
  const addCard = addCards(newCard);
  cardsContainer.prepend(addCard);
  form.reset();
  closePopup(popupAddNewCard);
});

buttonClosePopupFullImage.addEventListener('click', function () {
  closePopup(popupFullImage);
});
