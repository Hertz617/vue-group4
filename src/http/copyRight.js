import instance from "./axios";
// 编写copyRight的api接口
// 页面page展示接口
const copyRightPage = (data) => {
    return instance.request({
        url: 'api/copyright/page',
        method: 'post',
        data
    })
}

// 增
const copyRightAdd = (data) => {
    return instance.request({
        url: 'api/copyright/add',
        method: 'post',
        data
    })
}

// 改
const copyRightEdit = (data) => {
    return instance.request({
        url: 'api/copyright/edit',
        method: 'post',
        data
    })
}


// 按ID寻找数据是否存在api/copyright/one
const copyRightById = (params) => {
    return instance.request({
        url: 'api/copyright/one',
        method: 'post',
        params
    })
}
// // 按ID寻找数据是否存在api/copyright/one
// const copyRightByUserId = (params) => {
//     return instance.request({
//         url: 'api/copyright/getCopyrights/'+params.id,
//         method: 'post',
//         params
//     })
// }
//根据发明人id查询发明人相关专利信息
const copyRightByUserId=(params)=>{
    return instance.request({
       url:'/api/copyright/getCopyrights/'+params.id,
       params
    })
 }


export {
    copyRightPage,
    copyRightAdd,
    copyRightEdit,
    copyRightById,
    copyRightByUserId
} 