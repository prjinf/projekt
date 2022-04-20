<template>
	<section>
		<div class="box">
			<div class="container">
				<div class="form">
					<h2>Logowanie</h2>
					<transition>
						<span v-if="formErrors.is" class="form-error">{{ formErrors.message }}</span>
					</transition>
					<form method="POST" @submit.prevent action="/auth/login" data-userlogin>
						<div class="inputBox">
							<i class="form-icon pi pi-user"></i>
							<input @input="onInput" type="text" name="login" required />
							<span>Nazwa</span>
						</div>
						<div class="inputBox">
							<i class="form-icon pi pi-key"></i>

							<input @input="onInput" type="password" required name="password" />
							<span>Hasło</span>
						</div>
						<div class="inputBox">
							<button v-ripple @click.prevent="login" class="p-ripple login-submit" type="submit">Zaloguj</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- <TheToast v-if="toggleToast" /> -->
</template>

<script setup>
import { onMounted } from 'vue';
import login from '../composables/login.js';
import { formErrors } from '../store/store';

const form = document.querySelector('[data-userlogin]');
onMounted(() => {
	setTimeout(() => {
		document.querySelector('[name="login"]').focus();
	}, 500);
	const validate = new Bouncer('[data-userlogin]', {
		messages: {
			missingValue: {
				default: 'To pole nie może być puste.'
			}
		}
	});
});

function onInput() {
	if (formErrors.is) formErrors.is = !formErrors.is;
}
</script>
