import { Header, Nav, Main, Footer } from "./components";
import * as Store from "./Store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
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

  axios.get(
    `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`
  );

  function AfterRender() {
    document
      .querySelector(".fa-bars")
      .addEventListener("click", () =>
        document.querySelector("nav > ul").classList.toggle("hidden--mobile")
      );
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
}
