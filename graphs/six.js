function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
dataset = [{
    label: "StudentenHS Aalen",
    "Fake": 25,
    "Prototyp": 0,
    "Mensch/Maschine/Maschine": 50,
    "Kommunikation": 12.5,
    "Programmieren": 0,
    "Keine Antwort": 0,
    "Ingenieursausbildung": 12.5
  },
  {
    label: "Studenten IoT HfG",
    "Fake": 7.14,
    "Prototyp": 42.86,
    "Mensch/Maschine/Maschine": 21.43,
    "Kommunikation": 14.29,
    "Programmieren": 14.29,
    "Keine Antwort": 0,
    "Ingenieursausbildung": 0
  }
];



var margin = {
    top: (parseInt(d3.select('.graph').style('height'), 10) / 20),
    right: (parseInt(d3.select('.graph').style('width'), 10) / 20),
    bottom: (parseInt(d3.select('.graph').style('height'), 10) / 6),
    left: (parseInt(d3.select('.graph').style('width'), 10) / 20)
  },
  width = parseInt(d3.select('.graph').style('width'), 10) - margin.left - margin.right,
  height = parseInt(d3.select('.graph').style('height'), 10) - margin.top - margin.bottom;
var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1, .3);
var y = d3.scale.linear()
  .rangeRound([height, 0]);
var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
  .range(colorRange.range());
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));
var svg = d3.select("#six").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
color.domain(d3.keys(dataset[0]).filter(function(key) {
  return key !== "label";
}));
dataset.forEach(function(d) {
  var y0 = 0;
  d.values = color.domain().map(function(name) {
    return {
      name: name,
      y0: y0,
      y1: y0 += +d[name]
    };
  });
  d.total = d.values[d.values.length - 1].y1;
});
x.domain(dataset.map(function(d) {
  return d.label;
}));
y.domain([0, d3.max(dataset, function(d) {
  return d.total;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 9)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("%");
var bar = svg.selectAll(".label")
  .data(dataset)
  .enter().append("g")
  .attr("class", "g")
  .attr("transform", function(d) {
    return "translate(" + x(d.label) + ",0)";
  });
svg.selectAll(".x.axis .tick text")
  .call(wrap, x.rangeBand());

var bar_enter = bar.selectAll("rect")
  .data(function(d) {
    return d.values;
  })
  .enter();

bar_enter.append("rect")
  .attr("width", x.rangeBand())
  .attr("y", function(d) {
    return y(d.y1);
  })
  .attr("height", function(d) {
    return y(d.y0) - y(d.y1);
  })
  .style("fill", function(d) {
    return color(d.name);
  });

  legend();
