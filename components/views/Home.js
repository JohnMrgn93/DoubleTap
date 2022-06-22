import html from "html-literal";

export default () => html`
  <section id="jumbotron">
    <h2>Find A Flick</h2>
    <a href="index.html"
      >"You can click below to a movie to find a movie. Hit Find A Flick and
      we'll help you out!"</a
    >
  </section>

  <p>
    You can click below to a movie to find a movie. Hit Find A Flick and we'll
    help you out!
  </p>
  <div>
    <button class="button-81" role="button">
      <a href="/Movies" data-navigo>Get A Ticket</a>
    </button>
  </div>
`;
