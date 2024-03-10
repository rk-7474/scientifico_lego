import { c as create_ssr_component, e as escape, b as add_attribute } from './ssr-oU8yitx9.js';

const backgroundImage = "/_app/immutable/assets/sfondo.MlwY1Tyx.png";
const FormInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { password = false } = $$props;
  let { name } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<label class="text-white px-2" for="username">${escape(label)}</label> <input class="my-2 outline-none rounded shadow-lg p-1"${add_attribute("name", name, 0)}${add_attribute("type", password ? "password" : "text", 0)}${add_attribute("id", name, 0)}>`;
});

export { FormInput as F, backgroundImage as b };
//# sourceMappingURL=FormInput-vSKyEeP2.js.map
