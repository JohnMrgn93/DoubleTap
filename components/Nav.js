import html from "html-literal";

export default links => html`
  <nav class="Nav-bar">
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links.map(
        link =>
          `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
      )}
      <nav class="Nav-bar">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="About.html">Who we Are</a></li>
          <li><a href="Contact.html">Contact Us</a></li>
          <li><a href="News.html">Entertainment News</a></li>
        </ul>
      </nav>
      ;
    </ul>
  </nav>
`;
