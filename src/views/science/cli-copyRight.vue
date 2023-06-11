<template>
    <!-- el-table显示数据,分页 -->
    <!-- 著作权管理 -->

    <div class="copyrights">

        <div class="copyRight-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <!-- <el-button type="warning" @click="selectById">查找</el-button> -->
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="copyrights" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="100" />
            <el-table-column prop="name" label="著作权名称" width="140" />
            <el-table-column prop="userId" label="著作权人：第一位" width="140" />
            <el-table-column prop="finishTime" label="完成时间" width="140" />
            <el-table-column prop="publishTime" label="首次发表时间" width="140" />
            <el-table-column prop="attachment" label="佐证材料" width="160" />
            <el-table-column prop="copyrightNo" label="著作权编号" width="140" />
            <el-table-column fixed="right" label="操作" width="120">

                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <!-- <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>

    <!-- 添加按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisible" title="著作权信息编辑">
        <el-form :model="copyRight">
            <el-form-item label="著作权名称" :label-width="formLabelWidth">
                <el-input v-model="copyRight.name" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item label="著作权人" :label-width="formLabelWidth">
                <el-input v-model="copyRight.userId" autocomplete="off" />
            </el-form-item> -->
            <el-form-item label="完成时间" :label-width="formLabelWidth">
                <el-date-picker v-model="copyRight.finishTime" type="date" placeholder="Pick a day" :size="size" />
            </el-form-item>
            <el-form-item label="首次发表时间" :label-width="formLabelWidth">
                <el-date-picker v-model="copyRight.publishTime" type="date" placeholder="Pick a day" :size="size" />
            </el-form-item>
            <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="copyRight.attachment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="著作权编号" :label-width="formLabelWidth">
                <el-input v-model="copyRight.copyrightNo" autocomplete="off" />
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

    <!-- 查询按钮点击后出现的表单 -->
    <!-- <el-dialog v-model="dialogFormVisibleById" title="著作权信息查询">
        <el-form :model="copyright">
            <el-form-item label="著作权编号" :label-width="140">
                <el-input v-model="copyRight.copyrightNo" autocomplete="off" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
                <el-button type="primary" @click="getCopyRightsById">查询
                </el-button>
            </span>
        </template>
    </el-dialog> -->
</template>

<script>
import { defineComponent } from 'vue';
import {
    copyRightPage,
    copyRightAdd,
    copyRightEdit,
} from '../../http/copyRight';
import {

    copyRightByUserId,
} from '../../http/major';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            copyrights: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            copyRight: {
                "attachment": "",
                "copyrightNo": "",
                "finishTime": "",
                "id": 0,
                "name": "",
                "publishTime": "",
                "userId": parseInt(localStorage.getItem("UserID"))
            },
            formLabelWidth: 100
        }
    },
    mounted() {
        this.getCopyRightsById(parseInt(localStorage.getItem("UserID")));
        // this.job()
    },

    methods: {
        toEdit(copyRight) {
            this.dialogFormVisible = true;
            this.copyRight = cloneDeep(copyRight);
        },
        // 按page展示
        // getcopyRightsPage(current) {
        //     const data = {
        //         current: current,
        //         size: 4
        //     }

        //     copyRightPage(data).then(res => {
        //         const page = res.data.page;
        //         this.copyrights = page.records;
        //         this.page = page;
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // },

        currentchange(current) {
            this.getCopyRightsById(parseInt(localStorage.getItem("UserID")));
            this.page.current = current;//数据更新到目前显示的页面
        },

        // del(id) {
        //     if (confirm("是否删除") == true) {
        //         console.log(id);
        //         const params = {
        //             id: id
        //         }
        //         majorDelId(params).then(res => {
        //             if (res.success) {
        //                 this.getcopyRightsPage(this.page.current)
        //             } else {
        //                 console.log(res.msg);
        //                 return false
        //             }
        //         }).catch(err => {
        //             ElMessage("删除失败")
        //         })
        //     }
        // },
        //控制表单的显示
        toAdd() {//控制添加表单的显示
            this.dialogFormVisible = true;
            this.copyRight= {
                "attachment": "",
                "copyrightNo": "",
                "finishTime": "",
                "id": 0,
                "name": "",
                "publishTime": "",
                "userId": parseInt(localStorage.getItem("UserID"))
            }
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        // 按ID查询
        getCopyRightsById(id) {
            const params = {
                id: id
            }
            copyRightByUserId(params).then(res => {
                console.log(res)
                this.dialogFormVisibleById = false;
                const page = res.data;
                console.log(page.copyrights)
                this.copyrights = page.copyrights;
                this.page = page;
                console.log(this.page)
            }).catch(err => {
                ElMessage("您尚未上传著作权")
                console.log(err);
            })
        },
        save() {
            const copyRight = this.copyRight
            if (copyRight.id == 0) {
                copyRightAdd(copyRight).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getCopyRightsById(parseInt(localStorage.getItem("UserID")))
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
                copyRightEdit(copyRight).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getCopyRightsById(parseInt(localStorage.getItem("UserID")))
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