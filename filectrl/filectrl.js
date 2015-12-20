var fs = require('fs'),
    filectrl = {};
var formidable = require('formidable');
filectrl.markdir = function(foldername, callback) {
    var mark = "";
    fs.exists(foldername, function(result) {
        if (!result) {
            fs.mkdir(foldername, function(err, result) {
                if (err) {
                    console.log("建立文件夹出错！:" + err);
                    err = "建立文件夹出错！";
                    return callback(err, null);

                }
                console.log(foldername + '建立成功！');
            });
        }
        mark = 200;
        return callback(null, mark);

    });
}
filectrl.savePicture = function(req, res, callback) {
    //设置返回字符串编码
    res.header('Content-Type', 'text/javascript;charset=utf-8');
    //new一个formidable.IncomingForm();
    var form = new formidable.IncomingForm();
    //设置临时文件存放的路径
    form.uploadDir = "./public/temp/";
    //设置上传数据的编码
    form.encoding = 'utf-8';
    //设置是否保持上传文件的拓展名
    form.keepExtensions = true;
    form.on('field', function(name, value) {
        console.log("非文件部分" + name + ":" + value)
    });
    //文件上传成功后触发
    form.on('file', function(name, file) {
        console.log("处理文件上传-文件名:" + file.name);
        console.log("处理文件上传-路径:" + file.path);
    });
    //流程正常处理
    form.on('end', function() {
        console.log("文件上传结束");
    });
    //出错
    form.on('error', function(err) {
        console.log("文件出错");
    });
    form.parse(req, function(error, fields, files) {
        console.log("文件解析..........");
        var result = {};
        for (var key in files) {
            var file = files[key];
            var basepath = "./public/data/goods/" + fields.code + "/",
                dbpath = "./data/goods/" + fields.code + "/",
                newname = +new Date() + filectrl.getSuffix(file.name),
                newpath = basepath + newname;
            result = {
                "code": fields.code,
                "name": fields.name,
                "price": fields.price,
                "description": fields.description,
                "filename": newname,
                "path": dbpath
            };
            fs.rename(file.path, newpath, function(err) {
                if (err) {
                    console.log("改变图片路径出错！" + err);
                    return callback(err, null);

                }
                return callback(null, result);
            });

        }
    });
}
filectrl.saveMenuPicture = function(req, res, callback) {
    res.header('Content-Type', 'text/javascript;charset=utf-8');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/temp/";
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.on('field', function(name, value) {
        console.log("非文件部分" + name + ":" + value)
    });
    form.on('file', function(name, file) {
        console.log("处理文件上传-文件名:" + file.name);
        console.log("处理文件上传-路径:" + file.path);
    });
    form.on('end', function() {
        console.log("文件上传结束");
    });
    form.on('error', function(err) {
        console.log("文件出错");
    });
    form.parse(req, function(error, fields, files) {
        console.log("文件解析..........");
        var result = {};
        for (var key in files) {
            var file = files[key];
            var basepath = "./public/data/cmenu/" + fields.mmcode + "/",
                dbpath = "./data/cmenu/" + fields.mmcode + "/",
                newname = +new Date() + filectrl.getSuffix(file.name),
                newpath = basepath + newname;
            result = {
                "mmcode": fields.mmcode,
                "mcode": fields.mcode,
                "name": fields.name,
                "description": fields.description,
                "filename": newname,
                "path": dbpath
            };
            fs.rename(file.path, newpath, function(err) {
                if (err) {
                    console.log("改变图片路径出错！" + err);
                    return callback(err, null);

                }
                return callback(null, result);

            });

        }
    });
}
filectrl.deletePath = function(path, callback) {
    var folder_exists = fs.existsSync(path);
    if (folder_exists) {
        if (fs.statSync(path).isDirectory()) {
            var dirList = fs.readdirSync(path);
            dirList.forEach(function(fileName) {
                fs.unlinkSync(path + '/' + fileName);
            });
            fs.rmdirSync(path);
        }
        else{
            fs.unlinkSync(path);
        }
        callback(null, "Ye");
    } else {
        console.log("路径或文件不存在："+path);
        return callback(null, "No");

    }
}
filectrl.getSuffix = function(filename) {
    var suffix = /\.[^\.]+/.exec(filename);
    return suffix[0];
}
module.exports = filectrl;
