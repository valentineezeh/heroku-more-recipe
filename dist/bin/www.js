'use strict';

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var port = parseInt(process.env.PORT, 10) || 8080;
_app2.default.set('port', port);

var server = http.createServer(_app2.default);
server.listen(port);
console.log('Server up and running!!!');