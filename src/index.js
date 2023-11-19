import { fetchBreeds, fetchCatByBreed } from './cat_api';
import iziToast from 'izitoast';

document.addEventListener('DOMContentLoaded', async function () {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');

  try {
    const breeds = await fetchBreeds();

    breedSelect.addEventListener('change', async function () {
      const selectedBreedId = breedSelect.value;
      const catData = await fetchCatByBreed(selectedBreedId);

      catInfoDiv.innerHTML = `
        <p><strong>Breed:</strong> ${catData[0].breeds[0].name}</p>
        <p><strong>Description:</strong> ${catData[0].breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData[0].breeds[0].temperament}</p>
        <img src="${catData[0].url}" alt="Cat Image">
      `;
    });
  } catch (error) {
    console.error('Error:', error);
    showErrorToast('Oops! Something went wrong! Try reloading the page!');
  }
});

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}
