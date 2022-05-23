import './css/styles.css';

import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countriesItem from './templates/countries-item';
import countryItem from './templates/country-items';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInputSeach, DEBOUNCE_DELAY));

function clearInput() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onInputSeach(e) {
  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    clearInput();
    return;
  }
  fetchCountries(inputValue)
    .then(country => {
      if (country.length > 10) {
        clearInput();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (country.length === 1) {
        clearInput();
        renderCountry(country);
      } else if (country.length >= 2 || country.length <= 10) {
        clearInput();
        renderCountries(country);
      }
    })
    .catch(error => {
      clearInput();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountries(countrys) {
  const markup = countrys.map(countriesItem).join('');
  refs.countryList.insertAdjacentHTML('afterbegin', markup);
}

function renderCountry(country) {
  const markup = country.map(countryItem).join('');
  refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
}
