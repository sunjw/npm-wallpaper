'use strict';
const {commandExists, execFile, hasLine} = require('../util.js');

exports.isAvailable = () => commandExists('gsettings');

async function isDarkStyle() {
	const {stdout} = await execFile('gsettings', [
		'get',
		'org.gnome.desktop.interface',
		'color-scheme',
	]);

	return Boolean(hasLine(stdout, '\'prefer-dark\''));
}

exports.set = async imagePath => {
	const keyForStyle = (await isDarkStyle()) ? 'picture-uri-dark' : 'picture-uri';

	await execFile('gsettings', [
		'set',
		'org.gnome.desktop.background',
		keyForStyle,
		`file://${imagePath}`
	]);
};

exports.get = async () => {
	const keyForStyle = (await isDarkStyle()) ? 'picture-uri-dark' : 'picture-uri';

	const {stdout} = await execFile('gsettings', [
		'get',
		'org.gnome.desktop.background',
		keyForStyle
	]);

	return stdout.trim().slice(8, -1);
};
