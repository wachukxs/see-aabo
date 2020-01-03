window.onload = () => {

  // VARIABLES
  const hamburger = document.querySelector('.header__hamburger');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const divForm = document.querySelector('.form');
  const form = document.querySelector('.js-form');
  const headingSub = document.querySelector('.heading-sub');
  const button = document.querySelector('.form__submit');
  const header = document.querySelector('.header');
  const heading = document.querySelector('.heading');
  const comingSoon = document.querySelector('.coming-soon');
  const infoBlock = document.querySelector('.form__info');
  const main = document.querySelector('main');
  const cards = document.querySelector('.cards');
  const headerOverlay = document.querySelector('.header__mobile-overlay');


  // FUNCTIONS
  const hamburger_Click = () => {
    hamburger.classList.toggle('header__hamburger_active');
    mobileMenu.classList.toggle('header__mobile-menu_active');
    headerOverlay.classList.toggle('header__mobile-overlay_active');
  };

  const headerOverlay_Click = () => {
    hamburger.classList.remove('header__hamburger_active');
    mobileMenu.classList.remove('header__mobile-menu_active');
    headerOverlay.classList.add('header__mobile-overlay_active');
  };

  // serialize form inputs
  const serialize = ({ elements }) => {

    // Setup our serialized data
    let serialized = [];

    // Loop through each field in the form
    for (let i = 0; i < elements.length; i++) {

      let field = elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;


      // Convert field data to a query string
      if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
      }
    }

    return serialized.join('&');

  };


  // LISTENERS
  hamburger.addEventListener('click', hamburger_Click);

  headerOverlay.addEventListener('click', headerOverlay_Click);

  // ANIMATIONS
  headingSub.classList.remove('heading-sub_active');
  divForm.classList.remove('form_active');
  header.classList.remove('header_active');
  headingSub.classList.remove('heading-sub_active');
  heading.classList.remove('heading_active');
  comingSoon.classList.remove('coming-soon_active');
  main.classList.remove('main_active');
  cards.classList.remove('cards_active');



  form.addEventListener('submit', function(e) {
    e.preventDefault();

    button.classList.add('state-show-spinner');

    fetch(`${form.action}&${serialize(form)}`, {
      method: form.method,
      mode: 'no-cors',
      body: '',
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      }
    })
      .then(function(res) {
        console.log(res, 'first then');
        infoBlock.classList.add('form__info_success');
        infoBlock.classList.remove('form__info_error');
        infoBlock.classList.remove('form__info_hide');
        button.classList.remove('state-show-spinner');
        setTimeout(function() {
          infoBlock.classList.add('form__info_hide');
        }, 5000);
      })
      .then(function(res) {
        console.log(res, 'second then')
      })
      .catch(function(err) {
        console.log(err);
        infoBlock.innerText = 'Could not connect to the registration server. Please try again later.';
        infoBlock.classList.add('form__info_error');
        infoBlock.classList.remove('form__info_success');
        infoBlock.classList.remove('form__info_hide');
        setTimeout(function() {
          infoBlock.classList.add('form__info_hide');
        }, 5000)
      })
  });

};

