var fs = require('fs');
var moment = require('moment');
var config = require('../config/config');
var path = require('path');

var mkPath = exports.mkPath = function(dirPath,callback, mode) {
    if(!mode) mode = '0777';
    fs.exists(dirPath, function(exists) {
        if(exists) {
            callback(null);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkPath(path.dirname(dirPath), function(err){
                if(err) return callback(err);
                fs.mkdir(dirPath, mode, function(error){
                    if(error&&error.code!='EEXIST') return callback(error);
                    callback(null);
                });
            });
        }
    });
};
exports.saveFile = function (savePath, dataBuff, callback) {
    mkPath(path.dirname(savePath),function (err) {
        if(err) return callback(err);
        fs.writeFile(savePath,dataBuff, function (s_err) {
            if(s_err) return callback(s_err);
            callback(null);
        })
    })
}

exports.moveFile = function(sourcePath , savePath, callback) {
    var readStream = fs.createReadStream(sourcePath);
    var writeStream = fs.createWriteStream(savePath);
    readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
        if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
            readStream.pause();
        }
    });
    writeStream.on('drain', function() { // 写完后，继续读取
        readStream.resume();
    });
    readStream.on('error',function(err){
        callback(err);
        writeStream.end();
    })
    readStream.on('end', function() { // 当没有数据时，关闭数据流
        writeStream.end();
        callback(null)
    });
    writeStream.on('error',function(err){
        callback(err);
        writeStream.end();
    })
}


