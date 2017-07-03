var legend = function() {
bar_enter.append("text")
.text(function(d) {
  if (d.y1 - d.y0 == 0) {} else {
    return d3.format(".1s")(d.y1 - d.y0) + "%";
  }
})
  // Hier wird text mittig gesetzt!

  .attr("text-anchor", "middle")
  .attr("y", function(d) {
    return y(d.y1) + (y(d.y0) - y(d.y1)) / 2;
  })
  // Hier wird Text fett gemacht!
  .style("font-weight", 'bold')
  .attr("x", x.rangeBand() / 2)
  .style("fill", '#ffffff');

bar
  .on("mousemove", function(d) {
    divTooltip.style("left", d3.event.pageX + 10 + "px");
    divTooltip.style("top", d3.event.pageY - 25 + "px");
    divTooltip.style("display", "inline-block");
    var elements = document.querySelectorAll(':hover');
    l = elements.length
    l = l - 1
    element = elements[l].__data__
// Hier wird gerundet!
    value = d3.format(".1s")(element.y1 - element.y0)
    divTooltip.html((d.label) + "<br>" + element.name + "<br>" + value + "%");
  });
bar
  .on("mouseout", function(d) {
    divTooltip.style("display", "none");
  });
  // Hier wird Legende angepasst!
svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(0," + (height + 30) + ")");
var legend = d3.legend.color()

  .shape('circle')
  .shapeWidth(20)
  .orient('horizontal')
  .shapePadding(60)

  .scale(color);
svg.select(".legendLinear")
  .call(legend)
  .attr("transform", "translate(100," + (height + 60) + ")");
}
