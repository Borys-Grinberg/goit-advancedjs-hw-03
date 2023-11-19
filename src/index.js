// index.js
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';

// index.js
// ... existing code ...

document.addEventListener('DOMContentLoaded', async function () {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');

  try {
    const breeds = await fetchBreeds();

    breedSelect.addEventListener('change', async function () {
      const selectedBreedId = breedSelect.value;

      // Show loader while fetching cat information
      loader.style.display = 'inline-block';

      const catData = await fetchCatByBreed(selectedBreedId);

      // Hide loader after fetching cat information
      loader.style.display = 'none';

      // Display cat information
      catInfoDiv.innerHTML = `
        <img src="${catData[0].url}" alt="Cat Image" class="cat-image">
        <div class="cat-details">
          <h2>${catData[0].breeds[0].name}</h2>
          <p class="description">${catData[0].breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${catData[0].breeds[0].temperament}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error:', error);
    showErrorToast('Oops! Something went wrong! Try reloading the page!');
  }
});

// ... existing code ...

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}
