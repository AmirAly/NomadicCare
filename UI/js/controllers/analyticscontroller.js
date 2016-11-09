ehs.controller("AnalyticsController", function ($scope, $state, $rootScope, $stateParams) {

    //Chart

    var chartDateArrayAnalytic = [
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
    for (i = 0; i < chartDateArrayAnalytic.length; i++) {
        chartMonth.push(chartDateArrayAnalytic[i].month);
        chartValue.push(chartDateArrayAnalytic[i].weight);
    }
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
        //return 0;
    };
    var configAnalytics = {
        type: 'line',
        data: {
            labels: chartMonth,
            datasets: [{
                label: "Weight Loss Plan",
                data: chartValue,
                fill: false,
                borderDash: [5, 5],
                borderColor: '#ffce56',
                pointBackgroundColor: '#369',
                pointHoverBackgroundColor: '#369',
                pointHoverBorderColor: "rgba(220,220,220,1)",

            },
            {
                label: "Blood Pressure Plan",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
                fill: false,
                borderDash: [5, 5],
                borderColor: '#ccc',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",

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
                //text: 'Health Analytics'
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    beforeTitle: function () {
                        return ['Any data here', 'Any data here2'];
                    },
                    beforeLabel: function (x, y) {
                        console.log(x);
                        console.log(y);
                        //console.log(chartDateArrayAnalytic);
                        var data = chartDateArrayAnalytic[x.index];
                        console.log(data);
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
                        labelString: 'Weight (KG)'
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

    $.each(configAnalytics.data.datasets, function (i, dataset) {
        dataset.backgroundColor = '#ddd';
        dataset.pointBorderColor = '#fff';
        dataset.pointBorderWidth = 1;
        dataset.pointHoverBorderWidth = 2,
        dataset.pointRadius = 7,
        dataset.pointHoverRadius = 10;
        dataset.pointHitRadius = 10
    });

        var ctx = document.getElementById("canvasAnalytics").getContext("2d");
        window.myLine = new Chart(ctx, configAnalytics);

});