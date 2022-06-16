import html from "html-literal";

export default () => html`
  <section id="order">
    <form id="orderForm" method="POST" action="">
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

      <div>
        <label for="Genre">Genre:</label>
        <input
          type="submit"
          name="Genre"
          id="Genre"
          placeholder="Select Genre"
          required
        />
      </div>

      <div>
        <label for="Rating">Rating:</label>
        <select id="Rating" name="Rating">
          <option value="">Select a Rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </select>
      </div>

      <input type="submit" name="submit" value="Submit Selections" />
    </form>
  </section>
`;
