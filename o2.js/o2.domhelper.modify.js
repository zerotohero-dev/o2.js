(function(framework){

    /*
     * Aliases
     */
    var me = framework.DomHelper;
    var insertBefore = framework.DomHelper.insertBefore;
    var append = framework.DomHelper.append;

    /**
     *
     */
    me.wrap = function(elmTarget, elmWrapper) {
        var target = $(elmTarget);
        var wrapper = $(elmWrapper);

        if (!target) {
            return;
        }

        if (!wrapper) {
            return;
        }

        insertBefore(wrapper, target);
        append(target, wrapper);
    };
}(this.o2));
