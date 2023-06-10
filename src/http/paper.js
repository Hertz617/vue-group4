//统一api管理
import instance from "./axios";
// import axios from 'axios'
// data json

const PaperPage=(data)=>{
   return instance.request({
    url:'api/paper/page',
    method:'post',
    data
   })
}
const PaperDelete=(params)=>{
    return instance.request({
        url:'api/paper/delete',
        method:'get',
        params
    })
}
const PaperAdd=(data)=>{
    return instance.request({
        url:'api/paper/add',
        method:'post',
        data
    })
}
const PaperEdit=(data)=>{
    return instance.request({
        url:'api/paper/edit',
        method:'post',
        data
    })
}

const GetOnePaper=(params)=>{
  return instance.request({
    url:'/api/paper/one',
    method:'get',
    params
  })
}

// const getPaperByUserId = (userId) => {
//   return instance.request({
//     url:'/api/paper/getPapers',
//     method:'get',
//     params: { userId }
//   })
// }
const getPaperByUserId = (params) => {
  return instance.request({
    url:'api/paper/getPapers/'+params.id,
    // method:'get',
    params
  })
}





// // 创建自定义的 Axios 实例
// const api = axios.create({
//   baseURL: 'http://api.jqrjq.cn', // 设置基础URL
//   withCredentials: true, // 允许携带跨域请求的凭证
// })

// // 添加请求拦截器
// api.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做一些处理
//     return config
//   },
//   (error) => {
//     // 处理请求错误
//     return Promise.reject(error)
//   }
// )
export {
    // userLogin,
    // adminLogin,
    PaperAdd,
    PaperDelete,
    PaperEdit,
    PaperPage,
    GetOnePaper,
    getPaperByUserId
} 
// 添加响应拦截器
// api.interceptors.response.use(
//   (response) => {
//     // 对响应数据做一些处理
//     return response
//   },
//   (error) => {
//     // 处理响应错误
//     return Promise.reject(error)
//   }
// )
// export default api