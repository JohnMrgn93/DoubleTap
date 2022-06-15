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

      const toppings = [];
      for (let input of inputList.toppings) {
        if (input.checked) {
          toppings.push(input.value);
        }
      }

      const requestData = {
        genre: inputList.genre.value,
        rating: inputList.rating.value
      };

      const options = {
        method: "GET",
        url:
          "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre",
        params: { genre: "action", limit: "10" },
        headers: {
          "X-RapidAPI-Key":
            "cd975feb43msh18bff400302a2c5p11fb9cjsne79d1466a63c",
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com"
        }
      };

      axios
        .request(options)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.error(error);
        });
    });
  }
}

// router.hooks({
//   before: (done, params) => {
//     let view = "Home";
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
