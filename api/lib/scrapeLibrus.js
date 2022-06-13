import scrape from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { clear, objectify, cellsNth } from './helpers.js';
import util from 'util';
util.inspect.defaultOptions.depth = null;
scrape.use(StealthPlugin());

export default async function scrapeIt() {
	const browser = await scrape.launch({
		headless: true,
		defaultViewport: { width: 1600, height: 900 },
		args: ['--window-size=1600,900']
	});
	try {
		const cfg = await import('../config.js');

		console.time('crawling');
		const page = await browser.newPage();
		await page.setViewport({ width: 1600, height: 900 });
		await page.goto('https://portal.librus.pl/rodzina');
		console.log(`Navigated to ${page.url()}`);

		await page.click('.btn-third', { button: 'left' });
		await page.click('body > nav > div > div.navbar__left > div > div.navbar-small-menu.show > div > a:nth-child(2)', {
			button: 'left'
		});

		console.log(`Navigated to ${page.url()}`);

		// wait for frame with login to load
		await page.waitForFrame(frame => frame.name() === 'caLoginIframe');
		const frame = page.frames().find(frame => frame.name() === 'caLoginIframe');
		// console.log(frame);
		await frame.waitForSelector('#Login', { visible: true });

		const login = await frame.$('#Login');
		const password = await frame.$('#Pass');
		const submit = await frame.$('#LoginBtn');

		await login.type(cfg.default.librus.login);
		await password.type(cfg.default.librus.password);
		console.log('Filling form...');
		await submit.click();

		console.log('Logged in');

		await page.waitForSelector('#icon-oceny', { visible: true });
		await page.hover('#icon-oceny');
		await page.click('#icon-oceny');

		console.log(`Navigated to ${page.url()}`);
		if (page.url() == 'https://synergia.librus.pl/uczen/index') {
			await browser.close();
			console.log('SCRAPING AGAIN ');
			return scrapeIt();
		}
		await page.waitForSelector('#body > form:nth-child(5) > div > div > table:nth-child(9)');

		const subjects = await page.$$eval(cellsNth(1), els => els.map(el => el.textContent));
		subjects.pop();

		let firstSemGrades = await page.$$eval(cellsNth(2), els => els.map(el => el.textContent));
		firstSemGrades.pop();
		firstSemGrades = clear(firstSemGrades);

		const descriptionsFirstSemRaw = await page.$$eval(cellsNth(2), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});
		descriptionsFirstSemRaw.pop();

		const descriptionsFirstSem = descriptionsFirstSemRaw.map(subject => {
			return objectify(subject);
		});
		firstSemGrades = firstSemGrades.map((subject, index) => {
			if (subject !== null && descriptionsFirstSem[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: descriptionsFirstSem[index][index2]
					};
				});
			} else return [];
		});

		const firstSemAvg = await page.$$eval(cellsNth(3), els => els.map(el => el.textContent));
		firstSemAvg.pop();

		let proposedFirstSemDescription = await page.$$eval(cellsNth(4), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});
		proposedFirstSemDescription.pop();
		proposedFirstSemDescription = proposedFirstSemDescription.map(subject => objectify(subject));

		let proposedFirstSem = clear(await page.$$eval(cellsNth(4), els => els.map(el => el.textContent)));
		proposedFirstSem.pop();

		proposedFirstSem = proposedFirstSem.map((subject, index) => {
			if (subject !== null && proposedFirstSemDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: proposedFirstSemDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});

		let finalFirstSemDescription = await page.$$eval(cellsNth(5), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});
		finalFirstSemDescription = finalFirstSemDescription.map(subject => objectify(subject));
		let finalFirstSem = await page.$$eval(cellsNth(5), els => els.map(el => el.textContent));

		finalFirstSem = clear(finalFirstSem);
		finalFirstSem = finalFirstSem.map((subject, index) => {
			if (subject !== null && finalFirstSemDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: finalFirstSemDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});
		console.timeEnd('crawling');

		const firstSem = subjects.map((subject, index) => {
			return {
				subject,
				grades: firstSemGrades[index],
				avg: firstSemAvg[index],
				proposedGrade: proposedFirstSem[index][0],
				finalGrade: finalFirstSem[index][0]
			};
		});

		const descriptionsSecondSemRaw = await page.$$eval(cellsNth(6), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});
		const descriptionsSecondSem = descriptionsSecondSemRaw.map(subject => objectify(subject));

		let secondSemGrades = await page.$$eval(cellsNth(6), els => {
			return els.map(el => {
				if (el.textContent !== 'Brak ocen' && el.querySelector('span').querySelector('span')) {
					const val = Array.from(el.querySelectorAll('span')).map(x => x.textContent.trim());
					val.shift();
					return val;
				} else {
					const trimmed = el.textContent.split('\n').map(v => v.trim());
					if (trimmed[0] === '') trimmed.shift();
					return trimmed;
				}
			});
		});

		secondSemGrades = secondSemGrades.map((subject, index) => {
			if (subject !== null && descriptionsSecondSem[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: descriptionsSecondSem[index][index2]
					};
				});
			} else return [];
		});
		const secondSemAvg = await page.$$eval(cellsNth(7), els => els.map(el => el.textContent));

		let proposedSecondSemDescription = await page.$$eval(cellsNth(8), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});

		proposedSecondSemDescription = proposedSecondSemDescription.map(subject => objectify(subject));

		let proposedSecondSem = await page.$$eval(cellsNth(8), els => els.map(el => el.textContent));
		proposedSecondSem = clear(proposedSecondSem);

		proposedSecondSem = proposedSecondSem.map((subject, index) => {
			if (subject !== null && proposedSecondSemDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: proposedSecondSemDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});

		let finalSecondSemDescription = await page.$$eval(cellsNth(9), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});

		finalSecondSemDescription = finalSecondSemDescription.map(subject => objectify(subject));

		let finalSecondSem = await page.$$eval(cellsNth(9), els => els.map(el => el.textContent.trim()));
		finalSecondSem = clear(finalSecondSem);
		finalSecondSem = finalSecondSem.map((subject, index) => {
			if (subject !== null && finalSecondSemDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: finalSecondSemDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});
		const secondSem = subjects.map((subject, index) => {
			return {
				subject,
				grades: secondSemGrades[index],
				avg: secondSemAvg[index],
				proposedGrade: proposedSecondSem[index][0],
				finalGrade: finalSecondSem[index][0]
			};
		});

		const yearlyAvg = await page.$$eval(cellsNth(10), els => els.map(el => el.textContent));

		let yearlyProposedDescription = await page.$$eval(cellsNth(11), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});

		yearlyProposedDescription = yearlyProposedDescription.map(subject => objectify(subject));

		let yearlyProposed = clear(await page.$$eval(cellsNth(11), els => els.map(el => el.textContent)));

		yearlyProposed = yearlyProposed.map((subject, index) => {
			if (subject !== null && yearlyProposedDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: yearlyProposedDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});
		let yearlyFinalDescription = await page.$$eval(cellsNth(12), els => {
			return els.map(el => {
				if (el.querySelector('span')) {
					return Array.from(el.querySelectorAll('span a')).map(value => value.title);
				}
				return null;
			});
		});

		yearlyFinalDescription = yearlyFinalDescription.map(subject => objectify(subject));

		let yearlyFinal = clear(await page.$$eval(cellsNth(12), els => els.map(el => el.textContent)));

		yearlyFinal = yearlyFinal.map((subject, index) => {
			if (subject !== null && yearlyFinalDescription[index] !== null) {
				return subject.map((grade, index2) => {
					return {
						grade,
						description: yearlyFinalDescription[index][index2]
					};
				});
			} else
				return [
					{
						grade: '-',
						description: null
					}
				];
		});
		const yearly = subjects.map((subject, index) => {
			return {
				subject,
				avg: yearlyAvg[index],
				proposedGrade: yearlyProposed[index][0],
				finalGrade: yearlyFinal[index][0]
			};
		});

		const full = {
			firstSem,
			secondSem,
			yearly
		};
		console.log('@@@@@@@@@@@@@@@@@');
		console.log('Got data...');
		console.log('@@@@@@@@@@@@@@@@@');

		await browser.close();
		console.log('Browser closed');
		return full;
	} catch (error) {
		await browser.close();
		return { message: 'Wystąpił błąd' };
	}
}
