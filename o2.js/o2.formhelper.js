//TODO: add documentation.
(function(framework){


    framework.FormHelper = {
    //TODO: add documentation.
    preventMultipleSubmit : function(form) {
        form = $(form);

        if (!form) {
            return;
        }

        form.onsubmit = function() {
            form.onsubmit = function() {
                return false;
            }

            return true;
        };
    };
}(this.o2));