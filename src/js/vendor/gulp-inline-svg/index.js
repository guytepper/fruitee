var through = require("through2"),
	gutil = gutil = require('gulp-util'),
	File = gutil.File,
	path = require('path'),
	mustache = require('mustache'),
	fs = require('fs'),
	xml2js = require('xml2js'),
	_ = require('underscore');

module.exports = function (_options) {
	"use strict";

	var files = {},
		svgs = [],
		options = {
			filename: '_svg.scss',
			template: __dirname + '/template.mustache',
		};

		// merge options
		options = _.extend(options, _options);

	function inlineSvg(file, enc, callback) {
		/*jshint validthis:true*/

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {

			// accepting streams is not supported
			this.emit("error",
				new gutil.PluginError("gulp-inline-svg", "Stream content is not supported"));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {
			// store the new file for later usage
			if (!files[file.base]) {
				files[file.base] = new File({
					cwd: "/",
					base: "/",
					path: "/" + options.filename,
					contents: new Buffer("")
				});
			}

			// get mustache template
			var template = fs.readFileSync(options.template, 'utf-8');

			var attrToLowerCase = function(name) {
				return name.toLowerCase();
			};

			// parse the svg and extract dimensions
			xml2js.parseString(String(file.contents), {strict: false, attrkey:'ATTR', attrNameProcessors:[attrToLowerCase]}, function (err, result) {
				if (err) throw err;
				var hasWidthHeightAttr = result.SVG.ATTR['width'] && result.SVG.ATTR['height'],
					width,
					height;
				if (hasWidthHeightAttr) {
					height = result.SVG.ATTR['height'];
					width = result.SVG.ATTR['width'];
				} else {
					width = result.SVG.ATTR['viewbox'].toString().replace(/^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/, "$1");
					height = result.SVG.ATTR['viewbox'].toString().replace(/^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/, "$2");
				}

				// store this svg data
				// * Fruitee project:
				// * Added `encode` function to handle the URL encode correctly for
				//   usage in the background-image property
				svgs.push({
					name: path.basename(file.path, '.svg'),
					inline: encode(file.contents),
					width: parseInt(width) + 'px',
					height: parseInt(height) + 'px'
				});

				// update template
				files[file.base].contents = new Buffer(mustache.render(template, {svgs: svgs}));

				// send new file back to stream
				this.push(files[file.base]);
			}.bind(this));

		}

		return callback();
	}

	return through.obj(inlineSvg);
};

// Snippet taken from svg-url-loader: https://github.com/bhovhannes/svg-url-loader
function encode(content) {
	content = content.toString('utf8');
	content = content.replace(/"/g, "'");
	content = content.replace(/\s+/g, " ");
	content = content.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function(match) {
		return '%'+match[0].charCodeAt(0).toString(16).toUpperCase();
	});

	return data = 'data:image/svg+xml;charset=utf8,' + content.trim();
}
