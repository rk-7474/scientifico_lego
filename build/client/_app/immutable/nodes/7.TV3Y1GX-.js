import{s as U,a as V,n as F}from"../chunks/2.0OfY4fVd.js";import{S as z,i as G,e as v,s as x,c as E,a as b,m as H,f as C,d,o as y,g as R,h as i,y as J,t as k,b as S,j as q}from"../chunks/index.rEPfTm2O.js";import{e as I}from"../chunks/each.6w4Ej4nR.js";import{e as K}from"../chunks/forms._kcyD7rx.js";function M(f,e,n){const r=f.slice();return r[1]=e[n],r}function N(f){let e,n,r=f[1].name+"",c,u,_,h=f[1].state+"",a,l,o,t=f[1].description+"",p,O,g,T,P,j;return{c(){e=v("div"),n=v("p"),c=k(r),u=x(),_=v("p"),a=k(h),l=x(),o=v("p"),p=k(t),O=x(),g=v("a"),T=k("manage"),j=x(),this.h()},l(m){e=E(m,"DIV",{class:!0});var s=b(e);n=E(s,"P",{});var w=b(n);c=S(w,r),w.forEach(d),u=C(s),_=E(s,"P",{});var A=b(_);a=S(A,h),A.forEach(d),l=C(s),o=E(s,"P",{});var B=b(o);p=S(B,t),B.forEach(d),O=C(s),g=E(s,"A",{href:!0});var D=b(g);T=S(D,"manage"),D.forEach(d),j=C(s),s.forEach(d),this.h()},h(){y(g,"href",P="/manage/"+f[1].uuid),y(e,"class","flex flex-row gap-4")},m(m,s){R(m,e,s),i(e,n),i(n,c),i(e,u),i(e,_),i(_,a),i(e,l),i(e,o),i(o,p),i(e,O),i(e,g),i(g,T),i(e,j)},p(m,s){s&1&&r!==(r=m[1].name+"")&&q(c,r),s&1&&h!==(h=m[1].state+"")&&q(a,h),s&1&&t!==(t=m[1].description+"")&&q(p,t),s&1&&P!==(P="/manage/"+m[1].uuid)&&y(g,"href",P)},d(m){m&&d(e)}}}function L(f){let e,n,r="Sign out",c,u,_,h=I(f[0].rooms),a=[];for(let l=0;l<h.length;l+=1)a[l]=N(M(f,h,l));return{c(){e=v("form"),n=v("button"),n.textContent=r,c=x();for(let l=0;l<a.length;l+=1)a[l].c();this.h()},l(l){e=E(l,"FORM",{method:!0});var o=b(e);n=E(o,"BUTTON",{"data-svelte-h":!0}),H(n)!=="svelte-2si3cn"&&(n.textContent=r),c=C(o);for(let t=0;t<a.length;t+=1)a[t].l(o);o.forEach(d),this.h()},h(){y(e,"method","post")},m(l,o){R(l,e,o),i(e,n),i(e,c);for(let t=0;t<a.length;t+=1)a[t]&&a[t].m(e,null);u||(_=V(K.call(null,e)),u=!0)},p(l,[o]){if(o&1){h=I(l[0].rooms);let t;for(t=0;t<h.length;t+=1){const p=M(l,h,t);a[t]?a[t].p(p,o):(a[t]=N(p),a[t].c(),a[t].m(e,null))}for(;t<a.length;t+=1)a[t].d(1);a.length=h.length}},i:F,o:F,d(l){l&&d(e),J(a,l),u=!1,_()}}}function Q(f,e,n){let{data:r}=e;return f.$$set=c=>{"data"in c&&n(0,r=c.data)},[r]}class $ extends z{constructor(e){super(),G(this,e,Q,L,U,{data:0})}}export{$ as component};
