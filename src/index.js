async function getPlanets(planetApi = API) {
  const response = await fetch(planetApi);
  const data = await response.json();
  planets = [...planets, ...data.results];
  if (data.next) {
    getPlanets(data.next);
  }
}

function renderResults() {}

async function getDataFromEndpoint() {
  const endpoint = this.dataset.endpoint;
  const api = `https://swapi.co/api/${endpoint}/`;
  const { results } = await fetch(api).then(response => response.json());
  console.log(results.sort((a, b) => (a.episode_id > b.episode_id ? 1 : -1)));
  renderResults(results);
}

const endpoints = document.querySelector(".endpoints");

endpoints.childNodes.forEach(child => {
  child.addEventListener("click", getDataFromEndpoint);
});
