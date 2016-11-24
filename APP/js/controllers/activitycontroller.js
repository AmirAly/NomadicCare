ehs.controller("ActivityController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {


    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    // when date picker selected a date
    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDate')).addClass('used');
        });
    }

    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDate')).addClass('used');
        });
    }

    $('#activityModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    })

    // start here
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yAxesLabel = 'Activity (Steps/Day)';
    $scope.chartDataArray = [];
    var myLine;

    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthmeasurment';
        $rootScope.activetab = 'activity';
        // Get data
        var req = {
            method: 'get',
            url: '/HealthMeasurments/' + $scope.currentClientInfo._id + '/' + 'Activity',
            data: {}
        }
        ////loader
        $rootScope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data.data);
            if (_res.data.code == 100) {
                $scope.chartDataArray = _res.data.data;
                $scope.chartDataArray.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
                    return new Date(b.Date) - new Date(a.Date);
                });
            }
            else {
                $scope.chartDataArray = [];
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

    $scope.drawChart = function () {
        //Chart
        var chartMonth = [];
        var chartValue = [];
        for (i = 0; i < $scope.chartDataArray.length; i++) {
            chartMonth.push($scope.chartDataArray[i].Date);
            chartValue.push($scope.chartDataArray[i].Value);
        }
        var config = {
            type: 'line',
            data: {
                labels: chartMonth,
                datasets: [{
                    label: yAxesLabel,
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
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            var d = new Date(($scope.chartDataArray[tooltipItem[0].index]).Date);
                            var wholeDate = d.getDate() + " " + monthShortNames[d.getMonth()] + " " + d.getFullYear();
                            return "Date: " + wholeDate;
                        },
                        label: function (tooltipItem, data) {
                            var obj = $scope.chartDataArray[tooltipItem.index];
                            return [yAxesLabel + " " + [obj.Value]];
                        },
                        afterLabel: function (tooltipItem, data) {
                            var obj = $scope.chartDataArray[tooltipItem.index];
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
        $timeout(function () {
            var ctx = document.getElementById("canvasActivity").getContext("2d");
            myLine = new Chart(ctx, config);
            $rootScope.loading = false;
        });
    }

    // On Submit
    //..
    $scope.submit = function (form) {
        angular.forEach($scope.frmNewActivity.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.dataObj = {
                HNType: 'Activity',
                HNStatus: 1,
                Date: $scope.txtDate,
                Value: $scope.txtValue,
                Notes: $scope.txtNotes
            }
            console.log($scope.dataObj);
            var req = {
                method: 'post',
                url: '/HealthMeasurments/' + $scope.currentClientInfo._id,
                data: $scope.dataObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.dismiss();
                    $scope.frmNewActivity.$setPristine();
                    $state.reload();
                }
                else {
                    $scope.showMessage = true;
                    $scope.messageTxt = _res.data.data;
                    $scope.messageStatus = 'danger';
                }
                //$scope.loading = false;
            }, function (error) {
                $scope.showMessage = true;
                $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                $scope.messageStatus = 'warning';
            }).finally(function () {
                $rootScope.loading = false;
            });
        }

    }

});
