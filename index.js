const through = require('through2');
const PluginError = require('plugin-error');
const sizes = require('./sizes')

module.exports = options => {
	options = options || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-inline-imagesize', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = Buffer.from(sizes(file.path, file.contents.toString()));
			this.push(file);
		} catch (err) {
			this.emit('error', new PluginError('gulp-inline-imagesize', err));
		}

		cb();
	});
};
