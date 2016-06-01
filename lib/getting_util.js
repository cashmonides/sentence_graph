// Very valuable for understanding, 
var getting = function (prop, f, optional) {
    if (optional === undefined) {
        optional = {};
    }
    return function () {
        var self;
        if ('get_user' in optional) {
            self = optional.get_user(this);
        } else {
            self = this;
        };
        
        var transform_prop;
        if ('global' in optional) {
            transform_prop = function (z) {return z};
        } else {
            transform_prop = function (z) {
                return ['users', self.uid].concat(z);
            };
        }
        
        var actually_do_it = function () {
            Persist.get(transform_prop(prop), function (x) {
                var v = x.val();
                if ('transform_null' in optional) {
                    if (v === null) {
                        v = {};
                    }
                }
                var r = f.bind(self, v).apply(self, args);
                if ('save_result' in optional) {
                    Persist.set(transform_prop(prop), r);
                }
            });
        }
        
        var args = arguments;
        actually_do_it();
    }
}