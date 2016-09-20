"use strict";

var SEPERATOR = '; ',
    EQUALS = '=',
    FOREVER = 'Fri, 31 Dec 9999 23:59:59 GMT',
    PAST = 'Thu, 01 Jan 1970 00:00:01 GMT',

    encode = encodeURIComponent,
    decode = decodeURIComponent,

    /*
        Get expires parameter

        @param [string || number || Date]: 
        @return [string]: Param fragment with date
    */
    getExpiresParam = function (end) {
        var expires = '';

        switch (typeof end) {
            case 'number':
                // If this number is set to Infinity, set to arbitary time
                if (end === Infinity) {
                    expires = paramString('expires', FOREVER);

                // Or if it's in ms, set max-age
                } else {
                    expires = paramString('max-age', end);
                }
                break;

            // Assume this is a time string
            case 'string':
                expires = paramString('expires', end);
                break;

            // Assume this is a Date object
            case 'object':
                if (end.toUTCString) {
                    expires = paramString('expires', end.toUTCString());
                }
                break;
        }

        return expires;
    },

    /*
        Build param fragment

        @param [string]: Param name
        @param [string]: Param value
    */
    paramString = function (name, value) {
        var param = SEPERATOR + name;

        if (value !== undefined) {
            param += EQUALS + value;
        }

        return param;
    };

module.exports = {

    /*
        Get cookie value

        @param [string]: Name of cookie
        @return [string]: Value of cookie, false if not found
    */
    get: function (name) {
        var allCookies = document.cookie.split(SEPERATOR),
            numCookies = allCookies.length,
            cookieKeyValue = [],
            cookieValue = false,
            i = 0;

        for (; i < numCookies; i++) {
            cookieKeyValue = allCookies[i].split(EQUALS);

            // Check if cookie key is the same as provided name
            if (decode(cookieKeyValue[0]) === name) {
                cookieValue = decode(cookieKeyValue[1]);
            }
        }

        return cookieValue;
    },

    /*
        Set cookie value

        @param [string]: Name of cookie
        @param [string]: Value of cookie
        @param [object] (optional): Cookie options
            * end [number || string]: Maximum cookie age in milliseconds or
                `Infinity`. Set as GMTString or `Date` to specify an end date.
            * path [string]: Path from where the cookie will be readable.
            * domain [string]: Domain from where the cookie will be readable
            * secure [boolean]: Cookie only transmitted over secure protocols if set to `true`.
        @return: this
    */
    set: function (name, value, opts) {
        var cookie = encode(name) + EQUALS + encode(value);

        opts = opts || {};

        // Build cookie string
        cookie += getExpiresParam(opts.end);
        cookie += (opts.path) ? paramString('path', opts.path) : '';
        cookie += (opts.domain) ? paramString('domain', opts.domain) : '';
        cookie += (opts.secure) ? paramString('secure') : '';

        document.cookie = cookie;

        return this;
    },

    /*
        Set cookie value forever

        @params: As .set()
        @return: this
    */
    forever: function (name, value, opts) {
        opts = opts || {};
        opts.end = FOREVER;

        this.set(name, value, opts);

        return this;
    },

    /*
        Remove cookie

        @param [string]: Name
        @return: this
    */
    remove: function (name, opts) {
        this.set(name, '', {
            end: PAST,
            path: (opts && opts.path) ? opts.path : undefined,
            domain: (opts && opts.domain) ? opts.domain : undefined,
            secure: (opts && opts.secure) ? opts.secure : undefined
        });
    }
};