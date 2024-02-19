<script lang="ts">
	import { enhance } from "$app/forms";
	
	import FormInput from "$lib/components/FormInput.svelte";
    import backgroundImage from '$lib/assets/art hub.png';

	export let form;
</script>


<div class="flex flex-col items-center w-full h-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="background-image: url('{backgroundImage}');">
	<div>
		<h1 class="font-bold text-white text-6xl py-4">Sign in</h1>
	</div>
	<div class=" bg-[#76448A] rounded-lg shadow-2xl p-10 w-1/4">
		<form class="flex flex-col" method="post" use:enhance>
			<FormInput label="Username" name="username"/>
			<FormInput label="Password" name="password" password={true}/>
			{#if form?.message}<p class="text-red-500 text-center">{form?.message}</p>{/if}
			<div class="mt-2 text-blue-400 underline flex justify-between">
				<a href="/signup">Create new account</a>
				<a href="/signup">Forgot password</a>
			</div>
			<button class="self-center p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition">Continue</button>
		</form>
	</div>
</div>
