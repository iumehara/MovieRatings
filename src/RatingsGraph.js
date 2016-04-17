import React from 'react'
import dc from 'dc'
import d3 from 'd3'
import crossfilter from 'crossfilter'

export default class RatingsGraph extends React.Component {
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

  createPlot(data) {
		var scatterPlot = dc.scatterPlot("#scatterPlot");

		var ndx = crossfilter(data),
		    ratingsDimension = ndx.dimension((d) => {
		      return [+d.RottenTomatoes, +d.Metacritic];
		    }),
		    ratingsGroup = ratingsDimension.group();

		scatterPlot
			.width(500)
	    .height(500)
	    .x(d3.scale.linear().domain([0, 100]))
	    .y(d3.scale.linear().domain([0, 100]))
	    .yAxisLabel("Metacritic")
	    .xAxisLabel("RottenTomatoes")
	    .clipPadding(10)
	    .dimension(ratingsDimension)
	    .excludedOpacity(0.5)
	    .group(ratingsGroup);

		scatterPlot.render();
  }

  componentWillMount() {
    var self = this;
    this.fetchData()
      .then((data) => {
        self.createPlot(data);
      }
    );
  }

  render() {
    return (
      <div id="scatterPlot">Line Chart!</div>
    );
  }
}
