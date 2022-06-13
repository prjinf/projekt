<template>
	<tbody class="tb-main">
		<GradeRow
			v-for="(obj, index) in data.firstSem.length"
			:key="index"
			:subject="{ firstSem: firstSem[index], secondSem: secondSem[index], yearly: yearly[index] }"
			:index="index"
		/>
	</tbody>
</template>
<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
});
const parseProxy = target => JSON.parse(JSON.stringify(target));
let items = computed(() => props.data);
items = parseProxy(items.value);

function parseSems(sem = {}) {
	const result = {};
	const sems = Object.keys(sem);

	for (let key of sems) {
		let semestr = sem[key];
		result[key] = semestr.map(subject => {
			return {
				...subject,
				proposedGrade: {
					grade: subject.proposedGrade?.grade,
					description: subject.proposedGrade.description?.map(line => line.split('<br')[0])
				},
				finalGrade: {
					grade: subject.finalGrade.grade,
					description: subject.finalGrade.description?.map(line => line.split('<br')[0])
				},
				grades: subject.grades?.map(({ description, grade }) => {
					return {
						grade,
						description: description.map(line => line.split('<br')[0])
					};
				})
			};
		});
	}
	return result;
}

const { firstSem, secondSem, yearly } = parseSems(items);
</script>
