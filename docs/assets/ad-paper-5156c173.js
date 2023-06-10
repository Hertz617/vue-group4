import{_ as P,d as w,o as y,c as C,a as f,b as a,w as t,F as I,E as B,e as F,f as U,g as n,h as L,i as k,j as E,k as v}from"./index-af599a35.js";import{c as T,E as m,a as W}from"./el-select-50159011.js";import{P as $,G as c,g as z,a as D,b as N,c as A}from"./paper-e1f71c34.js";const G=w({data(){return{papers:[],paper:[],pi:[],searchText:"",userId:"",fileList:"",currentCtrl:0,page:{total:0,current:1,size:10},dialogFormVisible:!1,dialogFormVisibleById:!1,dialogFormVisibleByUserId:!1,Paper:{attachment:"",count:0,id:0,name:"",publication:"",publicationCate:"",publishTime:"",type:"",userId:0},formLabelWidth:80}},mounted(){this.getPaperPage(1)},methods:{refresh(){this.getPaperPage(1),this.currentCtrl=0},toEdit(e){console.log(e),this.dialogFormVisible=!0,this.Paper=T(e)},getPaperPage(e){$({current:e,size:2}).then(i=>{console.log(i);const u=i.data.page;this.papers=u.records,this.page=u}).catch(i=>{console.log(i)})},currentchange(e){this.currentCtrl==0?(this.getPaperPage(e),this.page.current=e):this.currentCtrl==1?(this.getPapers(this.fileList),this.page.current=e):(this.getPaperById(this.searchText),this.page.current=e)},getPaperById(e){console.log(e),this.paper=[],c({id:e}).then(i=>{this.dialogFormVisibleById=!1,console.log(i),this.paper.push(i.data.paper);const u=this.paper;this.papers=u})},getPapers(e){this.papers=[];const l={id:e};console.log(l),z(l).then(i=>{this.dialogFormVisibleByUserId=!1,console.log(i);const u=i.data;this.papers=u.papers,this.page=u})},del(e){confirm("是否删除")==!0&&(console.log(e),D({id:e}).then(i=>{if(i.success)this.getPaperPage(this.page.current);else return console.log(i.msg),!1}).catch(i=>{}))},toAdd(){this.dialogFormVisible=!0},searchById(){this.currentCtrl=2,this.dialogFormVisibleById=!0},searchByUserId(){this.currentCtrl=1,this.dialogFormVisibleByUserId=!0},save(){const e=this.Paper;e.id==0?N(e).then(l=>{if(l.success)this.dialogFormVisible=!1,this.getPaperPage(this.page.current),m(l.msg);else return m(l.msg),!1}).catch(l=>{m("网络错误联系管理员")}):A(e).then(l=>{if(l.success)this.dialogFormVisible=!1,this.getPaperPage(this.page.current),m(l.msg);else return m(l.msg),!1}).catch(l=>{m("网络错误联系管理员")})}}}),j={class:"head"},M={class:"Paper-tools"},O={class:"dialog-footer"},q={class:"dialog-footer"},H={class:"dialog-footer"};function J(e,l,i,u,K,Q){const r=B,p=L,h=F,V=W,d=k,s=E,b=v,g=U;return y(),C(I,null,[f("div",j,[f("div",M,[a(r,{type:"warning",onClick:e.searchById},{default:t(()=>[n("根据论文编号搜索")]),_:1},8,["onClick"]),a(r,{type:"warning",onClick:e.searchByUserId},{default:t(()=>[n("根据作者编号查询")]),_:1},8,["onClick"]),a(r,{type:"warning",onClick:l[0]||(l[0]=o=>e.refresh())},{default:t(()=>[n("刷新查询")]),_:1})]),a(h,{data:e.papers,style:{width:"100%"}},{default:t(()=>[a(p,{fixed:"",prop:"id",label:"论文编号",width:"120"}),a(p,{fixed:"",prop:"name",label:"论文题目",width:"120"}),a(p,{fixed:"",prop:"publication",label:"刊物",width:"120"}),a(p,{fixed:"",prop:"publicationCate",label:"刊物种类",width:"120"}),a(p,{fixed:"",prop:"publishTime",label:"发表时间",width:"120"}),a(p,{fixed:"",prop:"type",label:"论文类型",width:"120"}),a(p,{fixed:"",prop:"userId",label:"作者编号",width:"120"}),a(p,{fixed:"",prop:"attachment",label:"佐证材料",width:"120"}),a(p,{fixed:"",prop:"count",label:"引用次数",width:"120"})]),_:1},8,["data"]),a(V,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),a(g,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":l[12]||(l[12]=o=>e.dialogFormVisible=o),title:"添加Paper表单"},{footer:t(()=>[f("span",O,[a(r,{onClick:l[10]||(l[10]=o=>e.dialogFormVisible=!1)},{default:t(()=>[n("Cancel")]),_:1}),a(r,{type:"primary",onClick:l[11]||(l[11]=o=>e.save())},{default:t(()=>[n(" 保存 ")]),_:1})])]),default:t(()=>[a(b,{model:e.Paper},{default:t(()=>[a(s,{label:"论文编号","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.id,"onUpdate:modelValue":l[1]||(l[1]=o=>e.Paper.id=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"论文题目","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.name,"onUpdate:modelValue":l[2]||(l[2]=o=>e.Paper.name=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"刊物","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.publication,"onUpdate:modelValue":l[3]||(l[3]=o=>e.Paper.publication=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"刊物种类","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.publicationCate,"onUpdate:modelValue":l[4]||(l[4]=o=>e.Paper.publicationCate=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"发表时间","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.publishTime,"onUpdate:modelValue":l[5]||(l[5]=o=>e.Paper.publishTime=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"论文类型","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.type,"onUpdate:modelValue":l[6]||(l[6]=o=>e.Paper.type=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"作者编号","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.userId,"onUpdate:modelValue":l[7]||(l[7]=o=>e.Paper.userId=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"佐证材料","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.attachment,"onUpdate:modelValue":l[8]||(l[8]=o=>e.Paper.attachment=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(s,{label:"引用次数","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.Paper.count,"onUpdate:modelValue":l[9]||(l[9]=o=>e.Paper.count=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),a(g,{modelValue:e.dialogFormVisibleById,"onUpdate:modelValue":l[16]||(l[16]=o=>e.dialogFormVisibleById=o),title:"根据论文编号查询"},{footer:t(()=>[f("span",q,[a(r,{onClick:l[14]||(l[14]=o=>e.dialogFormVisibleById=!1)},{default:t(()=>[n("Cancel")]),_:1}),a(r,{type:"primary",onClick:l[15]||(l[15]=o=>e.getPaperById(e.searchText))},{default:t(()=>[n("查询 ")]),_:1})])]),default:t(()=>[a(b,{model:e.paper},{default:t(()=>[a(s,{label:"请输入论文编号","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.searchText,"onUpdate:modelValue":l[13]||(l[13]=o=>e.searchText=o),placeholder:"请输入论文ID",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),a(g,{modelValue:e.dialogFormVisibleByUserId,"onUpdate:modelValue":l[20]||(l[20]=o=>e.dialogFormVisibleByUserId=o),title:"根据作者编号查询"},{footer:t(()=>[f("span",H,[a(r,{onClick:l[18]||(l[18]=o=>e.dialogFormVisibleByUserId=!1)},{default:t(()=>[n("Cancel")]),_:1}),a(r,{type:"primary",onClick:l[19]||(l[19]=o=>e.getPapers(e.fileList))},{default:t(()=>[n("查询 ")]),_:1})])]),default:t(()=>[a(b,{model:e.paper},{default:t(()=>[a(s,{label:"请输入作者编号","label-width":e.formLabelWidth},{default:t(()=>[a(d,{modelValue:e.fileList,"onUpdate:modelValue":l[17]||(l[17]=o=>e.fileList=o),placeholder:"请输入作者ID",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const Y=P(G,[["render",J]]);export{Y as default};
