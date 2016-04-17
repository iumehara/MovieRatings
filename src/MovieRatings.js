import React from 'react'

export default class MovieRatings extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 'movies': []};
	}

  fetchData() {
    return fetch("https://movieratingsdata.firebaseio.com/movies.json")
      .then((response) => {
        return response.json()
      }).then((json) => {
        return json;
      }).catch((ex) => {
        console.log('parsing failed', ex);
      });
  }

  componentWillMount() {
    var self = this;
    var data = this.fetchData()
      .then((data) => {
        self.setState({'movies': data});
      }
    );
  }

  render() {
    var formattedMovies = this.state.movies.map((movie) => {
      return (
        <tr key={movie.FILM}>
          <td>{movie.FILM}</td>
          <td>{movie.RottenTomatoes}</td>
          <td>{movie.Metacritic}</td>
          <td>{movie.IMDB}</td>
        </tr>
      )
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rotten Tomatoes</th>
            <th>Metacritic</th>
            <th>IMDB</th>
          </tr>
        </thead>
        <tbody>
          {formattedMovies}
        </tbody>
      </table>
    );
  }
}
