(this["webpackJsonpto-do-list-app"]=this["webpackJsonpto-do-list-app"]||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),o=n.n(r),s=n(19),i=n.n(s),a=(n(26),n(27),n(8)),j=n(2),u=n(4),b=function(){var e=Object(r.useState)(""),t=Object(u.a)(e,2),n=t[0],o=t[1],s=Object(r.useState)(""),i=Object(u.a)(s,2),a=i[0],b=i[1],d=Object(r.useState)(""),O=Object(u.a)(d,2),h=O[0],l=O[1],p=Object(r.useContext)(x),f=Object(u.a)(p,2)[1],g=Object(j.f)();return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Register!"}),h,Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:a})}).then((function(){g.push("/"),f({username:n,password:a})})).catch((function(e){l("Error")}))},children:[Object(c.jsx)("input",{type:"text",onChange:function(e){return o(e.target.value)},placeholder:"username",required:!0}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{type:"password",onChange:function(e){return b(e.target.value)},placeholder:"password",required:!0}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{type:"submit",children:"Register"})]})]})},d=n(17),O=n(35),h=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],s=Object(r.useState)(""),i=Object(u.a)(s,2),a=i[0],j=i[1],b=Object(r.useContext)(x),h=Object(u.a)(b,1)[0],l=Object(r.useState)("uncompleted"),p=Object(u.a)(l,2),f=p[0],g=p[1],m=function(e){fetch("/todo",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Basic ".concat(h.username,": ").concat(h.password)},body:JSON.stringify(e)})};Object(r.useEffect)((function(){fetch("/todo",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Basic ".concat(h.username,": ").concat(h.password)}}).then((function(e){return e.json()})).then((function(e){return o(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsxs)("select",{value:f,onChange:function(e){return t=e.target.value,void g(t);var t},children:[Object(c.jsx)("option",{value:"completed",children:"Completed"}),Object(c.jsx)("option",{value:"uncompleted",children:"Uncompleted"})]}),n.filter((function(e){return"completed"===f?e.checked:!e.checked})).map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)("input",{checked:e.checked,onChange:function(){return function(e){var t=Object(d.a)(n),c=t.find((function(t){return t.id===e}));c.checked=!c.checked,o(t),m(t)}(e.id)},type:"checkbox"}),Object(c.jsx)("label",{children:e.text})]},e.id)})),Object(c.jsx)("br",{}),Object(c.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),a){var t={id:Object(O.a)(),checked:!1,text:a},c=[].concat(Object(d.a)(n),[t]);o(c),j(""),m(c)}},children:[Object(c.jsx)("input",{value:a,onChange:function(e){return j(e.target.value)},type:"text"}),Object(c.jsx)("button",{type:"submit",children:"Add"})]})]})},l=function(){var e=Object(r.useContext)(x),t=Object(u.a)(e,1)[0];return Object(c.jsxs)("div",{children:[Object(c.jsxs)("h1",{children:["Welcome ",t&&t.username]}),!t&&Object(c.jsx)(a.b,{to:"/register",children:"Register"}),Object(c.jsx)("br",{}),!t&&Object(c.jsx)(a.b,{to:"/login",children:"Login"}),t&&Object(c.jsx)(h,{})]})},p=function(){var e=Object(r.useState)(""),t=Object(u.a)(e,2),n=t[0],o=t[1],s=Object(r.useState)(""),i=Object(u.a)(s,2),a=i[0],b=i[1],d=Object(r.useState)(""),O=Object(u.a)(d,2),h=O[0],l=O[1],p=Object(r.useContext)(x),f=Object(u.a)(p,2)[1],g=Object(j.f)();return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Login!"}),h,Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/login ",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:a})}).then((function(){g.push("/"),f({username:n,password:a})})).catch((function(e){console.log(e),l("Error")}))},children:[Object(c.jsx)("input",{type:"text",onChange:function(e){return o(e.target.value)},placeholder:"username",required:!0}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{type:"password",onChange:function(e){return b(e.target.value)},placeholder:"password",required:!0}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{type:"submit",children:"Login"})]})]})},x=o.a.createContext();var f=function(){var e=Object(r.useState)(null);return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(x.Provider,{value:e,children:Object(c.jsx)(a.a,{children:Object(c.jsxs)(j.c,{children:[Object(c.jsx)(j.a,{exact:!0,path:"/",children:Object(c.jsx)(l,{})}),Object(c.jsx)(j.a,{exact:!0,path:"/register",children:Object(c.jsx)(b,{})}),Object(c.jsx)(j.a,{exact:!0,path:"/login",children:Object(c.jsx)(p,{})})]})})})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),o(e),s(e)}))};i.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(f,{})}),document.getElementById("root")),g()}},[[33,1,2]]]);
//# sourceMappingURL=main.6c087e56.chunk.js.map