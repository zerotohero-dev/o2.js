/**
 * @module o2.FormHelper
 *
 * <p>A <strong>HTML</strong> form helper module.</p>
 */

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
