carerportal.factory('API', ['$http', function ($http) {
    var _url = "http://localhost:8007";
    return {
        name: 'API',
        execute: function (_req) {
            var headers = { 'Content-Type': 'application/json' };
            _req.url = _url + _req.url;
            _req.headers = headers;
            return $http(_req);
        }
    };
}]);

//// anoter one using http
//carerportal.factory('API', function ($http) {
//    var _url = "http://localhost:8007";
//    return {
//        getOne: function (_id) {
//            return $http.get(_url + '/Coordinator/' + _id);
//        },
//        update: function (_data) {
//            return $http.post(_url + '/api/todos', _data);
//        }
//    }
//});
////using it :
//API.getOne('58284325d74fc70e34336e06').success(function (data) {
//    console.log(data);
//}).error(function (data) {
//    console.log('Error: ' + data);
//});