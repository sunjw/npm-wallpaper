'use strict';
const childProcess = require('child_process');
const {commandExists} = require('../util.js');

exports.isAvailable = () => commandExists('swaybg');

exports.set = async imagePath => {
	return new Promise((resolve, reject) => {
		const cp = childProcess.spawn('swaybg', ['--image', imagePath, '--mode', 'fill']);

		cp.stderr.on('data', data => {
			if (data.includes('Failed to load image')) {
				cp.kill('SIGINT');
				reject(new Error(`Failed to load image from ${imagePath}`));
			} else {
				resolve();
			}
		});
	});
};
