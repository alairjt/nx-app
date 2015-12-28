// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-11-25 using
// generator-karma 1.0.1

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // base path, that will be used to resolve files and exclude
        basePath: '../',
        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            "jasmine"
        ],
        reporters: ['progress', 'junit', 'coverage'],
        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-ui-scroll/dist/ui-scroll.js',
            'bower_components/angular-ui-scrollpoint/dist/scrollpoint.js',
            'bower_components/angular-ui-event/dist/event.js',
            'bower_components/angular-ui-mask/dist/mask.js',
            'bower_components/angular-ui-validate/dist/validate.js',
            'bower_components/angular-ui-indeterminate/dist/indeterminate.js',
            'bower_components/angular-ui-uploader/dist/uploader.js',
            'bower_components/angular-ui-utils/index.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'bower_components/flow.js/dist/flow.js',
            'bower_components/ng-flow/dist/ng-flow.js',
            'bower_components/angular-base64/angular-base64.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/material-design-lite/material.min.js',
            'bower_components/angular-material-icons/angular-material-icons.min.js',
            'bower_components/angular-material-data-table/dist/md-data-table.min.js',
            'bower_components/nx-angular/dist/nx-angular.min.js',
            // endbower
            "src/**/app.js",
            "src/**/*.js",
            "src/**/*.tpl.html",
            "test/testMockRun.js",
            "test/mock/**/*.js",
            "test/spec/**/*.js"
        ],
        // list of files / patterns to exclude
        exclude: [],
        // web server port
        port: 8080,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "PhantomJS"
        ],
        // Which plugins to enable
        plugins: [
            "karma-jasmine",
            "karma-coverage",
            "karma-junit-reporter",
            "karma-phantomjs-launcher",
            "karma-ng-html2js-preprocessor"
        ],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
        colors: true,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'src/**/*.tpl.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function (filepath) {
                console.log(filepath.substring(filepath.indexOf('src/')).replace('src/', ''));
                return filepath.substring(filepath.indexOf('src/')).replace('src/', '');
            },
            moduleName: "nxTemplatesTest",
            'src/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        junitReporter: {
            outputDir: 'qa',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'qa/coverage'
            }, {
                type: 'text-summary',
                dir: 'qa/coverage'
            }, {
                type: 'cobertura',
                dir: 'qa/coverage'
            }]
        }
    });
};
