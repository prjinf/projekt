<template>
	<thead class="th-main">
		<tr>
			<th class="br" rowspan="2">Przedmiot</th>
			<th v-show="semestr.first" class="br" colspan="4" data-sem>
				<i v-if="!isLoading" @click="$emit('refresh')" class="pi pi-refresh"></i>
				<span data-sem @click="toggle">Semestr 1</span>
				<i
					@click="toggle"
					:style="!semestr.second ? 'right:initial;' : ''"
					class="expand-sem-icon pi pi-angle-down"
				></i>
			</th>
			<th v-show="semestr.second" class="br" colspan="4" data-sem>
				<span data-sem @click="toggle">Semestr 2</span>
				<i v-show="!semestr.first" style="right: initial" @click="toggle" class="expand-sem-icon pi pi-angle-down"></i>
			</th>
			<th v-show="semestr.second && semestr.first" class="br" colspan="3">Koniec roku</th>
		</tr>
		<tr>
			<template v-if="semestr.first">
				<th>Oceny</th>
				<th v-tooltip.bottom="{ value: 'Średnia ocen z pierwszego semestru', class: 'tooltip-text' }">Śr. I</th>
				<th v-tooltip.bottom="{ value: 'Przewidywana ocena śródroczna z pierwszego semestru', class: 'tooltip-text' }">
					(I)
				</th>
				<th v-tooltip.bottom="{ value: 'Ocena śródroczna z pierwszego semestru', class: 'tooltip-text' }" class="br">
					I
				</th>
			</template>
			<template v-if="semestr.second">
				<th>Oceny</th>
				<th v-tooltip.bottom="{ value: 'Średnia ocen z drugiego semestru', class: 'tooltip-text' }">Śr. II</th>
				<th v-tooltip.bottom="{ value: 'Przewidywana ocena śródroczna z drugiego semestru', class: 'tooltip-text' }">
					(II)
				</th>
				<th v-tooltip.bottom="{ value: 'Ocena śródroczna z drugiego semestru', class: 'tooltip-text' }" class="br">
					II
				</th>
			</template>
			<template v-if="semestr.first && semestr.second">
				<th v-tooltip.bottom="{ value: 'Średnia roczna', class: 'tooltip-text' }">Śr. R</th>
				<th v-tooltip.bottom="{ value: 'Przewidywana ocena roczna', class: 'tooltip-text' }">(R)</th>
				<th v-tooltip.bottom="{ value: 'Ocena roczna', class: 'tooltip-text' }">R</th>
			</template>
		</tr>
		<slot></slot>
	</thead>
</template>

<script setup>
import { inject } from 'vue';
import { toggleShowSem } from '../../store/store';

function toggle(e) {
	toggleShowSem.value = !toggleShowSem.value;
	[...document.querySelectorAll('.expand-sem-icon')].forEach(_ => _.classList.toggle('sem-expanded'));
	const table = e.target.closest('.grades');
	table.addEventListener('click', ({ target }) => {
		if (
			!target.classList.contains('sem-switch__btn') &&
			!target.classList.contains('expand-sem-icon') &&
			target.dataset.sem == undefined
		) {
			toggleShowSem.value = false;
			[...document.querySelectorAll('.expand-sem-icon')].forEach(_ => _.classList.remove('sem-expanded'));
		}
	});
}
const semestr = inject('semestr');
const isLoading = inject('isLoading');
</script>
