import * as d3 from "d3/build/d3";

export function D3() {
    var item = document.querySelectorAll(".carousel__item-timer_time");
    Array.from(item).forEach(items => setData(items));
}

/**
 *
 * @param selector
 */
function setData(selector) {
    var getdatestart = Date.parse(selector.querySelector("time.start").dateTime);
    var getdateend = Date.parse(selector.querySelector("time.end").dateTime);
    var currentDate = Date.now();
    var allDate = getdateend - getdatestart;
    var current = getdateend - currentDate;
    var data = [Math.round(100 - (current / allDate) * 100), Math.round((current / allDate) * 100)];
    if (data[0] < 0) {
        data = [0, 100]
    }
    var width = 122,
        height = 122,
        radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .range(["#fff", "#090909"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d;
        });
    var svg = d3.select(selector.querySelector(".wrapper")).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    //Добавление внешнего круга
    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data);
        });
    /**
     * Прокрутка
     */
    d3.interval(function () {
        svg.selectAll("path")
            .transition()
            .delay(function (d, i) {
                return i * 500;
            })
            .duration(4000)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, 2 * Math.PI);
                return function (t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });
    }, 6000, -6000);


    var circle = svg.append("g");
    circle.append("circle")
        .attr("r", radius - 12)
        .style("fill", "#090909")
        .style("stroke", "none")
        .style("stroke-width", "2");
    //Добавление текста
    var days = getDays(Math.ceil(current / 3600 / 1000 / 24))
    var set_text_days = daysNamed(days);
    circle.append("text")
        .text(days)
        .attr("class", "time")
        .attr("text-anchor", "middle")
        .attr("dx", 0)
        .attr("font-size", 48);
    circle.append("text")
        .attr("font-size", 16)
        .attr("class", "text")
        .attr("dx", radius - radius / 0.82)
        .attr("dy", 20)
        .text(set_text_days);
}

/**
 * Склонение
 * @param date
 * @return {string}
 */
function daysNamed(date) {
    if (date === 1) {
        return "день";
    } else if ([2, 3, 4].indexOf(date) !== -1) {
        return "дня";
    } else {
        return "дней";
    }
}

function getDays(formul) {
    return formul >= 0 ? formul : 0;
}
