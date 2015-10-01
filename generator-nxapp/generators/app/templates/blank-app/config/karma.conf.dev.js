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
          'https://code.jquery.com/jquery-1.11.3.min.js',
          'https://code.jquery.com/jquery-migrate-1.2.1.min.js',
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.29/angular.min.js',
          'https://aenhive-dev.nexxera.com/Library/angular-mocks-1.2.25/angular-mocks.js',
          'https://aenhive-dev.nexxera.com/Library/angular-ui-router-0.2.11/release/angular-ui-router.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js',
          'https://aenhive-dev.nexxera.com/Library/angular-translate-2.4.0/angular-translate.js',
          'https://aenhive-dev.nexxera.com/Library/angular-translate-loader-partial-2.4.0/angular-translate-loader-partial.js',
          'https://aenhive-dev.nexxera.com/Library/angular-base64-2.0.1/angular-base64.js',
          'https://aenhive-dev.nexxera.com/Library/designComponents-1.0.2/scripts-style.js',
          'https://aenhive-dev.nexxera.com/Library/nexxeraComponents-1.2.0/scripts-nexxera.js',

            '../src/**/*.js',
            '../src/**/**/*.js',
            '../src/**/**/**/*.js',
            '../src/**/*.tpl.html',
            '../src/**/**/*.tpl.html',
            '../src/**/**/**/*.tpl.html',
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
                return filepath.substring(filepath.indexOf('src/')).replace('src/', '');
            },
            moduleName: "nxTemplatesTest"
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'junit', 'coverage'],
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
