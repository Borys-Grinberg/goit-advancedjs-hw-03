import axios from 'axios';

const apiKey =
  'live_7zO2UtHss6WanH1oLQ1vnbzQS31rHHFk6zvi69lyordiqDagXpIxykJooBldDqh8';

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

export function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    axios
      .get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
