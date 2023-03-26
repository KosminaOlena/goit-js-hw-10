import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const refs = {
    search: document.querySelector('#search-box'),
    info: document.querySelector('.country-info'),
    list: document.querySelector('.country-list'),
}

const cleanMarkup = ref => (ref.innerHTML = '');

function onSearchInput (e) {
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(refs.list);
    cleanMarkup(refs.info);
    return;
  }

  fetchCountries(textInput)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      renderMarkup(data);
    })
    .catch(error => {
      cleanMarkup(refs.list);
      cleanMarkup(refs.info);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

function renderMarkup (data) {
  if (data.length === 1) {
    cleanMarkup(refs.list);
    const markupInfo = createInfo(data);
    refs.info.innerHTML = markupInfo;
  } else {
    cleanMarkup(refs.info);
    const markupList = createList(data);
    refs.list.innerHTML = markupList;
  }
};

function createList (data) {
  return data
    .map(
      ({ name, flags }) =>
            `<li class = "item"><img src="${flags.svg}" alt="${name.official}" width="40">${name.official}</li>`
    )
    .join('');
};

function createInfo (data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" alt="${name.official}" width="200">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
};
refs.search.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

