<template>
	<section class="grades-container" :style="loadingData ? 'overflow:hidden' : null">
		<transition name="shrink">
			<div v-if="loadingData && !isError" class="loading-container">
				<span class="loading-message">Ładowanie ocen z librusa </span>
				<Loader />
			</div>
		</transition>
		<div class="error-notice" v-if="isError">
			<span>Wystąpił błąd </span>
			<i class="pi pi-exclamation-circle"></i>
		</div>
		<div v-if="isError">
			<button @click="retryFetch" v-ripple class="p-ripple retry-button">
				Spróbuj ponownie
				<i class="pi pi-refresh"></i>
			</button>
		</div>
		<transition name="show-summary">
			<TheSummary v-if="data && summaryOpen" :data="data" />
		</transition>
		<div v-if="!isError && !loadingData" class="show-overall">
			<button @click="showOverallButton" class="hide-overall"><i :class="`pi pi-angle-${angle}`"></i></button>

			<div>
				<button @click="showSummary" v-ripple class="p-ripple summary-btn">Pokaż podsumowanie</button>
			</div>
		</div>
		<table class="grades" v-if="!isError">
			<TableHeader @refresh="retryFetch">
				<transition name="expand">
					<SwitchSem v-if="!loadingData" v-show="toggleShowSem" />
				</transition>
			</TableHeader>

			<SkeletonBody v-if="loadingData" />
			<GradesBody v-if="!isError && !loadingData" :data="data" />
		</table>
		<TheToast v-if="toggleToast" v-bind="errorMessage" />
	</section>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref, provide, reactive } from 'vue';
import { toggleToast, toggleShowSem, summaryOpen } from '../../store/store';
import { BASE_URL } from '../../cfg';
const TheToast = defineAsyncComponent(() => import('../TheToast.vue'));
const loadingData = ref(true);
const loadSkele = ref(true);
const isError = ref(false);
const data = ref();
const isSummaryShown = ref(false);
const angle = ref('left');

let errorMessage = {
	meaning: 'error',
	summary: 'Wystąpił błąd',
	msgContent: 'Nie udało się załadować ocen'
};
const semestr = reactive({
	first: true,
	second: true
});
provide('semestr', semestr);
provide('isLoading', loadingData);
onMounted(async () => {
	fetchGrades();
});

async function fetchGrades(fresh = false) {
	try {
		const isFresh = fresh ? '?fresh' : '';
		const res = await fetch(`${BASE_URL}/api/uczen/grades/lib${isFresh}`, {
			credentials: 'include'
		});
		const obj = await res.json();
		if (obj.message) {
			toggleToast.value = true;
			isError.value = true;
		} else {
			data.value = obj;
		}

		loadingData.value = false;
	} catch (error) {
		isError.value = true;
		toggleToast.value = true;
		loadingData.value = false;
	}
}
function showOverallButton({ target }) {
	angle.value = angle.value == 'left' ? 'right' : 'left';

	target.closest('.show-overall').classList.toggle('toggle-overall');
}
function showSummary(e) {
	isSummaryShown.value = !isSummaryShown.value;
	showOverallButton(e);

	summaryOpen.value = !summaryOpen.value;
}

function retryFetch() {
	isError.value = false;
	loadingData.value = true;
	toggleToast.value = false;
	fetchGrades(true);
}
</script>
<style>
.shrink-enter-active,
.shrink-leave-active {
	transition: transform 0.2s ease-in-out;
}

.shrink-enter-from,
.shrink-leave-to {
	transform: scaleY(0);
}

.expand-enter-active,
.expand-leave-active {
	transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.expand-enter-from,
.expand-leave-to {
	transform: translateY(-10px);
	opacity: 0;
}

.show-summary-enter-active,
.show-summary-leave-active {
	transition: opacity 0.5s ease-in-out;
}

.show-summary-enter-from,
.show-summary-leave-to {
	opacity: 0;
}
</style>
