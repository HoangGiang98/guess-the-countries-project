import { TIMEOUT_SEC } from './config.js';

export const shuffleArray = function (array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};
export const AJAX = async function (url, message = 'Something went wrong:') {
	try {
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		if (!res.ok) throw new Error(`${message} ${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};
