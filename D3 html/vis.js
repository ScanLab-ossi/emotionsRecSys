//setting visualization margins and width and height
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// X axes scale setup
var xValue = function(d) { return d.movie_id;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom").innerTickSize(0);

// Y axes scale setup
var yValue = function(d) { return d["aveRating"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left").innerTickSize(0);

// add the graph canvas to the body of the webpage
var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

// loads the data from the API
d3.json("https://movie-mern.herokuapp.com/api/movies/", function(error, Data) {
  var data = [];
  // pushing 15 movies to display, this can be changed
  for(var i=0;i<10;i++){
    data.push(Data[i])
  }
  // converts a string to a number using unary plus:
  data.forEach(function(d) {
    d.aveRating = +d.aveRating;
    d["movie_id"] = +d["movie_id"];
  });
console.log(data)

  // defines the range according to the max and min values
  xScale.domain([-(d3.max(data, xValue)+1), d3.max(data, xValue)+2]);
  yScale.domain([-(d3.max(data, yValue)+1), d3.max(data, yValue)+2]);

  // x-axis labeling (should be changed to the right label in the future)
  svg
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", height/2)
      .style("text-anchor", "end")
      .text("Movie Id");

  // y-axis labeling (should be changed to the right label in the future)
  svg
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", width/2)
      .attr("dy", ".22em")
      .style("text-anchor", "end")
      .text("Rating");

// axes arrow heads 
svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

// appends the horizontal line together with the arrows
svg.append("line")
  .attr("x1", 0)
  .attr("y1", height/1.93)
  .attr("x2", width)
  .attr("y2", height/1.93)          
  .attr("stroke-width", 1.5)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle)"); //arrow-head marker


// appends the vertical line together with the arrows
  svg.append("line")
  .attr("x1", width/2.08)
  .attr("y1", height)
  .attr("x2", width/2.08)
  .attr("y2", 0)          
  .attr("stroke-width", 1.5)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle)"); //arrow-head marker


// displays movie's posters
var imgs = svg.selectAll("image").data(data)
            .enter()
            .append("image")
            .attr("xlink:href", d=>d.poster)
            .attr("x", xMap)
            .attr("y", yMap)
            .attr('width', 70)
            .attr('height', 70)
            .on("mouseover", showTooltip) 
            .on("mouseout", hideTooltip)
            .on("click", showClicked)

function showTooltip(d){
            div.transition()
                .duration(25)    // how fast the tooltip show up once the mouse hovers above the poster
                .style("opacity", 0.95);  // brightness 
            div.html("Title : " + d.title +/* "</br>" + "Writer : " + d.writer + "</br>" + "Director : " + d.director + */
            "</br>" + "Genre : " + d.genre + "</br>" + "Year : " + d.year+ "</br>" + "Average Rating : " + d.aveRating)
               .style("left", (d3.event.pageX ) + "px")
               .style("top", (d3.event.pageY- 28) + "px");
}

// hides the tooltip once we no longer hover
function hideTooltip(){               
              div.transition()
                 .duration(25)
                 .style("opacity", 0);   // opacity 0 hides it
}


function showClicked(d){
    d3.select("#clickedtable").style("display","block") ;
    var mdetails = document.getElementById("movieDetails");
    var mImg = document.getElementById("movieImg");

    mdetails.innerHTML = "Title : " + d.title + "<br/></br>" + "Writer : " + d.writer + "<br/></br>" + "Director : " + d.director + "<br/></br>" + "Genre : " + d.genre + "<br/></br>" + "Year : " + d.year+ "<br/></br>" + "Average Rating : " + d.aveRating;
    mImg.src = d.poster;
}
});