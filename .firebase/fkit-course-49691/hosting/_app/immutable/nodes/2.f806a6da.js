import{Q as z,s as j,e as H,i as D,P as T,d as f,z as O,v as Q,f as g,g as y,h as b,w as R,x as B,y as F,H as W,l as L,a as P,m as S,c as N,j as u,L as m}from"../chunks/scheduler.300f34fd.js";import{S as G,i as J,g as X,t as I,c as Y,a as w,h as Z,b as x,d as ee,m as te,e as ae}from"../chunks/index.93d9ee7e.js";import{p as K}from"../chunks/stores.466fe76a.js";import{t as se,v}from"../chunks/index.72792d10.js";function oe(r,{delay:a=0,duration:s=400,easing:o=se,x:n=0,y:t=0,opacity:e=0}={}){const l=getComputedStyle(r),_=+l.opacity,E=l.transform==="none"?"":l.transform,p=_*(1-e),[A,k]=z(n),[U,d]=z(t);return{delay:a,duration:s,easing:o,css:(h,i)=>`
			transform: ${E} translate(${(1-h)*A}${k}, ${(1-h)*U}${d});
			opacity: ${_-p*i}`}}function M(r){let a,s,o;const n=r[2].default,t=Q(n,r,r[1],null);return{c(){a=g("div"),t&&t.c()},l(e){a=y(e,"DIV",{});var l=b(a);t&&t.l(l),l.forEach(f)},m(e,l){D(e,a,l),t&&t.m(a,null),o=!0},p(e,l){t&&t.p&&(!o||l&2)&&R(t,n,e,e[1],o?F(n,e[1],l,null):B(e[1]),null)},i(e){o||(w(t,e),e&&(s||W(()=>{s=Z(a,oe,{x:"100%",duration:500}),s.start()})),o=!0)},o(e){I(t,e),o=!1},d(e){e&&f(a),t&&t.d(e)}}}function ne(r){let a=r[0].url,s,o,n=M(r);return{c(){n.c(),s=H()},l(t){n.l(t),s=H()},m(t,e){n.m(t,e),D(t,s,e),o=!0},p(t,[e]){e&1&&j(a,a=t[0].url)?(X(),I(n,1,1,T),Y(),n=M(t),n.c(),w(n,1),n.m(s.parentNode,s)):n.p(t,e)},i(t){o||(w(n),o=!0)},o(t){I(n),o=!1},d(t){t&&f(s),n.d(t)}}}function re(r,a,s){let o;O(r,K,e=>s(0,o=e));let{$$slots:n={},$$scope:t}=a;return r.$$set=e=>{"$$scope"in e&&s(1,t=e.$$scope)},[o,t,n]}class le extends G{constructor(a){super(),J(this,a,re,ne,j,{})}}function ie(r){let a,s,o;const n=r[1].default,t=Q(n,r,r[2],null);return{c(){a=g("main"),s=g("div"),t&&t.c(),this.h()},l(e){a=y(e,"MAIN",{class:!0});var l=b(a);s=y(l,"DIV",{class:!0});var _=b(s);t&&t.l(_),_.forEach(f),l.forEach(f),this.h()},h(){u(s,"class","items-center text-center"),u(a,"class","my-8")},m(e,l){D(e,a,l),m(a,s),t&&t.m(s,null),o=!0},p(e,l){t&&t.p&&(!o||l&4)&&R(t,n,e,e[2],o?F(n,e[2],l,null):B(e[2]),null)},i(e){o||(w(t,e),o=!0)},o(e){I(t,e),o=!1},d(e){e&&f(a),t&&t.d(e)}}}function ce(r){let a,s,o,n,t,e,l,_,E,p,A,k,U,d,h;return d=new le({props:{$$slots:{default:[ie]},$$scope:{ctx:r}}}),{c(){a=g("div"),s=g("ul"),o=g("a"),n=L("Create Account"),t=P(),e=g("a"),l=L("Choose Username"),E=P(),p=g("a"),A=L("Upload Photo"),U=P(),x(d.$$.fragment),this.h()},l(i){a=y(i,"DIV",{class:!0});var c=b(a);s=y(c,"UL",{class:!0});var $=b(s);o=y($,"A",{href:!0,class:!0});var C=b(o);n=S(C,"Create Account"),C.forEach(f),t=N($),e=y($,"A",{href:!0,class:!0});var V=b(e);l=S(V,"Choose Username"),V.forEach(f),E=N($),p=y($,"A",{href:!0,class:!0});var q=b(p);A=S(q,"Upload Photo"),q.forEach(f),$.forEach(f),U=N(c),ee(d.$$.fragment,c),c.forEach(f),this.h()},h(){var i,c;u(o,"href","/signup"),u(o,"class",v({variant:"secondary"})+""),u(e,"href","/signup/username"),u(e,"class",_=(i=r[0].route.id)!=null&&i.match(/username|photo/g)?v({variant:"secondary"}):v({variant:"outline"})),u(p,"href","/signup/photo"),u(p,"class",k=(c=r[0].route.id)!=null&&c.includes("photo")?v({variant:"secondary"}):v({variant:"outline"})),u(s,"class","mt-8"),u(a,"class","max-w-md mx-auto")},m(i,c){D(i,a,c),m(a,s),m(s,o),m(o,n),m(s,t),m(s,e),m(e,l),m(s,E),m(s,p),m(p,A),m(a,U),te(d,a,null),h=!0},p(i,[c]){var C,V;(!h||c&1&&_!==(_=(C=i[0].route.id)!=null&&C.match(/username|photo/g)?v({variant:"secondary"}):v({variant:"outline"})))&&u(e,"class",_),(!h||c&1&&k!==(k=(V=i[0].route.id)!=null&&V.includes("photo")?v({variant:"secondary"}):v({variant:"outline"})))&&u(p,"class",k);const $={};c&4&&($.$$scope={dirty:c,ctx:i}),d.$set($)},i(i){h||(w(d.$$.fragment,i),h=!0)},o(i){I(d.$$.fragment,i),h=!1},d(i){i&&f(a),ae(d)}}}function ue(r,a,s){let o;O(r,K,e=>s(0,o=e));let{$$slots:n={},$$scope:t}=a;return r.$$set=e=>{"$$scope"in e&&s(2,t=e.$$scope)},[o,n,t]}class de extends G{constructor(a){super(),J(this,a,ue,ce,j,{})}}export{de as component};