'use strict';
const {commandExists, execFile} = require('../util.js');

exports.isAvailable = () => commandExists('swww');

async function initialize() {
	try {
		await execFile('swww', ['init']);
	} catch (error) {
		if (error.stderr.includes('There seems to already be another instance running')) {
			return;
		}

		throw new Error(`Failed to set image for swww: ${error.stderr}`);
	}
}

exports.get = async () => {
	await initialize();
	const {stdout: query} = await execFile('swww', ['query']);
	return query.slice(query.indexOf('/'), query.indexOf('\n'));
};

exports.set = async imagePath => {
	await initialize();
	await execFile('swww', ['img', imagePath]);
};
