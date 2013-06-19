(function(){
    /**
     * Class
     * @returns {Function}
     * @constructor
     */
    var Class = function(parent) {

        var klass = function() {
            this.init.apply(this, arguments);
        };

        if(parent) {
            /**
             * Subclass
             * @constructor
             */
            var Subclass = function() {};
            Subclass.prototype = parent.prototype;
            klass.prototype = new Subclass();
            klass.__super__ = parent.prototype;
        }

        klass.prototype.init = function(){};

        // shorthand to access prototype
        klass.fn = klass.prototype;

        // shorthand to access Class
        klass.fn.parent = klass;

        /**
         * proxy
         * @param func
         * @returns {Function}
         */
        klass['proxy'] = function(func) {
            var self = this;
            return(function() {
                return func.apply(self, arguments);
            });
        };

        klass.fn['proxy'] = klass.proxy;

        /**
         * klass.extend
         * @param obj
         * extend class property
         */
        klass['extend'] = function(obj) {
            var extended = obj.extended;
            for(var i in obj) {
                klass[i] = obj[i];
            }
            if(extended) {
                extended(klass);
            }
        };

        /**
         * include instance
         * @param obj
         */
        klass['include'] = function(obj) {
            var included = obj.included;
            for(var i in obj) {
                klass.fn[i] = obj[i];
            }
            if(included){
                included(klass);
            }
        };

        return klass;
    };

    ns['Class'] = Class;
}());