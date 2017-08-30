var util = require('util')
var JsonResponseError = function (msg, error_code, status, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error';
    if(typeof error_code =='undefined') {
        error_code =500;
    }
    this.error_code = error_code;
    this.isJson =true;
    this.status = status||200;
}
util.inherits(JsonResponseError, Error);
JsonResponseError.prototype.name = 'Json Response Error';

var CodeResponseError = function (msg, error_code, status, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error';
    if(typeof error_code =='undefined') {
        error_code =500;
    }
    this.error_code = error_code;
    this.status = status||200;
}
util.inherits(CodeResponseError, Error);
CodeResponseError.prototype.name = 'Code Response Error';
module.exports = {
    JsonResponse: JsonResponseError,
    CodeResponse: CodeResponseError
}
