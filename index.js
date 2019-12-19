document.addEventListener("DOMContentLoaded", () => {
  let select = document.querySelector("select");
  let div = document.querySelector("#movieInfo");
  let form = document.querySelector("form");
  let submissions = document.querySelector("ul");
  let input = document.querySelector("#review");
  let title = document.createElement("h3");

  const movieOptions = async () => {
    try {
      let res = await axios.get(`https://ghibliapi.herokuapp.com/films`);
      res.data.forEach(event => {
        let option = document.createElement("option");
        option.innerText = event.title;
        option.value = event.id;
        select.appendChild(option);
      });
    } catch (err) {
      debugger;
    }
  };
  movieOptions();

  select.addEventListener("change", async event => {
    try {
      div.innerHTML = "";
      let res = await axios.get(
        `https://ghibliapi.herokuapp.com/films/${event.target.value}`
      );
      title.innerText = res.data.title;
      div.appendChild(title);
      let releaseDate = document.createElement("p");
      releaseDate.innerText = res.data.release_date;
      let description = document.createElement("p");
      description.innerText = res.data.description;
      div.appendChild(releaseDate);
      div.appendChild(description);
    } catch (err) {
      debugger;
    }
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    let yourReview = document.createElement("li");
    yourReview.innerHTML = `<b>${title.innerText}</b>: ${input.value}.`;
    submissions.appendChild(yourReview);
  });
});
