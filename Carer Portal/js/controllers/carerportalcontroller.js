carerportal.controller("CarerportalController", function ($scope, $state, $rootScope, $stateParams, API) {
    var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

    console.log($stateParams.providerid);

    // get curret provider
    var req = {
        method: 'get',
        url: '/CoordinatorByEmail/' + Base64.decode($stateParams.providerid),
        data: {}
    }
    console.log(req);
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.notUser = false;
            $rootScope.providerName = _res.data.data[0].Name;
            $scope.Organization = _res.data.data[0].Organization;
            $scope.providerid = _res.data.data[0]._id;
        }
        else {
            $scope.notUser = true;
            $scope.showMessage = true;
            $scope.messageTxt = 'No Such Provider ...';
            $scope.messageStatus = 'warning';
        }

    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    }).finally(function () {

        // get provider plans
        var req = {
            method: 'get',
            url: '/CarePlans/' + $scope.Organization,
            data: {}
        }

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $scope.careplans = [];
                $scope.plans = [];
                $scope.result = _res.data.data;

                var req2 = {
                    method: 'get',
                    url: '/Coordinator/List/' + $scope.Organization,
                    data: {}
                }
                API.execute(req2).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.providers = _res.data.data;
                    }
                    else {
                        $scope.providers = [];
                    }
                })
                   .finally(function () {
                       for (var i = 0; i < $scope.result.length; i++) {
                           for (var j = 0; j < $scope.result[i].CarePlans.length; j++) {
                               var _providerName;
                               var _providerImg;
                               for (var k = 0; k < $scope.providers.length; k++) {
                                   if ($scope.providers[k]._id == $scope.result[i].CarePlans[j].Provider) {
                                       _providerName = $scope.providers[k].Name;
                                       _providerImg = $scope.providers[k].Img;
                                   }
                               }
                               if ($scope.result[i].CarePlans[j].Provider == $scope.providerid) {
                                   console.log($scope.result[i]);
                                   $scope.careplans.push({
                                       clientId: $scope.result[i]._id,
                                       clientName: $scope.result[i].FirstName + " " + $scope.result[i].LastName,
                                       clientImg: $scope.result[i].Img,
                                       providerId: $scope.result[i].CarePlans[j].Provider,
                                       providerName: _providerName,
                                       providerImg: _providerImg,
                                       planId: $scope.result[i].CarePlans[j]._id,
                                       planName: $scope.result[i].CarePlans[j].PlanName,
                                       planStatus: $scope.result[i].CarePlans[j].Status,
                                       lastUpdated: $scope.result[i].CarePlans[j].LastUpdated,
                                       toImprove: $scope.result[i].CarePlans[j].ToImprove,
                                       carerObjective: $scope.result[i].CarePlans[j].ToAchieve1 + " - " + $scope.result[i].CarePlans[j].ToAchieve2,
                                       note: $scope.result[i].CarePlans[j].Progress,
                                       date: $scope.result[i].CarePlans[j].ByWhen1
                                   });
                               }
                           }
                       }
                       console.log($scope.careplans);
                       $rootScope.loading = false;
                       console.log($rootScope.loading);
                   });
            }
            else {
                $scope.careplans = [];
                $scope.showMessage = true;
                $scope.messageTxt = 'No care plans found ...';
                $scope.messageStatus = 'warning';
            }
        });
    });


    $scope.openPatientModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.careplans.length; i++) {
            if ($scope.careplans[i].planId == _id) {
                $scope.currentPlan = $scope.careplans[i];
            }
        }
        console.log($scope.currentPlan);
    }

    $scope.addNotes = false;
    $scope.addProgressNote = function () {
        if ($scope.txtNote != null || $scope.txtNote != '') {
            $scope.currentPlan.note.push({ Text: $scope.txtNote, Provider: $rootScope.providerName, Date: new Date() });
            $scope.txtNote = '';
        }
        $scope.addNotes = false;
    }
    $scope.showDetails = true;
});

