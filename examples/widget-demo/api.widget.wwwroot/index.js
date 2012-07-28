/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-28 16:22:04.292820
 * -->
 */

/*global require, __dirname*/
(function() {
    'use strict';

    var express = require('express');
    var fs      = require('fs');
    var jade    = require('jade');

    var app = express.createServer();

    var kOneYear = 31536000000;

    /*
     * kSessionSecret will be use to compute the session hash.
     * Make sure you keep it random and "secret".
     *
     * A public github repository is not the ideal way to store a private
     * session "secret" ;) -- Change it if you plan to use it in production.
     */
    var kSessionSecret = 'Lorem Ipsum Dolar sit Ahmet!';

    /*
     * Basic Configuration
     */
    var config = {
        farFutureExpiration : {maxAge : kOneYear},

        api_v_0_1 : {
            VERSION_TIMESTAMP : '20120720135547909116'
        }
    };

    /*
     * Routes
     */
    var route = {
        api_v_0_1 : {
            LOGIN  : '/api/v.0.1/login',
            UPDATE : '/api/v.0.1/update',
            BEACON : '/api/v.0.1/beacon',
            PARAMS : '/api/v.0.1/params'
        }
    };

    /*
     * Urls
     */
    var url = {
        api_v_0_1 : {
            BOOTSTRAP     : 'http://api.widget.www/api.v.0.1.js',
            UPDATE_IFRAME : 'http://api.widget.www/api/v.0.1/update'
        }
    };

    /*
     * Templates
     */
    var template = {
        UPDATE        : 'update.jade',
        UPDATE_SCRIPT : 'js/update.jade',
        LOGIN_FORM    : 'login_form.jade',
        DASHBOARD     : 'dashboard.jade'
    };

    /*
     * Paths
     */
    var path = {
        STATIC_FILE : __dirname + '/static',
        VIEWS       : __dirname + '/views',
        SEPARATOR   : '/'
    };

    /*
     * Request Parameters
     */
    var parameter = {
        VERSION        : 'v',
        CALLBACK       : 'callback',
        PUBLISHER_ID   : 'pubId',
        PUBLISHER_NAME : 'publisherName',
        GUID           : 'guid',
        USERNAME       : 'u',
        PASSWORD       : 'p'
    };

    /*
     * HTTP Status Codes
     */
    var statusCode = {
        NO_DATA : 204
    };

    /*
     * Encodings
     */
    var encoding = {
        DEFAULT : 'utf8'
    };

    /*
     * Compiles a Jade template from the given template name.
     */
    function compileSync(templateName) {
        return jade.compile(
            fs.readFileSync(
                path.VIEWS + path.SEPARATOR + templateName,
                encoding.DEFAULT
            )
        );
    }

    /*
     * A compiled Jade template function for the login form.
     */
    var createLoginForm = compileSync(template.LOGIN_FORM);

    /*
     * A compiled Jade template function for the dashboard.
     */
    var createDashboard = compileSync(template.DASHBOARD);

    /*
     * Make sure that the static assets have a far future expiration date.
     */
    app.use(
        express['static'](
            path.STATIC_FILE,
            config.farFutureExpiration
        )
    );

    /*
     * Session Support
     */
    app.use(express.cookieParser());
    app.use(express.session({secret : kSessionSecret}));

    /*
     * Set path to the views (template) directory
     */
    app.set('views', path.VIEWS);

    /**
     *
     */
    function setImmediateExpiresHeader(res) {
        res.header('Cache-Control', 'public, max-age=0, must-revalidate');
        res.header('Expires', new Date(Date.now()).toUTCString());
    }

    /**
     *
     */
    function setShortExpiresHeader(res) {
        var kOneMinute = 60;

        res.header('Cache-Control', 'public, max-age=' + kOneMinute);
        res.header('Expires',
            new Date(Date.now() + kOneMinute * 1000).toUTCString()
        );
    }

    /*
     *
     */
    function isUserLoggedIn(req) {
        return !!req.session[parameter.USERNAME];
    }

    /*
     *
     */
    function send(res, callback, result) {
        res.send(
            callback + '(' + JSON.stringify(result) + ');'
        );
    }

    /*
     *
     */
    function sendJsonp(req, res, params, callback) {
        var result = {
            data :
                isUserLoggedIn(req) ?
                createDashboard(params) :
                createLoginForm(params)
        };

        send(res, callback, result);
    }


    /* #region API v.0.1 */

        /**
         *
         */
        function v_0_1(stuff) {
            return stuff.api_v_0_1;
        }

        /**
         *
         */
        app.get(v_0_1(route).LOGIN, function(req, res) {
            var username = req.param(parameter.USERNAME);
            var password = req.param(parameter.PASSWORD);
            var callback = req.param(parameter.CALLBACK);

            if (!username) {
                res.send(statusCode.NO_DATA);
            }

            if (!password) {
                res.send(statusCode.NO_DATA);
            }

            if (!callback) {
                res.send(statusCode.NO_DATA);
            }

            var session = req.session;

            session[parameter.USERNAME] = username;

            var params = {};

            sendJsonp(req, res, params, callback);
        });

        /**
         *
         */
        app.get(v_0_1(route).PARAMS, function(req, res) {
            var callback    = req.param(parameter.CALLBACK);
            var publisherId = req.param(parameter.PUBLISHER_ID);
            var guid        = req.param(parameter.GUID);

            if (!callback) {
                res.send(statusCode.NO_DATA);
            }

            if (!publisherId) {
                res.send(statusCode.NO_DATA);
            }

            if (!guid) {
                res.send(statusCode.NO_DATA);
            }

            // very primitive access control.
            if (publisherId !== '123456') {
                res.send(statusCode.NO_DATA);

                return;
            }

            var params = {};

            params[parameter.GUID]           = guid;
            params[parameter.PUBLISHER_NAME] = 'Cool Publisher';

            sendJsonp(req, res, params, callback);
        });

        /**
         * Updates the
         */
        app.get(v_0_1(route).UPDATE, function(req, res) {
            req = null;

            res.header('Content-Type', 'text/html');

            setImmediateExpiresHeader(res);

            res.render(template.UPDATE, {
                apiBootstrapUrl : v_0_1(url).BOOTSTRAP
            });
        });

        /**
         * Beacon to validate the cache of the JS API.
         */
        app.get(v_0_1(route).BEACON, function(req, res) {
            res.header('Content-Type', 'text/javascript');

            setShortExpiresHeader(res);

            var versionTimestamp = v_0_1(config).VERSION_TIMESTAMP;

            var requestedVersion = req.param(
                parameter.VERSION,
                versionTimestamp
            );

            if (requestedVersion !== versionTimestamp) {
                res.render(template.UPDATE_SCRIPT, {
                    iframeUrl : v_0_1(url).UPDATE_IFRAME
                });

                return;
            }

            res.send(statusCode.NO_DATA);
        });

    /* #endregion */

    app.listen(80);
}());
