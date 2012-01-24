(function(framework){
    //TODO: add documentation.

    var me = framework.Ajax;

   //TODO: add documentation.
    me.getSingle = function(url, parameters, callbacks) {
//TODO: algo change
// token = generateGuid
// request.guid = token
// if (cache[request.guid]) etc.
        var token = prepareToken(url, parameters);

        var request = getCache[token];

        if (request && !request.isComplete) {
            return;
        }

        delete getCache[token];
        getCache[token] = me.get(url, parameters, callbacks);
    };

    //TODO: add documentation.
    me.postSingle = function(url, parameters, callbacks) {
        var token = prepareToken(url, parameters);

        var request = postCache[token];

        if (request && !request.isComplete) {
            return;
        }

        delete postCache[token];
        postCache[token] = me.post(url, parameters, callbacks);
    };
}(this.o2));