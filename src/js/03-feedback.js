import throttle from 'lodash.throttle';

const LOCAL = 'selectedFilters';
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

let formData = {};

onPageLoad();

function onFormSubmit(evt) {
  evt.preventDefault();
  const email = evt.target.elements.email.value;
  const message = evt.target.elements.message.value;
  if (email === '' || message === '') {
    alert ("fill all the fields")
  } else {
    console.dir(JSON.parse(localStorage.getItem(LOCAL)));
    localStorage.removeItem(LOCAL);
    formData = {};  
  }
  
  evt.currentTarget.reset();  
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL, JSON.stringify(formData));
}
 

function onPageLoad() {
  const savedData = JSON.parse(localStorage.getItem(LOCAL));

  if (savedData) {
    Object.entries(savedData).forEach(([key, value]) => {
      formEl[key].value = value;
      formData[key] = value;
    });
  }
}
