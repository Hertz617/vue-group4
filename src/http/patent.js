import instance from "./axios";

const patentPage = (data) => {
   return instance.request({
      url: 'api/patent/page', 
      method: 'post',
      data
   })
}

const patentAdd = (data) => {
    return instance.request({
       url:'api/patent/add',
       method:'post',
       data
    })
 }

const patentDelId = (data) => {
   return instance.request({
      url: 'api/patent/delete',
      method: 'get',
      params: data
   })
}

const patentEdit = (data) => {
   return instance.request({
      url:'api/patent/edit',
      method:'post',
      data
   })
}

const patentOne = (data) => {
   return instance.request({
      url:'api/patent/one',
      method:'get',
      params:data
   })
}

//根据发明人id查询发明人相关专利信息
const patentPageId=(params)=>{
   return instance.request({
      url:'/api/patent/getPatents/'+params.id,
      params
   })
}

export {
   patentAdd, patentDelId, patentPage, patentEdit, patentOne,patentPageId
 }