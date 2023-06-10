<template>
    <!-- el-table显示数据,分页 -->

    <div class="smscoupons">
        <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
            style="margin-bottom: 20px;"></el-input>

        <div class="smscoupon-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="smscoupons" style="width: 100%">
            <el-table-column fixed prop="id" width="150" />
            <el-table-column prop="amount" label="金额" width="120" />
            <el-table-column prop="code" label="优惠码" width="120" />
            <el-table-column prop="count" label="数量" width="120" />
            <el-table-column prop="enableTime" label="可以领取的日期" width="120" />
            <el-table-column fixed="right" label="功能管理" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <!-- 添加按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisible" title="优惠券编辑">
        <el-form :model="Smscoupon">
            <el-form-item label="金额" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.amount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="优惠码" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.count" autocomplete="off" />
            </el-form-item>
            <el-form-item label="可以领取的日期" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.enableTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.startTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-input v-model="Smscoupon.endTime" autocomplete="off" />
            </el-form-item>


        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { smscouponPage, smscouponDelId, smscouponAdd, smscouponEdit } from '../../http/sms-coupon';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            smscoupons: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            Smscoupon: {
                "amount": 0,
                "code": "",
                "count": 0,
                "enableTime": "",
                "endTime": "",
                "id": 0,
                "memberLevel": 0,
                "minPoint": 0,
                "name": "",
                "note": "",
                "perLimit": 0,
                "platform": 0,
                "publishCount": 0,
                "receiveCount": 0,
                "startTime": "",
                "type": 0,
                "useCount": 0,
                "useType": 0
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getSmscouponsPage(1)
    },
    methods: {
        toEdit(smscoupon) {
            this.dialogFormVisible = true;
            this.Smscoupon = cloneDeep(smscoupon);
        },
        // 按page展示
        getSmscouponsPage(current) {
            const data = {
                current: current,
                size: 4
            }

            smscouponPage(data).then(res => {
                const page = res.data.page;
                this.smscoupons = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },
        currentchange(current) {
            // console.log(current);
            this.getSmscouponsPage(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        del(id) {
            if (confirm("是否删除") == true) {
                console.log(id);
            }
            console.log(id);
            const params = {
                id: id
            }

            smscouponDelId(params).then(res => {
                if (res.success) {
                    this.getSmscouponsPage(this.page.current)
                } else {
                    console.log(res.msg);
                    return false
                }
            }).catch(err => {
                ElMessage('删除失败')
            })
        },
        toAdd() {
            this.dialogFormVisible = true;
        },
        save() {
            const smscoupon = this.Smscoupon
            if (smscoupon.id == 0) {
                smscouponAdd(smscoupon).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getSmscouponsPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                smscouponEdit(smscoupon).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getSmscouponsPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
                        ElMessage(res.msg)
                        return false
                    }

                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
        }
    }
});
</script>
<style lang = "scss" scoped></style>