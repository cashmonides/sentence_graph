var debug_log = function () {
    if (!IN_PRODUCTION_SWITCH) {
        console.log.apply(null, arguments);
    }
}