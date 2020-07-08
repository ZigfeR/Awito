"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSumbit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning");

const elementsModalSumbit = [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

const closeModal = function (event) {
  const target = event.target;
  if (target.closest(".modal__close") || target === this) {
    this.classList.add("hide");
    if (this === modalAdd) {
      modalSubmit.reset();
    }
  }
};

const closeModalEsc = event => {
  if (event.code === "Escape") {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.addEventListener('keydown', closeModalEsc);
  }
}

modalSubmit.addEventListener('input', () => {
  const validForm = elementsModalSumbit.every(elem => elem.value);
  modalBtnSumbit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSumbit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
})

addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSumbit.disabled = true;
  document.addEventListener('keydown', closeModalEsc);
});

catalog.addEventListener("click", event => {
  const target = event.target;
  if (target.closest('.card')) {
    modalItem.classList.remove("hide");
    document.addEventListener('keydown', closeModalEsc);
  }
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);




/*
modalItem.addEventListener("click", (event) => {
  const target = event.target;
  console.log(target);
  if (target.closest(".modal__close") || target === modalItem) {
    modalItem.classList.add("hide");
    modalSubmit.reset();
  }
}); */