import { Header, Nav, Main, Footer } from "./components";
import * as Store from "./Store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
//import dotenv from "dotenv";
const router = new Navigo("/");

function render(state = Store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(Store.Links)}
    ${Main(state)}
    ${Footer()}
  `;
  router.updatePageLinks();
  AfterRender(state);
}

function AfterRender(state) {
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );

  if (state.view === "Movies") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const inputList = event.target.elements;

      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&with_genres=${inputList.Genre.value}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&&certification-country=US&certification=${inputList.Rating.value}`
        )
        .then(response => {
          console.log(response.data.results);
          Store.Movies.movies = response.data.results;
        });

      const movies = [];
      for (let input of inputList) {
        if (input.checked) {
          movies.push(input.value);
        }
      }
      const requestData = {
        Genre: inputList.Genre.value,
        Rating: inputList.Rating.value
      };

      axios
        .post(`${process.env.THE_MOVIE_DATABASE_API_URL}`, requestData)
        .then(response => {
          console.log(response.data);
          Store.Movies.movie.push(response.data);
          router.navigate("/Movies");
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(Store[view]);
    }
  })
  .resolve();
