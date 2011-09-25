/*global o2 */

//TODO: add documentation.
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.DomHelper;

    me.trimField = function(field){
        
        //
        field = o2.$(field);
        
        if(!field){
            
            return null;
        }
        
        field.value = o2.StringHelper.trim(field.value);
        
        return field.value;
    };
    
    me.compactField = function(field){
        
        //
        field = o2.$(field);
        
        if(!field){
            
            return null;
        }
        
        field.value = o2.StringHelper.compact(field.value);
        
        return field.value;        
    };

}(o2, this));
