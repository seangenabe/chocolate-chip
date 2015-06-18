"use strict";

var SEPERATOR = '; ',
	EQUALS = '=';

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
			if (decodeURIComponent(cookieKeyValue[0]) === name) {
				return decodeURIComponent(cookieKeyValue[1]);
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