import instance from "./axios";
// 编写subject的api接口，每个功能都有单独的接口
// 页面page展示接口
const subjectPage = (data) => {
    return instance.request({
        url: 'api/subject/page',
        method: 'post',
        data
    })
}
// 增
const subjectAdd = (data) => {
    return instance.request({
        url: 'api/subject/add',
        method: 'post',
        data
    })
}

// 改
const subjectEdit = (data) => {
    return instance.request({
        url: 'api/subject/edit',
        method: 'post',
        data
    })
}

// 按ID寻找数据是否存在api/subject/getsubjectForSelectBySchoolId
const subjectSelectById = (params) => {
    return instance.request({
        url: 'api/subject/one',
        params
    })
}
// 按ID寻找数据是否存在api/subject/getsubjectForSelectBySchoolId
const subjectSelectByUserId = (params) => {
    return instance.request({
        url: 'api/subject/getSubjects/'+params.id,
        params
    })
}

export {
    subjectPage,
    subjectAdd,
    subjectEdit,
    subjectSelectById,
    subjectSelectByUserId
} 