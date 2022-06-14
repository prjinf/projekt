<template>
	<tr>
		<td>{{ subject.firstSem.subject }}</td>
		<td v-show="semestr.first" v-if="subject.firstSem.grades.length > 0">
			<div v-for="grade in subject.firstSem.grades" class="grade" @mousemove="follow">
				<span>{{ grade.grade }}</span>
				<div
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { left: `${pos.left}px`, top: `${pos.bottom}px` }
							: { left: `${pos.left}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in grade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td v-show="semestr.first" v-else>
			<span>Brak ocen</span>
		</td>
		<td class="td-center" v-show="semestr.first">
			<span>{{ subject.firstSem.avg }}</span>
		</td>
		<td class="td-center" v-show="semestr.first">
			<div @mousemove="follow" :class="subject.firstSem.proposedGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.firstSem.proposedGrade.grade }}
				<div
					v-if="subject.firstSem.proposedGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { left: `${pos.left}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.firstSem.proposedGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td class="td-center" v-show="semestr.first">
			<div @mousemove="follow" :class="subject.firstSem.finalGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.firstSem.finalGrade.grade }}
				<div
					v-if="subject.firstSem.finalGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { left: `${pos.left}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.firstSem.finalGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td v-show="semestr.second" v-if="subject.secondSem.grades.length > 0">
			<div @mousemove="follow" v-for="grade in subject.secondSem.grades" class="grade">
				{{ grade.grade }}
				<div
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { left: `${pos.left}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in grade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td v-show="semestr.second" v-else>
			<span>Brak ocen</span>
		</td>

		<td class="td-center" v-show="semestr.second">
			<span>{{ subject.secondSem.avg }}</span>
		</td>
		<td class="td-center" v-show="semestr.second">
			<div @mousemove="follow" :class="subject.secondSem.proposedGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.secondSem.proposedGrade.grade }}
				<div
					v-if="subject.secondSem.proposedGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { right: `${pos.right}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.secondSem.proposedGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td class="td-center" v-show="semestr.second">
			<div @mousemove="follow" :class="subject.secondSem.finalGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.secondSem.finalGrade.grade }}
				<div
					v-if="subject.secondSem.finalGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { right: `${pos.right}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.secondSem.finalGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td class="td-center" v-show="semestr.first && semestr.second">
			<span>{{ subject.yearly.avg }}</span>
		</td>

		<td class="td-center" v-show="semestr.first && semestr.second">
			<div @mousemove="follow" :class="subject.yearly.proposedGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.yearly.proposedGrade.grade }}
				<div
					v-if="subject.yearly.proposedGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { right: `${pos.right}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.yearly.proposedGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
		<td class="td-center" v-show="semestr.first && semestr.second">
			<div @mousemove="follow" :class="subject.yearly.finalGrade.description ? 'grade grade-final' : 'no-grade'">
				{{ subject.yearly.finalGrade.grade }}
				<div
					v-if="subject.yearly.finalGrade.description"
					:style="[
						index == 20 || index == 19 || index == 18 || index == 17
							? { right: `${pos.right}px`, top: `${pos.bottom}px` }
							: { right: `${pos.right}px`, top: `${pos.top}px` }
					]"
					class="description-box"
				>
					<span class="description-line" v-for="line in subject.yearly.finalGrade.description">{{ line }}</span>
				</div>
			</div>
		</td>
	</tr>
</template>
<script setup>
import { reactive } from '@vue/reactivity';
import { inject } from 'vue';

defineProps({
	subject: {
		type: Object,
		required: true
	},
	index: Number
});

const pos = reactive({
	left: 0,
	top: -500,
	right: 0,
	bottom: -150
});

function follow(e) {
	pos.right = e.target.getBoundingClientRect().left - e.pageX + 30;
	pos.left = e.offsetX + 8;
	pos.top = e.offsetY + 15;
	pos.bottom = e.offsetY - 130;
}
const semestr = inject('semestr');
</script>
