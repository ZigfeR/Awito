"use strict";

const dataBase = JSON.parse(localStorage.getItem("Awito")) || [];

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSumbit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  modalFileBtn = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add");

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const elementsModalSumbit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" && elem.type !== "submit"
);

const infoPhoto = {};

const saceDB = () => localStorage.setItem("Awito", JSON.stringify(dataBase));

const checkForm = () => {
  const validForm = elementsModalSumbit.every((elem) => elem.value);
  modalBtnSumbit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

const closeModal = (event) => {
  const target = event.target;
  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
};

const renderCard = () => {
  catalog.textContent = "";
  dataBase.forEach((item, i) => {
    catalog.insertAdjacentHTML(
      "beforeend",
      `
    <li class="card" data-id="${i}">
			<img class="card__image" src="data:image/jpeg;base64,${item.image64}" alt="test">
			<div class="card__description">
				<h3 class="card__header">${item.nameItem}</h3>
				<div class="card__price">${item.constItem} ₽</div>
			</div>
		</li>
    `
    );
  });
};

modalFileInput.addEventListener("change", (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener("load", (event) => {
    if (infoPhoto.size < 200000) {
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = "Файл не должен превышать 200Кб";
      modalFileInput.value = "";
      checkForm();
    }
  });
});

modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSumbit) {
    itemObj[elem.name] = elem.value;
  }
  itemObj.image64 = infoPhoto.base64;
  dataBase.push(itemObj);
  closeModal({
    target: modalAdd,
  });
  saceDB();
  renderCard();
});

addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSumbit.disabled = true;
  document.addEventListener("keydown", closeModal);
});

catalog.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
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