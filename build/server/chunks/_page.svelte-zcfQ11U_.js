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
  return `${$$result.head += `<!-- HEAD_svelte-tds5bi_START -->${$$result.title = `<title>Space 4 Art - Registration</title>`, ""}<!-- HEAD_svelte-tds5bi_END -->`, ""} <div class="flex flex-col items-center h-full w-full justify-center bg-cover bg-no-repeat bg-indigo-950" style="${"background-image: url('" + escape(backgroundImage, true) + "');"}"><div data-svelte-h="svelte-12uc2i8"><h1 class="font-bold text-white text-red text-6xl py-4">Sign Up</h1></div> <div class="bg-[#76448A] rounded-lg shadow-2xl p-10 w-1/4"><form class="flex flex-col gap-0" method="post">${validate_component(FormInput, "FormInput").$$render($$result, { label: "Username", name: "username" }, {}, {})} ${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      label: "Password",
      name: "password",
      password: true
    },
    {},
    {}
  )} ${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      label: "Confirm password",
      name: "confirm_password",
      password: true
    },
    {},
    {}
  )} <input name="visit" class="hidden"${add_attribute("value", visit, 0)}> <div class="mt-2 text-blue-400 underline"><a href="${"/login?v=" + escape(visit, true)}">Already got an account?</a></div> ${form?.message ? `<p class="text-red-500 text-center">${escape(form?.message)}</p>` : ``} <button class="self-center p-2 mt-5 mb-0 rounded-lg border-solid border-2 border-white text-white hover:bg-white hover:text-black hover:drop-shadow-2xl hover:scale-110 transition" data-svelte-h="svelte-1kycw6o">Create account</button></form></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-zcfQ11U_.js.map
