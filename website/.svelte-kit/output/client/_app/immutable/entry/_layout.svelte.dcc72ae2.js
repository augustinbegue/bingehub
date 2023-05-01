import{S as Q,i as W,s as X,k as h,l as d,m as _,h as n,n as m,b as U,C as l,D as z,E as ve,F as J,a as L,c as N,G as P,H as me,q,r as x,I as pe,u as be,J as ge,y as Y,z as Z,A as ee,K as Ee,L as $e,M as ke,g as C,d as j,B as te,o as we}from"../chunks/index.c7fa5583.js";import{p as ye}from"../chunks/stores.1249a1df.js";import{a as ie}from"../chunks/alerter.a508b1c7.js";import{c as K}from"../chunks/index.5201c2eb.js";import{h as Ie}from"../chunks/utils.0deb44f8.js";function oe(r,e,t){const s=r.slice();return s[2]=e[t],s[4]=t,s}function ce(r){let e;return{c(){e=h("i"),this.h()},l(t){e=d(t,"I",{class:!0}),_(e).forEach(n),this.h()},h(){m(e,"class","fas fa-info-circle")},m(t,s){U(t,e,s)},d(t){t&&n(e)}}}function fe(r){let e;return{c(){e=h("i"),this.h()},l(t){e=d(t,"I",{class:!0}),_(e).forEach(n),this.h()},h(){m(e,"class","fas fa-check-circle")},m(t,s){U(t,e,s)},d(t){t&&n(e)}}}function ue(r){let e;return{c(){e=h("i"),this.h()},l(t){e=d(t,"I",{class:!0}),_(e).forEach(n),this.h()},h(){m(e,"class","fas fa-exclamation-circle")},m(t,s){U(t,e,s)},d(t){t&&n(e)}}}function he(r){let e;return{c(){e=h("i"),this.h()},l(t){e=d(t,"I",{class:!0}),_(e).forEach(n),this.h()},h(){m(e,"class","fas fa-exclamation-triangle")},m(t,s){U(t,e,s)},d(t){t&&n(e)}}}function de(r){let e,t,s,a,o,p,i,c=r[2].message+"",A,y,b,f,g,D,B,$=r[2].type==="info"&&ce(),k=r[2].type==="success"&&fe(),S=r[2].type==="warning"&&ue(),u=r[2].type==="error"&&he();function I(){return r[1](r[4])}return{c(){e=h("div"),t=h("div"),$&&$.c(),s=L(),k&&k.c(),a=L(),S&&S.c(),o=L(),u&&u.c(),p=L(),i=h("span"),A=L(),y=h("div"),b=h("button"),f=h("i"),g=L(),this.h()},l(w){e=d(w,"DIV",{class:!0});var v=_(e);t=d(v,"DIV",{});var E=_(t);$&&$.l(E),s=N(E),k&&k.l(E),a=N(E),S&&S.l(E),o=N(E),u&&u.l(E),p=N(E),i=d(E,"SPAN",{});var O=_(i);O.forEach(n),E.forEach(n),A=N(v),y=d(v,"DIV",{class:!0});var V=_(y);b=d(V,"BUTTON",{class:!0});var T=_(b);f=d(T,"I",{class:!0}),_(f).forEach(n),T.forEach(n),V.forEach(n),g=N(v),v.forEach(n),this.h()},h(){m(f,"class","fas fa-times"),m(b,"class","btn btn-sm btn-ghost btn-primary"),m(y,"class","flex-none"),m(e,"class","alert shadow-lg m-2"),P(e,"alert-info",r[2].type==="info"),P(e,"alert-success",r[2].type==="success"),P(e,"alert-warning",r[2].type==="warning"),P(e,"alert-error",r[2].type==="error")},m(w,v){U(w,e,v),l(e,t),$&&$.m(t,null),l(t,s),k&&k.m(t,null),l(t,a),S&&S.m(t,null),l(t,o),u&&u.m(t,null),l(t,p),l(t,i),i.innerHTML=c,l(e,A),l(e,y),l(y,b),l(b,f),l(e,g),D||(B=me(b,"click",I),D=!0)},p(w,v){r=w,r[2].type==="info"?$||($=ce(),$.c(),$.m(t,s)):$&&($.d(1),$=null),r[2].type==="success"?k||(k=fe(),k.c(),k.m(t,a)):k&&(k.d(1),k=null),r[2].type==="warning"?S||(S=ue(),S.c(),S.m(t,o)):S&&(S.d(1),S=null),r[2].type==="error"?u||(u=he(),u.c(),u.m(t,p)):u&&(u.d(1),u=null),v&1&&c!==(c=r[2].message+"")&&(i.innerHTML=c),v&1&&P(e,"alert-info",r[2].type==="info"),v&1&&P(e,"alert-success",r[2].type==="success"),v&1&&P(e,"alert-warning",r[2].type==="warning"),v&1&&P(e,"alert-error",r[2].type==="error")},d(w){w&&n(e),$&&$.d(),k&&k.d(),S&&S.d(),u&&u.d(),D=!1,B()}}}function Ae(r){let e,t,s=r[0],a=[];for(let o=0;o<s.length;o+=1)a[o]=de(oe(r,s,o));return{c(){e=h("div"),t=h("div");for(let o=0;o<a.length;o+=1)a[o].c();this.h()},l(o){e=d(o,"DIV",{class:!0});var p=_(e);t=d(p,"DIV",{class:!0});var i=_(t);for(let c=0;c<a.length;c+=1)a[c].l(i);i.forEach(n),p.forEach(n),this.h()},h(){m(t,"class","container mx-auto"),m(e,"class","fixed bottom-0 p-4 w-full z-[1000]")},m(o,p){U(o,e,p),l(e,t);for(let i=0;i<a.length;i+=1)a[i]&&a[i].m(t,null)},p(o,[p]){if(p&1){s=o[0];let i;for(i=0;i<s.length;i+=1){const c=oe(o,s,i);a[i]?a[i].p(c,p):(a[i]=de(c),a[i].c(),a[i].m(t,null))}for(;i<a.length;i+=1)a[i].d(1);a.length=s.length}},i:z,o:z,d(o){o&&n(e),ve(a,o)}}}function Se(r,e,t){let s;return J(r,ie,o=>t(0,s=o)),[s,o=>{ie.update(p=>p.filter((i,c)=>c!==o))}]}class De extends Q{constructor(e){super(),W(this,e,Se,Ae,X,{})}}function Oe(r){let e,t,s,a,o,p,i,c,A,y,b,f,g,D,B,$,k,S;return{c(){e=h("footer"),t=h("a"),s=q("Augustin BÉGUÉ"),a=L(),o=h("div"),p=L(),i=h("div"),c=h("a"),A=h("span"),y=q("add"),b=L(),f=h("a"),g=h("span"),D=q("home"),B=L(),$=h("a"),k=h("span"),S=q("search"),this.h()},l(u){e=d(u,"FOOTER",{class:!0});var I=_(e);t=d(I,"A",{class:!0,href:!0});var w=_(t);s=x(w,"Augustin BÉGUÉ"),w.forEach(n),I.forEach(n),a=N(u),o=d(u,"DIV",{class:!0}),_(o).forEach(n),p=N(u),i=d(u,"DIV",{class:!0});var v=_(i);c=d(v,"A",{href:!0});var E=_(c);A=d(E,"SPAN",{class:!0});var O=_(A);y=x(O,"add"),O.forEach(n),E.forEach(n),b=N(v),f=d(v,"A",{href:!0});var V=_(f);g=d(V,"SPAN",{class:!0});var T=_(g);D=x(T,"home"),T.forEach(n),V.forEach(n),B=N(v),$=d(v,"A",{href:!0});var H=_($);k=d(H,"SPAN",{class:!0});var M=_(k);S=x(M,"search"),M.forEach(n),H.forEach(n),v.forEach(n),this.h()},h(){var u,I,w,v;m(t,"class","footer-title link link-hover m-0"),m(t,"href","https://begue.cc"),m(e,"class","hidden md:flex footer h-16 p-2 bg-base-300 flex-row items-center shrink-0"),m(o,"class","p-6 md:hidden"),m(A,"class","material-icons-outlined"),m(c,"href","/new"),P(c,"active",((u=r[0])==null?void 0:u.toString().indexOf("/new"))!=-1),m(g,"class","material-icons-outlined"),m(f,"href","/"),P(f,"active",((I=r[0])==null?void 0:I.toString().indexOf("/search"))===-1&&((w=r[0])==null?void 0:w.toString().indexOf("/new"))===-1),m(k,"class","material-icons-outlined"),m($,"href","/search"),P($,"active",((v=r[0])==null?void 0:v.toString().indexOf("/search"))!=-1),m(i,"class","z-50 btm-nav flex btm-nav-sm md:hidden")},m(u,I){U(u,e,I),l(e,t),l(t,s),U(u,a,I),U(u,o,I),U(u,p,I),U(u,i,I),l(i,c),l(c,A),l(A,y),l(i,b),l(i,f),l(f,g),l(g,D),l(i,B),l(i,$),l($,k),l(k,S)},p(u,[I]){var w,v,E,O;I&1&&P(c,"active",((w=u[0])==null?void 0:w.toString().indexOf("/new"))!=-1),I&1&&P(f,"active",((v=u[0])==null?void 0:v.toString().indexOf("/search"))===-1&&((E=u[0])==null?void 0:E.toString().indexOf("/new"))===-1),I&1&&P($,"active",((O=u[0])==null?void 0:O.toString().indexOf("/search"))!=-1)},i:z,o:z,d(u){u&&n(e),u&&n(a),u&&n(o),u&&n(p),u&&n(i)}}}function Ve(r,e,t){let{url:s}=e;return r.$$set=a=>{"url"in a&&t(0,s=a.url)},[s]}class Le extends Q{constructor(e){super(),W(this,e,Ve,Oe,X,{url:0})}}function Ne(r){let e,t;return{c(){e=h("a"),t=q("login"),this.h()},l(s){e=d(s,"A",{class:!0,href:!0});var a=_(e);t=x(a,"login"),a.forEach(n),this.h()},h(){m(e,"class","btn btn-ghost lowercase text-base font-bold"),m(e,"href","/auth/login")},m(s,a){U(s,e,a),l(e,t)},p:z,d(s){s&&n(e)}}}function Te(r){let e,t,s,a,o=r[0].username+"",p,i,c,A,y,b,f,g,D,B,$,k,S,u,I,w=r[1]&&_e();return{c(){e=h("div"),t=h("button"),s=h("span"),a=q("@"),p=q(o),i=L(),c=h("ul"),A=h("li"),y=h("a"),b=q("settings"),f=L(),w&&w.c(),g=L(),D=h("div"),B=L(),$=h("li"),k=h("button"),S=q("logout"),this.h()},l(v){e=d(v,"DIV",{class:!0});var E=_(e);t=d(E,"BUTTON",{tabindex:!0,class:!0});var O=_(t);s=d(O,"SPAN",{class:!0});var V=_(s);a=x(V,"@"),p=x(V,o),V.forEach(n),O.forEach(n),i=N(E),c=d(E,"UL",{class:!0});var T=_(c);A=d(T,"LI",{});var H=_(A);y=d(H,"A",{href:!0});var M=_(y);b=x(M,"settings"),M.forEach(n),H.forEach(n),f=N(T),w&&w.l(T),g=N(T),D=d(T,"DIV",{class:!0}),_(D).forEach(n),B=N(T),$=d(T,"LI",{});var F=_($);k=d(F,"BUTTON",{});var G=_(k);S=x(G,"logout"),G.forEach(n),F.forEach(n),T.forEach(n),E.forEach(n),this.h()},h(){m(s,"class","text-base"),m(t,"tabindex","0"),m(t,"class","btn lowercase"),m(y,"href","/settings"),m(D,"class","divider my-0 py-0"),m(c,"class","menu bg-base-200 dropdown-content p-2 shadow rounded-box w-52 mt-4"),m(e,"class","dropdown dropdown-end")},m(v,E){U(v,e,E),l(e,t),l(t,s),l(s,a),l(s,p),l(e,i),l(e,c),l(c,A),l(A,y),l(y,b),l(c,f),w&&w.m(c,null),l(c,g),l(c,D),l(c,B),l(c,$),l($,k),l(k,S),u||(I=me(k,"click",r[3]),u=!0)},p(v,E){E&1&&o!==(o=v[0].username+"")&&be(p,o),v[1]?w||(w=_e(),w.c(),w.m(c,g)):w&&(w.d(1),w=null)},d(v){v&&n(e),w&&w.d(),u=!1,I()}}}function _e(r){let e,t,s;return{c(){e=h("li"),t=h("a"),s=q("admin settings"),this.h()},l(a){e=d(a,"LI",{});var o=_(e);t=d(o,"A",{href:!0});var p=_(t);s=x(p,"admin settings"),p.forEach(n),o.forEach(n),this.h()},h(){m(t,"href","/admin")},m(a,o){U(a,e,o),l(e,t),l(t,s)},d(a){a&&n(e)}}}function Ue(r){let e,t,s,a,o,p,i,c,A,y,b,f,g,D,B,$,k,S,u,I;function w(O,V){return O[0]!=null?Te:Ne}let v=w(r),E=v(r);return{c(){e=h("header"),t=h("div"),s=h("a"),a=h("span"),o=q("Binge"),p=L(),i=h("span"),c=q("hub"),A=L(),y=h("div"),b=h("ul"),f=h("li"),g=h("a"),D=q("search"),B=L(),$=h("li"),k=h("a"),S=q("requests"),u=L(),I=h("div"),E.c(),this.h()},l(O){e=d(O,"HEADER",{class:!0});var V=_(e);t=d(V,"DIV",{class:!0});var T=_(t);s=d(T,"A",{class:!0,href:!0});var H=_(s);a=d(H,"SPAN",{class:!0});var M=_(a);o=x(M,"Binge"),M.forEach(n),p=N(H),i=d(H,"SPAN",{class:!0});var F=_(i);c=x(F,"hub"),F.forEach(n),H.forEach(n),T.forEach(n),A=N(V),y=d(V,"DIV",{class:!0});var G=_(y);b=d(G,"UL",{class:!0});var R=_(b);f=d(R,"LI",{});var se=_(f);g=d(se,"A",{href:!0});var ae=_(g);D=x(ae,"search"),ae.forEach(n),se.forEach(n),B=N(R),$=d(R,"LI",{});var le=_($);k=d(le,"A",{href:!0});var re=_(k);S=x(re,"requests"),re.forEach(n),le.forEach(n),R.forEach(n),G.forEach(n),u=N(V),I=d(V,"DIV",{class:!0});var ne=_(I);E.l(ne),ne.forEach(n),V.forEach(n),this.h()},h(){m(a,"class","mr-1"),m(i,"class","px-1 py-1/2 bg-primary rounded-md text-black"),m(s,"class","btn btn-ghost font-bold text-lg normal-case"),m(s,"href","/"),m(t,"class","navbar-start"),m(g,"href","/search"),m(k,"href","/requests"),m(b,"class","menu menu-horizontal px-1"),m(y,"class","hidden md:flex navbar-center"),m(I,"class","navbar-end"),m(e,"class","navbar bg-base-300 shrink-0")},m(O,V){U(O,e,V),l(e,t),l(t,s),l(s,a),l(a,o),l(s,p),l(s,i),l(i,c),l(e,A),l(e,y),l(y,b),l(b,f),l(f,g),l(g,D),l(b,B),l(b,$),l($,k),l(k,S),l(e,u),l(e,I),E.m(I,null)},p(O,[V]){v===(v=w(O))&&E?E.p(O,V):(E.d(1),E=v(O),E&&(E.c(),E.m(I,null)))},i:z,o:z,d(O){O&&n(e),E.d()}}}function Be(r,e,t){let s;J(r,K,i=>t(0,s=i));let a=!1;async function o(){await fetch("/api/auth/logout",{method:"POST"}),pe(K,s=void 0,s)}const p=async()=>{await o()};return r.$$.update=()=>{r.$$.dirty&1&&t(1,a=Ie("admin"))},[s,a,o,p]}class Pe extends Q{constructor(e){super(),W(this,e,Be,Ue,X,{})}}function qe(r){let e,t,s,a,o,p,i,c,A;e=new De({}),a=new Pe({});const y=r[3].default,b=ge(y,r,r[2],null);return c=new Le({props:{url:r[0].url}}),{c(){Y(e.$$.fragment),t=L(),s=h("div"),Y(a.$$.fragment),o=L(),p=h("main"),b&&b.c(),i=L(),Y(c.$$.fragment),this.h()},l(f){Z(e.$$.fragment,f),t=N(f),s=d(f,"DIV",{class:!0});var g=_(s);Z(a.$$.fragment,g),o=N(g),p=d(g,"MAIN",{class:!0});var D=_(p);b&&b.l(D),D.forEach(n),i=N(g),Z(c.$$.fragment,g),g.forEach(n),this.h()},h(){m(p,"class","flex flex-col grow"),m(s,"class","min-h-screen flex flex-col justify-between")},m(f,g){ee(e,f,g),U(f,t,g),U(f,s,g),ee(a,s,null),l(s,o),l(s,p),b&&b.m(p,null),l(s,i),ee(c,s,null),A=!0},p(f,[g]){b&&b.p&&(!A||g&4)&&Ee(b,y,f,f[2],A?ke(y,f[2],g,null):$e(f[2]),null);const D={};g&1&&(D.url=f[0].url),c.$set(D)},i(f){A||(C(e.$$.fragment,f),C(a.$$.fragment,f),C(b,f),C(c.$$.fragment,f),A=!0)},o(f){j(e.$$.fragment,f),j(a.$$.fragment,f),j(b,f),j(c.$$.fragment,f),A=!1},d(f){te(e,f),f&&n(t),f&&n(s),te(a),b&&b.d(f),te(c)}}}function xe(r,e,t){let s,a;J(r,K,c=>t(4,s=c)),J(r,ye,c=>t(0,a=c));let{$$slots:o={},$$scope:p}=e,{data:i}=e;return we(()=>{pe(K,s=i.user,s)}),r.$$set=c=>{"data"in c&&t(1,i=c.data),"$$scope"in c&&t(2,p=c.$$scope)},[a,i,p,o]}class Re extends Q{constructor(e){super(),W(this,e,xe,qe,X,{data:1})}}export{Re as default};
