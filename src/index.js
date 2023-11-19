// index.js

import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Fetch and populate cat breeds
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      breedSelect.addEventListener('change', () => {
        const selectedBreedId = breedSelect.value;
        showLoader();
        fetchCatInfo(selectedBreedId)
          .then(cat => displayCatInfo(cat))
          .catch(() => showError())
          .finally(() => hideLoader());
      });
    })
    .catch(() => showError())
    .finally(() => hideLoader());

  function fetchCatInfo(breedId) {
    return fetchCatByBreed(breedId);
  }

  function displayCatInfo(cat) {
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="Cat Image">
      <p>Breed: ${cat.breeds[0].name}</p>
      <p>Description: ${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
    `;
  }

  function showLoader() {
    breedSelect.style.display = 'none';
    loader.style.display = 'block';
    error.style.display = 'none';
    catInfo.style.display = 'none';
  }

  function hideLoader() {
    breedSelect.style.display = 'block';
    loader.style.display = 'none';
  }

  function showError() {
    error.style.display = 'block';
  }
});
