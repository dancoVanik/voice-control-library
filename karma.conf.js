module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'], //TODO karma-benchmark


        // list of files / patterns to load in the browser
        files: [
            // 'test/**/*.js',
            'test/**/*.[sS]pec.js',
            //'src/**/*.js'
            'dist/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            //'src/**/*.js': ['coverage'],
            'dist/*.js': ['coverage'],
            'test/**/*.[sS]pec.js': ['webpack'],
        },

        plugins: [
            "karma-chrome-launcher",
            "karma-coverage",
            "karma-jasmine",
            "karma-jasmine-html-reporter",
            "karma-mocha-reporter",
            "karma-webpack"
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'kjhtml', 'mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            mode: 'development'
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: true,
            dir: './dist/reports/coverage',
            reporters: [
                {type: "html", subdir: "html"},
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary'}
            ]
        }
    });
};