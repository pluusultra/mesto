const popupEl = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseButton = document.querySelector('.popup__close');
const userameEl = document.querySelector('.profile__username');
const userDescriptionEl = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form');

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', function () {
  openPopup(popupEl);
  popupName.value = userameEl.textContent;
  popupDescription.value = userDescriptionEl.textContent;
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popupEl);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userameEl.textContent = popupName.value;
  userDescriptionEl.textContent = popupDescription.value;
  closePopup(popupEl);
});
