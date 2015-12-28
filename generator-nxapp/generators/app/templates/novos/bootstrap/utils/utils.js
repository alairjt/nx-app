var path = require('path'),
    url = require('url'),
    fs = require('fs');

var livereloadPort = 35729;

function getConnects(connect, dirs) {
    var apps = getDirectories(dirs),
        connects = [livereloadSnippet];

    for (var key in apps) {
        connects.push(connect().use(
            '/' + apps[key] + '/bower_components',
            connect.static('../' + apps[key] + '/bower_components')
        ));
        var dist = '../' + apps[key] + '/dist';
        if (fs.existsSync(dist)) {
            connects.push(connect().use(
                '/' + apps[key],
                connect.static('../' + apps[key] + '/dist')
            ));
        } else {
            connects.push(connect().use(
                '/' + apps[key],
                connect.static('../' + apps[key] + '/src')
            ));
        }
    }

    return connects;
}

function getDirectories(dirs) {
    if (dirs) {
        return dirs;
    }
    var dir = path.dirname(process.cwd());

    var apps = [];

    fs.readdirSync(dir).filter(function (app) {
        var gruntFile = path.join(dir, app) + "/Gruntfile.js";
        var gulpFile = path.join(dir, app) + "/gulpfile.js";
        var bower = path.join(dir, app) + "/bower_components";
        if ((fs.existsSync(gruntFile) || fs.existsSync(gulpFile)) && fs.existsSync(bower)) {
            console.log("Loading: " + app);
            apps.push(app);
        }
    });

    return apps;
}

function getSnippet() {
    /*jshint quotmark:false */
    var snippet = [
        "<!-- livereload snippet -->",
        "<script>document.write('<script src=\"http://'",
        " + (location.host || 'localhost').split(':')[0]",
        " + ':" + livereloadPort + "/livereload.js?snipver=1\"><\\/script>')",
        "</script>",
        ""
    ].join('\n');
    return snippet;
}

function livereloadSnippet(req, res, next) {
    var write = res.write;

    var filepath = url.parse(req.url).pathname;
    filepath = filepath.slice(-1) === '/' ? filepath + 'index.html' : filepath;

    if (path.extname(filepath) !== '.html') {
        return next();
    }

    res.write = function (string, encoding) {
        var body = string instanceof Buffer ? string.toString() : string;

        body = body.replace(/<\/body>/, function (w) {
            return getSnippet() + w;
        });

        if (string instanceof Buffer) {
            string = new Buffer(body);
        } else {
            string = body;
        }

        if (!this.headerSent) {
            this.setHeader('content-length', Buffer.byteLength(body));
            this._implicitHeader();
        }

        write.call(res, string, encoding);
    };

    next();
};

module.exports = {
    getConnects: getConnects
};
