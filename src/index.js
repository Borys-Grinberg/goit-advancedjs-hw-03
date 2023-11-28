import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat_api';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
let selectedBreedId;

const slim = new SlimSelect({
  select: breedSelect,
});

slim.setData([]);
breedSelect.classList.add('hidden');

showLoader();

fetchBreeds()
  .then(breeds => {
    slim.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));

    hideLoader();
  })
  .catch(error => {
    console.error('Error fetching cat breeds:', error);
    showErrorToast('Oops! Something went wrong! Try reloading the page!');
  });

breedSelect.addEventListener('change', function () {
  selectedBreedId = breedSelect.value;

  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      if (
        catData &&
        Array.isArray(catData) &&
        catData.length > 0 &&
        catData[0].breeds &&
        catData[0].breeds.length > 0
      ) {
        const catBreed = catData[0].breeds[0];

        catInfoDiv.innerHTML = `
          <div class="cat-info-inner">
            <img src="${catData[0].url}" alt="Cat Image" class="cat-image">
            <div class="cat-details">
              <h2>${catBreed.name}</h2>
              <p class="description">${catBreed.description}</p>
              <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
            </div>
          </div>
        `;
      } else {
        showErrorToast(
          'Oops! Unable to retrieve cat information. Please try again.'
        );
      }
    })
    .catch(error => {
      console.error('Error fetching cat information:', error);
      showErrorToast('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      hideLoader();
    });
});

function showLoader() {
  loader.style.display = 'inline-block';
  catInfoDiv.style.display = 'none';
  breedSelect.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  catInfoDiv.style.display = 'flex';
  breedSelect.style.display = 'block';
}

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}
