import{i as a,h as n}from"./utils.0deb44f8.js";import{H as i,R as s}from"./control.e7f5239e.js";function c(t,e){return new i(t,e)}function o(t,e){return new s(t,e)}new TextEncoder;const d=async({parent:t,url:e})=>{const r=await t();if(!a(r.user))throw o(307,"/auth/login?redirect="+e.pathname);if(!n("admin",r.user))throw c(403,"You are not allowed to access this page");if(e.pathname==="/admin")throw o(301,"/admin/users")},m=Object.freeze(Object.defineProperty({__proto__:null,load:d},Symbol.toStringTag,{value:"Module"}));export{m as _,d as l};
