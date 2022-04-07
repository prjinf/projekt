<template>
	<section>
		<div class="box">
			<div class="container">
				<div class="form">
					<h2>Logowanie</h2>
					<!-- <span v-if="formError" class="form-error">Login lub hasło jest nieprawidłowe</span> -->
					<form method="POST" @submit.prevent action="/auth/login">
						<div class="inputBox">
							<i class="form-icon pi pi-user"></i>
							<!-- <ion-icon name="person-circle-sharp"></ion-icon> -->
							<input type="text" required="required" name="login" />
							<span>Nazwa</span>
						</div>
						<div class="inputBox">
							<i class="form-icon pi pi-key"></i>
							<!-- <ion-icon name="key"></ion-icon> -->
							<input type="password" required="required" name="password" />
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
	<TheToast v-if="toggleToast" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { showToast } from '../composables/useToast';
import { toggleToast } from '../store/store';

const URL = `${window.location.protocol}//${window.location.hostname}:5000/auth/login`;

onMounted(() => {
	setTimeout(() => {
		document.querySelector('[name="login"]').focus();
	}, 500);
	const validate = new Bouncer('form', {
		messages: {
			missingValue: {
				default: 'To pole nie może być puste.'
			}
		}
	});
});

async function login(e) {
	const form = document.querySelector('form');
	const data = new FormData(form);
	const dataObject = Object.fromEntries(data.entries());

	if (document.querySelector('form').checkValidity()) {
		try {
			toggleToast.value = true;
			const res = await fetch(URL, {
				method: form.method,
				credentials: 'include',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(dataObject)
			});
			// document.cookie = await res.json()
		} catch (error) {}
	}
}
</script>
