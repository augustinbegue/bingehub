import{S as pe,i as de,s as he,k as c,q as C,a as D,l as f,m as h,r as M,h as i,c as S,n as a,G as q,b as z,C as l,R as j,H as Y,D as x,U as ge,o as me,u as _e,y as ve,z as we,A as Ee,g as Le,d as Pe,B as Ae,F as ue}from"../chunks/index.1fbcc1c5.js";import{g as Z}from"../chunks/navigation.bf5ad0dd.js";import{p as Ie}from"../chunks/stores.6c0fa00a.js";import{c as be}from"../chunks/index.d363154b.js";function ce(o){let r,s;return{c(){r=c("span"),s=C(o[3]),this.h()},l(e){r=f(e,"SPAN",{class:!0});var t=h(r);s=M(t,o[3]),t.forEach(i),this.h()},h(){a(r,"class","label-text-alt text-error")},m(e,t){z(e,r,t),l(r,s)},p(e,t){t&8&&_e(s,e[3])},d(e){e&&i(r)}}}function fe(o){let r,s;return{c(){r=c("span"),s=C(o[2]),this.h()},l(e){r=f(e,"SPAN",{class:!0});var t=h(r);s=M(t,o[2]),t.forEach(i),this.h()},h(){a(r,"class","label-text-alt text-error")},m(e,t){z(e,r,t),l(r,s)},p(e,t){t&4&&_e(s,e[2])},d(e){e&&i(r)}}}function Ue(o){let r,s,e,t,n,u,m,T,p,O,E,P,g,L,N,G,H,v,J,A,W,I,U,K,k,y,Q,X,$,_=o[3]&&ce(o),b=o[2]&&fe(o);return{c(){r=c("div"),s=c("div"),e=c("form"),t=c("div"),n=c("label"),u=c("span"),m=C("Username"),T=D(),p=c("input"),O=D(),E=c("label"),_&&_.c(),P=D(),g=c("div"),L=c("label"),N=c("span"),G=C("Password"),H=D(),v=c("input"),J=D(),A=c("label"),b&&b.c(),W=D(),I=c("div"),U=c("input"),K=D(),k=c("label"),y=c("a"),Q=C("Forgot password?"),this.h()},l(d){r=f(d,"DIV",{class:!0});var w=h(r);s=f(w,"DIV",{class:!0});var ee=h(s);e=f(ee,"FORM",{});var V=h(e);t=f(V,"DIV",{class:!0});var B=h(t);n=f(B,"LABEL",{class:!0,for:!0});var se=h(n);u=f(se,"SPAN",{class:!0});var re=h(u);m=M(re,"Username"),re.forEach(i),se.forEach(i),T=S(B),p=f(B,"INPUT",{id:!0,type:!0,placeholder:!0,class:!0}),O=S(B),E=f(B,"LABEL",{for:!0,class:!0});var te=h(E);_&&_.l(te),te.forEach(i),B.forEach(i),P=S(V),g=f(V,"DIV",{class:!0});var F=h(g);L=f(F,"LABEL",{class:!0,for:!0});var ae=h(L);N=f(ae,"SPAN",{class:!0});var le=h(N);G=M(le,"Password"),le.forEach(i),ae.forEach(i),H=S(F),v=f(F,"INPUT",{id:!0,type:!0,placeholder:!0,class:!0}),J=S(F),A=f(F,"LABEL",{for:!0,class:!0});var oe=h(A);b&&b.l(oe),oe.forEach(i),F.forEach(i),W=S(V),I=f(V,"DIV",{class:!0});var R=h(I);U=f(R,"INPUT",{type:!0,class:!0}),K=S(R),k=f(R,"LABEL",{class:!0,for:!0});var ne=h(k);y=f(ne,"A",{href:!0,class:!0});var ie=h(y);Q=M(ie,"Forgot password?"),ie.forEach(i),ne.forEach(i),R.forEach(i),V.forEach(i),ee.forEach(i),w.forEach(i),this.h()},h(){a(u,"class","label-text"),a(n,"class","label"),a(n,"for","username"),a(p,"id","username"),a(p,"type","username"),a(p,"placeholder","username"),a(p,"class","input input-bordered"),q(p,"input-error",o[3]),a(E,"for","username"),a(E,"class","label"),a(t,"class","form-control"),a(N,"class","label-text"),a(L,"class","label"),a(L,"for","password"),a(v,"id","password"),a(v,"type","password"),a(v,"placeholder","password"),a(v,"class","input input-bordered"),q(v,"input-error",o[2]),a(A,"for","password"),a(A,"class","label"),a(g,"class","form-control"),a(U,"type","submit"),a(U,"class","btn btn-primary"),U.value="Login",q(U,"loading",o[4]),a(y,"href","#"),a(y,"class","label-text-alt link link-hover"),a(k,"class","label"),a(k,"for","submit"),a(I,"class","form-control mt-6"),a(s,"class","card-body"),a(r,"class","card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200")},m(d,w){z(d,r,w),l(r,s),l(s,e),l(e,t),l(t,n),l(n,u),l(u,m),l(t,T),l(t,p),j(p,o[0]),l(t,O),l(t,E),_&&_.m(E,null),l(e,P),l(e,g),l(g,L),l(L,N),l(N,G),l(g,H),l(g,v),j(v,o[1]),l(g,J),l(g,A),b&&b.m(A,null),l(e,W),l(e,I),l(I,U),l(I,K),l(I,k),l(k,y),l(y,Q),X||($=[Y(p,"input",o[7]),Y(v,"input",o[8]),Y(e,"submit",o[5])],X=!0)},p(d,[w]){w&1&&j(p,d[0]),w&8&&q(p,"input-error",d[3]),d[3]?_?_.p(d,w):(_=ce(d),_.c(),_.m(E,null)):_&&(_.d(1),_=null),w&2&&v.value!==d[1]&&j(v,d[1]),w&4&&q(v,"input-error",d[2]),d[2]?b?b.p(d,w):(b=fe(d),b.c(),b.m(A,null)):b&&(b.d(1),b=null),w&16&&q(U,"loading",d[4])},i:x,o:x,d(d){d&&i(r),_&&_.d(),b&&b.d(),X=!1,ge($)}}}function ke(o,r,s){let e,t,n,u,m=!1;async function T(P){if(P.preventDefault(),s(3,u=""),s(2,n=""),!e){s(3,u="Username is required.");return}if(!t){s(2,n="Password is required.");return}s(4,m=!0);const g=await fetch("/api/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})});if(g.status===401){s(2,n="Invalid username or password."),p("error");return}if(g.status!==200){s(2,n="Something went wrong."),p("error");return}const{user:L}=await g.json();L&&(be.set(L),p("success"))}let{onLogin:p}=r;me(()=>{s(3,u=""),s(2,n=""),s(4,m=!1)});function O(){e=this.value,s(0,e)}function E(){t=this.value,s(1,t)}return o.$$set=P=>{"onLogin"in P&&s(6,p=P.onLogin)},[e,t,n,u,m,T,p,O,E]}class ye extends pe{constructor(r){super(),de(this,r,ke,Ue,he,{onLogin:6})}}function De(o){let r,s,e,t;return e=new ye({props:{onLogin:o[0]}}),{c(){r=c("div"),s=c("div"),ve(e.$$.fragment),this.h()},l(n){r=f(n,"DIV",{class:!0});var u=h(r);s=f(u,"DIV",{class:!0});var m=h(s);we(e.$$.fragment,m),m.forEach(i),u.forEach(i),this.h()},h(){a(s,"class","hero-content flex-col lg:flex-row-reverse"),a(r,"class","hero h-full grow")},m(n,u){z(n,r,u),l(r,s),Ee(e,s,null),t=!0},p:x,i(n){t||(Le(e.$$.fragment,n),t=!0)},o(n){Pe(e.$$.fragment,n),t=!1},d(n){n&&i(r),Ae(e)}}}function Se(o,r,s){let e,t;ue(o,be,m=>s(2,e=m)),ue(o,Ie,m=>s(3,t=m));function n(m){switch(m){case"success":u?Z(u):Z("/");break}}let u;return me(()=>{u=t.url.searchParams.get("redirect"),e&&Z(u||"/")}),[n]}class qe extends pe{constructor(r){super(),de(this,r,Se,De,he,{})}}export{qe as default};
