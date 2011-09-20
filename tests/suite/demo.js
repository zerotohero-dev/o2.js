/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*global o2, Demo*/
( function(o2, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var logUserIn = Demo.logUserIn;
    var config = Demo.config;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {

            add('logUserIn SHOULD return INVALID_CREDENTIALS if username is null or undefined', {
                count : 2,
                test : function() {

                    var me = this;

                    var resultNull = logUserIn(null, 'valid');
                    var resultUndefined = logUserIn(UNDEFINED, 'valid');

                    var ce = config.errorCode;
                    var kErInvalidCredentials = ce.INVALID_CREDENTIALS;

                    assertStrictEqual(me, resultNull, kErInvalidCredentials, 'null username gives error');
                    assertStrictEqual(me, resultUndefined, kErInvalidCredentials, 'undefined username gives error');

                }

            });

            add('logUserIn SHOULD return INVALID_CREDENTIALS if password is null or undefined', {
                count : 2,
                test : function() {

                    var me = this;

                    var resultNull = logUserIn('valid', null);
                    var resultUndefined = logUserIn('valid', UNDEFINED);

                    var ce = config.errorCode;
                    var kErInvalidCredentials = ce.INVALID_CREDENTIALS;

                    assertStrictEqual(me, resultNull, kErInvalidCredentials, 'null password gives error');
                    assertStrictEqual(me, resultUndefined, kErInvalidCredentials, 'undefined password gives error');

                }

            });

            
            add('logUserIn SHOULD return USERNAME_BLANK if trimmed username is empty', {
                count : 5,
                test : function() {

                    var me = this;

                    var resultEmptyString = logUserIn('', 'valid');
                    var resultSingleSpace = logUserIn(' ', 'valid');
                    var resultDoubleSpace = logUserIn('  ', 'valid');
                    var resultSingleTab = logUserIn('   ', 'valid');
                    var resultMixedWhiteSpace = logUserIn('  \r \r\n \n  ', 'valid');

                    var ce = config.errorCode;
                    var kErUsernameBlank = ce.USERNAME_BLANK;

                    assertStrictEqual(me, resultEmptyString, kErUsernameBlank, 'empty username gives error');
                    assertStrictEqual(me, resultSingleSpace, kErUsernameBlank, 'single whitespace username gives error');
                    assertStrictEqual(me, resultDoubleSpace, kErUsernameBlank, 'double whitespace username gives error');
                    assertStrictEqual(me, resultSingleTab, kErUsernameBlank, 'single tab username gives error');
                    assertStrictEqual(me, resultMixedWhiteSpace, kErUsernameBlank, 'mixed whitespace username gives error');

                }

            });

            add('logUserIn SHOULD return PASSWORD_BLANK if password is empty', {
                count : 1,
                test : function() {

                    var me = this;

                    var resultEmptyString = logUserIn('valid', '');

                    var ce = config.errorCode;
                    var kErPasswordBlank = ce.PASSWORD_BLANK;

                    assertStrictEqual(me, resultEmptyString, kErPasswordBlank, 'empty password gives error');

                }

            });

            add('logUserIn SHOULD NOT return SUCCESS if trimmed username is not blank and password is NOT empty', {
                count : 5,
                test : function() {

                    var me = this;

                    var resultSingleSpace = logUserIn('valid', ' ');
                    var resultDoubleSpace = logUserIn('valid', '  ');
                    var resultSingleTab = logUserIn('valid', '   ');
                    var resultMixedWhiteSpace = logUserIn('valid', '  \r \r\n \n  ');
                    var resultRegularPassword = logUserIn('valid', 'valid');

                    var ce = config.errorCode;
                    var kErSuccess = ce.SUCCESS;

                    assertStrictEqual(me, resultSingleSpace, kErSuccess, 'single whitespace password gives success');
                    assertStrictEqual(me, resultDoubleSpace, kErSuccess, 'double whitespace password gives success');
                    assertStrictEqual(me, resultSingleTab, kErSuccess, 'single tab password gives success');
                    assertStrictEqual(me, resultMixedWhiteSpace, kErSuccess, 'mixed whitespace password gives success');
                    assertStrictEqual(me, resultRegularPassword, kErSuccess, 'alphanumeric password does gives success');

                }

            });

            add('logUserIn SHOULD return INVALID_ARGUMENTS if parameter count is not 2', {
                count : 3,
                test : function() {

                    var me = this;

                    var resultNoParam = logUserIn();
                    var resultOneParam = logUserIn('valid');
                    var resultThreeParams = logUserIn('valid', 'valid', 'valid');

                    var ce = config.errorCode;
                    var kInvalidArguments = ce.INVALID_ARGUMENTS;

                    // below is just to show that you can run async assertions as well:
                    
                    setTimeout(function(){
                        
                        assertStrictEqual(me, resultNoParam, kInvalidArguments, 'no arguments gives error');
                    
                    },2000);

                  
                    setTimeout(function(){
                    
                        assertStrictEqual(me, resultOneParam, kInvalidArguments, 'one argument gives error');
                        assertStrictEqual(me, resultThreeParams, kInvalidArguments, 'three arguments gives error');                        
                    
                    },2000);

                }

            });

            o2.Unit.run();

        }

    };

    Suite.init();

}(o2, this));
