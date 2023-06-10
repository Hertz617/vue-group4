import{D as pe,I as me,aB as b,aU as ne,bm as D,bn as C,aQ as E,d as T,J as he,K as fe,N as be,ax as ve,L as _e,R as k,ag as A,V as Ne,bo as Ve,O as ge,aa as Ie,bp as ye,o as f,c as g,ad as j,W as s,Z as R,aj as F,b as I,w as G,l as w,af as ke,bq as Ee,n as H,a2 as J,ae as we,br as Ce,a0 as B,i as Se,a7 as $e,bs as xe,aR as Pe,Q as Z,aC as Ae,_ as ae,F as X,ab as Fe,a as h,a4 as ee,g as W,bj as Be,bt as De,E as Te,bh as Ue,bi as ze,r as Ke}from"./index-af599a35.js";import{v as te}from"./index-2308d72f.js";const Me=pe({id:{type:String,default:void 0},step:{type:Number,default:1},stepStrictly:Boolean,max:{type:Number,default:Number.POSITIVE_INFINITY},min:{type:Number,default:Number.NEGATIVE_INFINITY},modelValue:Number,readonly:Boolean,disabled:Boolean,size:me,controls:{type:Boolean,default:!0},controlsPosition:{type:String,default:"",values:["","right"]},valueOnClear:{type:[String,Number,null],validator:t=>t===null||b(t)||["min","max"].includes(t),default:null},name:String,label:String,placeholder:String,precision:{type:Number,validator:t=>t>=0&&t===Number.parseInt(`${t}`,10)},validateEvent:{type:Boolean,default:!0}}),Oe={[ne]:(t,r)=>r!==t,blur:t=>t instanceof FocusEvent,focus:t=>t instanceof FocusEvent,[D]:t=>b(t)||C(t),[E]:t=>b(t)||C(t)},Le=["aria-label","onKeydown"],Re=["aria-label","onKeydown"],We=T({name:"ElInputNumber"}),je=T({...We,props:Me,emits:Oe,setup(t,{expose:r,emit:a}){const l=t,{t:S}=he(),m=fe("input-number"),v=be(),i=ve({currentValue:l.modelValue,userInput:null}),{formItem:V}=_e(),u=k(()=>b(l.modelValue)&&l.modelValue<=l.min),_=k(()=>b(l.modelValue)&&l.modelValue>=l.max),le=k(()=>{const e=Y(l.step);return A(l.precision)?Math.max(Y(l.modelValue),e):(e>l.precision,l.precision)}),U=k(()=>l.controls&&l.controlsPosition==="right"),Q=Ne(),y=Ve(),z=k(()=>{if(i.userInput!==null)return i.userInput;let e=i.currentValue;if(C(e))return"";if(b(e)){if(Number.isNaN(e))return"";A(l.precision)||(e=e.toFixed(l.precision))}return e}),K=(e,n)=>{if(A(n)&&(n=le.value),n===0)return Math.round(e);let o=String(e);const c=o.indexOf(".");if(c===-1||!o.replace(".","").split("")[c+n])return e;const x=o.length;return o.charAt(x-1)==="5"&&(o=`${o.slice(0,Math.max(0,x-1))}6`),Number.parseFloat(Number(o).toFixed(n))},Y=e=>{if(C(e))return 0;const n=e.toString(),o=n.indexOf(".");let c=0;return o!==-1&&(c=n.length-o-1),c},q=(e,n=1)=>b(e)?K(e+l.step*n):i.currentValue,M=()=>{if(l.readonly||y.value||_.value)return;const e=Number(z.value)||0,n=q(e);$(n),a(D,i.currentValue)},O=()=>{if(l.readonly||y.value||u.value)return;const e=Number(z.value)||0,n=q(e,-1);$(n),a(D,i.currentValue)},L=(e,n)=>{const{max:o,min:c,step:d,precision:N,stepStrictly:x,valueOnClear:P}=l;o<c&&xe("InputNumber","min should not be greater than max.");let p=Number(e);if(C(e)||Number.isNaN(p))return null;if(e===""){if(P===null)return null;p=Pe(P)?{min:c,max:o}[P]:P}return x&&(p=K(Math.round(p/d)*d,N)),A(N)||(p=K(p,N)),(p>o||p<c)&&(p=p>o?o:c,n&&a(E,p)),p},$=(e,n=!0)=>{var o;const c=i.currentValue,d=L(e);if(!n){a(E,d);return}c!==d&&(i.userInput=null,a(E,d),a(ne,d,c),l.validateEvent&&((o=V==null?void 0:V.validate)==null||o.call(V,"change").catch(N=>Z())),i.currentValue=d)},oe=e=>{i.userInput=e;const n=e===""?null:Number(e);a(D,n),$(n,!1)},re=e=>{const n=e!==""?Number(e):"";(b(n)&&!Number.isNaN(n)||e==="")&&$(n),i.userInput=null},ue=()=>{var e,n;(n=(e=v.value)==null?void 0:e.focus)==null||n.call(e)},ie=()=>{var e,n;(n=(e=v.value)==null?void 0:e.blur)==null||n.call(e)},ce=e=>{a("focus",e)},de=e=>{var n;a("blur",e),l.validateEvent&&((n=V==null?void 0:V.validate)==null||n.call(V,"blur").catch(o=>Z()))};return ge(()=>l.modelValue,e=>{const n=L(i.userInput),o=L(e,!0);!b(n)&&(!n||n!==o)&&(i.currentValue=o,i.userInput=null)},{immediate:!0}),Ie(()=>{var e;const{min:n,max:o,modelValue:c}=l,d=(e=v.value)==null?void 0:e.input;if(d.setAttribute("role","spinbutton"),Number.isFinite(o)?d.setAttribute("aria-valuemax",String(o)):d.removeAttribute("aria-valuemax"),Number.isFinite(n)?d.setAttribute("aria-valuemin",String(n)):d.removeAttribute("aria-valuemin"),d.setAttribute("aria-valuenow",String(i.currentValue)),d.setAttribute("aria-disabled",String(y.value)),!b(c)&&c!=null){let N=Number(c);Number.isNaN(N)&&(N=null),a(E,N)}}),ye(()=>{var e;const n=(e=v.value)==null?void 0:e.input;n==null||n.setAttribute("aria-valuenow",`${i.currentValue}`)}),r({focus:ue,blur:ie}),(e,n)=>(f(),g("div",{class:R([s(m).b(),s(m).m(s(Q)),s(m).is("disabled",s(y)),s(m).is("without-controls",!e.controls),s(m).is("controls-right",s(U))]),onDragstart:n[1]||(n[1]=B(()=>{},["prevent"]))},[e.controls?j((f(),g("span",{key:0,role:"button","aria-label":s(S)("el.inputNumber.decrease"),class:R([s(m).e("decrease"),s(m).is("disabled",s(u))]),onKeydown:F(O,["enter"])},[I(s(H),null,{default:G(()=>[s(U)?(f(),w(s(ke),{key:0})):(f(),w(s(Ee),{key:1}))]),_:1})],42,Le)),[[s(te),O]]):J("v-if",!0),e.controls?j((f(),g("span",{key:1,role:"button","aria-label":s(S)("el.inputNumber.increase"),class:R([s(m).e("increase"),s(m).is("disabled",s(_))]),onKeydown:F(M,["enter"])},[I(s(H),null,{default:G(()=>[s(U)?(f(),w(s(we),{key:0})):(f(),w(s(Ce),{key:1}))]),_:1})],42,Re)),[[s(te),M]]):J("v-if",!0),I(s(Se),{id:e.id,ref_key:"input",ref:v,type:"number",step:e.step,"model-value":s(z),placeholder:e.placeholder,readonly:e.readonly,disabled:s(y),size:s(Q),max:e.max,min:e.min,name:e.name,label:e.label,"validate-event":!1,onWheel:n[0]||(n[0]=B(()=>{},["prevent"])),onKeydown:[F(B(M,["prevent"]),["up"]),F(B(O,["prevent"]),["down"])],onBlur:de,onFocus:ce,onInput:oe,onChange:re},null,8,["id","step","model-value","placeholder","readonly","disabled","size","max","min","name","label","onKeydown"])],34))}});var Ge=$e(je,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);const Qe=Ae(Ge);const Ye=T({data(){return{products:[{id:1001,name:"海尔立式热水器",price:1849,count:1},{id:1002,name:"Vue核心技术解析",price:43,count:1}],allcheck:!1}},computed:{total(){let t=0;return this.products.forEach(r=>{r.ischeck&&(t+=r.price*r.count)}),t}},methods:{selectProducts(t,r){this.all(),r?this.products.forEach(a=>{a.id==t&&(this.total+=a.price*a.count)}):this.products.forEach(a=>{a.id==t&&(this.total-=a.price*a.count)})},handleChange(t,r){if(this.products.length===0){this.total=0;return}this.total=0,this.$nextTick(()=>{this.products.forEach(a=>{a.count||(a.count=1),this.total+=a.price*a.count})})},changeAll(){this.allcheck=!this.allcheck,this.products.forEach(t=>{t.ischeck=this.allcheck}),this.allcheck?(this.total=0,this.products.forEach(t=>{this.total+=t.price*t.count})):this.total=0},all(){this.products.findIndex(r=>!r.ischeck)==-1?this.allcheck=!0:this.allcheck=!1},handleDelete(t,r){let a=this.products.findIndex(l=>l.id===t);a!==-1&&(r&&(this.total-=this.products[a].price*this.products[a].count),this.products.splice(a,1))}}}),se=t=>(Ue("data-v-bfc1113b"),t=t(),ze(),t),qe=se(()=>h("div",{class:"cart"},"购物车",-1)),He={class:"product"},Je={class:"name"},Ze={class:"bars"},Xe={class:"price"},et={class:"count"},tt=se(()=>h("button",null,"购买",-1));function nt(t,r,a,l,S,m){const v=De,i=Qe,V=Te;return f(),g(X,null,[qe,(f(!0),g(X,null,Fe(t.products,u=>(f(),g("div",{class:"products",key:u.id},[h("div",He,[h("div",Je,[I(v,{label:u.name,modelValue:u.ischeck,"onUpdate:modelValue":_=>u.ischeck=_,size:"small",onChange:_=>t.selectProducts(u.id,u.ischeck)},null,8,["label","modelValue","onUpdate:modelValue","onChange"])]),h("div",Ze,[h("span",Xe,"￥"+ee(u.price),1),h("span",et,[I(i,{modelValue:u.count,"onUpdate:modelValue":_=>u.count=_,min:1,max:9999,onChange:_=>t.handleChange(u.id,u.count)},null,8,["modelValue","onUpdate:modelValue","onChange"]),I(V,{size:"small",type:"danger",onClick:_=>t.handleDelete(u.id,u.ischeck)},{default:G(()=>[W(" 删除")]),_:2},1032,["onClick"])])])])]))),128)),W(" 全选"),j(h("input",{type:"checkbox",onClick:r[0]||(r[0]=(...u)=>t.changeAll&&t.changeAll(...u)),"onUpdate:modelValue":r[1]||(r[1]=u=>t.allcheck=u)},null,512),[[Be,t.allcheck]]),h("div",null,[h("span",null,[W("合计：￥ "),h("span",null,ee(t.total),1)]),tt])],64)}const at=ae(Ye,[["render",nt],["__scopeId","data-v-bfc1113b"]]);const st=T({data(){return{}},methods:{},components:{Cart:at}});function lt(t,r,a,l,S,m){const v=Ke("Cart",!0);return f(),w(v)}const ut=ae(st,[["render",lt],["__scopeId","data-v-c11e0afd"]]);export{ut as default};