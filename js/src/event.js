(function(){
    var Event = new ns.Class();

    Event.extend({
        list: []
    });

    Event.include({
        addEventListener: function(name, callback) {
            this.list.append()
        }
    });

    ns['Event'] = Event;
}());