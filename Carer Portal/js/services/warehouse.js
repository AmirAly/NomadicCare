carerportal.factory('API', ['$http', function ($http) {
    var _url = "/";
    return {
        name: 'API',
        execute: function (_req) {
            var headers = { 'Content-Type': 'application/json' };
            _req.url = _url + _req.url;
            _req.headers = headers;
            //console.log(_req);
            return $http(_req);
        }
    };
}]);
