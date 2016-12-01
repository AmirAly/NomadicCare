ehs.factory('API', ['$http', function ($http) {
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
