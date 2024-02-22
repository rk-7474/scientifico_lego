<script lang="ts">
	import { enhance } from "$app/forms";

	import FormInput from "$lib/components/FormInput.svelte"
    import backgroundImage from '$lib/assets/art hub.png';

	import { page } from "$app/stores";

	let visit = $page.url.searchParams.get('v');

	export let form;
</script>

<svelte:head>
    <title>Space 4 Art - Registration</title>
</svelte:head>

<div class="flex flex-col items-center h-full w-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="background-image: url('{backgroundImage}');">
	<div>
		<h1 class="font-bold text-white text-red text-6xl py-4">Sign Up</h1>
	</div>
	<div class="bg-[#76448A] rounded-lg shadow-2xl p-10 w-1/4">
		<form class="flex flex-col gap-0" method="post" use:enhance>
			<FormInput label="Username" name="username"/>
			<FormInput label="Password" name="password" password={true}/>
			<FormInput label="Confirm password" name="confirm_password" password={true}/>
			<input name="visit" bind:value={visit} class="hidden"/>
			<div class="mt-2 text-blue-400 underline">
				<a href="/login?v={visit}">Already got an account?</a>
			</div>
			{#if form?.message}<p class="text-red-500 text-center">{form?.message}</p>{/if}
			<button class="self-center p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition">Create account</button>
		</form>
	</div>
</div>
