import{A as N,s as w,e as j,i as C,z as G,d as _,x as z,r as L,f as $,g as v,h as b,u as B,v as M,w as O,B as H,a as V,C as I,c as S,j as m,D as U,y as g}from"../chunks/scheduler.e4fe527f.js";import{S as P,i as R,g as J,t as k,c as K,a as A,f as Q,b as T,d as W,m as X,e as Y}from"../chunks/index.bdfbb633.js";import{p as F}from"../chunks/stores.f8473358.js";import{c as Z}from"../chunks/index.40b40403.js";import"../chunks/firebase.bfe19b46.js";function tt(r,{delay:s=0,duration:a=400,easing:n=Z,x:o=0,y:e=0,opacity:t=0}={}){const u=getComputedStyle(r),d=+u.opacity,c=u.transform==="none"?"":u.transform,E=d*(1-t),[y,p]=N(o),[h,l]=N(e);return{delay:s,duration:a,easing:n,css:(i,f)=>`
			transform: ${c} translate(${(1-i)*y}${p}, ${(1-i)*h}${l});
			opacity: ${d-E*f}`}}function q(r){let s,a,n;const o=r[2].default,e=L(o,r,r[1],null);return{c(){s=$("div"),e&&e.c()},l(t){s=v(t,"DIV",{});var u=b(s);e&&e.l(u),u.forEach(_)},m(t,u){C(t,s,u),e&&e.m(s,null),n=!0},p(t,u){e&&e.p&&(!n||u&2)&&B(e,o,t,t[1],n?O(o,t[1],u,null):M(t[1]),null)},i(t){n||(A(e,t),t&&(a||H(()=>{a=Q(s,tt,{x:"100%",duration:500}),a.start()})),n=!0)},o(t){k(e,t),n=!1},d(t){t&&_(s),e&&e.d(t)}}}function et(r){let s=r[0].url,a,n,o=q(r);return{c(){o.c(),a=j()},l(e){o.l(e),a=j()},m(e,t){o.m(e,t),C(e,a,t),n=!0},p(e,[t]){t&1&&w(s,s=e[0].url)?(J(),k(o,1,1,G),K(),o=q(e),o.c(),A(o,1),o.m(a.parentNode,a)):o.p(e,t)},i(e){n||(A(o),n=!0)},o(e){k(o),n=!1},d(e){e&&_(a),o.d(e)}}}function st(r,s,a){let n;z(r,F,t=>a(0,n=t));let{$$slots:o={},$$scope:e}=s;return r.$$set=t=>{"$$scope"in t&&a(1,e=t.$$scope)},[n,e,o]}class at extends P{constructor(s){super(),R(this,s,st,et,w,{})}}function nt(r){let s,a,n;const o=r[1].default,e=L(o,r,r[2],null);return{c(){s=$("main"),a=$("div"),e&&e.c(),this.h()},l(t){s=v(t,"MAIN",{class:!0});var u=b(s);a=v(u,"DIV",{class:!0});var d=b(a);e&&e.l(d),d.forEach(_),u.forEach(_),this.h()},h(){m(a,"class","card-body items-center text-center"),m(s,"class","card w-4/6 bg-neutral text-neutral-content mx-auto")},m(t,u){C(t,s,u),g(s,a),e&&e.m(a,null),n=!0},p(t,u){e&&e.p&&(!n||u&4)&&B(e,o,t,t[2],n?O(o,t[2],u,null):M(t[2]),null)},i(t){n||(A(e,t),n=!0)},o(t){k(e,t),n=!1},d(t){t&&_(s),e&&e.d(t)}}}function ot(r){let s,a,n,o="Sign In",e,t,u="Choose Username",d,c,E="Upload Photo",y,p,h;return p=new at({props:{$$slots:{default:[nt]},$$scope:{ctx:r}}}),{c(){s=$("nav"),a=$("ul"),n=$("a"),n.textContent=o,e=V(),t=$("a"),t.textContent=u,d=V(),c=$("a"),c.textContent=E,y=V(),T(p.$$.fragment),this.h()},l(l){s=v(l,"NAV",{class:!0});var i=b(s);a=v(i,"UL",{class:!0});var f=b(a);n=v(f,"A",{href:!0,class:!0,["data-svelte-h"]:!0}),I(n)!=="svelte-11fzqtd"&&(n.textContent=o),e=S(f),t=v(f,"A",{href:!0,class:!0,["data-svelte-h"]:!0}),I(t)!=="svelte-1gal1u9"&&(t.textContent=u),d=S(f),c=v(f,"A",{href:!0,class:!0,["data-svelte-h"]:!0}),I(c)!=="svelte-cnlpt6"&&(c.textContent=E),f.forEach(_),i.forEach(_),y=S(l),W(p.$$.fragment,l),this.h()},h(){var l,i;m(n,"href","/signup"),m(n,"class","step step-primary"),m(t,"href","/signup/username"),m(t,"class","step"),U(t,"step-primary",(l=r[0].route.id)==null?void 0:l.match(/username|photo/g)),m(c,"href","/signup/photo"),m(c,"class","step"),U(c,"step-primary",(i=r[0].route.id)==null?void 0:i.includes("photo")),m(a,"class","steps"),m(s,"class","flex justify-center my-6")},m(l,i){C(l,s,i),g(s,a),g(a,n),g(a,e),g(a,t),g(a,d),g(a,c),C(l,y,i),X(p,l,i),h=!0},p(l,[i]){var x,D;(!h||i&1)&&U(t,"step-primary",(x=l[0].route.id)==null?void 0:x.match(/username|photo/g)),(!h||i&1)&&U(c,"step-primary",(D=l[0].route.id)==null?void 0:D.includes("photo"));const f={};i&4&&(f.$$scope={dirty:i,ctx:l}),p.$set(f)},i(l){h||(A(p.$$.fragment,l),h=!0)},o(l){k(p.$$.fragment,l),h=!1},d(l){l&&(_(s),_(y)),Y(p,l)}}}function rt(r,s,a){let n;z(r,F,t=>a(0,n=t));let{$$slots:o={},$$scope:e}=s;return r.$$set=t=>{"$$scope"in t&&a(2,e=t.$$scope)},[n,o,e]}class pt extends P{constructor(s){super(),R(this,s,rt,ot,w,{})}}export{pt as component};