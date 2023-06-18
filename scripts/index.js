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

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardsContainer.append(newCard);
});

function createCard(item) {
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

  imageEl.addEventListener('click', function () {
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
setDefaultValuesInProfilePopup(popupProfile);

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEsc);
  resetErrorsFromInputs(popupName);
  setDefaultValuesInProfilePopup(popupName);
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

function resetErrorsFromInputs(popupName) {
  const inputList = document.querySelectorAll('.popup__input');
  const errorElement = document.querySelectorAll('.popup__input-error');
  inputList.forEach(inputElement => {
    inputElement.classList.remove('popup__input_type_error');
  });
  errorElement.forEach(errorElement => {
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  });
}

closePopupByCrossAndOverlay(popupList);

buttonOpenPopupProfile.addEventListener('click', function () {
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
  const addCard = createCard(newCard);
  cardsContainer.prepend(addCard);
  closePopup(popupAddNewCard);
  resetForm(formAddNewCard);
});
