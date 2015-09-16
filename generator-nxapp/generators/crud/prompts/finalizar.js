(function () {
    'use strict';

    var prompts = [{
            type: 'confirm',
            name: 'finalizar',
            message: 'Finalizar?',
            default: true
        }
    ];

    module.exports = {
        prompts: prompts
    };
})();