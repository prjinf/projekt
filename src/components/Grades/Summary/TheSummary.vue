<template>
	<section class="summary-wrapper">
		<button @click="closeSummary" class="close-summary-btn"><i class="pi pi-times"></i></button>
		<SummarySem :summaryData="first" />
		<SummarySem :summaryData="second" />
	</section>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { summaryOpen } from '../../../store/store';
const props = defineProps({
	data: Object
});
const sems = computed(() => props.data);

const firstSem = sems.value.firstSem;
const secondSem = sems.value.secondSem;
function summary() {
	const first = firstSem.reduce(
		(prev, subject) => {
			subject.avg = isNaN(parseFloat(subject.avg)) ? 3 : subject.avg;
			return {
				numberOfGrades: prev.numberOfGrades + subject.grades.length,

				highestAvg:
					prev.highestAvg.avg > subject.avg
						? { subject: prev.highestAvg.subject, avg: prev.highestAvg.avg }
						: { subject: subject.subject, avg: subject.avg },

				lowestAvg:
					parseFloat(prev.lowestAvg.avg) < parseFloat(subject.avg) && subject.avg !== 0
						? { subject: prev.lowestAvg.subject, avg: prev.lowestAvg.avg }
						: { subject: subject.subject, avg: subject.avg },
				negativeGrades:
					prev.negativeGrades + subject.grades.filter(grade => grade.grade == '1' || grade.grade == '1+').length,
				positiveGrades: prev.numberOfGrades - prev.negativeGrades,
				nps: prev.nps + subject.grades.filter(grade => grade.grade == 'np').length,
				semAvg: isNaN(parseFloat(subject.finalGrade.grade))
					? prev.semAvg
					: prev.semAvg + parseFloat(subject.finalGrade.grade),
				_unknownFinal: isNaN(parseFloat(subject.finalGrade.grade)) ? (prev._unknownFinal += 1) : prev._unknownFinal
			};
		},
		{
			numberOfGrades: 0,
			highestAvg: { avg: 0, subject: '' },
			lowestAvg: { avg: 6, subject: '' },
			negativeGrades: 0,
			positiveGrades: 0,
			nps: 0,
			semAvg: 0,
			_unknownFinal: 0
		}
	);
	const second = secondSem.reduce(
		(prev, subject) => {
			subject.avg = isNaN(parseFloat(subject.avg)) ? 3 : subject.avg;
			return {
				numberOfGrades: prev.numberOfGrades + subject.grades.length,

				highestAvg:
					prev.highestAvg.avg > subject.avg
						? { subject: prev.highestAvg.subject, avg: prev.highestAvg.avg }
						: { subject: subject.subject, avg: subject.avg },

				lowestAvg:
					parseFloat(prev.lowestAvg.avg) < parseFloat(subject.avg) && subject.avg !== 0
						? { subject: prev.lowestAvg.subject, avg: prev.lowestAvg.avg }
						: { subject: subject.subject, avg: subject.avg },
				negativeGrades:
					prev.negativeGrades + subject.grades.filter(grade => grade.grade == '1' || grade.grade == '1+').length,
				positiveGrades: prev.numberOfGrades - prev.negativeGrades,
				nps: prev.nps + subject.grades.filter(grade => grade.grade == 'np').length,
				semAvg: isNaN(parseFloat(subject.finalGrade.grade))
					? prev.semAvg
					: prev.semAvg + parseFloat(subject.finalGrade.grade),
				_unknownFinal: isNaN(parseFloat(subject.finalGrade.grade)) ? (prev._unknownFinal += 1) : prev._unknownFinal
			};
		},
		{
			numberOfGrades: 0,
			highestAvg: { avg: 0, subject: '' },
			lowestAvg: { avg: 6, subject: '' },
			negativeGrades: 0,
			positiveGrades: 0,
			nps: 0,
			semAvg: 0,
			_unknownFinal: 0
		}
	);
	first.sem = 'Semestr pierwszy';
	second.sem = 'Semestr drugi';
	
	first.semAvg = (first.semAvg / (firstSem.length - first._unknownFinal)).toFixed(2);
	second.semAvg = (second.semAvg / (secondSem.length - second._unknownFinal)).toFixed(2);
	second.semAvg = secondSem.length === second._unknownFinal ? 'Brak ocen' : second.semAvg;
	return { first, second };
}
const { first, second } = summary();
const closeSummary = () => (summaryOpen.value = !summaryOpen.value);
</script>
