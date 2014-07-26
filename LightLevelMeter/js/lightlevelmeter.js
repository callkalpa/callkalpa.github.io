var max = -1;
var min = 10000;
var value = 0;
var chartData = new TimeSeries();
var smoothie = new SmoothieChart({yRangeFunction: myYRangeFunction});

smoothie.streamTo(document.getElementById("mycanvas"), 1000);

function myYRangeFunction(range) {
    return {min: min, max: max};
}

function updateMax(max_value) {
    document.getElementById("max").innerHTML = max_value;
}

function updateMin(min_value) {
    document.getElementById("min").innerHTML = min_value;
}

document.getElementById('results').innerHTML = "waiting for change in light level...";

window.addEventListener('devicelight', function (event) {
    value = event.value;
    document.getElementById("results").innerHTML = value;

    if (value > max) {
        max = value;
        updateMax(max);
        smoothie.maxValue = max;
    }

    if (value < min) {
        min = value;
        updateMin(min);
        smoothie.minValue = min;
    }
});

smoothie.addTimeSeries(chartData, {fillStyle: 'rgb(255,0,0'});

setInterval(function () {
    chartData.append(new Date().getTime(), value);
}, 1000);


