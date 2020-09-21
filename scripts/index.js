const randomBeerElement = document.getElementById("beers");
const refreshButton = document.getElementById("new-beer");
const inputtedNameSerach = document.getElementById("name-input");
const searchForm = document.getElementById("search-form");

const createBeerHtml = (beer) => {

  let imageUrl;

  if (beer.image_url) {
    imageUrl = beer.image_url;
  }

  const html = `
      <h2 class="text-3xl m-3 font-bold">${beer.name}</h2>

      ${imageUrl ? `<img src="${imageUrl}">` : "No image available"}
      <p class="m-3">${beer.description}</p>
    `;

  return html;
};

const showBeers = () => {
  randomBeerElement.innerHTML = "Loading...";

  fetch("https://api.punkapi.com/v2/beers")
    .then((response) => response.json())
    .then((json) => {
      const beers = json;
      console.log(json);
      randomBeerElement.innerHTML = "";

      json.forEach(beer => {
        const element = document.createElement("div");
        element.classList.add(
          "container",
          "mx-auto",
        );
        const addBeer = createBeerHtml(beer);
        element.innerHTML = addBeer;
    
        randomBeerElement.appendChild(element);
      });
    });
};

refreshButton.addEventListener("click", showBeers);

showBeers();

const onSubmit = event => {
  event.preventDefault();

  const search = inputtedNameSerach.value;
  searchBeers(search);
  resetForm();

}

const searchBeers = input => {
  randomBeerElement.innerHTML = "<center>Loading...</center>";

  fetch(`https://api.punkapi.com/v2/beers?beer_name=${input}`)
    .then((response) => response.json())
    .then(json => {
      const beers = json;
      randomBeerElement.innerHTML = "";

      console.log(beers);

      if (beers.length === 0) {
        randomBeerElement.innerHTML = `<div class="container mx-auto">No beers found</div>`;
      }

      json.forEach(beer => {
        const element = document.createElement("div");
        element.classList.add(
          "container",
          "mx-auto",
        );
        const addBeer = createBeerHtml(beer);
        element.innerHTML = addBeer;

        randomBeerElement.appendChild(element);
      });
    });
}

function resetForm() {
  searchForm.reset();
}

searchForm.addEventListener("submit", onSubmit);
