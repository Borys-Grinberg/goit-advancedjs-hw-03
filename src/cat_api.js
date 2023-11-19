// cat-api.js

import axios from 'axios';

const apiKey = 'ваш_ключ';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(apiUrl)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat information:', error);
      throw error;
    });
}
