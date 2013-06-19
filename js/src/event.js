(function(){
    /**
     * Event
     * @type {ns.Class}
     */
    var Event = new ns.Class();

    Event.extend({
        list: []
    });

    Event.include({
        /**
         * addEventListener
         * @param name
         * @param callback
         */
        'addEventListener' : function(name, callback) {
            this.list.append();
        }
    });

    ns['Event'] = Event;
}());