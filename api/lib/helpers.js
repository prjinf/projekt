export function clear(target = []) {
	return target.map(value => {
		const trimmed = value.split('\n').map(v => v.trim());
		if (trimmed[0] === '') trimmed.shift();
		return trimmed;
	});
}

export function objectify(subject = []) {
	if (subject !== null) {
		return subject.map(single => {
			return single.split('<br>');
		});
	}
	return null;
}

export const cellsNth = (numberOfTds = 0) => {
	let str = '.center.micro.screen-only';
	for (let i = 0; i < numberOfTds; i++) {
		str += '+ td ';
	}
	return str;
};
