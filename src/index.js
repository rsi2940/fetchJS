async function getPlanets(planetApi = API) {
  const response = await fetch(planetApi);
  const data = await response.json();
  planets = [...planets, ...data.results];
  if (data.next) {
    getPlanets(data.next);
  }
}

function renderFilms(results) {
  if (document.querySelector(".films").innerHTML.length > 0) return;

  const releaseDate = results.sort((a, b) =>
    a.release_date.localeCompare(b.release_date)
  );

  releaseDate.forEach(film => {
    const filmHTML = `
    <div class="film">
      <h1 class="title">${film.title}</h1>
      <h2 class="episode">Episode ${film.episode_id}</h2>
      <div class="release-date">${film.release_date}</div>
      <div class="director">${film.director}</div>
      <div class="producer">${film.producer}</div>
    </div>
    `;
    const parentDiv = document.createElement("div");
    parentDiv.innerHTML = filmHTML;
    document.querySelector(".films").appendChild(parentDiv);
  });
}

async function getDataFromEndpoint() {
  const endpoint = this.dataset.endpoint;
  const api = `https://swapi.co/api/${endpoint}/`;
  const { results } = await fetch(api).then(response => response.json());

  switch (endpoint) {
    case "films":
      renderFilms(results);
      break;
    case "people":
      renderPeople(results);
      break;
    case "planets":
      renderPlanets(results);
      break;
    case "species":
      renderSpecies(results);
      break;
    case "starships":
      renderStarships(results);
      break;
    case "vehicles":
      renderVehicles(results);
      break;
  }
}

const endpoints = document.querySelector(".endpoints");

endpoints.childNodes.forEach(child => {
  child.addEventListener("click", getDataFromEndpoint);
});
