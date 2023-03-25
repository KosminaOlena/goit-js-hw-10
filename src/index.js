import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
    search: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
};
refs.search.addEventListener('input', onSearchInput);

function onSearchInput(e) {
    console.log(refs.search.value)
}