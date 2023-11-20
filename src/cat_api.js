import axios from 'axios';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_7zO2UtHss6WanH1oLQ1vnbzQS31rHHFk6zvi69lyordiqDagXpIxykJooBldDqh8';

// Helper functions
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
  }, 5000); // Hide error after 5 seconds, adjust as needed
}

export function fetchBreeds() {
  showLoader();
  hideElement('.cat-info');
  hideElement('.error');

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      hideLoader();
      showElement('.breed-select');
      const breedSelect = new SlimSelect({
        select: '.breed-select',
        placeholder: 'Select a breed',
        data: response.data.map(breed => ({
          text: breed.name,
          value: breed.id,
        })),
      });
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
