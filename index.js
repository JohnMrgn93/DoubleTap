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

// router.hooks({
//   before: (done, params) => {
//     let view = "Movies";
//     if (params && params.data && params.data.view) {
//       view = capitalize(params.data.view);
//     } else {
//       done();
//     }
//   }
// });

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(Store[view]);
    }
  })
  .resolve();
