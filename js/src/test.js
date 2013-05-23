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