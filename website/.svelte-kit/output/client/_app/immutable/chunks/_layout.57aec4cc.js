import{i as o,h as a}from"./utils.0381256a.js";import{H as n,R as i}from"./control.e7f5239e.js";import"./navigation.bf5ad0dd.js";function s(e,t){return new n(e,t)}function c(e,t){return new i(e,t)}new TextEncoder;const l=async({parent:e,url:t})=>{const r=await e();if(!o(r.user))throw c(307,"/auth/login?redirect="+t.pathname);if(!a("admin",r.user))throw s(403,"You are not allowed to access this page")},f=Object.freeze(Object.defineProperty({__proto__:null,load:l},Symbol.toStringTag,{value:"Module"}));export{f as _,l};
