const api_url = "https://corona.lmao.ninja/v2/countries/India?strict&query%20";

async function getapi(url) {

    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    show(data);
    drawChart(data);
}
getapi(api_url);

function show(data) {

    document.getElementById("total_case").innerHTML = data['cases'];
    document.getElementById("active_case").innerHTML = data['active'];
    document.getElementById("death_case").innerHTML = data['deaths'];
    document.getElementById("today_total_recovered").innerHTML = data['recovered'];
    document.getElementById("today_tests").innerHTML = data['tests'];
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
      
      
    function drawChart(info) {
        var data = google.visualization.arrayToDataTable([
        ['Current COVID status', 'Number of cases'],
        ['Active',info['active']],
        ['Recovered', info['recovered']],
        ['Death', info['deaths']]
      ]);
      
        
        var options = {'title':'COVID Cases Analysis', 'width':1000, 'height':1000};
      
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }