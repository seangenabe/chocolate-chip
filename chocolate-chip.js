"use strict";

var SEPERATOR = '; ',
	EQUALS = '=',

	encode = encodeURIComponent,
	decode = decodeURIComponent,

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
			i = 0;

		for (; i < numCookies; i++) {
			cookieKeyValue = allCookies[i].split(EQUALS);

			// Check if cookie key is the same as provided name
			if (decode(cookieKeyValue[0]) === name) {
				return decode(cookieKeyValue[1]);
			}
		}
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
		var cookie = encode(name) + EQUALS + encode(value),
			expires = '',
			end;

		opts = opts || {};
		end = opts.end;

		if (end) {
			switch (typeof end) {
				case 'number':
					// If this number is set to Infinity, set to arbitary time
					if (end === Infinity) {
						expires = paramString('expires', 'Fri, 31 Dec 9999 23:59:59 GMT');

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
		}

		// Build cookie string
		cookie += expires;
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

		return this;
	},

	/*
		Remove cookie

		@param [string]: Name
		@return: this
	*/
	remove: function (name) {},

	/*
		Is cookie set?

		@param [string]: Name of cookie
		@return [boolean]: true if cookie is set
	*/
	isSet: function (name) {


	}
};