function k(){}const X=t=>t;function T(t,e){for(const n in e)t[n]=e[n];return t}function q(t){return t()}function Y(){return Object.create(null)}function H(t){t.forEach(q)}function L(t){return typeof t=="function"}function Z(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let h;function $(t,e){return h||(h=document.createElement("a")),h.href=e,t===h.href}function tt(t){return Object.keys(t).length===0}function M(t,...e){if(t==null){for(const i of e)i(void 0);return k}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function et(t,e,n){t.$$.on_destroy.push(M(e,n))}function nt(t,e,n,i){if(t){const r=A(t,e,n,i);return t[0](r)}}function A(t,e,n,i){return t[1]&&i?T(n.ctx.slice(),t[1](i(e))):n.ctx}function it(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(e.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=e.dirty[s]|r[s];return o}return e.dirty|r}return e.dirty}function rt(t,e,n,i,r,o){if(r){const c=A(e,n,i,o);t.p(c,r)}}function ct(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function lt(t){return t&&L(t.destroy)?t.destroy:k}function st(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let m=!1;function ot(){m=!0}function ut(){m=!1}function P(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function B(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&l.push(a)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:P(1,r,j=>e[n[j]].claim_order,u))-1;i[l]=n[a]+1;const E=a+1;n[E]=l,r=Math.max(E,r)}const o=[],c=[];let s=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(o.push(e[l-1]);s>=l;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);o.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<o.length&&c[l].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(c[l],a)}}function O(t,e){t.appendChild(e)}function R(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function at(t){const e=C("style");return e.textContent="/* empty */",F(R(t),e),e.sheet}function F(t,e){return O(t.head||t,e),e.sheet}function z(t,e){if(m){for(B(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ft(t,e,n){m&&!n?z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function _t(t){t.parentNode&&t.parentNode.removeChild(t)}function dt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function C(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function ht(){return x(" ")}function pt(){return x("")}function mt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function yt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function bt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function gt(t){return t.dataset.svelteH}function xt(t){return Array.from(t.childNodes)}function I(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){I(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function W(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];n[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(e))}function vt(t,e,n){return W(t,e,n,C)}function G(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>x(e),!0)}function Et(t){return G(t," ")}function Nt(t,e){e=""+e,t.data!==e&&(t.data=e)}function wt(t,e){t.value=e??""}function kt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function At(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Ct(t){const e=t.querySelector(":checked");return e&&e.__value}function Dt(t,e,n){t.classList.toggle(e,!!n)}function J(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function St(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function jt(t,e){return new t(e)}let p;function y(t){p=t}function v(){if(!p)throw new Error("Function called outside component initialization");return p}function Tt(t){v().$$.on_mount.push(t)}function qt(t){v().$$.after_update.push(t)}function Ht(){const t=v();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=J(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}const d=[],N=[];let _=[];const w=[],S=Promise.resolve();let g=!1;function K(){g||(g=!0,S.then(U))}function Lt(){return K(),S}function Q(t){_.push(t)}const b=new Set;let f=0;function U(){if(f!==0)return;const t=p;do{try{for(;f<d.length;){const e=d[f];f++,y(e),V(e.$$)}}catch(e){throw d.length=0,f=0,e}for(y(null),d.length=0,f=0;N.length;)N.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];b.has(n)||(b.add(n),n())}_.length=0}while(d.length);for(;w.length;)w.pop()();g=!1,b.clear(),y(t)}function V(t){if(t.fragment!==null){t.update(),H(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Q)}}function Mt(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{y as $,st as A,Q as B,gt as C,Dt as D,St as E,$ as F,dt as G,T as H,lt as I,X as J,L as K,Ht as L,mt as M,yt as N,H as O,Ct as P,At as Q,wt as R,M as S,R as T,at as U,J as V,Y as W,U as X,tt as Y,Mt as Z,p as _,ht as a,q as a0,d as a1,K as a2,ot as a3,ut as a4,qt as b,Et as c,_t as d,pt as e,C as f,vt as g,xt as h,ft as i,bt as j,kt as k,x as l,G as m,Nt as n,Tt as o,N as p,jt as q,nt as r,Z as s,Lt as t,rt as u,ct as v,it as w,et as x,z as y,k as z};