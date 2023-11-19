// cat-api.js
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_7zO2UtHss6WanH1oLQ1vnbzQS31rHHFk6zvi69lyordiqDagXpIxykJooBldDqh8';

export function fetchBreeds() {
  showLoader();
  hideElement('.breed-select');
  hideElement('.cat-info');
  hideElement('.error');

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      hideLoader();
      showElement('.breed-select');
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      handleFetchError();
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  showLoader();
  hideElement('.breed-select');
  hideElement('.cat-info');
  hideElement('.error');

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => {
      hideLoader();
      showElement('.cat-info');
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      handleFetchError();
      throw error;
    });
}

function showLoader() {
  showElement('.loader');
}

function hideLoader() {
  hideElement('.loader');
}

function showElement(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

function hideElement(selector) {
  document.querySelector(selector).classList.add('hidden');
}

function handleFetchError() {
  showElement('.error');
  setTimeout(() => {
    hideElement('.error');
  }, 5000); // Hide error after 5 seconds
}
