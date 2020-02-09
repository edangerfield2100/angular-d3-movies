import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input()
  data: any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    console.log(this.data);
    if (this.data) {
      this.renderBarChart(this.data);
    }
  }

  private renderBarChart(movieData) {

    // filter data (as needed)
    const filteredMovieData = movieData.filter(movie => movie.revenue > 500000000);
    console.log('filteredMovieData', filteredMovieData);

    // transform and sort data (as needed)
    const sortedMovies = filteredMovieData.sort((a, b) => d3.descending(a.revenue, b.revenue));
    console.log('sortedMovies', sortedMovies);

    // set margins
    const margin = {top: 40, right: 40, left: 240, bottom: 40};
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // find highest x value for scaling
    const xMax = d3.max(sortedMovies, d => d.revenue);

    // scale X
    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    // scale Y
    const yScale = d3
      .scaleBand()
      .domain(sortedMovies.map(d => d.title))
      .rangeRound([0, height])
      .paddingInner(0.25);    // set padding btw Y-axis elements

    // establish base SVG
    const svg = d3.select('.bar-chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // draw horiztonal bars
    const bars = svg
      .selectAll('.bar')
      .data(sortedMovies)
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.title))
      .attr('width', d => xScale(d.revenue))
      .attr('height', yScale.bandwidth())
      .style('fill', 'green');

    // draw x-axis
    // const xAxis = d3.axisTop(xScale)
    //   .tickFormat(d3.format('~s'))
    //   .tickSizeInnr(-height)
    //   .tickSizeOuter(0);

    // const xAxisAppend = svg
    //   .append('g')
    //   .attr('class', 'x axis')
    //   .call(xAxis);

    // draw y axis text
    const yAxis = d3.axisLeft(yScale).tickSize(0);
    const yAxisDraw = svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // adjust placement of y-axis text
    yAxisDraw.selectAll('text').attr('dx', '-0.6em');
  }
}
