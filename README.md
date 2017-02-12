# Chocolate Chip

A tiny CommonJS cookie toolkit.

## Install

First install Chocolate Chip in your project root.

```  
$ npm install --save chocolate-chip
```

Then include in your module using require().

```javascript
var cookie = require('chocolate-chip');
```

## Use

### Set cookie

```javascript
cookie.set('name', 'value'[, opts]);
```

#### Options

`opts` is an object that allows the following options:

* `end`: Maximum cookie age in milliseconds or `Infinity`. Set as GMTString or `Date` to specify an end date.
* `path`: Path from where the cookie will be readable.
* `domain`: Domain from where the cookie will be readable
* `secure`: Cookie only transmitted over secure protocols if set to `true`.

### Get cookie

```javascript
cookie.get('name');
```

### Remove cookie

```javascript
cookie.remove('name'[, opts]);
```

### Set cookie forever

Shorthand for `cookie.set()`, sets `end` to `Infinity`.

```javascript
cookie.forever('name', 'value'[, opts]);
```
