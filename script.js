let outerWidth = 825;
let outerHeight = 430;
let rMin = 5;
let rMax = 20;
let xColumn = "sepal_length";
let yColumn = "petal_length";
let rColumn = "sepal_width";

let svg = d3
    .select("body")
    .append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);

let xScale = d3.scaleLinear().range([0, outerWidth]);
let yScale = d3.scaleLinear().range([outerHeight, 0]);
let rScale = d3.scaleLinear().range([rMin, rMax]);

function render(data) {
    xScale.domain(
        d3.extent(data, d => {
            return d[xColumn];
        })
    );
    yScale.domain(
        d3.extent(data, d => {
            return d[yColumn];
        })
    );
    rScale.domain(
        d3.extent(data, d => {
            return d[rColumn];
        })
    );

    let circles = svg.selectAll("circle").data(data);
    circles
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[xColumn]);
        })
        .attr("cy", function(d) {
            return yScale(d[yColumn]);
        })
        .attr("r", function(d) {
            return rScale(d[rColumn]);
        });

    circles.exit().remove();
}

function type(d) {
    /**
     * Parse d data to integers
     **/
    d.sepal_length = +d.sepal_length;
    d.petal_length = +d.petal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_width = +d.petal_width;
    return d;
}

// read csv file
d3.csv("iris.csv", type)
    .then(function(data) {
        render(data);
    })
    .catch(function(error) {
        console.log(error);
    });
