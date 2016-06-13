// Very valuable for understanding, 
var getting = function (prop, f, optional) {
    if (optional === undefined) {
        optional = {};
    }
    
    var props;
    if (Array.isArray(prop)) {
        props = [prop];
    } else {
        props = prop.split(/ *&+ */g).map(function (x) {return x.split(/ *\|+ */)});
    }
    
    var get_save_index = function () {
        if ('save_index' in optional) {
            return optional.save_index;
        } else {
            return 0;
        }
    }
    
    var save_index = get_save_index();
    
    var len = props.length;
    
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
        
        var returned_values = {};
        
        var finish = function () {
            var f_data = [];
            for (var i = 0; i < len; i++) {
                f_data.push(returned_values[i]);
            }
            
            var r = f.apply(self, f_data.concat(args));
            
            if ('save_result' in optional) {
                Persist.set(transform_prop(props[save_index]), r);
            }
        }
        
        var actually_do_it = function () {
            var item;
            for (var i = 0; i < len; i++) {
                item = props[i];
                Persist.get(transform_prop(item), (function (i) {
                    return function (x) {
                        var v = x.val();
                        if ('transform_null' in optional) {
                            if (v === null) {
                                v = {};
                            }
                        }
                        
                        returned_values[i] = v;
                        
                        if (Object.keys(returned_values).length === len) {
                            finish();
                        }
                    };
                })(i));
            }
        }
        
        var args = [].slice.call(arguments);
        actually_do_it();
    }
}