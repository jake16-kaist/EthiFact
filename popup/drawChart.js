const ctx = document.getElementById('publisherChart');

import publisher_data from "../data/publishers.json" assert { type: 'json' };
import source_data from "../data/source_types.json" assert { type: 'json'};
import citation_data from "../data/citation_counts.json" assert { type: 'json' };

var arrayData_pub = [['Publisher', '# of journals']];
for (let i = 0; i < publisher_data.lables.length; i++) {
    arrayData_pub.push([publisher_data.lables[i], publisher_data.data[i]])
}

var arrayData_source = [['Publisher', '# of journals']];
for (let i = 0; i < source_data.lables.length; i++) {
    arrayData_source.push([source_data.lables[i], source_data.data[i]])
}

var arrayData_cit = [['Publisher', '# of journals']];
for (let i = 0; i < citation_data.lables.length; i++) {
    arrayData_cit.push([citation_data.lables[i], citation_data.data[i]])
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawSourceTypeChart);
google.charts.setOnLoadCallback(drawPublisherChart);
google.charts.setOnLoadCallback(drawCitationChart);

function drawSourceTypeChart() {

    var data = google.visualization.arrayToDataTable(arrayData_source);

    var options = {
        title: 'Number of journals by source type'
    };

    var chart = new google.visualization.PieChart(document.getElementById('sourceChart'));
    chart.draw(data, options);
}

function drawPublisherChart() {

    var data = google.visualization.arrayToDataTable(arrayData_pub);

    var options = {
        title: 'Number of journals by publisher'
    };

    var chart = new google.visualization.PieChart(document.getElementById('publisherChart'));
    chart.draw(data, options);
}

function drawCitationChart() {

    var data = google.visualization.arrayToDataTable(arrayData_cit);

    var options = {
        title: 'Number of journals by citation count'
    };

    var chart = new google.visualization.PieChart(document.getElementById('citationChart'));
    chart.draw(data, options);
}
