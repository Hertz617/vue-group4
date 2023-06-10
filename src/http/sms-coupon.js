import instance from "./axios";
// 页面page展示接口
const smscouponPage = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/page',
        method: 'post',
        data
    })
}
// 增
const smscouponAdd = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/add',
        method: 'post',
        data
    })
}
// 删
const smscouponDelId = (params) => {
    return instance.request({
        url: 'mall/sms-coupon/del/'+params.id,
        params
    })
}
// 改
const smscouponEdit = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/edit',
        method: 'post',
        data
    })
}


export {
    smscouponPage,
    smscouponAdd,
    smscouponEdit,
    smscouponDelId,

} 