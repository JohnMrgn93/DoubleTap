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
  AfterRender();
}

function AfterRender() {
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

router.hooks({
  before: (done, params) => {
    let view = "Home";
    if (params && params.data && params.data.view) {
      view = capitalize(params.data.view);
    }

    if (view === "Home") {
      const options = {
        method: "GET",
        url: "https://online-movie-database.p.rapidapi.com/auto-complete",
        params: { q: "Star Wars" },
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
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    } else if (view === "Pizza") {
      axios
        .get(`${process.env.PIZZA_PLACE_API_URL}`)
        .then(response => {
          Store.Pizza.pizzas = response.data;
          done();
        })
        .catch(error => {
          console.log("It puked", error);
          done();
        });
    } else {
      done();
    }
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(Store[view]);
    }
  })
  .resolve();
