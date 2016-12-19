ehs.controller("AnalyticsController", function ($scope, $state, $rootScope, $stateParams, $timeout, API) {
    // start here
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yAxesLabel = 'Value';
    $scope.noAnalyticsData = true;
    console.log($rootScope.firstArray);
    $scope.chartDataArray = $rootScope.firstArray;

    var myLine;

    $scope.$watch('currentClientInfo', function () {
        if (typeof $scope.currentClientInfo === 'undefined') { }
        else {
            if ($rootScope.secondArrayName != "") {
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
                        if (_res.data.code == 100 && _res.data.data != []) {
                            $scope.noAnalyticsData = false;
                            $scope.chartDataArray2 = _res.data.data;
                            $scope.chartDataArray2.sort(function (a, b) {
                                // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
                                return new Date(b.Date) - new Date(a.Date);
                            });
                        }
                        else {
                            $scope.chartDataArray2 = [];
                            $scope.noAnalyticsData = true;
                            $rootScope.loading = false;
                        }
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
                    label: $rootScope.firstArrayName,// yAxesLabel,
                    data: chartValue1,
                    fill: false,
                    borderColor: '#fff',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                },
                {
                    label: $rootScope.secondArrayName,
                    data: chartValue2,
                    fill: false,
                    borderDash: [5, 5],
                    borderColor: '#ffce56',
                    pointBackgroundColor: '#369',
                    pointHoverBackgroundColor: '#369',
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
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return "";
                        }
                    }
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
            //dataset.borderColor = '#fff';
            dataset.backgroundColor = '#ddd';
            dataset.pointBorderColor = '#fff';
            //dataset.pointBackgroundColor = 'rgba(75,192,192,1)';
            dataset.pointBorderWidth = 1;
            dataset.pointHoverBorderWidth = 2,
            dataset.pointRadius = 7,
            dataset.pointHoverRadius = 10;
            //dataset.pointHoverBackgroundColor = "rgba(75,192,192,1)",
            //dataset.pointHoverBorderColor = "rgba(220,220,220,1)",
            dataset.pointHitRadius = 10
        });
        $timeout(function () {
            var ctx = document.getElementById("canvasAnalytics").getContext("2d");
            myLine = new Chart(ctx, config);
            $rootScope.loading = false;
        });
    }
});
