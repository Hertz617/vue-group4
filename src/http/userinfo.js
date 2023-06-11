import instance from "./axios";

// 增
const subjectAdd = (data) => {
    return instance.request({
        url: 'api/subject/add',
        method: 'post',
        data
    })
}


const userinfoCheck = (data) => {
    return instance.request({
        url: 'api/userinfo/login',
        method: 'post',
        data
    })
}

export {

    subjectAdd,
    userinfoCheck

} 