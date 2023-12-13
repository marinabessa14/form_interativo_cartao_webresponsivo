const cardCvc = document.querySelector(".cvc span");
const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");

const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMes = document.querySelector("#mes");
const inputAno = document.querySelector("#ano");
const inputCvc = document.querySelector("#cvc");

const infoErr = document.querySelectorAll(".info-err");
const complete = document.querySelector(".complete");

const showError = (input, arrInfoErr, message) => {
  input.classList.add("input-err");
  infoErr[arrInfoErr].classList.add("d-block");
  infoErr[arrInfoErr].textContent = message;
};

const hideError = (input, arrInfoErr) => {
  input.classList.remove("input-err");
  infoErr[arrInfoErr].classList.remove("d-block");
};

let inputNameValue;
let inputNumberValue;
let inputMesValue = "00";
let inputAnoValue = "00";
let inputCvcValue;

const validateInput = (input, arrInfoErr, wordLength) => {
  if (!wordLength) {
    if (!input.value) {
      showError(input, arrInfoErr, "Preencha este campo!");
    } else {
      hideError(input, arrInfoErr);
      inputNameValue = input.value;
    }
  } else {
    if (!input.value) {
      showError(input, arrInfoErr, "Preencha este campo!");
    } else if (!/^\d+(\s\d+)*$/.test(input.value)) {
      showError(input, arrInfoErr, "Apenas números");
    } else if (input.value.length < wordLength) {
      if (wordLength > 3) {
        showError(input, arrInfoErr, "O número do cartão deve conter 16 números");
      } else {
        showError(input, arrInfoErr, `devem ser ${wordLength} números`);
      }
    } else if (parseInt(inputMesValue) > 12) {
      showError(input, arrInfoErr, "O mês não deve ser superior a 12!");
    } else {
      hideError(input, arrInfoErr);

      switch (input) {
        case inputNumber:
          inputNumberValue = input.value;
          break;
        case inputMes:
          inputMesValue = input.value;
          break;
        case inputAno:
          inputAnoValue = input.value;
          break;
        case inputCvc:
          inputCvcValue = input.value;
          break;
      }
    }
  }
};

inputName.addEventListener("input", (e) => {
  e.preventDefault();

  inputNameValue = e.target.value;
  cardName.textContent = inputNameValue;
});

inputNumber.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 16);
  formatText = formatText
    .replace(/\s/g, "")
    .trim();

  e.target.value = formatText;

  inputNumberValue = e.target.value;
  cardNumber.textContent = inputNumberValue;

});

const deleteSpace = (input) => {
  if (/\s/.test(input.value)) {
    let formatText = input.value.replace(/\s/g, "");

    input.value = formatText;
  }
};

inputMes.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputMes);
  inputMesValue = e.target.value;
  cardExpDate.textContent = inputMesValue + "/" + inputAnoValue;
});

inputAno.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputAno);
  inputAnoValue = e.target.value;
  cardExpDate.textContent = inputMesValue + "/" + inputAnoValue;
});

inputCvc.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputCvc);
  inputCvcValue = e.target.value;
  cardCvc.textContent = inputCvcValue;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputNameValue = "";
  inputNumberValue = "";
  inputMesValue = "00";
  inputAnoValue = "00";
  inputCvcValue = "";

  validateInput(inputName, 0);
  validateInput(inputNumber, 0, 16);
  validateInput(inputMes, 2, 2);
  validateInput(inputAno, 2, 2);
  validateInput(inputCvc, 3, 3);

  if (
    inputNameValue &&
    inputNumberValue &&
    inputMesValue &&
    inputAnoValue &&
    inputCvcValue
  ) {
    cardName.textContent = inputNameValue;
    cardNumber.textContent = inputNumberValue;
    cardExpDate.textContent = inputMesValue + "/" + inputAnoValue;
    cardCvc.textContent = inputCvcValue;

    form.classList.add("d-none");
    complete.classList.add("d-block");
  }
});

complete.addEventListener("click", () => {
  location.reload(true);
});