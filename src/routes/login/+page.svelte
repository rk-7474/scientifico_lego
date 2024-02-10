<script lang="ts">
	import { enhance } from "$app/forms";
	
	import FormInput from "$lib/components/FormInput.svelte";
</script>


<div class="w-full h-full">
	<div class="flex flex-col items-center h-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="background-image: url(/src/routes/img/arthub.png);">
		<div>
			<h1 class="font-bold text-white text-6xl py-4">Sign in</h1>
		</div>
		<div class=" bg-[#76448A] rounded-lg shadow-2xl p-10 w-1/4">
			<form class="flex flex-col" method="post" use:enhance>
				<FormInput label="Username" name="username"/>
				<FormInput label="Password" name="password" password={true}/>
				<div class="mt-2 text-blue-400 underline flex justify-between">
					<a href="/signup">Create new account</a>
					<a href="/signup">Forgot password</a>
				</div>
				<button class="self-center p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition">Continue</button>
			</form>
		</div>
	</div>
</div>
Login