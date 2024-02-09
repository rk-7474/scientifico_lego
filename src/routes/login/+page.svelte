<script lang="ts">
	import { enhance } from "$app/forms";
</script>


<div class="w-full h-full">
	<div class="flex flex-col items-center h-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="background-image: url(/src/routes/img/arthub.png);">
		<div>
			<h1 class="font-bold text-white text-6xl py-4">Sign in</h1>
		</div>
		<div class=" bg-[#76448A] rounded-lg shadow-2xl p-10">
			<form class="text-center" method="post" use:enhance>
				<label class=" text-white px-2" for="username">Username</label>
				<input class="my-2 outline-none rounded shadow-lg p-1" name="username" id="username" /><br />
				<label class="text-white px-2" for="password">Password</label>
				<input class="my-2 outline-none rounded shadow-lg p-1" type="password" name="password" id="password" /><br />
				<button class="p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition">Continue</button>
			</form>
		</div>
	</div>
</div>
