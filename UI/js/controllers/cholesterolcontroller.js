ehs.controller("CholesterolController", function ($scope, $state, $rootScope, $stateParams) {

    //Chart

    var chartDateArray = [
            { month: 'January', weight: '90', date: '07/01/2016 12:49 pm' },
            { month: 'February', weight: '80', date: '03/02/2016 03:30 pm' },
            { month: 'March', weight: '85', date: '12/03/2016 01:49 pm' },
            { month: 'April', weight: '75', date: '22/04/2016 02:49 pm' },
            { month: 'May', weight: '70', date: '15/05/2016 01:15 pm' },
            { month: 'June', weight: '65', date: '09/06/2016 03:10 pm' },
            { month: 'July', weight: '67', date: '03/07/2016 02:02 pm' }
    ];
    var chartMonth = [];
    var chartValue = [];
    for (i = 0; i < chartDateArray.length; i++) {
        chartMonth.push(chartDateArray[i].month);
        chartValue.push(chartDateArray[i].weight);
    }
    var config = {
        type: 'line',
        data: {
            labels: chartMonth,
            datasets: [{
                label: "Blood Pressure(LDL/ HDL/ total md/dl)",
                data: chartValue,
                fill: false,
                borderDash: [5, 5],
            }]
        },
        options: {
            responsive: true,
            // legend is the part that allow show / hide lines seperatly
            legend: {
                display: false,
            },
            title: {
                display: true,
                //text: 'Cholesterol'
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    beforeTitle: function () {
                        return ['Any data here', 'Any data here2'];
                    },
                    beforeLabel: function (x, y) {
                        var data = chartDateArray[x.index];
                        return data.date;
                    }
                },
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    },
                    gridLines: {
                        color: "rgba(255,255,255,0.2)",
                        zeroLineColor: "rgba(255,255,255,0.2)"
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cholesterol(LDL/ HDL/ total md/dl)'
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 250,
                    },
                    gridLines: {
                        color: "rgba(255,255,255,0.2)",
                        zeroLineColor: "rgba(255,255,255,0.2)"
                    }
                }]
            }
        }
    };
    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.global.defaultFontSize = 15;
   
    $.each(config.data.datasets, function (i, dataset) {
        dataset.borderColor = '#fff';
        dataset.backgroundColor = '#ddd';
        dataset.pointBorderColor = '#fff';
        dataset.pointBackgroundColor = 'rgba(75,192,192,1)';
        dataset.pointBorderWidth = 1;
        dataset.pointHoverBorderWidth = 2,
        dataset.pointRadius = 7,
        dataset.pointHoverRadius = 10;
        dataset.pointHoverBackgroundColor = "rgba(75,192,192,1)",
        dataset.pointHoverBorderColor = "rgba(220,220,220,1)",
        dataset.pointHitRadius = 10
    });


    var ctx = document.getElementById("canvasCholesterol").getContext("2d");
    window.myLine = new Chart(ctx, config);

});
