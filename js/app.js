(function(global, doc){
    "use strict";
    var ns = global['app'] = {};


(function(){
    var Class = function() {

        var klass = function() {
            this.init.apply(this, arguments);
        };

        if(parent) {
            var Subclass = function() {};
            Subclass.prototype = parent.prototype;
            klass.prototype = new Subclass();
        }

        klass.prototype.init = function(){};

        // shorthand to access prototype
        klass.fn = klass.prototype;

        // shorthand to access Class
        klass.fn.parent = klass;

        // proxy instance context
        klass.proxy = function(func) {
            var self = this;
            return(function() {
                return func.apply(self, arguments);
            });
        };

        klass.fn.proxy = klass.proxy;

        // extend class property
        klass.extend = function(obj) {
            var extended = obj.extended;
            for(var i in obj) {
                klass[i] = obj[i];
            }
            if(extended) {
                extended(klass);
            }
        };

        // include instance property
        klass.include = function(obj) {
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
(function(){
    var Event = new ns.Class();

    ns['Event'] = Event;
}());
//test
(function(){
    var Button = new ns.Class();

    Button.include({
        init: function(element) {
           this.element = element;
           this.element.addEventListener('click',this.proxy(this.click),false);
        },

        click: function(e) {
            console.debug(e);
            console.debug(this);
        }
    });

    var Person = function() {};

    //use private
    (function() {
        var findById = function(id) {
            console.log(this, id);
        };

        Person.find = function(id) {
            if(typeof id === 'number') {
                return findById(id);
            }
        };

    }());

    ns.Person = Person;
    ns.Button = Button;
}());
}(this, this.document));