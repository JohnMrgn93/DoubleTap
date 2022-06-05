import html from "html-literal";

export default () => html`
  <section id="order">
    <form id="order" method="POST" action="">
      <h2>Find A Flick!</h2>
      <div>
        <label for="Genre">Genre:</label>
        <select id="Genre" name="Genre">
          <option value="">Select a Genre</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animated">Animated</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Documentary">Documentary</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Musical">Musical</option>
          <option value="Sci Fi">Sci Fi</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <input type="submit" name="submit" value="Submit Selections" />
    </form>
  </section>
`;
