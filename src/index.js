// index.js
import { fetchBreeds, fetchCatByBreed } from './cat_api';

document.addEventListener('DOMContentLoaded', async function () {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');

  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

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
  }
});
