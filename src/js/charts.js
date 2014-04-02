(function(global) {

    "use strict";

    var pieChart = function pieChart(elSelector, data, dataSelector, colourSelector) {

        var arc, pie, svg, $el = $(elSelector), g, resizer;

        resizer = function resizer() {

            arc.outerRadius(radius($el));

            d3
                .select(elSelector)
                .select("svg")
                .attr("width", $el.width())
                .attr("height", $el.height())
                .select("g")
                .attr("transform", "translate(" + $el.width() / 2 + "," + $el.height() / 2 + ")")
                .selectAll("g")
                .selectAll("path")
                .attr("d", arc);
        };

        arc = d3
            .svg
            .arc()
            .outerRadius(radius($el))
            .innerRadius(0);

        pie = d3.layout.pie().sort(null).value(dataSelector);

        svg = d3
            .select(elSelector)
            .append("svg")
            .attr("width", $el.width())
            .attr("height", $el.height())
            .append("g");

        g = svg
            .attr("transform", "translate(" + $el.width() / 2 + "," + $el.height() / 2 + ")")
            .selectAll("g")
            .data(pie(data))
            .enter()
            .append("g")
            .append("path")
            .attr("d", arc)
            .attr("class", colourSelector);

        $(window).resize(resizer);

        return function() {

            $(window).unbind("resize", resizer);

            d3
                .select(elSelector)
                .select("svg")
                .remove();
        };
    };

    global.Charts = {};
    global.Charts.pie = pieChart;

    function radius($el) {
        return Math.min($el.width(), $el.height()) / 2;
    }

})(this);