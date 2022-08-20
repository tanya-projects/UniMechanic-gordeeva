'use strict';

// MAIN VARIABLES
const btnOpenModal = document.querySelector('.button__modal');
const btnsCloseModal = document.querySelectorAll('.modal__button-cancel');
const submitForm = document.querySelector('.modal__button-submit');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalForm = document.querySelector('.modal__form');
const modalContent = document.querySelector('.modal__content');

const modalOptions = document.querySelectorAll('.modal__option');
const modalInputs = document.querySelectorAll('.modal__form-input');
const errorMessage = document.querySelector('.form__input-error');
const successModal = document.querySelector('.success');

const btnDeleteFile = document.querySelector('.file__button');
const filePath = document.querySelector('.file__path');
const fileImg = document.querySelector('.file__img');

const organizationInput = document.getElementById('organization-name');
const phoneInput = document.getElementById('phone-number');
const emailInput = document.getElementById('email');
const activityInput = document.getElementById('activity');
const fileInput = document.getElementById('file-name');

const requiredInputs = [
  organizationInput,
  phoneInput,
  emailInput,
  activityInput,
  fileInput,
];

// INITIAL SET
const invalidBorders = '2px solid #D90000';
const validBorders = '1px solid #d6dade';

// FUNCTIONS
const hideElement = (element) => {
  element.style.display = 'none';
};
const showElement = (element, display) => {
  element.style.display = display;
};

const returnToInitial = () => {
  // Return to initial empty values and styling
  modalInputs.forEach((input) => {
    input.value = '';
    input.style.border = validBorders;
    input.style.animation = 'none';
  });

  // initial setting for file input
  fileImg.style.border = 'none';
  hideElement(filePath);

  hideElement(errorMessage);
};

const closeModal = () => {
  hideElement(modal);
  hideElement(successModal);
  showElement(modalForm, 'grid');

  returnToInitial();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openModal = () => {
  showElement(modal, 'block');
};

const validateInput = (input) => {
  if (input.type === 'text') {
    // validate text input: not empty (>1 symbols)
    if (input.value.trim().length > 1) {
      return true;
    } else {
      return false;
    }
  }

  if (input.type === 'tel') {
    // validate phone number: is number and not empty
    if (input.value == +input.value && input.value !== '') {
      return true;
    } else {
      return false;
    }
  }

  if (input.type === 'email') {
    // validate email: has @ and . and not empty (+check for typo ",")
    if (
      input.value !== '' &&
      input.value.includes('@' && '.') &&
      !input.value.includes(',')
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (input.type === 'select-one' || input.type === 'file') {
    // validate selection: not first choice (empty)
    // validate file loading: path (type of file validated in index.html)
    if (input.value !== '') {
      return true;
    } else {
      return false;
    }
  }
};

const validateForm = (inputs) => {
  inputs.forEach((input) =>
    input.addEventListener('change', function () {
      input.style.animation = 'none';
      // change border and add animation if input is invalid
      if (!validateInput(input)) {
        // behavior for invalid file input
        if (input.type === 'file') {
          fileImg.style.border = invalidBorders;
        }

        input.style.animation = 'invalidInput 0.3s ease-in-out';
        input.style.border = invalidBorders;
      } else {
        if (input.type === 'file') {
          console.log(fileInput.value);
          // show valid file input
          filePath.textContent = input.value;
          showElement(filePath, 'block');
          if (fileInput.value !== '') {
            showElement(btnDeleteFile, 'block');
          }
        }
        input.style.border = validBorders;
      }
    })
  );
};

///////////////
// OPEN AND CLOSE MODAL
btnOpenModal.addEventListener('click', (event) => {
  event.preventDefault();
  openModal();
});
btnsCloseModal.forEach((btn) =>
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
  })
);
overlay.addEventListener('click', () => {
  closeModal();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

// DELETE FILE INPUT
btnDeleteFile.addEventListener('click', (event) => {
  event.preventDefault();
  fileInput.value = '';
  hideElement(filePath);
  hideElement(btnDeleteFile);
});

// VALIDATE FORM
validateForm(requiredInputs);

// SUBMIT FORM
submitForm.addEventListener('click', (e) => {
  e.preventDefault();
  hideElement(errorMessage);

  if (
    validateInput(organizationInput) &&
    validateInput(phoneInput) &&
    validateInput(emailInput) &&
    validateInput(activityInput) &&
    validateInput(fileInput)
  ) {
    hideElement(modalForm);
    showElement(successModal, 'block');
    modalContent.style.height = 'fit-content';
  } else {
    showElement(errorMessage, 'block');

    // filter false inputs and add border
    requiredInputs
      .filter((input) => validateInput(input) === false)
      .forEach((input) => {
        if (input.type === 'file') {
          fileImg.style.border = invalidBorders;
        }
        input.style.border = invalidBorders;
      });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
});
