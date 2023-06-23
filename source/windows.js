'use strict';
const {promisify} = require('util');
const path = require('path');
const childProcess = require('child_process');

const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/win-wallpaper
const binary = path.join(__dirname, 'windows-wallpaper-x86-64.exe');

exports.get = async () => {
	const arguments_ = [
		'get',
	];

	const {stdout} = await execFile(binary, arguments_);
	return stdout.trim();
};

exports.set = async (imagePath, {scale = 'fill'} = {}) => {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	const arguments_ = [
		'set',
		path.resolve(imagePath),
		'--scale',
		scale,
	];

	await execFile(binary, arguments_);
};
