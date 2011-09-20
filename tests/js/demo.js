/*global o2*/

/**
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*
 * Aliases
 */
var compact = o2.StringHelper.compact;

var Demo = {

    /**
     *
     */
    config : {

        /**
         *
         */
        errorCode : {
            SUCCESS : 0,
            INVALID_CREDENTIALS : 1,
            USERNAME_BLANK : 2,
            PASSWORD_BLANK : 3,
            INVALID_ARGUMENTS : 4
        }

    },

    /**
     *
     */
    logUserIn : function(username, password, UNDEFINED) {

        var errorCode = Demo.config.errorCode;

        var kInvalidCredentials = errorCode.INVALID_CREDENTIALS;
        var kUsernameBlank = errorCode.USERNAME_BLANK;
        var kPasswordBlank = errorCode.PASSWORD_BLANK;
        var kSuccess = errorCode.SUCCESS;
        var kInvalidArguments = errorCode.INVALID_ARGUMENTS;
        
        var kAllowedArgumentCount = 2;
        
        if(arguments.length != kAllowedArgumentCount){
            
            return kInvalidArguments;
        }
        
        var isCredentialsValid = (username !== null && username !== UNDEFINED && password !== null && password !== UNDEFINED);

        if(!isCredentialsValid) {

            return kInvalidCredentials;
        }

        var compactedUsername = compact(username);

        if(!compactedUsername) {

            return kUsernameBlank;
        }
        
        if(!password){
            
            return kPasswordBlank;
        }
        
        if(username && password){
            return kSuccess;
        }
        
        return kInvalidCredentials;

    }

};
