// Karma configuration
// Generated on Sun Sep 07 2014 17:31:00 GMT-0300 (Hora oficial do Brasil)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'https://aenhive-dev.nexxera.com/Library/angular-1.2.25/angular.js',
            'https://aenhive-dev.nexxera.com/Library/angular-resource-1.2.25/angular-resource.js',
            'https://aenhive-dev.nexxera.com/Library/angular-animate-1.2.25/angular-animate.js',
            'https://aenhive-dev.nexxera.com/Library/angular-sanitize-1.2.25/angular-sanitize.js',
            'https://aenhive-dev.nexxera.com/Library/angular-ui-router-0.2.11/release/angular-ui-router.js',
            'https://aenhive-dev.nexxera.com/Library/nexxeraComponents-1.0.0/directives/breadcrumbs/nxBreadcrumbs.js',
            'https://aenhive-dev.nexxera.com/Library/angular-mocks-1.2.25/angular-mocks.js',
            'https://aenhive-dev.nexxera.com/Library/angular-route-1.2.25/angular-route.js',
            'https://aenhive-dev.nexxera.com/Library/angular-ui-utils-0.1.1/ui-utils.js',
            'https://aenhive-dev.nexxera.com/Library/angular-bootstrap-0.11.0/ui-bootstrap.js',
            'https://aenhive-dev.nexxera.com/Library/jquery-1.11.1/dist/jquery.min.js',
            'https://aenhive-dev.nexxera.com/Library/angular-google-chart-0.0.11/ng-google-chart.js',
            'https://aenhive-dev.nexxera.com/Library/nexxeraComponents-1.0.0/directives/pagination/nxPagination.js',
            'https://aenhive-dev.nexxera.com/Library/angular-translate-2.4.2/angular-translate.js',
            'https://aenhive-dev.nexxera.com/Library/angular-translate-loader-partial-2.4.0/angular-translate-loader-partial.js',
            'https://aenhive-dev.nexxera.com/Library/angular-base64-2.0.1/angular-base64.js',
            'https://aenhive-dev.nexxera.com/Library/angular-strap-2.1.3/angular-strap.js',
            'https://aenhive-dev.nexxera.com/Library/ng-flow-2.5.1/src/directives/*.js',
            'https://aenhive-dev.nexxera.com/Library/ng-flow-2.5.1/src/*.js',
            'https://aenhive-dev.nexxera.com/Library/angular-ui-select-0.11.2/dist/select.js',
            '../src/app/*.js',
            'https://aenhive-dev.nexxera.com/Library/nexxeraComponents-1.2.0/scripts-nexxera.js',
            'https://aenhive-dev.nexxera.com/Library/hivecommon-1.0.2/scripts-commons.js',
            '../test/testMockRun.js',
            '../src/app/*.js',
            '../src/**/*.tpl.html',
            '../test/**/*.js',
            'qa/coverage/src/*/*.js',
            'qa/coverage/src/*/*/*.js'
        ],
        // list of files to exclude
        exclude: [
            '../test/lib/**/*.js'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'qa/coverage/src/*.js': ['coverage'],
            'qa/coverage/src/*/*.js': ['coverage'],
            'qa/coverage/src/*/*/*.js': ['coverage'],
            'qa/coverage/src/*/*/*/*.js': ['coverage'],
            'qa/coverage/src/*/*/*/*/*.js': ['coverage'],
            'qa/coverage/src/*/*/*/*/*/*.js': ['coverage'],
            '../src/**/*.tpl.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function (filepath) {
                return filepath.substring(filepath.indexOf('/src/')).replace('/src/', '');
            },
            moduleName: "nxTemplatesTest"
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit', 'coverage'],
        // web server port
        port: 9879,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        // optionally, configure the reporter
        junitReporter: {
            outputFile: 'qa/test-results.xml'
        },
        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'qa/coverage'},
                {type: 'text-summary', dir: 'qa/coverage'},
                {type: 'cobertura', dir: 'qa/coverage'}
            ]
        }
    });
};
