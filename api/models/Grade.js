import Grade from '../schemas/GradeSchema.js';
import scrape from '../lib/scrapeLibrus.js';
export default {
	async addNewGrade(req, res) {
		const body = req.body;
		console.log(body);
		await Grade.create({
			teacher_id: body.teacher_id,
			user_id: body.student,
			value: body.value
		});
		res.end();
	},

	async getGradesLibrus(req, res) {
		if (!req.isAuthenticated()) return res.sendStatus(403);
		const { cache } = await import('../app.js');
		let data;
		try {
			if (!cache.get('gradesCache') || req.query.fresh !== undefined) {
				data = await scrape();

				// data = await fetch('https://europe-central2-gothic-victor-351712.cloudfunctions.net/scrape');
				// data = await data.json();

				if (data.message) {
					return res.json({ message: 'Wystąpił błąd' });
				}
				cache.set('gradesCache', data);
			} else {
				data = cache.get('gradesCache');
			}
			res.json(data);
			// setTimeout(() => {
			// 	res.json({ message: 'Wystąpił błąd' });
			// }, 5000);
		} catch (error) {
			res.json({ message: 'Wystąpił błąd' });
			console.error('wystąpił błąd', error);
		}
	}
};
