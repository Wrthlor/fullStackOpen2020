(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),a=t.n(c),o=t(15),u=t.n(o),i=t(6),s=t(3),l=function(e){var n=e.info,t=e.handleDelete;return Object(r.jsxs)("li",{children:[n.name," ","",n.number," ","",Object(r.jsx)("button",{onClick:function(){return t(n.id)},children:"Delete"})]})},d=function(e){var n=e.people,t=e.handleDelete,c=n.map((function(e){return Object(r.jsx)(l,{info:e,handleDelete:t},e.id)}));return Object(r.jsx)("div",{children:c})},f=function(e){return Object(r.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(r.jsxs)("div",{children:["Name: ",Object(r.jsx)("input",{value:e.nameValue,onChange:e.nameChange})]}),Object(r.jsxs)("div",{children:["Number: ",Object(r.jsx)("input",{value:e.numberValue,onChange:e.numberChange})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"Add"})})]})},b=function(e){return Object(r.jsxs)("div",{children:["Filter list of names: ",Object(r.jsx)("input",{value:e.value,onChange:e.onChange})]})},j=function(e){var n=e.message,t=e.className;return null===n?null:Object(r.jsx)("div",{className:t,children:n})},h=t(4),m=t.n(h),O="/api/persons",p={getAll:function(){return m.a.get(O).then((function(e){return e.data}))},create:function(e){return m.a.post(O,e).then((function(e){return e.data}))},deletePerson:function(e){return m.a.delete("".concat(O,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return m.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))}},v=function(){var e=Object(c.useState)([]),n=Object(s.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),u=Object(s.a)(o,2),l=u[0],h=u[1],m=Object(c.useState)(""),O=Object(s.a)(m,2),v=O[0],x=O[1],g=Object(c.useState)(""),C=Object(s.a)(g,2),w=C[0],S=C[1],D=Object(c.useState)(null),L=Object(s.a)(D,2),k=L[0],N=L[1],y=Object(c.useState)(null),A=Object(s.a)(y,2),I=A[0],P=A[1];Object(c.useEffect)((function(){p.getAll().then((function(e){return a(e)})).catch((function(e){return console.error(e)}))}),[]);var V=t.map((function(e){return e.name.toLowerCase()})),E=function(e){return e.toLowerCase().replace(/\b(\w)/g,(function(e){return e.toUpperCase()}))},J=function(e,n){N(e),P(n),setTimeout((function(){N(null),P(null)}),5e3)},B=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(b,{value:w,onChange:function(e){return S(e.target.value)}}),Object(r.jsx)("h3",{children:"Add new profile"}),Object(r.jsx)(j,{message:k,className:I}),Object(r.jsx)(f,{handleSubmit:function(e){var n,r;e.preventDefault(),/^(\s*|\d+-?\d*-?\d*)$/.test(v)?""===l&&""!==v?J("Please enter a name","error"):(r=l,V.includes(r.toLowerCase())?(n='"'.concat(l,'" is already added to server, replace the old number with a new one?'),window.confirm(n)&&function(e,n){var r=t.find((function(n){return n.name.toLowerCase()===e.toLowerCase()})),c=r.id,o=Object(i.a)(Object(i.a)({},r),{},{number:n});p.update(c,o).then((function(n){a(t.map((function(e){return e.id!==c?e:n}))),J("".concat(E(e),"'s number has been updated"),"update")})).catch((function(n){a(t.filter((function(e){return e.id!==c}))),J('Information for "'.concat(E(e),'" has already been removed from server'),"error"),console.log(n)}))}(l,v)):function(){var e=E(l),n={name:e,number:v};p.create(n).then((function(n){a(t.concat(n)),J('"'.concat(e,'" has been added'),"update")})).catch((function(e){return console.log(e)}))}()):J("Invalid number","error"),h(""),x("")},nameValue:l,nameChange:function(e){return h(e.target.value)},numberValue:v,numberChange:function(e){return x(e.target.value)}}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(d,{people:B,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm('Delete "'.concat(n.name,'"?'))&&p.deletePerson(e).then((function(){a(t.filter((function(n){return n.id!==e}))),J('"'.concat(n.name,'" has been removed from server'),"update"),S("")})).catch((function(r){a(t.filter((function(n){return n.id!==e}))),J('Information of "'.concat(n.name,'" has already been removed from server'),"error"),console.log(r)}))}})]})};t(38);u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(v,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.47891056.chunk.js.map