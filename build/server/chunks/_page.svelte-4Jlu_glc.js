import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, b as add_attribute } from './ssr-oU8yitx9.js';
import './client-_MkdHwD5.js';
import { b as backgroundImage, F as FormInput } from './FormInput-vSKyEeP2.js';
import { p as page } from './stores-KoGkxyKy.js';
import './exports-mq_1S73-.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let visit = $page.url.searchParams.get("v");
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1pmkiqk_START -->${$$result.title = `<title>Space 4 Art - Login</title>`, ""}<!-- HEAD_svelte-1pmkiqk_END -->`, ""} <div class="flex flex-col items-center w-full h-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="${"background-image: url('" + escape(backgroundImage, true) + "');"}"><div data-svelte-h="svelte-11v2al3"><h1 class="font-bold text-white text-6xl py-4">Sign in</h1></div> <div class="bg-[#76448A] rounded-lg shadow-2xl p-10 w-1/4"><form class="flex flex-col" method="post">${validate_component(FormInput, "FormInput").$$render($$result, { label: "Username", name: "username" }, {}, {})} ${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      label: "Password",
      name: "password",
      password: true
    },
    {},
    {}
  )} ${form?.message ? `<p class="text-red-500 text-center">${escape(form?.message)}</p>` : ``} <div class="mt-2 text-blue-400 underline flex justify-between"><a${add_attribute("href", visit ? "/signup?v=" + visit : "/signup", 0)}>Create new account</a> <a href="/signup" data-svelte-h="svelte-aqvec5">Forgot password</a></div> <input name="visit" class="hidden"${add_attribute("value", visit, 0)}> <button class="self-center p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition" data-svelte-h="svelte-12ep5a2">Continue</button></form></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4Jlu_glc.js.map
