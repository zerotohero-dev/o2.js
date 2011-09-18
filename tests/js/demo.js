/*global o2, alert*/
( function(o2, window) {

    function testMethod1(param1) {

        var isSet = !!param1;

        if(!isSet) {

            return null;

        }

        return 'this is a string';

    }

    function testMethod2() {

        return 42;

    }

    var config = {
        errorCode : {
            SUCCESS : 0,
            INVALID_CREDENTIALS : 1,
            USERNAME_BLANK : 2,
            PASSWORD_BLANK : 3,
            INVALID_ARGUMENTS : 4
        }
    };

    var add = o2.Unit.add;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assertStrictNotEqual = o2.Unit.assertStrictNotEqual;
    var assert = o2.Unit.assert;
    var compact = o2.StringHelper.compact;

    function triggerLogin(username, password) {
        
        o2.Unit.log(['log in username:', username, ' password:', password].join(''));
    
    }

    function logUserIn(username, password, UNDEFINED) {

        var errorCode = config.errorCode;
        var kInvalidCredentials = errorCode.INVALID_CREDENTIALS;
        var kUsernameBlank = errorCode.USERNAME_BLANK;
        var kPasswordBlank = errorCode.PASSWORD_BLANK;
        var kSuccess = errorCode.SUCCESS;
        var kInvalidArguments = errorCode.INVALID_ARGUMENTS;

        var argLen = arguments.length;

        if(argLen != 2) {

            return kInvalidArguments;
        }

        if(username === null || username === UNDEFINED) {

            return kInvalidCredentials;
        }

        if(password === null || password === UNDEFINED) {

            return kInvalidCredentials;
        }

        var compactedUsername = compact(username);

        if(compactedUsername === '') {

            return kUsernameBlank;
        }

        if(password === '') {

            return kPasswordBlank;
        }

        if(compactedUsername !== '' && password !== '') {
            triggerLogin(username, password);

            return kSuccess;
        }

    }

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
                test : function(UNDEFINED) {

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
                test : function(UNDEFINED) {

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
                count : 4,
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

                    assertStrictEqual(me, resultNoParam, kInvalidArguments, 'no arguments gives error');
                    assertStrictEqual(me, resultOneParam, kInvalidArguments, 'one argument gives error');
                    assertStrictEqual(me, resultThreeParams, kInvalidArguments, 'three arguments gives error');

                }

            });

            /*           add('testMethod1 should return a String if it has a
             * parameter', {
             count : 1,
             test : function() {

             var me = this;
             var assert = o2.Unit.assert;

             var param = 42;
             var resultWithParam = testMethod1(param);
             var resultWithoutParam = testMethod1();

             assert(me, typeof resultWithParam == 'string', 'testMethod1(param)
             returns a String');

             }

             });

             add('testMethod1 should return null if it has no parameters', {
             count : 1,
             test : function() {

             var me = this;
             var assert = o2.Unit.assert;

             var param = 42;
             var resultWithParam = testMethod1(param);
             var resultWithoutParam = testMethod1();

             assert(me, resultWithoutParam === null, 'testMethod1() returns
             null');

             }

             });

             add('this is just for demonstration', {
             count : 2,
             test : function() {

             var me = this;
             var assertEqual = o2.Unit.assertEqual;

             var param = 'testItem';

             o2.Unit.assert(me, param, 'param exists.');

             setTimeout(function() {

             assertEqual(me, ( typeof param), 'string', 'param is String.');

             }, 2000);

             //this._will.raise_an_error.thats_the_point = 1;

             }

             });*/

            o2.Unit.run();

        }

    };

    Suite.init();

}(o2, this));
