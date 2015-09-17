(function () {
    'use strict';

    var prompts = [{
            type: 'confirm',
            name: 'finalizar',
            message: 'End?',
            default: true
        }
    ];

    module.exports = {
        prompts: prompts
    };
})();