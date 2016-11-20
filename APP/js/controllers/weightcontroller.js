ehs.controller("WeightController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
 
    // start here
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yAxesLabel = 'Weight(KG)';

    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthmeasurment';
        $rootScope.activetab = 'weight';
    }, 500);
    console.log($rootScope.activetab);

    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDateWeight')).addClass('used');
        });
    }

    
    var chartDateArray = [
            { weight: '90', date: new Date('01/07/2016'), Notes: 'sssss' },
            { weight: '80', date: new Date('02/03/2016'), Notes: 'aaaa' },
            { weight: '85', date: new Date('03/12/2016'), Notes: 'eeeee' },
            { weight: '75', date: new Date('04/22/2016'), Notes: 'hhhhh' },
            { weight: '70', date: new Date('05/15/2016'), Notes: 'ffff' },
            { weight: '65', date: new Date('06/09/2016'), Notes: 'ddd' },
            { weight: '67', date: new Date('07/03/2016'), Notes: 'zzzzz' },
            { weight: '67', date: new Date('07/21/2016'), Notes: 'asdsadasd' },
            { weight: '67', date: new Date('08/21/2016'), Notes: 'asdsadasd' }
    ];

   //Chart
    var chartMonth = [];
    var chartValue = [];
    for (i = 0; i < chartDateArray.length; i++) {
        chartMonth.push(chartDateArray[i].date);
        chartValue.push(chartDateArray[i].weight);
    }
    var config = {
        type: 'line',
        data: {
            labels: chartMonth,
            datasets: [{
                label: "Weight(Kg)",
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
                //text: 'Weight'
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        var d = (chartDateArray[tooltipItem[0].index]).date;
                        var wholeDate = d.getDate() + " " + monthShortNames[d.getMonth()] + " " + d.getFullYear();
                        return "Date: " + wholeDate;
                    },
                    label: function (tooltipItem, data) {
                        var obj = chartDateArray[tooltipItem.index];
                        return yAxesLabel + [obj.weight];
                    },
                    afterLabel: function (tooltipItem, data) {
                        var obj = chartDateArray[tooltipItem.index];
                        return "Notes: " + [obj.Notes];
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
                    },
                    type: 'time',
                    time: {
                        unit: 'month',
                        unitStepSize: 1,
                        displayFormats: {
                            'millisecond': 'MMM',
                            'second': 'MMM',
                            'minute': 'MMM',
                            'hour': 'MMM',
                            'day': 'MMM',
                            'week': 'MMM',
                            'month': 'MMM',
                            'quarter': 'MMM',
                            'year': 'MMM',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yAxesLabel
                    },
                    gridLines: {
                        color: "rgba(255,255,255,0.2)",
                        zeroLineColor: "rgba(255,255,255,0.2)"
                    }
                }]
            }
        }
    };
    console.log(config);

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
    var ctx = document.getElementById("canvasWeight").getContext("2d");
    window.myLine = new Chart(ctx, config);



});
