let outerWidth = 600;
let outerHeight = 400;

let margin = { left: 30, top: 30, right: 30, bottom: 30 };

let innerWidth = outerWidth - margin.left - margin.right;
let innerHeight = outerHeight - margin.top - margin.bottom;
// let rMin = 5;
// let rMax = 20;
let rMin = 1;
let rMax = 8;
let xColumn = "sepal_length";
let yColumn = "petal_length";
let rColumn = "sepal_width";
let colorColumn = "species";

// outer area
let svg = d3
    .select("body")
    .append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);

// inner visualisation area
let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let xScale = d3.scaleLinear().range([0, innerWidth]);
let yScale = d3.scaleLinear().range([innerHeight, 0]);
let rScale = d3.scaleLinear().range([rMin, rMax]);
let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// g.append("g")
//     .call(d3.axisBottom(xScale));
// g.append("g")
//     .call(d3.axisRight(yScale));

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

    let circles = g.selectAll("circle").data(data);
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
        })
        .attr("fill", function(d) {
            return colorScale(d[colorColumn]);
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
