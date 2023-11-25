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

breedSelect.addEventListener('change', function () {
  selectedBreedId = breedSelect.value; // Змінена змінна, щоб зберегти значення

  // Show loader while fetching cat information
  showLoader();

  const fetchPromise = selectedBreedId
    ? fetchCatByBreed(selectedBreedId)
    : Promise.resolve();

  fetchPromise
    .then(catData => {
      // Check if catData is defined and has the expected structure
      if (
        catData &&
        Array.isArray(catData) &&
        catData.length > 0 &&
        catData[0].breeds &&
        catData[0].breeds.length > 0
      ) {
        const catBreed = catData[0].breeds[0];

        // Display cat information
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
        // Handle the case when catData is not as expected
        showErrorToast(
          'Oops! Unable to retrieve cat information. Please try again.'
        );
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorToast('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      // Hide loader after fetching cat information
      hideLoader();
    });
});

function showLoader() {
  loader.style.display = 'inline-block';
  catInfoDiv.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  catInfoDiv.style.display = 'flex';
}

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}

// Fetch breeds and update SlimSelect outside of the event listener
fetchBreeds()
  .then(breeds => {
    // Update SlimSelect with breed data
    slim.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
    // Hide loader after fetching breed information
    hideLoader();
  })
  .catch(error => {
    console.error('Error:', error);
    showErrorToast('Oops! Something went wrong! Try reloading the page!');
  });
