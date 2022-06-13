export default function selectDay({ target }, index = 0) {
	target.classList.toggle('day-selected');
	const rows = [...target.closest('table').rows];
	rows.shift();
	rows.forEach(row => [...row.querySelectorAll('td')][index].classList.toggle('day-selected'));
}
