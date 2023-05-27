const popupEditEl = document.querySelector('#popup-edit');
const profileEdit = document.querySelector('.profile__edit');
const popupEditCloseButton = document.querySelector('#popup-edit-close');
const usernameEl = document.querySelector('.profile__username');
const userDescriptionEl = document.querySelector('.profile__description');
const popupUsername = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('#edit-form');
const template = document.querySelector('#cards-template');
const templateContent = template.content;
const cardEl = templateContent.querySelector('.card');
const cardsContainer = document.querySelector('.cards');
const popupAddEl = document.querySelector('#popup-cards');
const addForm = document.querySelector('#add-form');
const popupAddCloseButton = document.querySelector('#popup-add-close');
const addCardButton = document.querySelector('.profile__add');
const popupPhoto = document.querySelector('#popup-photo');
const popupBigPhoto = document.querySelector('.popup__big-photo');
const popupCaption = document.querySelector('.popup__caption');
const popupPhotoClose = document.querySelector('#popup-photo-close');
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

initialCards.forEach(function (item) {
  newCard = addCards(item);
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
    popupBigPhoto.src = item.link;
    popupBigPhoto.alt = item.name;
    popupCaption.textContent = item.name;
    popupPhoto.classList.add('popup_opacity');
    openPopup(popupPhoto);
  });

  return newCard;
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  popupUsername.value = usernameEl.textContent;
  popupDescription.value = userDescriptionEl.textContent;
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

function editProfile(firstVal, secondVal) {
  firstVal.textContent = popupUsername.value;
  secondVal.textContent = popupDescription.value;
}

profileEdit.addEventListener('click', function () {
  openPopup(popupEditEl);
});

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditEl);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  editProfile(usernameEl, userDescriptionEl);
  closePopup(popupEditEl);
});

addCardButton.addEventListener('click', function () {
  openPopup(popupAddEl);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddEl);
});

popupPhotoClose.addEventListener('click', function () {
  closePopup(popupPhoto);
});

addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('popup-name');
  const link = formData.get('popup-link');
  const newCard = { name: name, link: link };
  const addCard = addCards(newCard);
  cardsContainer.prepend(addCard);
  form.reset();
  closePopup(popupAddEl);
});
