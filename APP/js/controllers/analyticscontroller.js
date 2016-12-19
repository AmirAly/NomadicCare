ehs.controller("AnalyticsController", function ($scope, $state, $rootScope, $stateParams, $timeout, API) {
    // start here
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yAxesLabel = 'Multiple values';

    console.log($rootScope.firstArray);
    $scope.chartDataArray = $rootScope.firstArray;

    var myLine;

    $scope.$watch('currentClientInfo', function () {
        if (typeof $scope.currentClientInfo === 'undefined') { }
        else {
            $timeout(function () {
                console.log($scope.currentClientInfo);
                $rootScope.activeoutertab = 'healthmeasurment';
                $rootScope.activetab = 'weight';
                // Get data
                var req = {
                    method: 'get',
                    url: '/HealthMeasurments/' + $scope.currentClientInfo._id + '/' + $rootScope.secondArrayName,
                    data: {}
                }
                ////loader
                $rootScope.loading = true;

                API.execute(req).then(function (_res) {
                    console.log(_res.data.data);
                    if (_res.data.code == 100) {
                        $scope.chartDataArray2 = _res.data.data;
                        $scope.chartDataArray2.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
                            return new Date(b.Date) - new Date(a.Date);
                        });
                    }
                    else {
                        $scope.chartDataArray2 = [];
                    }
                    //$scope.loading = false;
                }, function (error) {
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                }).finally(function () {
                    $scope.drawChart().then(function () {
                        console.log('then');
                    });
                    $rootScope.loading = false;
                });

            }, 500);
        }
    });

    $scope.drawChart = function () {
        //Chart
        var chartMonth = [];
        var chartValue1 = [];
        for (i = 0; i < $scope.chartDataArray.length; i++) {
            chartMonth.push($scope.chartDataArray[i].Date);
            chartValue1.push($scope.chartDataArray[i].Value);
        }
        var chartValue2 = [];
        for (i = 0; i < $scope.chartDataArray2.length; i++) {
            chartMonth.push($scope.chartDataArray2[i].Date);
            chartValue2.push($scope.chartDataArray2[i].Value);
        }
        var config = {
            type: 'line',
            data: {
                labels: chartMonth,
                datasets: [{
                    label:'other value',// yAxesLabel,
                    data: chartValue1,
                    fill: false,
                    //borderDash: [5, 5],
                },
                {
                    label: $rootScope.secondArrayName,
                    data: chartValue2,
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
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            //var d = new Date(($scope.chartDataArray[tooltipItem[0].index]).Date);
                            //var wholeDate = d.getDate() + " " + monthShortNames[d.getMonth()] + " " + d.getFullYear();
                            //return "Date: " + wholeDate;
                        },
                        label: function (tooltipItem, data) {
                            var obj = $scope.chartDataArray[tooltipItem.index];
                            var obj2 = $scope.chartDataArray2[tooltipItem.index];
                            return ["other value" + " " + [obj.Value], $rootScope.secondArrayName + " " + [obj2.Value]];
                        },
                        afterLabel: function (tooltipItem, data) {
                            var obj = $scope.chartDataArray[tooltipItem.index];
                            var obj2 = $scope.chartDataArray2[tooltipItem.index];
                            return ["Notes: " + [obj.Notes], "Notes: " + [obj2.Notes]];
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
        $timeout(function () {
            var ctx = document.getElementById("canvasAnalytics").getContext("2d");
            //        var ctx = document.getElementById("canvasAnalytics").getContext("2d");
            //        window.myLine = new Chart(ctx, configAnalytics);

            //        $('.innerSingleTabNoTabs').scrollTop(document.body.scrollHeight);
            myLine = new Chart(ctx, config);
            $rootScope.loading = false;
        });
    }
});

//ehs.controller("AnalyticsController", function ($scope, $state, $rootScope, $stateParams,$timeout,API) {

//    //Chart

//    var chartDateArrayAnalytic = [
//            { month: 'January', weight: '90', date: '07/01/2016 12:49 pm' },
//            { month: 'February', weight: '80', date: '03/02/2016 03:30 pm' },
//            { month: 'March', weight: '85', date: '12/03/2016 01:49 pm' },
//            { month: 'April', weight: '75', date: '22/04/2016 02:49 pm' },
//            { month: 'May', weight: '70', date: '15/05/2016 01:15 pm' },
//            { month: 'June', weight: '65', date: '09/06/2016 03:10 pm' },
//            { month: 'July', weight: '67', date: '03/07/2016 02:02 pm' }
//    ];
//    var chartMonth = [];
//    var chartValue = [];
//    for (i = 0; i < chartDateArrayAnalytic.length; i++) {
//        chartMonth.push(chartDateArrayAnalytic[i].month);
//        chartValue.push(chartDateArrayAnalytic[i].weight);
//    }
//    var randomScalingFactor = function () {
//        return Math.round(Math.random() * 100);
//        //return 0;
//    };
//    var configAnalytics = {
//        type: 'line',
//        data: {
//            labels: chartMonth,
//            datasets: [{
//                label: "Weight Loss Plan",
//                data: chartValue,
//                fill: false,
//                borderDash: [5, 5],
//                borderColor: '#ffce56',
//                pointBackgroundColor: '#369',
//                pointHoverBackgroundColor: '#369',
//                pointHoverBorderColor: "rgba(220,220,220,1)",

//            },
//            {
//                label: "Blood Pressure Plan",
//                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
//                fill: false,
//                borderDash: [5, 5],
//                borderColor: '#ccc',
//                pointBackgroundColor: 'rgba(75,192,192,1)',
//                pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                pointHoverBorderColor: "rgba(220,220,220,1)",

//            }]
//        },
//        options: {
//            responsive: true,
//            // legend is the part that allow show / hide lines seperatly
//            legend: {
//                display: false,
//            },
//            title: {
//                display: true,
//                //text: 'Health Analytics'
//            },
//            tooltips: {
//                mode: 'label',
//                callbacks: {
//                    beforeTitle: function () {
//                        return ['Any data here', 'Any data here2'];
//                    },
//                    beforeLabel: function (x, y) {
//                        console.log(x);
//                        console.log(y);
//                        //console.log(chartDateArrayAnalytic);
//                        var data = chartDateArrayAnalytic[x.index];
//                        console.log(data);
//                        return data.date;
//                    }
//                },
//            },
//            hover: {
//                mode: 'dataset'
//            },
//            scales: {
//                xAxes: [{
//                    display: true,
//                    scaleLabel: {
//                        display: true,
//                        labelString: 'Month'
//                    },
//                    gridLines: {
//                        color: "rgba(255,255,255,0.2)",
//                        zeroLineColor: "rgba(255,255,255,0.2)"
//                    }
//                }],
//                yAxes: [{
//                    display: true,
//                    scaleLabel: {
//                        display: true,
//                        labelString: 'Weight (KG)'
//                    },
//                    ticks: {
//                        suggestedMin: 0,
//                        suggestedMax: 250,
//                    },
//                    gridLines: {
//                        color: "rgba(255,255,255,0.2)",
//                        zeroLineColor: "rgba(255,255,255,0.2)"
//                    }
//                }]
//            }
//        }
//    };
//    Chart.defaults.global.defaultFontColor = '#fff';
//    Chart.defaults.global.defaultFontSize = 15;

//    $.each(configAnalytics.data.datasets, function (i, dataset) {
//        dataset.backgroundColor = '#ddd';
//        dataset.pointBorderColor = '#fff';
//        dataset.pointBorderWidth = 1;
//        dataset.pointHoverBorderWidth = 2,
//        dataset.pointRadius = 7,
//        dataset.pointHoverRadius = 10;
//        dataset.pointHitRadius = 10
//    });

//        var ctx = document.getElementById("canvasAnalytics").getContext("2d");
//        window.myLine = new Chart(ctx, configAnalytics);

//        $('.innerSingleTabNoTabs').scrollTop(document.body.scrollHeight);
//});