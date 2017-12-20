(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/base64-js/lib/b64.js","/../../../node_modules/base64-js/lib")
},{"FT5ORs":33,"buffer":2}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/buffer/index.js","/../../../node_modules/buffer")
},{"FT5ORs":33,"base64-js":1,"buffer":2,"ieee754":24}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/define-properties/index.js","/../../../node_modules/define-properties")
},{"FT5ORs":33,"buffer":2,"foreach":20,"object-keys":4}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/define-properties/node_modules/object-keys/index.js","/../../../node_modules/define-properties/node_modules/object-keys")
},{"./isArguments":5,"FT5ORs":33,"buffer":2}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/define-properties/node_modules/object-keys/isArguments.js","/../../../node_modules/define-properties/node_modules/object-keys")
},{"FT5ORs":33,"buffer":2}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var has = require('has');
var toPrimitive = require('es-to-primitive/es6');

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = require('./helpers/assign');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrimitive = require('./helpers/isPrimitive');
var parseInteger = parseInt;
var bind = require('function-bind');
var arraySlice = bind.call(Function.call, Array.prototype.slice);
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = require('./es5');

var hasRegExpMatcher = require('is-regex');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, Number);
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - http://www.ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - http://www.ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && Symbol.species ? C[Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && Symbol.species) {
				C = this.Get(C, Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = Object.getOwnPropertyDescriptor(O, P);
		var extensible = oldDesc || (typeof Object.isExtensible !== 'function' || Object.isExtensible(O));
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new TypeError('unable to create data property');
		}
		return success;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new TypeError('Assertion failed: Type(S) is not String');
		}
		if (!this.IsInteger(index)) {
			throw new TypeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (index < 0 || index > MAX_SAFE_INTEGER) {
			throw new RangeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(unicode) is not Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}
		var first = S.charCodeAt(index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}
		var second = S.charCodeAt(index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}
		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/es2015.js","/../../../node_modules/es-abstract")
},{"./es5":8,"./helpers/assign":10,"./helpers/isFinite":11,"./helpers/isNaN":12,"./helpers/isPrimitive":13,"./helpers/mod":14,"./helpers/sign":15,"FT5ORs":33,"buffer":2,"es-to-primitive/es6":17,"function-bind":22,"has":23,"is-regex":27}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var ES2015 = require('./es2015');
var assign = require('./helpers/assign');

var ES2016 = assign(assign({}, ES2015), {
	// https://github.com/tc39/ecma262/pull/60
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	}
});

module.exports = ES2016;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/es2016.js","/../../../node_modules/es-abstract")
},{"./es2015":6,"./helpers/assign":10,"FT5ORs":33,"buffer":2}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/es5.js","/../../../node_modules/es-abstract")
},{"./helpers/isFinite":11,"./helpers/isNaN":12,"./helpers/mod":14,"./helpers/sign":15,"FT5ORs":33,"buffer":2,"es-to-primitive/es5":16,"has":23,"is-callable":25}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

module.exports = require('./es2016');

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/es7.js","/../../../node_modules/es-abstract")
},{"./es2016":7,"FT5ORs":33,"buffer":2}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var has = Object.prototype.hasOwnProperty;
module.exports = function assign(target, source) {
	if (Object.assign) {
		return Object.assign(target, source);
	}
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/assign.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/isFinite.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/isNaN.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/isPrimitive.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/mod.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-abstract/helpers/sign.js","/../../../node_modules/es-abstract/helpers")
},{"FT5ORs":33,"buffer":2}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-to-primitive/es5.js","/../../../node_modules/es-to-primitive")
},{"./helpers/isPrimitive":18,"FT5ORs":33,"buffer":2,"is-callable":25}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var isDate = require('is-date-object');
var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-to-primitive/es6.js","/../../../node_modules/es-to-primitive")
},{"./helpers/isPrimitive":18,"FT5ORs":33,"buffer":2,"is-callable":25,"is-date-object":26,"is-symbol":28}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es-to-primitive/helpers/isPrimitive.js","/../../../node_modules/es-to-primitive/helpers")
},{"FT5ORs":33,"buffer":2}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/es6-object-assign/index.js","/../../../node_modules/es6-object-assign")
},{"FT5ORs":33,"buffer":2}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/foreach/index.js","/../../../node_modules/foreach")
},{"FT5ORs":33,"buffer":2}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/function-bind/implementation.js","/../../../node_modules/function-bind")
},{"FT5ORs":33,"buffer":2}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/function-bind/index.js","/../../../node_modules/function-bind")
},{"./implementation":21,"FT5ORs":33,"buffer":2}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/has/src/index.js","/../../../node_modules/has/src")
},{"FT5ORs":33,"buffer":2,"function-bind":22}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/ieee754/index.js","/../../../node_modules/ieee754")
},{"FT5ORs":33,"buffer":2}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/is-callable/index.js","/../../../node_modules/is-callable")
},{"FT5ORs":33,"buffer":2}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/is-date-object/index.js","/../../../node_modules/is-date-object")
},{"FT5ORs":33,"buffer":2}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var has = require('has');
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/is-regex/index.js","/../../../node_modules/is-regex")
},{"FT5ORs":33,"buffer":2,"has":23}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/is-symbol/index.js","/../../../node_modules/is-symbol")
},{"FT5ORs":33,"buffer":2}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var ES = require('es-abstract/es7');
var has = require('has');
var bind = require('function-bind');
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function values(O) {
	var obj = ES.RequireObjectCoercible(O);
	var vals = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			vals.push(obj[key]);
		}
	}
	return vals;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/object.values/implementation.js","/../../../node_modules/object.values")
},{"FT5ORs":33,"buffer":2,"es-abstract/es7":9,"function-bind":22,"has":23}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/object.values/index.js","/../../../node_modules/object.values")
},{"./implementation":29,"./polyfill":31,"./shim":32,"FT5ORs":33,"buffer":2,"define-properties":3}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.values === 'function' ? Object.values : implementation;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/object.values/polyfill.js","/../../../node_modules/object.values")
},{"./implementation":29,"FT5ORs":33,"buffer":2}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimValues() {
	var polyfill = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues() {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/object.values/shim.js","/../../../node_modules/object.values")
},{"./polyfill":31,"FT5ORs":33,"buffer":2,"define-properties":3}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/process/browser.js","/../../../node_modules/process")
},{"FT5ORs":33,"buffer":2}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var state = {
    loggedIn: false,
    user: '',
    isMobile: false,
    player: null,
    expanded: false,
    video: {
        query: '',
        nextPageToken: ''
    },
    prevScrollPos: 0,
    downScrollPos: 0
};

// // // // // // // //
// 
//  ES6 Polyfills
//
// // // // // // // //
var values = require('object.values');
require('es6-object-assign').polyfill();

// Banner Nav
var BANNER_WRAP = '.banner-wrap';
var BURGER_ANCHOR = '.burger-anchor';
var BURGER_WRAP = '.burger-icon-wrap';
var BURGER_ICON = '#burger-icon';
var MOBILE_MENU = '.mobile-menu';
var MOBILE_MENU_ITEM = '.mobile-menu li';
var REVIEWS_NAV_ITEM = '.reviews';
var LOGIN_BTN = '.login';
var SIGNUP_BTN = '.signup';
var LOGOUT_BTN = '.logout';
// Login / Signup Modal
var LOGIN_SIGNUP_PAGE = '#login-signup';
var LOGIN_SIGNUP_MODAL = '.login-signup-container';
var SIGNUP_FORM = '.signup-form';
var LOGIN_FORM = '.login-form';
var SIGNUP_SCREEN_BTN = '.signup-screen-btn';
var LOGIN_SCREEN_BTN = '.login-screen-btn';
var LOGIN_SIGNUP_X = '#login-signup-x';
var PASS_INPUT = '.pass-input';
var EMAIL_INPUT = '.email-input';
var USERNAME_INPUT = '.username-input';
var SIGNUP_ERROR = '.signup-error';
var LOGIN_ERROR = '.login-error';
// Write Review Form
var REVIEW_FORM_SCREEN = '#review-form-screen';
var EDIT_REVIEW_FORM_SCREEN = '#edit-review-form-screen';
var REVIEW_FORM = '#review-form';
var EDIT_REVIEW_FORM = '#edit-review-form';
var CLOSE_BTN = '.close-btn';
var WRITE_REVIEW_NAV = '.write-review';
var DELETE_POST_MODAL_BTN = '.delete-post-modal-btn';
var DELETE_POST_MODAL = '.delete-confirm-modal';
var DELETE_POST_BTN = '.delete-post-btn';
var GO_BACK_BTN = '.go-back-btn';
// Review Preview Screen
var PREVIEW_SCREEN = '#review-post-preview';
var PREVIEW_CONTENT = '.preview-content';
var PREVIEW_BTN = '.preview-btn';
var PREIVEW_CLOSE_BTN = '.preview-close-btn';
var INTERACTIONS = '.interactions';
// Drone carousel
var DRONE_SLIDER = '.drone-slider';
var DRONE_MODELS_SLIDER = '.drone-models-slider';
// Drone detail page
var DETAIL_MAKE = '.detail-make';
var DETAIL_MODEL = '.detail-model';
var DETAIL_LISTS = '.detail-lists';
var AMAZON_LINK = '.amazon-link';
var MAIN_VID = '.main-video iframe';
var G_VID_1 = '.g-top-left img';
var G_VID_2 = '.g-top-right img';
var G_VID_3 = '.g-bottom-left img';
var G_VID_4 = '.g-bottom-right img';
var G_IMG = '.g-video img';
var EXPAND_ARROW = '.main-video-wrap .fa.fa-expand';
var V_CLOSE_ICON = '.v-modal-close.fa.fa-times';
var VIDEO_BACKDROP = '.video-backdrop';
var MODAL_IFRAME = '.frame-wrap iframe';
var MORE_ICON = '.more-icon.fa';
var SHOWCASE = '.showcase-wrap';
var GALLERY = '.video-gallery';
// Aside Filter
var ASIDE_BTN = '.aside-slide-btn';
var ASIDE_CONTAINER = '.aside-container';
var SEARCH_FILTER_FORM = '#search-filter-form';
var SEARCH_FILTER = '.search-filter';
var QUERY_TEXT = '.query-text';
var USER_QUERY = '.js-user-query';
var QUERY_ERROR_MESSAGE = '.query-error-message';
var FILTER_FORM = '#radio-filter-form';
var USER_FILTER = '.js-user-filter';
var FILTER_STATUS = '.filter-status';
var FILTER_ALERT = '.filter-alert';
var FILTER_BTN = '.filter-btn';
var CLEAR_BTN = '.clear-btn';
// Review 
var REVIEWS = '#reviews';
var REVIEWS_CONTAINER = '#reviews-container';
var REVIEWS_CONTENT = '#reviews-content';
var REVIEW = '.review';
var DETAILS = '.details';
var SPECS_BTN = '.specs-btn';
var EXPAND = '.expand';
// review/comment Interactions
var UPVOTE_ARROW = '.up-vote-arrow';
var DOWNVOTE_ARROW = '.down-vote-arrow';
var VOTES = '.js-votes';
var LIKE = '.like';
var DISLIKE = '.dislike';
var LIKES = '.like-dislikes';
var POSNEG = '.posNeg';
var EDIT_POST_ICON = '#edit-post-icon';
// Comments
var COMMENTS_BTN = '.comments-btn';
var COMMENTS_CONTAINER = '.comments-container';
var COMMENT_BTN = '.comment-btn';
var COMMENTS_CONTENT = '.comments-content';
var COMMENT_FORM = '.comment-form';
var COMMENT_INPUT = '.comment-input';
var NUM_COMMENTS = '.js-comments-num';
// reply comments
var REPLY_COMMENT_FORM = '.reply-comment-form';
var REPLY_COMMENT_INPUT = '.reply-comment-input';
var REPLY_COMMENT_CONTENT = '.reply-comments-content';
var SHOW_REPLY_COMMENTS_TXT = '.show-reply-comments-txt';
var CLOSE_REPLY_COMMENTS_TXT = '.close-reply-comments-txt';
var SUB_SIGNUP_BTN = '.sub-signup';
var SUB_LOGIN_BTN = '.sub-login';
// Footer
var TOP_TOP_ARROW = '.to-top';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated review post template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function formReviewPost(postData) {
    var byThisUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var userVoted = arguments[2];

    var $this = postData;

    var id = $this.id,
        author = $this.author.username || state.user,
        // If username isnt attached to post, this is new post & attach current session user
    make = $this.specs.brand,
        model = $this.specs.model,
        url = $this.specs.url,
        modelId = $this.drone.model,
        makeId = $this.drone.make,
        title = $this.title,
        content = $this.content,
        specs = $this.specs,
        img_src = specs.img,
        votes = $this.votes || 0,
        rating = $this.rating,
        created = getElapsedTime(new Date($this.created));

    // Amazon product link
    var amazonLink = $this.specs.link;

    content = content.map(function (paragraph) {
        return '<p class="paragraph">' + paragraph + '</p>';
    });

    var stars = '';
    for (var i = 0; i < rating; i++) {
        stars += '<span class="star filled-star">&#9734;</span>';
    }

    var posNeg = '';
    if (votes < 0) posNeg = '&#45;';else if (votes > 0) posNeg = '+';

    var review = '<div class="review">\n                        <div class="post" data-post-id="' + id + '" data-drone-model="' + modelId + '">\n                            <div class="img-container">\n                                <img class="post-img" src="' + img_src + '">\n                                <h3>Model: <span class="model">' + model + '</span></h3>\n                                <h5>Manufacturer: <b><span class="maker"><a href="/drones/' + url + '">' + make + '</a></span></b></h5>\n                                <div class="post-rating" data-rating="' + rating + '">\n                                    <label>User rating: </label>\n                                    <div class="post-stars">' + stars + '</div>\n                                </div>\n                            </div>\n                            <h2 class="post-title">' + title + '</h2>\n                            <hr class="shadow-hr">\n                            <div class="vote-aside">\n                                <div class="arrow-wrap">\n                                    <i class="up-vote-arrow fa fa-arrow-up" aria-hidden="true" data-user-voted="' + userVoted + '"></i>\n                                    <span class="posNeg">' + posNeg + '</span><span class="js-votes">' + votes + '</span>\n                                    <i class="down-vote-arrow fa fa-arrow-down" aria-hidden="true" data-user-voted="' + userVoted + '"></i>\n                                </div>\n                            </div>\n                            <div class="content">\n                                ' + content.join('') + '\n                            </div>\n                            <hr class="mobile-only post-hr">\n                            <div class="post-attr">\n                                \n                                <div class="c-date-edit-wrap">\n                                    \n                                    <span class="date-posted">submitted  ' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + ' by</span> <label class="author-label" for=""><span class="author">' + author + '</span></label>\n                                    ' + (byThisUser ? '<i id="edit-post-icon" class="fa fa-pencil-square-o" aria-hidden="true"></i>' : '') + ' \n                                </div>\n                            </div>\n\n                            <div class="mobile-vote-aside">\n                                <i class="up-vote-arrow fa fa-arrow-up" data-user-voted="' + userVoted + '" aria-hidden="true"></i>\n                                <span class="posNeg">' + posNeg + '</span><span class="votes js-votes">' + votes + '</span>\n                                <i class="down-vote-arrow fa fa-arrow-down" data-user-voted="' + userVoted + '" aria-hidden="true"></i>\n                            </div>\n                            <div class="interactions">\n                                <button class="specs-btn" type="button">\n                                    Specs\n                                    <i class="fa fa-plus" aria-hidden="true"></i>\n                                </button>\n                                <button class="comments-btn" type="button">\n                                    Comments\n                                    <i class="fa fa-comment-o" aria-hidden="true"></i>\n                                </button>\n                            </div>\n                        </div>\n                        <div class="details">\n                            <div class="detail-header">\n                                <h3>Model: <span class="model">' + model + '</span></h3>\n                                <h5>Manufacturer: <span class="maker"><b><a href="/drones/' + url + '">' + make + '</a></b></span></h5>\n                                <div class="amazon-link-wrap">\n                                    <h4>Grab one: <span class="amazon-link">' + amazonLink + '</span></h4>\n                                </div>\n                            </div>\n                            <div class="specs">\n                                <dl class="main-specs">\n                                    <dt>Specs</dt>\n                                    <dd>Avg. Price: <span>$' + specs.price + '</span></dd>\n                                    <dd>Camera: <span>' + specs.camera + '</span></dd>\n                                    <dd>Max Flight Time: <span class="max-flight">' + specs.max_flight_time + '</span></dd>\n                                    <dd>Max Range: <span>' + specs.max_range + '</span></dd>\n                                    <dd>Max Speed: <span>' + specs.max_speed + '</span></dd>\n                                    <dd>GPS?: <span>' + specs.gps + '</span></dd>\n                                    <dd>3-axis gimbal: <span>' + specs.gimbal + '</span></dd>\n                                    <dd>Flips: <span>' + (specs.flips || 'NO') + '</span></dd>\n                                </dl>\n\n                                <dl class="mode-specs">\n                                    <dt>Modes</dt>\n                                    <dd>Intelligent Flight: <span>' + specs.intelligent_flight + '</span></dd>\n                                    <dd>Avoidance: <span>' + (specs.avoidance || 'NO') + '</span></dd>\n                                    <dd>Return Home: <span>' + (specs.return_home || 'NO') + '</span></dd>\n                                    <dd>Follow-Me Mode: <span>' + (specs.follow_me_mode || 'NO') + '</span></dd>\n                                    <dd>Tracking Mode: <span>' + (specs.tracking_mode || 'NO') + '</span></dd>\n                                </dl>\n                            </div>\n                        </div>\n                        <div class="comments-container">\n                            <header class="comments-header">\n                                <span class="js-comments-num">0</span> Comments\n                                <i class="fa fa-comment-o" aria-hidden="true"></i>\n                            </header>\n                            <div class="comments-content" data-post-id="' + id + '">\n\n                            </div>\n                            <hr class="shadow-hr">';
    if (state.loggedIn) {
        // Logged in, comment form displayed
        review += '<form class="comment-form" method="post" action="/posts/comments">\n                                <textarea class="comment-input" rows="" cols="" placeholder="Write comment here . . ." required></textarea>\n                                <button class="comment-btn" type="submit">Comment</button>\n                            </form>';
    } else {
        // Not logged in, message to log in to write comment
        review += '<div class="login-message-container">\n                                <p class="login-message">Must be logged in to write a comment.</p>\n                                <ul class="comment-nav">\n                                    <li><a href="#" class="sub-login">LogIn</a></li>\n                                    <li><a href="#" class="sub-signup">Sign Up</a></li>\n                                </ul>\n                            </div>';
    }
    // close review <div>'s            
    review += '</div>\n                    </div>\n                    <hr class="post-hr">';
    return review;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getCommentTemplate(comment, byThisUser, didUserLike) {
    var content = comment.content,
        username = comment.author.username,
        created = getElapsedTime(new Date(comment.created)),
        likes = comment.likes,
        postId = comment.postId,
        id = comment.id;
    var posNeg = '';
    if (likes < 0) posNeg = '&#45;';else if (likes > 0) posNeg = '+';

    var commentTemp = '<div class="comment gen-comment" id="_' + id + '" data-post-id="' + postId + '" data-this-id="' + id + '">\n                    <p class="comment-content">' + content + '</p>\n                    <div class="comment-metadata">\n                        <span class="comment-user">- @' + username + '</span>\n                        <span class="date-posted">' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + '</span>\n                        <div class="thumbs">\n                            <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                            <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                            <span class="posNeg">' + posNeg + '</span><span class="like-dislikes">' + likes + '</span>\n                        </div>\n                        <label class="reply-c-btn-label" for="">\n                            <span class="show-reply-comments-txt">comments</span><span class="close-reply-comments-txt hidden">hide</span>\n                            <button class="expand-reply-comments-btn" type="button"></button>\n                        </label>\n                    </div>\n                    <div class="reply-comments-container">\n                        \n                        <div class="reply-comments-content" data-comment-id="' + id + '">\n                            \n                        </div>';

    if (state.loggedIn) {
        // Logged in, reply comment form displayed
        commentTemp += '<form class="reply-comment-form comment-form expand" method="POST" action="/posts/comments">\n                            <textarea class="reply-comment-input comment-input" rows="" cols="" placeholder="Type your reply here . . ." required></textarea>\n                            <button class="reply-comment-btn" type="submit">Reply</button>\n                        </form>';
    }
    // close comment <div>'s  
    commentTemp += '</div>\n                 </div>';
    return commentTemp;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated reply comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getReplyCommentTemplate(comment, byThisUser, didUserLike) {
    var content = comment.content,
        username = comment.author.username,
        created = getElapsedTime(new Date(comment.created)),
        likes = comment.likes,
        commentId = comment.commentId,
        id = comment._id;
    var posNeg = '';
    if (likes < 0) posNeg = '&#45;';else if (likes > 0) posNeg = '+';
    return '<hr class="thin-hr">\n            <div class="reply-comment" data-this-id="' + id + '">\n                <p class="reply-comment-content gen-comment">' + content + '</p>\n                <div class="reply-comment-metadata">\n                    <span class="comment-user">- @' + username + '</span>\n                    <span class="date-posted">' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + '</span>\n                    <div class="thumbs">\n                        <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                        <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                        <span class="posNeg">' + posNeg + '</span><span class="like-dislikes">' + likes + '</span>\n                    </div>\n                </div>\n            </div>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Template for model detail page specs
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDetailPageSpecsTemplate(data) {
    return '<li>\n                <dl class="main-specs">\n                    <dt>Specs</dt>\n                    <dd>Avg. Price: <span>$' + data.price + '</span></dd>\n                    <dd>Camera: <span>' + data.camera + '</span></dd>\n                    <dd>Max Flight Time: <span class="">' + data.max_flight_time + '</span></dd>\n                    <dd>Max Range: <span>' + data.max_range + '</span></dd>\n                    <dd>Max Speed: <span>' + data.max_speed + '</span></dd>\n                    <dd>GPS?: <span>' + data.gps + '</span></dd>\n                    <dd>3-axis gimbal: <span>' + data.gimbal + '</span></dd>\n                    <dd>Flips: <span>' + (data.flips || 'NO') + '</span></dd>\n                </dl>\n            </li>\n            <li>\n                <dl class="mode-specs">\n                    <dt>Modes</dt>\n                    <dd>Intelligent Flight: <span>' + data.intelligent_flight + '</span></dd>\n                    <dd>Avoidance: <span>' + (data.avoidance || 'NO') + '</span></dd>\n                    <dd>Return Home: <span>' + (data.return_home || 'NO') + '</span></dd>\n                    <dd>Follow-Me Mode: <span>' + (data.follow_me_mode || 'NO') + '</span></dd>\n                    <dd>Tracking Mode: <span>' + (data.tracking_mode || 'NO') + '</span></dd>\n                </dl>\n            </li>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Template for each gallery video
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getGalleryTemplate(video) {
    var EMBED_URL = "https://www.youtube.com/embed";
    var imgUrl = video.snippet.thumbnails.medium.url,
        videoId = video.id.videoId,
        description = video.snippet.description;

    return '<div class="vid-wrap ' + (state.isMobile ? 'mobile-vid' : '') + '">\n                <div class="g-video ' + (state.isMobile ? 'mobile-vid' : '') + '">\n                    <img class="' + (state.isMobile ? 'hidden' : '') + '" \n                        src="' + imgUrl + '" \n                        alt="' + description + '" \n                        data-vid-url="' + EMBED_URL + '/' + videoId + '?enablejsapi=1">\n                    <iframe class="mobile-vid ' + (state.isMobile ? '' : 'hidden') + '"\n                        src="' + EMBED_URL + '/' + videoId + '?enablejsapi=1" \n                        data-alt="' + description + '" \n                        data-vid-url="' + EMBED_URL + '/' + videoId + '?enablejsapi=1"></iframe>\n                </div>\n            </div>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates the model detail specs depending on current slide
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailSpecs(currentSlide) {
    var $currentSlide = $('.drone-model[data-slick-index="' + currentSlide + '"]');
    var model = $currentSlide.attr('data-model'),
        make = $currentSlide.attr('data-make');
    // grab model data object from drones object

    var data = getDroneData(make, model),
        specHtml = getDetailPageSpecsTemplate(data);

    $(DETAIL_MODEL).text(data.model);
    $(DETAIL_MAKE).text(data.brand);
    $(DETAIL_LISTS).html(specHtml);
    $(AMAZON_LINK).html(data.link);
    updateDetailVideos($currentSlide);
    var $specs = $('.main-specs span').add('.mode-specs span');
    $specs.each(function (index) {
        if ($(this).text() === 'NO') {
            $(this).css({ color: 'black' });
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets videos from youtube api and updates current detail 
// page video gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function updateDetailVideos($currentSlide) {
    var EMBED_URL = "https://www.youtube.com/embed";
    var make = $currentSlide.attr('data-cased-make'),
        model = $currentSlide.find('label').text();
    var query = make + ' ' + model;
    searchYoutubeVideos(query, function (res) {
        // Save reference to current query and next page of search results
        state.video.query = query;
        state.video.nextPageToken = res.nextPageToken;

        var vids = res.items;
        var mainVid = vids[0],
            g_vid_1 = vids[1],
            g_vid_2 = vids[2],
            g_vid_3 = vids[3],
            g_vid_4 = vids[4];

        $(MAIN_VID).attr('src', EMBED_URL + '/' + mainVid.id.videoId + '?enablejsapi=1&html5=1').attr('data-thumbnail', mainVid.snippet.thumbnails.medium.url).attr('data-alt', mainVid.snippet.description);

        $(G_VID_1).attr('src', '' + g_vid_1.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_1.id.videoId + '?enablejsapi=1').attr('alt', g_vid_1.snippet.description);

        $(G_VID_2).attr('src', '' + g_vid_2.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_2.id.videoId + '?enablejsapi=1').attr('alt', g_vid_2.snippet.description);

        $(G_VID_3).attr('src', '' + g_vid_3.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_3.id.videoId + '?enablejsapi=1').attr('alt', g_vid_3.snippet.description);

        $(G_VID_4).attr('src', '' + g_vid_4.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_4.id.videoId + '?enablejsapi=1').attr('alt', g_vid_4.snippet.description);

        nextSearchPageHandler(); // Load videos in 'checkout more' section
    }, 5);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles swapping videos between right side gallery
// and the main video on left.
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function videoGalleryHandler($img) {
    var vidUrl = $img.attr('data-vid-url'),
        thumbUrl = $img.attr('src'),
        alt = $img.attr('alt');
    var mainVidUrl = $(MAIN_VID).attr('src'),
        mainVidThumbUrl = $(MAIN_VID).attr('data-thumbnail'),
        mainVidAlt = $(MAIN_VID).attr('data-alt');
    // swap videos
    $(MAIN_VID).attr('src', vidUrl);
    $(MAIN_VID).attr('data-alt', alt);
    $(MAIN_VID).attr('data-thumbnail', thumbUrl);

    $img.attr('src', mainVidThumbUrl);
    $img.attr('alt', mainVidAlt);
    $img.attr('data-vid-url', mainVidUrl);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Creates video elements for each video and appends to
// gallery-content area
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayMoreVideos(videos) {
    var frames = videos.map(function (video) {
        return getGalleryTemplate(video);
    });
    $('.more-content').append(frames.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens video modal and plays video from current time
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openVideoModal(url) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    show(VIDEO_BACKDROP);
    $('body').addClass('no-scroll');
    $(MODAL_IFRAME).attr('src', url + '&start=' + time + '&autoplay=1');
    $(MAIN_VID).attr('src', url);
    $(MODAL_IFRAME).attr('data-index', index);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// closes video modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeVideoModal() {
    hide(VIDEO_BACKDROP);
    $('body').removeClass('no-scroll');
    $(MODAL_IFRAME).attr('src', '');
    $(MODAL_IFRAME).attr('data-index', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Modal Video navigation controller for MAIN gallery
// uses main video iframe url and the four gallery img urls
// for 5 possible choices for video navigation
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function mainModalNavController(nextVideo) {
    var imgs = [$('.g-top-left img'), $('.g-top-right img'), $('.g-bottom-left img'), $('.g-bottom-right img')];
    var currentIndex = parseInt($(MODAL_IFRAME).attr('data-index')),
        nextUrl = void 0,
        nextIndex = void 0;
    if (nextVideo === 'next') {
        if (currentIndex === 3) {
            // end of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if (currentIndex === -1) {
            // current modal video is from main iframe, get first gallery img url
            nextUrl = imgs[0].attr('data-vid-url');
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + 1;
            nextUrl = imgs[nextIndex].attr('data-vid-url');
        }
    } else {
        if (currentIndex === -1) {
            // beginning of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if (currentIndex === 0) {
            nextUrl = $(MAIN_VID).attr('src'); // current modal video is first gallery img url, get main iframe url
            nextIndex = -1;
        } else {
            nextIndex = currentIndex - 1;
            nextUrl = imgs[nextIndex].attr('data-vid-url');
        }
    }
    $(MODAL_IFRAME).attr('src', nextUrl + '&autoplay=1');
    $(MODAL_IFRAME).attr('data-index', nextIndex);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Modal Video navigation controller for SUB gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function modalVideoNavController(nextVideo) {
    var currentIndex = parseInt($(MODAL_IFRAME).attr('data-index'));

    var next = nextVideo === 'next' ? currentIndex + 1 : currentIndex - 1;
    var url = $('.more-content .vid-wrap:nth-of-type(' + (next + 1) + ')').find('img').attr('data-vid-url');

    if (next > $('.more-content img').length - 1 || next < 0) {
        next < 0 ? alert('Click next arrow for more') : alert('Click prev arrow for more');
    } else {
        $(MODAL_IFRAME).attr('src', url + '&autoplay=1');
        $(MODAL_IFRAME).attr('data-index', next);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays current posts in db to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPosts(_posts) {
    var posts = _posts.map(function (post) {
        var specs = getDroneData(post.drone.make, post.drone.model);
        Object.assign(post, { specs: specs });

        // check if current session user voted on this post
        var usersVoted = post.usersVoted;
        // let didUserVote = usersVoted.find((user) => {
        //     return user === state.user
        // });


        var didUserVote = undefined;
        for (var i = 0; i < usersVoted.length; i++) {
            if (usersVoted[i] === state.user) {
                didUserVote = state.user;
            }
        }

        // Check if post is by the current session user
        var byThisUser = false;
        if (post.author.username === state.user) {
            byThisUser = true;
        }
        return formReviewPost(post, byThisUser, didUserVote);
    });

    // Need to append when fetching batch at a time
    var postsStr = posts.reverse().join('');
    $(REVIEWS_CONTENT).html(postsStr);

    var $specs = $('.main-specs span').add('.mode-specs span');
    $specs.each(function (index) {
        if ($(this).text() === 'NO') {
            $(this).css({ color: 'black' });
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates DOM with current comment without requiring
// page refresh
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayComment(comment) {
    if ('postId' in comment) {
        // Main comments
        var postId = comment.postId;
        var commentHtml = getCommentTemplate(comment);
        var $commentsContent = $(COMMENTS_CONTENT + '[data-post-id="' + postId + '"]');

        var $numComments = $commentsContent.parent(COMMENTS_CONTAINER).find(NUM_COMMENTS);
        var count = parseInt($numComments.text());

        count++;
        $numComments.text(count);

        $commentsContent.append(commentHtml);
    } else {
        // Reply comments
        var commentId = comment.commentId;
        var _commentHtml = getReplyCommentTemplate(comment);
        $('.reply-comments-content[data-comment-id=' + commentId + ']').append(_commentHtml);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_PAGE);
    setTimeout(function () {
        $(LOGIN_SIGNUP_PAGE).addClass('slide');
        $(LOGIN_SIGNUP_MODAL).addClass('slide');
    }, 200);
    screen === 'login' ? displayLoginForm() : displaySignupForm();
    $('body').addClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Closes login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeLoginSignupModal() {
    $(LOGIN_SIGNUP_MODAL).removeClass('slide');
    setTimeout(function () {
        $(LOGIN_SIGNUP_PAGE).removeClass('slide');
    }, 200);

    setTimeout(function () {
        hide(LOGIN_SIGNUP_PAGE);
    }, 800);

    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Login form to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayLoginForm() {
    $(LOGIN_SCREEN_BTN).addClass('active-btn');
    $(LOGIN_SCREEN_BTN).removeClass('inactive-btn');
    $(SIGNUP_SCREEN_BTN).addClass('inactive-btn');
    hide(SIGNUP_FORM);
    show(LOGIN_FORM);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Signup form to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySignupForm() {
    $(SIGNUP_SCREEN_BTN).removeClass('inactive-btn');
    $(SIGNUP_SCREEN_BTN).addClass('active-btn');
    $(LOGIN_SCREEN_BTN).addClass('inactive-btn');
    hide(LOGIN_FORM);
    show(SIGNUP_FORM);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays welcome message to new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayWelcomeMessage(user) {
    show('.welcome-message-wrap');
    $('.new-user').text(user);
    $('.login-form .username-input').val(user);
    $('.login-form .pass-input').focus();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays errors from signup in modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySignupError(location, message) {
    openLoginSignupModal('signup');
    var err = message;
    show(SIGNUP_ERROR);
    if (location === 'email') {
        $(EMAIL_INPUT).addClass('error').val('').focus();
    } else if (location === 'username') {
        $('.signup-form ' + USERNAME_INPUT).addClass('error').val('').focus();
    } else if (location === 'password') {
        location = location[0].toUpperCase() + location.slice(1);
        err = location + ': ' + message;
        $(PASS_INPUT).addClass('error');
        $(PASS_INPUT)[0].focus();
    }
    $(PASS_INPUT).val('');
    $(SIGNUP_ERROR + ' .error-message').text(err);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays errors from login in modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayLoginError(message) {
    openLoginSignupModal('login');
    show(LOGIN_ERROR);
    $(LOGIN_ERROR + ' .error-message').text(message);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Slides review form in from top of screen, fades in 
// background
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function slideInReviewForm($nav, SCREEN) {
    var delay = $nav.hasClass('mobile-write') ? 500 : 0; // if click comes from mobile menu, delay so menu closes before form opens
    var modalDelay = state.isMobile ? 100 : 400,
        screenDelay = state.isMobile ? 0 : 100;

    setTimeout(function () {
        show(SCREEN);

        setTimeout(function () {
            $(SCREEN).addClass('fade-in');
        }, screenDelay);

        setTimeout(function () {
            $('.review-form-modal').addClass('slide');
        }, modalDelay);

        $('body').addClass('no-scroll');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Slides review form up out of view, fades out
// background
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function slideUpReviewForm() {
    $('.review-form-modal').removeClass('slide');
    $(REVIEW_FORM_SCREEN).removeClass('fade-in');
    $(EDIT_REVIEW_FORM_SCREEN).removeClass('fade-in');

    var screenDelay = state.isMobile ? 400 : 800;
    setTimeout(function () {
        hide(REVIEW_FORM_SCREEN);
        hide(EDIT_REVIEW_FORM_SCREEN);
    }, screenDelay);

    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays EDIT review post modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayEditPostForm($post) {
    var content = $post.find('.content').html(),
        postTitle = $post.find('.post-title').text(),
        id = $post.attr('data-post-id'),
        model = $post.attr('data-drone-model'),
        rating = $post.find('.post-rating').attr('data-rating');

    // Removes <p> tags and adds '\n\n' chars to end of each paragraph
    // to display text in form the same way it is displayed on screen
    content = content.split('<p class="paragraph">').join('').split('</p>').map(function (para) {
        return para += '\n\n';
    }).join('').trim();

    slideInReviewForm($(EDIT_REVIEW_FORM_SCREEN), EDIT_REVIEW_FORM_SCREEN);

    $('#edit-title-input').val(postTitle);
    $('#edit-post-content').val(content);
    $('.dropdown-options option[value="' + model + '"]').prop('selected', true);
    $(EDIT_REVIEW_FORM).attr('data-post-id', id);
    var $stars = $(EDIT_REVIEW_FORM).find('.star');
    $stars.each(function (index, el) {
        // order of indicies is reverse
        if (index > 5 - rating - 1) {
            $(el).addClass('filled-star');
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Populates drone dropdown selector with all current models
// stored in drones object. Now you only have to update one
// place in code to add new drone options to form
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fillDroneOptGroups() {
    $('.dropdown-options').empty();
    for (var make in drones) {
        var models = [];
        var displayMake = void 0;
        for (var model in drones[make]) {
            var specs = drones[make][model];
            displayMake === undefined ? displayMake = specs.brand : null;
            var option = '<option value="' + model + '">' + specs.model + '</option>';
            models.push(option);
        }
        var optGroup = '<optgroup label="' + displayMake + '">\n                            ' + models.join('') + '\n                        </optgroup>';
        $('.dropdown-options').append(optGroup);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) comments for given post
// and hides Specs if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleComments(commentsBtn) {
    var $review = $(commentsBtn).parents(REVIEW),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $details = $review.find(DETAILS),
        $specs_btn = $review.find(SPECS_BTN);

    var delay = 0;
    if ($details.hasClass('expand')) {
        delay = 100;
    }
    $details.removeClass('expand');
    $specs_btn.removeClass('btn-active');
    setTimeout(function () {
        $commentSection.toggleClass('expand');
        $(commentsBtn).toggleClass('btn-active');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) specs for given post
// and hides comments if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleSpecs(specBtn) {
    var $review = $(specBtn).parents(REVIEW),
        $details = $review.find(DETAILS),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $commentS_btn = $review.find(COMMENTS_BTN);
    var delay = 0;
    if ($commentSection.hasClass('expand')) {
        delay = 100;
    }
    $commentSection.removeClass('expand');
    $commentS_btn.removeClass('btn-active');
    setTimeout(function () {
        $details.toggleClass('expand');
        $(specBtn).toggleClass('btn-active');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {
    $(MOBILE_MENU).toggleClass('open');
    $(BURGER_WRAP).toggleClass('open');
    $(BURGER_ICON).toggleClass('open');
    $('body').toggleClass('no-scroll'); // Sends user to top of page
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Hides mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeMobileMenu() {
    $(MOBILE_MENU).removeClass('open');
    $(BURGER_WRAP).removeClass('open');
    $(BURGER_ICON).removeClass('open');
    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    values(arguments).forEach(function (target) {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    values(arguments).forEach(function (target) {
        $(target).removeClass('hidden');
    });
}

//================================================================================
// API handlers / Display handlers
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles clicks on drone banner and redirects
// to corresponding drone brand endpoint
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function droneBannerHandler($droneMake) {
    var brand = $droneMake.attr('id');
    var url = '/drones/' + brand;
    location.href = url;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects user signup data and submits it to server
// to create a new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function signupFormHandler($form) {
    var email = $form.find('.email-input').val(),
        username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val(),
        rePassword = $form.find('.re-pass-input').val();
    resetLoginForm();
    if (password !== rePassword) {
        alert('passwords did not match.');
        $('.signup-form ' + PASS_INPUT).addClass('error');
    } else {
        $('.signup-form ' + PASS_INPUT).removeClass('error');
        closeLoginSignupModal();
        var data = { email: email, username: username, password: password };
        setTimeout(function () {
            createNewUser(data); // makes call to api
        }, 1000);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Resets signup form and removes any error messages
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function resetSignupForm() {
    $(SIGNUP_FORM + ' ' + USERNAME_INPUT).removeClass('error');
    hide(SIGNUP_ERROR);
    $(SIGNUP_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects username and password from user and 
// calls ajax function to attempt to log user in to session
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function loginFormHandler($form) {
    var username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val();
    var data = { username: username, password: password };

    resetSignupForm();
    closeLoginSignupModal();
    setTimeout(function () {
        logUserIn(data); // makes call to api
    }, 1000);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Resets login form and removes any error messages
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function resetLoginForm() {
    hide(LOGIN_ERROR);
    $(LOGIN_FORM + ' ' + PASS_INPUT).removeClass('error');
    $(LOGIN_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form) {
    var editForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var $selectedOpt = $($form).find('.dropdown-options').find(":selected");
    var make = $selectedOpt.parent().attr('label').toLowerCase(),
        model = $selectedOpt[0].value,
        title = $('#title-input').val(),
        content = $('#post-content').val(),
        rating = $form.find('.filled-star').length;

    var $fileInput = $form.find('.img-file-input');
    var file = $fileInput.val() !== undefined ? $fileInput[0].files[0] : null;

    content = content.split('\n\n');

    var post = {
        drone: { make: make, model: model },
        title: title,
        content: content,
        rating: rating
    };

    if (rating === undefined || rating === 0) {
        show('.rating-alert');
    } else {
        if (editForm) {
            post.content = $('#edit-post-content').val();
            post.content = post.content.split('\n\n'); // Create array of strings, one per paragraph
            post.id = $form.attr('data-post-id');
            post.title = $('#edit-title-input').val();

            // ajax PUT request to db
            updatePost(post, file);
        } else {
            // ajax POST request to db
            createPost(post, file);
        }
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Formulates review post for preview before actually 
// submitting
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function previewReviewHandler($form) {
    var form = $form.is(REVIEW_FORM) ? REVIEW_FORM : EDIT_REVIEW_FORM;
    var elements = $(form)[0].elements,
        $selectedOpt = $(elements["make"]).find(":selected"),
        droneMake = $selectedOpt.parent().attr('label'),
        droneModel = $selectedOpt[0].value,
        droneData = getDroneData(droneMake, droneModel),
        title = elements['title'].value,
        content = elements['content'].value,
        user = state.user,
        post = { user: user, droneData: droneData, title: title, content: content };

    content = content.split('\n\n'); // Create array of strings, one per paragraph


    // MAKE sure text going into edit review mode doesnt have <p> already 

    var postData = {
        title: title,
        content: content,
        author: user,
        img: droneData.img,
        drone: {
            make: droneData.brand,
            model: droneData.model
        },
        specs: droneData,
        created: Date.now()
    };

    var postHtml = formReviewPost(postData);
    show(PREVIEW_SCREEN);
    $(PREVIEW_CONTENT).html(postHtml);
    $(PREVIEW_CONTENT).find(INTERACTIONS).remove();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from comment form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentFormHandler($form) {
    var url = $form.attr('action'),
        content = $form.find('.comment-input').val(),
        postId = $form.siblings(COMMENTS_CONTENT).attr('data-post-id'),
        username = state.user;
    var created = Date.now();
    var comment = {
        url: url,
        content: content,
        author: { username: username },
        created: created
    };

    if ($form.hasClass('reply-comment-form')) {
        comment['commentId'] = $form.closest('.comment').attr('data-this-id');
    } else if (postId !== undefined) {
        comment.postId = postId;
    }
    // call to ajax POST method
    postComment(comment);
    // reset form after submit
    $form[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Looks up and returns data object on given drone
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDroneData(make, model) {
    make = make.toLowerCase();
    return drones[make][model];
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Filters reviews 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function filterReviewHandler() {
    // Get checked radio
    var target = $('input[name="filter"]:checked', FILTER_FORM).val();
    // loop through DOM and check if any matches
    // if yes, loop through DOM and remove reviews that dont match
    var isMatch = false;
    $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
        var make = $(this).find('.maker').first().text().toLowerCase();
        if (make.indexOf(target) >= 0) {
            isMatch = true;
            return;
        }
    });
    if (isMatch) {
        $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
            var make = $(this).find('.maker').first().text().toLowerCase();
            var $hr = $(this).prev('hr');
            if (make.indexOf(target) === -1) {
                $(this).add($hr).hide();
            } else {
                $(this).add($hr).show();
            }
        });
        $(REVIEW + ':visible').first().prev('hr').hide(); // removes <hr> from top of filtered reviews
        show(FILTER_STATUS);
        $(USER_FILTER).text(droneBrands[target]);
    } else {
        // display message, no reviews matching
        console.log('No Match');
        show(FILTER_ALERT);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Search reviews filter
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function searchFilterHandler() {
    hide(QUERY_ERROR_MESSAGE);
    // user input
    var baseQuery = $(SEARCH_FILTER).val().trim();
    // grab each search keyword
    var query = baseQuery.toLowerCase().split(' ');

    var resultFound = false;
    $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
        var make = $(this).find('.maker').first().text().toLowerCase();
        var model = $(this).find('.model').first().text().toLowerCase();
        var $hr = $(this).prev('hr');

        var found = query.map(function (keyword) {
            if (make.indexOf(keyword) >= 0 || model.indexOf(keyword) >= 0) {
                return 1;
            }
        });
        if (found.indexOf(1) === -1) {
            $(review).add($hr).hide();
        } else {
            $(review).add($hr).show();
            resultFound = true;
        }
    });
    $(USER_QUERY).text(baseQuery);
    if (resultFound) {
        show(QUERY_TEXT);
        $(REVIEW + ':visible').first().prev('hr').hide();
    } else {
        show(QUERY_ERROR_MESSAGE);
    }
    $(SEARCH_FILTER_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Bundles comments and displays them in
// the associated post's comment section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentsFromDbHandler(comments) {
    var mainComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var id = arguments[2];


    if (mainComments) {
        var postId = comments[0].postId;
        var commentsHtml = comments.map(function (comment) {
            var _checkIfFromCurrentUs = checkIfFromCurrentUser(comment),
                byThisUser = _checkIfFromCurrentUs.byThisUser,
                didUserLike = _checkIfFromCurrentUs.didUserLike;

            return getCommentTemplate(comment, byThisUser, didUserLike);
        });
        var numComments = commentsHtml.length;
        var $commentsContent = $(COMMENTS_CONTENT + '[data-post-id="' + postId + '"]');

        $commentsContent.parent(COMMENTS_CONTAINER).find(NUM_COMMENTS).text(numComments);
        // Find comments-content by data-id and append 
        $commentsContent.append(commentsHtml.join(''));

        // Make additional calls to db to fetch each reply comment
        comments.forEach(function (comment) {
            getCommentsFromDb(comment.id, false);
        });
    } else {
        var commentId = id;
        var _commentsHtml = comments.map(function (comment) {
            var _checkIfFromCurrentUs2 = checkIfFromCurrentUser(comment),
                byThisUser = _checkIfFromCurrentUs2.byThisUser,
                didUserLike = _checkIfFromCurrentUs2.didUserLike;

            return getReplyCommentTemplate(comment, byThisUser, didUserLike);
        });

        $(REPLY_COMMENT_CONTENT + '[data-comment-id="' + commentId + '"]').append(_commentsHtml.join(''));
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks if comment is by the curren user logged in 
// in session.
//
// @return   byThisUser, boolean signifying if the comment is
//                       by this user.
//          didUserLike, if user liked this comment, returns
//                       their username. undefined otherwise
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkIfFromCurrentUser(comment) {
    // check if current session user voted on this post
    var usersLiked = comment.usersLiked;
    // let didUserLike = usersLiked.find((user) => {
    //     return user === state.user
    // });

    var didUserLike = undefined;
    for (var i = 0; i < usersLiked; i++) {
        if (usersLiked[i] === state.user) {
            didUserLike = state.user;
        }
    }

    // Check if post is by the current session user
    var byThisUser = false;
    if (comment.author.username === state.user) {
        byThisUser = true;
    }

    return { byThisUser: byThisUser, didUserLike: didUserLike };
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Sets img from db to corresponding post  
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function addImgToPostHandler(imgRes) {
    var postId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    $(REVIEWS).find('.post[data-post-id="' + postId + '"]').find('.post-img').attr('src', imgRes.url);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays posts to screen and makes call for each
// post's comments
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function postsHandler(posts) {

    displayPosts(posts);
    // Make call to api to get comments for each post
    posts.forEach(function (post) {
        if (post.imgId !== '') {
            getFile(post.imgId, post.id);
        }
        getCommentsFromDb(post.id);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Upvote / Downvote post handler
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function voteOnPost($voteBtn) {
    var upVote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if ($voteBtn.attr('data-user-voted') === state.user) {
        alert('Already voted');
        return;
    }

    var $votes = $voteBtn.siblings(VOTES),
        $posNeg = $voteBtn.siblings(POSNEG),
        count = parseInt($votes.text()),
        postId = $voteBtn.closest('.post').attr('data-post-id'),
        posNeg = '';

    upVote ? ++count : --count;
    if (count < 0) posNeg = '&#45;';else if (count > 0) posNeg = '+';

    $posNeg.html(posNeg);
    $votes.text(count);
    $voteBtn.attr('data-user-voted', state.user);

    getPostById(postId, function (res) {
        var usersArr = res.usersVoted;
        usersArr.push(state.user);

        updatePost({
            id: postId,
            votes: count,
            usersVoted: usersArr
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Like / Dislike comments handler
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function likeDislikeComment($btn) {
    var like = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if ($btn.attr('data-user-liked') === state.user) {
        alert('Already like');
        return;
    }

    var $likes = $btn.siblings(LIKES),
        $posNeg = $btn.siblings(POSNEG),
        count = parseInt($likes.text()),
        commentId = $btn.closest('.gen-comment').attr('data-this-id'),
        posNeg = '';

    like ? ++count : --count;
    if (count < 0) posNeg = '&#45;';else if (count > 0) posNeg = '+';

    $posNeg.html(posNeg);
    $likes.text(count);
    $btn.attr('data-user-liked', state.user);
    $btn.siblings('i').attr('data-user-liked', state.user);

    getCommentById(commentId, function (res) {
        var usersArr = res.usersLiked;
        usersArr.push(state.user);

        updateComment({
            id: commentId,
            likes: count,
            usersLiked: usersArr
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Takes response from file upload and updates the given post
// via its post ID with a reference to the uploaded file 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fileUploadHandler(file, postId) {
    var updateData = {
        id: postId,
        imgId: file.file._id
    };
    updatePost(updateData);
}

function nextSearchPageHandler() {
    var q = state.video.query,
        token = state.video.nextPageToken;
    searchYoutubeNextPage(q, token, function (res) {
        state.video.nextPageToken = res.nextPageToken;
        displayMoreVideos(res.items);
    }, 6);
}

//================================================================================
// API calls
//================================================================================

// USERS 

// sign-up
function createNewUser(userData) {
    $.ajax({
        url: '/users',
        type: 'POST',
        dataType: 'json',
        data: userData,
        success: function success(res) {
            // Successfully signed user up, now log them in
            resetSignupForm();
            openLoginSignupModal('login');
            displayWelcomeMessage(res.username);
        },
        error: function error(err) {
            var message = err.responseJSON.message;
            var location = err.responseJSON.location;
            console.log(location + ': ' + message);
            show(LOGIN_SIGNUP_PAGE);
            displaySignupError(location, message);
        }
    });
}

// Log In
function logUserIn(loginData) {
    // console.log(loginData);
    $.ajax({
        url: '/users/login',
        type: 'POST',
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
            // Send basic auth, uri-encoded header with request
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.username + ':' + loginData.password))));
        },
        success: function success(res) {
            if (res.status) {
                location.reload();
            } else {
                displayLoginError(res.message);
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// Log Out
function logUserOut() {
    $.ajax({
        url: '/users/logout',
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            location.reload();
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// POSTS

function getPostsFromDb() {
    $.ajax({
        url: "/posts",
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            postsHandler(res.posts);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getPostById(id, callback) {
    return $.ajax({
        url: '/posts/' + id,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function createPost(postData, file) {
    $.ajax({
        url: '/posts',
        type: 'POST',
        dataType: 'json',
        data: postData,
        success: function success(res) {
            if (file) {
                uploadFile(file, res.id);
            } else {
                location.reload();
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function updatePost(updateData, file) {
    var id = updateData.id;
    $.ajax({
        url: '/posts/' + id,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: function success(res) {
            if (file) {
                if (res.imgId !== "") {
                    deleteFile(res.imgId);
                }
                uploadFile(file, res.id);
            } else {
                if (res.hasOwnProperty('title') && !updateData.hasOwnProperty('votes')) location.reload();
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function deletePost(id) {
    $.ajax({
        url: '/posts/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function success(res) {
            location.reload();
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// FILES

function uploadFile(blobFile, postId) {
    var formData = new FormData();
    formData.append('file', blobFile);

    $.ajax({
        url: '/file/img',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function success(res) {
            fileUploadHandler(res, postId);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getFile(id, postId) {
    $.ajax({
        url: '/file/img/' + id,
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            addImgToPostHandler(res, postId);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function deleteFile(id) {
    $.ajax({
        url: '/file/img/' + id,
        type: "DELETE",
        success: function success(res) {
            // console.log(`successfully deleted img(${id})`);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// COMMENTS

function getCommentsFromDb(id) {
    var mainComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var url = void 0;
    if (mainComments) {
        url = '/posts/' + id + '/comments';
    } else {
        url = '/posts/comments/' + id + '/comments';
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            if (res.comments.length > 0) {
                //  Main comment                //  Reply comment
                mainComments ? commentsFromDbHandler(res.comments) : commentsFromDbHandler(res.comments, false, id);
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getCommentById(id, callback) {
    $.ajax({
        url: '/posts/comments/' + id,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function postComment(commentObj) {
    $.ajax({
        url: "/posts/comments",
        type: 'POST',
        dataType: 'json',
        data: commentObj,
        success: displayComment,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function updateComment(updateData) {
    var id = updateData.id;
    $.ajax({
        url: '/posts/comments/' + id,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: function success(res) {
            console.log('Success');
            console.log({ res: res });
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// YoutTube API calls
// * * * * * * * * * * * * * * * * * * * * * * * * *
var YOUTUBE_KEY = 'AIzaSyCSyc7hnCXopqsh5Z9HlklFAK3gvteRMAY';
var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';

function searchYoutubeVideos() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : printToConsole;
    var maxResults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    $.ajax({
        url: YOUTUBE_URL + '/search/',
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults: maxResults,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query
        },
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function searchYoutubeNextPage(query, pageToken) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : printToConsole;
    var maxResults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

    $.ajax({
        url: YOUTUBE_URL + '/search/',
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults: maxResults,
            pageToken: pageToken,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query

        },
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// API Utility, prints response to console
// * * * * * * * * * * * * * * * * * * * * * * * * *
function printToConsole(res) {
    console.log(res);
}

// ================================================================================
// Slick Carousel
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone banner carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDroneSlider() {
    $(DRONE_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 2400,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 860,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 580,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 415,
            settings: {
                speed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,
                cssEase: 'ease-in-out'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        }]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone Models carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDroneModelsSlider() {
    $(DRONE_MODELS_SLIDER).slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [{
            breakpoint: 440,
            settings: {
                dots: false
            }
        }]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Intializes drone slider and sets height to zero
// before and unsets height after it is 'slicked'
// to avoid FOUC
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function displayDroneSlider() {
    $('.slick-slider').css('height', '0px');
    initDroneSlider();
    $('.slick-slider').css('height', '');
}

function displayDroneModelsSlider() {
    $('.slick-slider').css('height', '0px');
    initDroneModelsSlider();
    $('.slick-slider').css('height', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function unslick(SLIDER) {
    if ($(SLIDER).hasClass('slick-initialized')) {
        $(SLIDER).slick('unslick');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick() {
    $(window).resize(function () {
        var width = parseInt($('body').css('width'));
        if (!$(DRONE_SLIDER).hasClass('slick-initialized')) {
            initDroneSlider();
        }
        if (!$(DRONE_MODELS_SLIDER).hasClass('slick-initialized')) {
            initDroneModelsSlider();
        }
    });
}

//================================================================================
// Utility functions
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1200;
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(function () {
        checkSize();
        $(window).resize(checkSize);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not and hide/show thumbnail image or iframe of video
// depending on mobile state. Also, swaps the position of
// the main video player and gallery depending on size
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    parseInt($("body").css('width')) <= 414 ? state.isMobile = true : state.isMobile = false;

    navUserMsgHandler();

    if (window.location.href.indexOf('drones') >= 0) {

        if (parseInt($("body").css('width')) <= 400) {
            hide('.more-content img');
            show('.more-content iframe');
            $('.more-content .vid-wrap').addClass('mobile-vid');
        } else {
            hide('.more-content iframe');
            show('.more-content img');
            $('.more-content .vid-wrap').removeClass('mobile-vid');
        }

        if (parseInt($("body").css('width')) <= 720) {
            if (!$(GALLERY).prev().is(SHOWCASE)) {
                $(SHOWCASE).detach().insertBefore(GALLERY);
            }
        } else {
            if (!$(GALLERY).next().is(SHOWCASE)) {
                $(SHOWCASE).detach().insertAfter(GALLERY);
            }
        }
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Shows / hides mobile user message so mobile users can
// confirm they are logged in and limits the username
// to fit within alotted space
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function navUserMsgHandler() {
    if (parseInt($("body").css('width')) < 585) {
        show('.mobile-msg');
    } else {
        hide('.mobile-msg');
    }

    if (parseInt($("body").css('width')) > 700) {
        limitNavUserMessage();
    } else {
        limitNavUserMessage(6);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// limits the username in message to provided limit, 10
// char is the default max-length
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function limitNavUserMessage() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    var username = state.user;
    if (username.length > limit) {
        username = username.slice(0, limit - 1);
        $('.user-nav .user-loggedin').text(username + '..');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixes banner nav to top of screen on scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// function fixBannerNav() {
//     $(window).scroll((e) => {
//         let scroll = $(window).scrollTop();
//         console.log(scroll);
//         if (scroll >= $('main').offset().top) {
//             $(BANNER_WRAP).addClass('fixed-nav');
//         } else {
//             $(BANNER_WRAP).removeClass('fixed-nav');
//         }
//     });
// }


function fixBannerNav() {
    $(window).scroll(function (e) {
        var scroll = $(window).scrollTop(),
            offset = $('main').offset().top;

        if (scroll >= offset) {
            // past header

            if (state.isMobile) {
                scroll > state.prevScrollPos ? state.downScrollPos = scroll : null; // save position when upward scroll begins

                if (state.downScrollPos - scroll >= 50) {
                    $(BANNER_WRAP).addClass('fixed-nav'); // fix the nav on upward scroll
                    $(BANNER_WRAP).fadeIn(); // fades nav in if previously faded out
                } else {
                    $(BANNER_WRAP).fadeOut(300); // fades nav out on downward scroll
                }
            } else {
                $(BANNER_WRAP).addClass('fixed-nav'); // not mobile, fix nav
            }
        } else {
            $(BANNER_WRAP).removeClass('fixed-nav');
            $(BANNER_WRAP).show(); // show in case it is faded out
        }
        state.prevScrollPos = scroll; // set scroll pos to compare on next scroll
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Calculates time elapsed since date given and returns
// the appropriate time unit, rounding down to nearest whole
// number 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getElapsedTime(prevDate) {
    var diff = Date.now() - prevDate,
        min = Math.floor(diff / 60000),
        // 60,000 ms / min
    hrs = Math.floor(diff / 3600000),
        // 3,600,000 ms / hr
    days = Math.floor(diff / 86400000),
        // 6,400,000 ms / day
    months = Math.floor(diff / 2629746000),
        // 2629746000 ms / month
    years = Math.floor(diff / 31556952000); // 31,556,952,000 ms / year

    if (min < 60) {
        if (min < 1) return 'just now';else if (min === 1) return 'a minute ago';else return min + ' minutes';
    } else if (hrs < 24) {
        return hrs + ' ' + (hrs === 1 ? 'hour' : 'hours');
    } else if (days < 31) {
        return days + ' ' + (days === 1 ? 'day' : 'days');
    } else if (months < 12) {
        return months + ' ' + (months === 1 ? 'month' : 'months');
    } else {
        return years + ' ' + (years === 1 ? 'year' : 'years');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// If endpoint has #reviews, smooth scrool to reviews section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hashUrlHandler() {
    if (location.hash === '#reviews') {
        smoothScroll(REVIEWS);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks current endpoint on page load to display correct
// elements and styling for given page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkEndpoint() {
    var endpoint = window.location.pathname;
    if (endpoint.indexOf('drones') >= 0) {
        $('#main-header').removeClass('banner').addClass('drone-header');
        hide('.landing-greeting');
        $('.drone-list a[href="' + endpoint + '"]').addClass('current-page');
        $('.drone-list a[href="' + endpoint + '"]').parent().addClass('current-page');
    } else if (endpoint.indexOf('mission') >= 0) {
        show('.mission-container');
        hide('.greeting');
    }
}

function checkIfUserLoggedIn() {
    state.user = $('.user-loggedin').attr('data-user');
    if (state.user) {
        state.loggedIn = true;
    }
    if (!state.loggedIn) {
        hide('.logged-in');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// If a user is logged in, display their username in nav
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayCurrentUser() {
    if (state.user !== '') {
        $('.user-loggedin').text(state.user);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets reference to iframe 'showcase' video player
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function onYouTubeIframeAPIReady() {
    state.player = new YT.Player('main-iframe', {
        events: {
            'onReady': function onReady() {
                console.log("Main Player Ready!!");
            },
            'onStateChange': function onStateChange() {
                console.log("Main Player state changed");
            }
        }
    });
}

//================================================================================
// Event Listeners
//================================================================================

// * * * * * * * * * * * * *
//   Nav item clicks
// * * * * * * * * * * * * * 
function burgerMenuClick() {
    $(BURGER_ANCHOR).on('click', function (e) {
        e.preventDefault();
        toggleMobileMenu();
    });
}

function burgerIconTouchend() {
    $(BURGER_ANCHOR).on('touchstart', function (e) {
        $(BURGER_ICON).addClass('touchstart');
        $(BURGER_ICON).removeClass('touchend');
    });
    $(BURGER_ANCHOR).on('touchend', function (e) {
        $(BURGER_ICON).removeClass('touchstart');
        $(BURGER_ICON).addClass('touchend');
    });
}

function mobileMenuItemClick() {
    $(MOBILE_MENU_ITEM).on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('coming-soon')) {
            return;
        } else if ($(this).hasClass('write-review') && state.loggedIn === false) {
            return;
        } else {
            closeMobileMenu();
        }
    });
}

function reviewsNavItemClick() {
    $(REVIEWS_NAV_ITEM).on('click', function (e) {
        e.preventDefault();
        if (location.pathname !== '/') {
            window.location = '/#reviews';
        }
        smoothScroll('#reviews');
    });
}

function homeClick() {
    $('.home').on('click', function (e) {
        e.preventDefault();
        window.location = '/';
    });
}

function welcomeClick() {
    $('.welcome').on('click', function (e) {
        e.preventDefault();
        location.href = '/welcome';
    });
}

// * * * * * * * * * * * * * 
//   Drone banner clicks
// * * * * * * * * * * * * * 
function droneBannerClicks() {
    $('.drone-make').on('click', function (e) {
        e.preventDefault();
        droneBannerHandler($(this));
    });
}

function droneModelSlideChange() {
    $(DRONE_MODELS_SLIDER).on('afterChange', function (e, slick, currentSlide) {
        e.preventDefault();
        $('.more-content').empty();
        displayDetailSpecs(currentSlide);
    });
}

// * * * * * * * * * * * * * 
//   Login modal btn
// * * * * * * * * * * * * * 
function loginBtnsClick() {
    // main nav login-btn
    $(LOGIN_BTN).on('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('login');
    });
    // comments login-btn
    $(REVIEWS).on('click', SUB_LOGIN_BTN, function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('login');
    });
}

// * * * * * * * * * * * * * 
// Login form SUBMIT
// * * * * * * * * * * * * * 
function loginFormSubmit() {
    $(LOGIN_FORM).on('submit', function (e) {
        e.preventDefault();
        loginFormHandler($(this));
    });
}

// * * * * * * * * * * * * * 
// Logout btn
// * * * * * * * * * * * * * 
function logOutBtnClick() {
    $(LOGOUT_BTN).on('click', function (e) {
        e.preventDefault();
        var delay = parseInt($('body').css('width')) < 585 ? 650 : 0;
        setTimeout(function () {
            logUserOut();
        }, delay);
    });
}

// * * * * * * * * * * * * * 
// Signup modal btn
// * * * * * * * * * * * * * 
function signupBtnsClick() {
    // main nav signup-btn
    $(SIGNUP_BTN).on('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('signup');
    });
    // comments signup-btn
    $(REVIEWS).on('click', SUB_SIGNUP_BTN, function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('signup');
    });
}

// * * * * * * * * * * * * * 
// Signup form SUBMIT
// * * * * * * * * * * * * * 
function signupFormSubmit() {
    $(SIGNUP_FORM).on('submit', function (e) {
        e.preventDefault();
        signupFormHandler($(this));
    });
}

function signupScreenClick() {
    $(SIGNUP_SCREEN_BTN).on('click', function (e) {
        e.preventDefault();
        displaySignupForm();
    });
}

function loginScreenClick() {
    $(LOGIN_SCREEN_BTN).on('click', function (e) {
        e.preventDefault();
        displayLoginForm();
    });
}

function signupLoginCloseClick() {
    $(window).on('click', function (e) {
        if (e.target === $(LOGIN_SIGNUP_PAGE)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            closeLoginSignupModal();
        }
    });
}

// * * * * * * * * * * * * * 
// Aside Filter
// * * * * * * * * * * * * * 
function asideFilterBtnHover() {
    $(ASIDE_BTN).mouseenter(function (e) {
        e.preventDefault();
        $(ASIDE_CONTAINER).addClass('slide');
        $('.aside-chevron').addClass('flip');
    });

    $(ASIDE_BTN).on('click', function (e) {
        e.preventDefault();
        $(ASIDE_CONTAINER).removeClass('slide');
        $('.aside-chevron').removeClass('flip');
    });
}

//
// Search Filter Form SUBMIT
//
function searchFilterFormSubmit() {
    $(SEARCH_FILTER_FORM).submit(function (e) {
        e.preventDefault();
        hide(FILTER_ALERT, FILTER_STATUS);
        searchFilterHandler();
    });
}

//
// Clear filters -- show all reviews
//
function clearAsideFiltersClick() {
    $('.clear-btn').on('click', function (e) {
        e.preventDefault();
        console.log('click');
        hide(FILTER_ALERT, FILTER_STATUS, QUERY_ERROR_MESSAGE, QUERY_TEXT);
        $(REVIEW).add($('.post-hr')).show();

        $('#radio-filter-form')[0].reset();
    });
}

//
// Filter reviews
//
function filterBtnClick() {
    $(FILTER_FORM).submit(function (e) {
        e.preventDefault();
        hide(FILTER_ALERT, QUERY_ERROR_MESSAGE, QUERY_TEXT);
        filterReviewHandler();
    });
}

// * * * * * * * * * * * * * 
// Reviews / Posts
// * * * * * * * * * * * * * 
function writeReviewNavClick() {
    $(WRITE_REVIEW_NAV).on('click', function (e) {
        e.preventDefault();
        if (state.loggedIn) {
            slideInReviewForm($(this), REVIEW_FORM_SCREEN);
        } else {
            alert('Must be logged in!');
        }
    });
}

function closeReviewFormClick() {
    $(CLOSE_BTN).on('click', function (e) {
        e.preventDefault();
        slideUpReviewForm();
    });
}

function videoUploadClick() {
    $('.video-file-input').on('click', function (e) {
        e.preventDefault();
        alert('Video uploads coming soon!');
    });
}

function starClick() {
    $('.star').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.star').addBack().removeClass('filled-star');
        $(this).nextAll().addBack().addClass('filled-star');
    });
}

// * * * * * * * * * * * * * 
// preview post
// * * * * * * * * * * * * * 
function previewBtnClick() {
    $(PREVIEW_BTN).on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest('form');
        previewReviewHandler($form);
    });
}

function previewCloseBtnClick() {
    $(PREIVEW_CLOSE_BTN).on('click', function (e) {
        e.preventDefault();
        hide(PREVIEW_SCREEN);
    });
}

// * * * * * * * * * * * * * 
// Edit post
// * * * * * * * * * * * * * 
function editPostIconClick() {
    $(REVIEWS).on('click', EDIT_POST_ICON, function (e) {
        e.preventDefault();
        var $post = $(this).closest('.post');
        displayEditPostForm($post);
    });
}

// * * * * * * * * * * * * * 
// Review form SUBMIT
// * * * * * * * * * * * * * 
function reviewFormSubmit() {
    $(REVIEW_FORM).submit(function (e) {
        e.preventDefault();
        reviewFormHandler($(this));
    });
}

// * * * * * * * * * * * * * 
// EDIT Review form SUBMIT
// * * * * * * * * * * * * * 
function editReviewFormSubmit() {
    $(EDIT_REVIEW_FORM).submit(function (e) {
        e.preventDefault();
        reviewFormHandler($(this), true);
    });
}

function commentBtnClick() {
    $(REVIEWS).on('click', COMMENTS_BTN, function (e) {
        e.preventDefault();
        toggleComments($(this));
    });
}

function deletePostModalBtnClick() {
    $(DELETE_POST_MODAL_BTN).on('click', function (e) {
        e.preventDefault();
        show(DELETE_POST_MODAL);
        $(EDIT_REVIEW_FORM_SCREEN + ' .review-form-modal').addClass('faded');
    });
}

function deletePostBtnClick() {
    $(DELETE_POST_BTN).on('click', function (e) {
        e.preventDefault();
        var id = $(this).closest(EDIT_REVIEW_FORM).attr('data-post-id');
        deletePost(id);
    });
}

function goBackBtnClick() {
    $(GO_BACK_BTN).on('click', function (e) {
        e.preventDefault();
        $(EDIT_REVIEW_FORM_SCREEN + ' .review-form-modal').removeClass('faded');
        hide(DELETE_POST_MODAL);
    });
}

// * * * * * * * * * * * * * 
// Post Votes 
// * * * * * * * * * * * * * 
function upVoteClick() {
    $(REVIEWS).on('click', UPVOTE_ARROW, function (e) {
        e.preventDefault();
        if (state.loggedIn) voteOnPost($(this));else alert('Must be logged in');
    });
}

function downVoteClick() {
    $(REVIEWS).on('click', DOWNVOTE_ARROW, function (e) {
        e.preventDefault();
        if (state.loggedIn) voteOnPost($(this), false);else alert('Must be logged in');
    });
}

// * * * * * * * * * * * * * 
// Comment Likes
// * * * * * * * * * * * * * 
function commentLikeClick() {
    $(REVIEWS).on('click', LIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn) likeDislikeComment($(this));else alert('Must be logged in');
    });
}

function commentDislikeClick() {
    $(REVIEWS).on('click', DISLIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn) likeDislikeComment($(this), false);else alert('Must be logged in');
    });
}

// * * * * * * * * * * * * * 
// Comment form SUBMIT
// * * * * * * * * * * * * * 
function commentFormSubmit() {
    $(REVIEWS).on('submit', COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn) commentFormHandler($(this));else console.log('Must be logged in');
    });
}

function replyCommentFormSubmit() {
    $(REVIEWS).on('submit', REPLY_COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn) commentFormHandler($(this));else console.log('Must be logged in');
    });
}

function replyCommentsArrowClick() {
    $(REVIEWS).on('click', '.expand-reply-comments-btn', function (e) {
        e.preventDefault();
        $(this).closest('.comment').find('.reply-comments-container').toggleClass('expand');
        $(this).toggleClass('open');
        $(this).siblings().toggleClass('hidden');
    });
}

function specsBtnClick() {
    $(REVIEWS).on('click', SPECS_BTN, function (e) {
        e.preventDefault();
        toggleSpecs($(this));
    });
}

// * * * * * * * * * * * * 
// Detail page clicks
// * * * * * * * * * * * * 

// open video modal
function expandArrowClick() {
    $(EXPAND_ARROW).on('click', function (e) {
        e.preventDefault();
        var time = Math.floor(state.player.getCurrentTime()),
            url = $(MAIN_VID).attr('src');
        state.expanded = true;
        openVideoModal(url, time, -1);
    });
}

// close video modal
function closeVideoModalClick() {
    $(V_CLOSE_ICON).on('click', function (e) {
        e.preventDefault();
        state.expanded = false;
        closeVideoModal();
    });
}

// next video click
function nextVidBtnClick() {
    $('.next-vid-btn').on('click', function (e) {
        e.preventDefault();
        if (state.expanded) {
            mainModalNavController('next');
        } else {
            modalVideoNavController('next');
        }
    });
}

// prev video click
function prevVidBtnClick() {
    $('.prev-vid-btn').on('click', function (e) {
        e.preventDefault();
        if (state.expanded) {
            mainModalNavController('prev');
        } else {
            modalVideoNavController('prev');
        }
    });
}

// main gallery video clicks
function videoGalleryClicks() {
    $(G_IMG).on('click', function (e) {
        e.preventDefault();
        videoGalleryHandler($(this));
    });
}

// sub gallery video clicks --> opens modal
function moreVideoGalleryClicks() {
    $('.more-content').on('click', G_IMG, function (e) {
        e.preventDefault();
        var url = $(this).attr('data-vid-url'),
            index = $('.more-content .g-video img').index(this);
        openVideoModal(url, 0, index);
    });
}

// opens sub video gallery
function openMoreVideosBtnClick() {
    $('.more-btn').on('click', function (e) {
        e.preventDefault();
        var $btn = $(this);
        $('.more-content-container').toggleClass('slide');
        $btn.toggleClass('open');
        if ($btn.hasClass('open')) {
            $btn.text('Close');
        } else {
            setTimeout(function () {
                $btn.text('Checkout More');
            }, 150);
        }
    });
}

// call to api to fetch more videos
function getMoreVideosIconClick() {
    $(MORE_ICON).on('click', function (e) {
        e.preventDefault();
        nextSearchPageHandler();
    });
}

// * * * * * * * * * * * * 
// Footer clicks
// * * * * * * * * * * * * 
function toTopClick() {
    $(TOP_TOP_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll('#main-header', 300);
    });
}

function newsClick() {
    $('.coming-soon').on('click', function (e) {
        e.preventDefault();
        alert('RSS news feed coming soon');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================
function navMenuEvents() {
    burgerMenuClick();
    burgerIconTouchend();
    mobileMenuItemClick();
    reviewsNavItemClick();
    homeClick();
    loginBtnsClick();
    signupBtnsClick();
    logOutBtnClick();
    droneBannerClicks();
    // footer
    toTopClick();
    newsClick();
    welcomeClick();
}

function signupLoginFormEvents() {
    signupScreenClick();
    loginScreenClick();
    signupLoginCloseClick();
    signupFormSubmit();
    loginFormSubmit();
}

function writeReviewFormEvents() {
    writeReviewNavClick();
    previewBtnClick();
    previewCloseBtnClick();
    closeReviewFormClick();
    starClick();
    reviewFormSubmit();
    editReviewFormSubmit();
    deletePostModalBtnClick();
    deletePostBtnClick();
    goBackBtnClick();
    videoUploadClick();
}

function asideEvents() {
    asideFilterBtnHover();
    clearAsideFiltersClick();
    filterBtnClick();
    searchFilterFormSubmit();
}

function reviewEvents() {
    commentBtnClick();
    specsBtnClick();
    commentFormSubmit();
    upVoteClick();
    downVoteClick();
    commentLikeClick();
    commentDislikeClick();
    replyCommentsArrowClick();
    editPostIconClick();
}

function detailPageClicks() {
    expandArrowClick();
    nextVidBtnClick();
    prevVidBtnClick();
    closeVideoModalClick();
    openMoreVideosBtnClick();
    getMoreVideosIconClick();
    videoGalleryClicks();
    moreVideoGalleryClicks();
}

function init() {
    getPostsFromDb(); // populates posts from database
    displayDroneSlider(); // inits drone slider and conceals FOUC
    displayDroneModelsSlider();
    droneModelSlideChange();
    checkIfUserLoggedIn();
    displayCurrentUser();
    limitNavUserMessage();
    if (location.href.indexOf('drones') >= 0) {
        // only fires when user is on page slider element exists
        displayDetailSpecs(0); // fetches specs for each review post drone model        
    }
}

function utils() {
    fixBannerNav();
    fillDroneOptGroups();
    responsiveReslick();
    checkSizeHandler();
    hashUrlHandler();
    checkEndpoint();
}

//================================================================================
// Entry point -- Main
//================================================================================

$(function () {
    utils();
    navMenuEvents();
    signupLoginFormEvents();
    writeReviewFormEvents();
    asideEvents();
    reviewEvents();
    detailPageClicks();

    init();
});

var drones = {
    dji: {
        spark: {
            brand: "DJI",
            url: "dji",
            model: "Spark",
            img: "https://www1.djicdn.com/uploads/nav_link/cover/176/size_1000_540_4e86d4c92a775b12721af22634386422.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B072JTFV6B/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B072JTFV6B&linkCode=as2&tag=schmerb0a-20&linkId=3bdc0a58be30479599875af93288cbae">DJI Spark Mini Quadcopter Drone</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B072JTFV6B" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 700,
            camera: "2K@30/10MP",
            max_flight_time: "Approx. 16 minutes",
            max_range: "2000m",
            max_speed: "31mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_4: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 4",
            img: "http://asset1.djicdn.com/images/360/phantom-4/draggable_360_v2/0_0.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01F2O1SPY/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01F2O1SPY&linkCode=as2&tag=schmerb0a-20&linkId=50e01e2dda6b5603d9f19faf26c1aabb">DJI Phantom 4 Quadcopter Aircraft </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01F2O1SPY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 1100,
            camera: "4K@25-30/1080@120/10MP",
            max_flight_time: "Approx. 28 minutes",
            max_range: "5000m",
            max_speed: "45mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_4_pro: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 4 Pro",
            // img: "http://www4.djicdn.com/assets/images/products/phantom-4-pro/s1/e-1-c55885e9b95910920cb5caba54e042ca.png",
            img: "../assets/drones/phantom-4-pro-compressor.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01N52W70O/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01N52W70O&linkCode=as2&tag=schmerb0a-20&linkId=4572874a2de02c6d6a4886f664767e0b">DJI Phantom 4 PRO Quadcopter </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01N52W70O" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 1500,
            camera: "4K@50/1080@120/?",
            max_flight_time: "Approx. 30min",
            max_range: "7000m",
            max_speed: "45mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_4_pro_screen: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 4 Pro w/ Screen",
            img: "http://www3.djicdn.com/assets/uploads/c55ee03076f684c1dccdd705818ba1e3.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01NBJS0Y5/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01NBJS0Y5&linkCode=as2&tag=schmerb0a-20&linkId=86300a0f36d22652419d8d0a6420b727">DJI Phantom 4 Pro+ (Pro Plus) Quadcopter</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01NBJS0Y5" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 1800,
            camera: "4K@50/1080@120/?",
            max_flight_time: "Approx. 30min",
            max_range: "7000m",
            max_speed: "45mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_3_standard: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 3 Standard",
            img: "http://www.quadhangar.com/wp-content/uploads/dji-phantom3-standard.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B013U0F6EQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B013U0F6EQ&linkCode=as2&tag=schmerb0a-20&linkId=25bf8b4c77df5327e1957cde1e9848a3">DJI Phantom P3-Standard Quadcopter Drone </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B013U0F6EQ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 460,
            camera: "2K@30/720@60",
            max_flight_time: "Approx. 25min",
            max_range: "1000m",
            max_speed: "35mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "NO",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_3_pro: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 3 Pro",
            img: "https://product1.djicdn.com/uploads/sku/covers/194/phantom-3-professional-4k_3x.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B00VSITBJO/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00VSITBJO&linkCode=as2&tag=schmerb0a-20&linkId=569fdcaede76a5820d859c9c9fb51d5d">DJI Phantom 3 Professional Quadcopter </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B00VSITBJO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 800,
            camera: "4K@25/1080@60",
            max_flight_time: "Approx. 23min",
            max_range: "5000m",
            max_speed: "35mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "NO",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_3_advanced: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 3 Advanced",
            img: "https://1131492342.rsc.cdn77.org/sites/default/files/dji-phantom-3-quadcopter.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B00VSIT5UE/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00VSIT5UE&linkCode=as2&tag=schmerb0a-20&linkId=c19e469864ce2f0b510e1ed11048dad5">DJI Phantom 3 Advanced Quadcopter Drone with 2.7K HD Video Camera</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B00VSIT5UE" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '700-800',
            camera: "2K@30/1080@60",
            max_flight_time: "Approx. 23min",
            max_range: "5000m",
            max_speed: "35mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "NO",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        phantom_3_4K: {
            brand: "DJI",
            url: "dji",
            model: "Phantom 3 4K",
            img: "https://www2.djicdn.com/assets/images/products/phantom3-4k/features/operation-drone-a225115b797aa372dd2cff896defa067.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01ANOGSYO/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01ANOGSYO&linkCode=as2&tag=schmerb0a-20&linkId=9e2853e452e4d36dd5940a891bfb1261">DJI Phantom 3 4K</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01ANOGSYO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '600-700',
            camera: "4K@25/1080@60",
            max_flight_time: "Approx. 25min",
            max_range: "1200m",
            max_speed: "",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "NO",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        mavic_pro: {
            brand: "DJI",
            url: "dji",
            model: "Mavic Pro",
            // img: "http://www3.djicdn.com/assets/images/products/mavic/s2-img-v2-2927020e340017561b7f4906b79865d3.png",
            img: "https://www4.djicdn.com/uploads/nav_link/cover/3/size_1000_540_96bb8fe32603795af73fe20907cd70fe.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01LYBLZRK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01LYBLZRK&linkCode=as2&tag=schmerb0a-20&linkId=673261695a77d6c329a149917099fa26">DJI Mavic Pro</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01LYBLZRK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 1200,
            camera: "4K@30/720@120",
            max_flight_time: "Approx. 27min",
            max_range: "7000m",
            max_speed: "40mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        inspire_1_pro: {
            brand: "DJI",
            url: "dji",
            model: "Inspire 1 Pro",
            img: "https://flyhighusa.com/wp-content/uploads/1605/11/Inspire_1_Pro_Black_Edition__side_in_air_2_.0.0.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/offer-listing/B01BPLL9U2/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01BPLL9U2&linkCode=am2&tag=schmerb0a-20&linkId=a10bcb8a48768c05d0758076a3380974">DJI Inspire 1 Pro Black Edition </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01BPLL9U2" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '3200-4200',
            camera: "4K@25/1080@60",
            max_flight_time: "Approx. 18min",
            max_range: "5000m",
            max_speed: "49mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "NA",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        inspire_1_raw: {
            brand: "DJI",
            url: "dji",
            model: "Inspire 1 RAW",
            img: "https://www.heliguy.com/downloads/1463397964inspire-1-RAW.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B019R1519W/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B019R1519W&linkCode=am2&tag=schmerb0a-20&linkId=cf0a92cac78f9c1c53600d280725fac4">DJI Inspire 1 RAW </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B019R1519W" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 4200,
            camera: "4K@25/1080@60",
            max_flight_time: "Approx. 18min",
            max_range: "5000m",
            max_speed: "49mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        inspire_1_standard: {
            brand: "DJI",
            url: "dji",
            model: "Inspire 1 Standard",
            img: "http://www5.djicdn.com/assets/images/products/inspire-1/banner-product-333577d35493a3213ead13b4f8056e42.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B017TAXXWK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B017TAXXWK&linkCode=as2&tag=schmerb0a-20&linkId=cab2ae160323d783a08687ba7fbc246e">DJI Inspire 1 V2.0</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B017TAXXWK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 2000,
            camera: "4K@25/1080@60",
            max_flight_time: "Approx. 18min",
            max_range: "5000m",
            max_speed: "49mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        inspire_2_X4S: {
            brand: "DJI",
            url: "dji",
            model: "Inspire 2 X4S",
            img: "http://www3.djicdn.com/assets/images/products/zenmuse-x4s/s2-p1-b436bf9a803fd9a48b86f115bf6398a5.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01N5CUQOD/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01N5CUQOD&linkCode=as2&tag=schmerb0a-20&linkId=d48392d106e18cb1ff19b43668fa0365">DJI Inspire 2 Quadcopter + Zenmuse X4S</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01N5CUQOD" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 3600,
            camera: "4K@60/2K@60",
            max_flight_time: "Approx. 27min",
            max_range: "7000m",
            max_speed: "58mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        inspire_2_X5S: {
            brand: "DJI",
            url: "dji",
            model: "Inspire 2 X5S",
            img: "https://cdn.shopify.com/s/files/1/0895/6448/products/VR_white_00087_1024x1024.png?v=1479933525",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01N5MW158/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01N5MW158&linkCode=as2&tag=schmerb0a-20&linkId=7eda2d818b8247d6a7022fb77336e423">DJI Inspire 2.0 Quadcopter With Zenmuse X5S</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01N5MW158" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 6000,
            camera: "5K@30/2K@60",
            max_flight_time: "Approx. 27min",
            max_range: "7000m",
            max_speed: "58mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        }
    },
    gopro: {
        karma: {
            brand: "GoPro",
            url: "gopro",
            model: "Karma",
            img: "https://shop.gopro.com/on/demandware.static/-/Library-Sites-sharedGoProLibrary/default/dw9dbd822e/images/karma2016/karma-drone-main.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01N5V4HKQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01N5V4HKQ&linkCode=as2&tag=schmerb0a-20&linkId=a2a0432115dc865cddb41617da4ccaa8">GoPro Karma with HERO5 Black</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01N5V4HKQ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '1100',
            camera: "Harness / Hero5(Black)",
            max_flight_time: "Approx. 20min",
            max_range: "3,000m",
            max_speed: "35mph",
            headless: "YES",
            gps: "",
            gimbal: "YES",
            intelligent_flight: "",
            avoidance: "",
            return_home: "",
            follow_me_mode: "",
            tracking_mode: ""
        }
    },
    parrot: {
        bebop_1: {
            brand: "Parrot",
            url: "parrot",
            model: "Bebop",
            img: "https://www.parrot.com/fr/sites/default/files/bebopdrone_red.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B00OOR9060/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00OOR9060&linkCode=as2&tag=schmerb0a-20&linkId=04c5b3743d223f05020b827c5a6499d2">Parrot Bebop Quadcopter Drone</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B00OOR9060" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '220-320',
            camera: "1080@30/14MP",
            max_flight_time: "Approx. 11min",
            max_range: "2000m",
            max_speed: "31mph",
            headless: "YES",
            gps: "YES",
            gimbal: "NO",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "",
            tracking_mode: ""
        },
        bebop_2: {
            brand: "Parrot",
            url: "parrot",
            model: "Bebop 2",
            img: "http://assets.store.hp.com/hpusstore/images/3pp_573X430/1y6290.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B0179JFAW2/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0179JFAW2&linkCode=as2&tag=schmerb0a-20&linkId=b77b0d0bf51014340966a622a9b12f32">Parrot Bebop 2 Drone</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B0179JFAW2" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 400,
            camera: "1080/14MP",
            max_flight_time: "Approx. 25min",
            max_range: "2000m",
            max_speed: "37.28mph",
            headless: "YES",
            gps: "YES",
            gimbal: "NO",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: ""
        },
        ar: {
            brand: "Parrot",
            url: "parrot",
            model: "AR Drone 2.0",
            img: "https://www.parrot.com/uk/sites/default/files/styles/product_teaser_hightlight/public/power_edition_orange.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/offer-listing/B00FS7SU7K/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS7SU7K&linkCode=am2&tag=schmerb0a-20&linkId=b5caac044bff580b853e1d230bf47130">Parrot AR.Drone 2.0 Elite Edition Quadcopter - Snow</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B00FS7SU7K" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '160-250',
            camera: "720@30",
            max_flight_time: "Approx. 12min",
            max_range: "50m",
            max_speed: "37.28mph",
            headless: "YES",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            avoidance: "",
            return_home: "NO",
            follow_me_mode: "NO",
            tracking_mode: ""
        },
        ar_gps: {
            brand: "Parrot",
            url: "parrot",
            model: "AR Drone 2.0 GPS Edition",
            img: "https://www.parrot.com/us/sites/default/files/parrot_ar_drone_gps_edition.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01L4H336K/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01L4H336K&linkCode=as2&tag=schmerb0a-20&linkId=e3d00aa96bacc53fde27ccca7f194936">AR.Drone Parrot 2.0 Elite Edition with GPS</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01L4H336K" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '160-300',
            camera: "720@30",
            max_flight_time: "Approx. 12min",
            max_range: "50m",
            max_speed: "37.28mph",
            headless: "YES",
            gps: "YES",
            gimbal: "NO",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: ""
        },
        mambo: {
            brand: "Parrot",
            url: "parrot",
            model: "Mambo",
            img: "https://www.parrot.com/global/sites/default/files/styles/product_teaser_hightlight/public/mambo_packshot.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B071NRZ5LX/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B071NRZ5LX&linkCode=as2&tag=schmerb0a-20&linkId=abff6183ff5b0522c41c3da9d5de8e1f">Parrot Minidrone Mambo </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B071NRZ5LX" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 60,
            camera: "60FPS",
            max_flight_time: "Approx. 8-9min",
            max_range: "65ft - 200ft",
            max_speed: "",
            headless: "YES",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            avoidance: "NO",
            return_home: "NO",
            follow_me_mode: "NO",
            tracking_mode: "NO",
            flips: "YES" // Shoots balls / grabs small objects
        }
    },
    yuneec: {
        q500: {
            brand: "Yuneec",
            url: "yuneec",
            model: "Typhoon Q500 4K",
            img: "https://cdn-reichelt.de/bilder/web/xxl_ws/E910/YUNEEC_YUNQ4KEU_13.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B00ZH45ZXG/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00ZH45ZXG&linkCode=as2&tag=schmerb0a-20&linkId=af32e01ea876f343b422b8e0c4b9e917">Yuneec Q500 4K Typhoon Quadcopter Drone </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B00ZH45ZXG" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 700,
            camera: "4K@30/2.7k@30/2.5k@30/ 1080@30-48-50-60-120/12MP",
            max_flight_time: "Approx. 25min",
            max_range: "400m(1312ft.)",
            max_speed: "18mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        typhoon_h: {
            brand: "Yuneec",
            url: "yuneec",
            model: "Typhoon H",
            img: "https://www.cliftoncameras.co.uk/uploads/products/TyphoonHProfessionalMK56.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01I2A1IFK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01I2A1IFK&linkCode=as2&tag=schmerb0a-20&linkId=7e34210478ee2765a9cb852d7539991d">Yuneec Typhoon H  Hexacopter Drone</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01I2A1IFK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 1000,
            camera: "4K@30/12.4MP",
            max_flight_time: "Approx. 25min",
            max_range: "1600m (1 mile)",
            max_speed: "43.5mph",
            headless: "YES",
            gps: "YES",
            gimbal: "YES, 360deg",
            intelligent_flight: "YES",
            avoidance: "YES",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "YES"
        },
        breeze: {
            brand: "Yuneec",
            url: "yuneec",
            model: "Breeze",
            img: "http://dronereview.com/wp-content/uploads/2016/10/Yuneec-Breeze.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B07145SSM2/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B07145SSM2&linkCode=as2&tag=schmerb0a-20&linkId=dfde91da9f0f4638062748afdfee5f50">Yuneec Breeze 4K Compact Quadcopter Drone</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B07145SSM2" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 400,
            camera: "4k@30/1080@30/720@60/13MP",
            max_flight_time: "Approx. 12min",
            max_range: "400m(1312ft.)",
            max_speed: "~11mph",
            headless: "YES",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "N/A"
        }
    },
    syma: {
        x8sc: {
            brand: "Syma",
            url: "syma",
            model: "X8SC",
            // img: "https://sc02.alicdn.com/kf/HTB1slTCPFXXXXXRXFXX760XFXXXY/SYMA-X8SC-2-4GHZ-Remote-Radio-Control.png",
            img: "https://www.halfchrome.com/wp-content/uploads/2016/12/syma-x8sw.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/offer-listing/B074NWDB79/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B074NWDB79&linkCode=am2&tag=schmerb0a-20&linkId=6a5f3769b4b1bb4536ea15612f5fe09f">Syma Quadcopter X8SC </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B074NWDB79" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 120,
            camera: "1MP",
            max_flight_time: "Approx. 9mins",
            max_range: "70m",
            max_speed: "",
            headless: "YES/NO",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            flips: "YES"
        },
        x5c: {
            brand: "Syma",
            url: "syma",
            model: "X5C",
            img: "https://droneflyers.files.wordpress.com/2014/08/syma-x5c-1.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01DXPW1WI/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01DXPW1WI&linkCode=as2&tag=schmerb0a-20&linkId=0d120d76135300cc33936bbce4151098">SYMA X5C-1 Explorers Quadcopter </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01DXPW1WI" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 60,
            camera: "1MP",
            max_flight_time: "Approx. 7mins",
            max_range: "30m",
            max_speed: "",
            headless: "NO",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            flips: "YES"
        }
    },
    hubsan: {
        h107c: {
            brand: "Hubsan",
            url: "hubsan",
            model: "H107C+ HD",
            img: "https://dronepedia.xyz/wp-content/uploads/2015/11/H107C-0402.408-1024x662.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/offer-listing/B016NLVCMY/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B016NLVCMY&linkCode=am2&tag=schmerb0a-20&linkId=791de7b3331425d7685571de3d22c5ad">Hubsan X4 Plus H107C+ </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B016NLVCMY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: "35-60",
            camera: "720",
            max_flight_time: "Approx. 7mins",
            max_range: "50-150m",
            max_speed: "",
            headless: "YES/NO",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            flips: "YES"
        }
    },
    xiro: {
        xplorer_v: {
            brand: "Xiro",
            url: "xiro",
            model: "Xplorer V",
            img: "http://www.funaster.com/wp-content/uploads/2015/06/xiro_v_features1.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/offer-listing/B01233S87S/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01233S87S&linkCode=am2&tag=schmerb0a-20&linkId=5fa08c7a89120332939a4abcbc9f545d">XIRO Xplorer UAV Drone </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01233S87S" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: '180-300',
            camera: "1080@30/14MP",
            max_flight_time: "Approx. 25mins",
            max_range: "500m",
            max_speed: "~18mph",
            headless: "YES/NO",
            gps: "YES",
            gimbal: "YES",
            intelligent_flight: "YES",
            avoidance: "",
            return_home: "YES",
            follow_me_mode: "YES",
            tracking_mode: "N/A"
        }
    },
    udi: {
        u818a: {
            brand: "UDI",
            url: "udi",
            model: "Discovery 2 U818A",
            img: "../assets/drones/discovery-2-compressor.png",
            link: '<a target="_blank" href="https://www.amazon.com/gp/product/B01IMR6BLO/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01IMR6BLO&linkCode=as2&tag=schmerb0a-20&linkId=75321e1215cfe2b492645b91d18cbf01">UDI Discovery 2 U818A Drone Quadcopter</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=schmerb0a-20&l=am2&o=1&a=B01IMR6BLO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
            price: 80,
            camera: "720@30/1MP",
            max_flight_time: "Approx. 15mins",
            max_range: "60m - 150m",
            max_speed: "~18mph",
            headless: "YES",
            gps: "NO",
            gimbal: "NO",
            intelligent_flight: "NO",
            avoidance: "NO",
            return_home: "NO",
            follow_me_mode: "NO",
            tracking_mode: "N/A"
        }
    }
};

//
// For quick reference to drone brands correct casing
//
var droneBrands = {
    dji: 'DJI',
    gopro: 'GoPro',
    parrot: 'Parrot',
    yuneec: 'Yuneec',
    syma: 'Syma',
    hubsan: 'Hubsan',
    xiro: 'Xiro',
    udi: 'UDI'
};
}).call(this,require("FT5ORs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_b8d30676.js","/")
},{"FT5ORs":33,"buffer":2,"es6-object-assign":19,"object.values":30}]},{},[34])