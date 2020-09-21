// fetch('https://catfact.ninja/fact')
//   .then(response => response.json())
//   .then(data => console.log(data));

const catFacts = document.getElementById("cat-fact");

const showNewFact = document.getElementById("new-fact");
const inputForm = document.getElementById("user-input");

const limitInput = document.getElementById("number-input");

const catAPI = (limit) => {
  fetch(`https://catfact.ninja/facts?limit=${limit}`)
    .then((response) => response.json())
    .then((json) => {
      const entries = json.data;

      catFacts.innerHTML = '';

      entries.forEach((entry) => {

        const element = document.createElement("li");
        element.classList.add(
          "m-4",
        );
        element.innerHTML = entry.fact;

        catFacts.appendChild(element);
      });
    });
};

const onFormSubmit = event => {
    event.preventDefault();

    let limit = limitInput.value;

    resetForm();
    catAPI(limit);
}

const resetForm = () => {
    inputForm.reset();
  };

showNewFact.addEventListener("click", () => {
    catAPI();
  });
  
inputForm.addEventListener("submit", onFormSubmit);
