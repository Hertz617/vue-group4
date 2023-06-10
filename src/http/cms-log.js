import instance from "./axios";
// 编写major的api接口，每个功能都有单独的接口
// 页面page展示接口
const cmslogPage = (data) => {
    return instance.request({
        url: 'mall/cms-log/page',
        method: 'post',
        data
    })
}
// 增
const cmslogAdd = (data) => {
    return instance.request({
        url: 'mall/cms-log/add',
        method: 'post',
        data
    })
}
// 删
const cmslogDelId = (params) => {
    return instance.request({
        url: 'mall/cms-log/del/{id}',
        params
    })
}
// 改
const cmslogEdit = (data) => {
    return instance.request({
        url: 'mall/cms-log/edit',
        method: 'post',
        data
    })
}

export {
    cmslogPage,
    cmslogAdd,
    cmslogEdit,
    cmslogDelId,
} 