<template>
	<section>
		<div class="box">
			<div class="container">
				<div class="form">
					<h2>Logowanie</h2>
					<!-- <span v-if="formError" class="form-error">Login lub hasło jest nieprawidłowe</span> -->
					<form @submit.prevent action="/auth/login">
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
							<button  v-ripple @click="login" class="p-ripple login-submit" type="submit">Zaloguj</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<Toast position="bottom-left" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const URL = `${window.location.protocol}//${window.location.hostname}:5000/auth/login`;

let loginInput;
let passwordInput;
const toast = useToast();
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
	loginInput = document.querySelector('[name="login"]');
	passwordInput = document.querySelector('[name="password"]');

	const showSuccess = () => {
		toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 300000 });
	};
	showSuccess();

	function test(arr) {

	}
	test()
});
async function login(e) {
	e.preventDefault();
	if (document.querySelector('form').checkValidity()) {
		// const res = await fetch(URL, {
		// 	method: 'post'
		// });
	}
}
</script>
