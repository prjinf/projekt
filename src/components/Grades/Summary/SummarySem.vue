<template>
	<h2 class="summary-sem-header">{{ summaryData.sem }}</h2>
	<div class="tiles-container">
		<div class="summary-tile sm">
			<span class="summary-tile__title">Ilość ocen</span>
			<span class="summary-tile__data">{{ summaryData.numberOfGrades }}</span>
		</div>

		<div class="summary-tile">
			<span class="summary-tile__title">Najwyższa średnia z przedmiotu: </span>
			<span class="summary-tile__subdata">{{ summaryData.highestAvg.subject }}</span>
			<span class="summary-tile__data positive">{{ summaryData.highestAvg.avg }}</span>
		</div>
		<div class="summary-tile">
			<span class="summary-tile__title">Najniższa średnia z przedmiotu: </span>
			<span class="summary-tile__subdata">{{ summaryData.lowestAvg.subject }}</span>
			<span class="summary-tile__data negative">{{ summaryData.lowestAvg.avg }}</span>
		</div>

		<div class="summary-tile sm">
			<span class="summary-tile__title">Ocen negatywnych</span>
			<span class="summary-tile__data negative">{{ summaryData.negativeGrades }}</span>
		</div>

		<div class="summary-tile sm">
			<span class="summary-tile__title">Ocen pozytywnych</span>
			<span class="summary-tile__data positive">{{ summaryData.positiveGrades }}</span>
		</div>

		<div class="summary-tile sm">
			<span class="summary-tile__title">Zgłoszonych nieprzygotowań</span>
			<span class="summary-tile__data negative">{{ summaryData.nps }}</span>
		</div>

		<div class="summary-tile bg">
			<span class="summary-tile__title">ŚREDNIA SEMESTRALNA</span>
			<span class="summary-tile__data" :style="[summaryData.semAvg === 'Brak ocen' ? { fontSize: `1.3em` } : {}]">{{
				summaryData.semAvg
			}}</span>
		</div>
	</div>
</template>

<script setup>
defineProps({
	summaryData: Object
});
</script>
