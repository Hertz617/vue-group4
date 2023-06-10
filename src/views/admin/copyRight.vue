<template>
    <!-- el-table显示数据,分页 -->
    <!-- 著作权管理 -->

    <div class="copyrights">

        <div class="copyRight-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="selectById">查找</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="copyrights" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="100" />
            <el-table-column prop="attachment" label="佐证材料" width="160" />
            <el-table-column prop="copyrightNo" label="著作权编号" width="140" />
            <el-table-column prop="finishTime" label="完成时间" width="140" />
            <el-table-column prop="name" label="著作权名称" width="140" />
            <el-table-column prop="publishTime" label="首次发表时间" width="140" />
            <el-table-column prop="userId" label="著作权人：第一位" width="140" />
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
    <el-dialog v-model="dialogFormVisible" title="添加著作权信息">
        <el-form :model="copyRight">
            <el-form-item label="著作权名称" :label-width="formLabelWidth">
                <el-input v-model="copyRight.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="著作权人" :label-width="formLabelWidth">
                <el-input v-model="copyRight.userId" autocomplete="off" />
            </el-form-item>
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
    <el-dialog v-model="dialogFormVisibleById" title="著作权信息查询">
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
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import {
    copyRightPage,
    copyRightAdd,
    copyRightEdit,
    copyRightById,
} from '../../http/copyRight';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            copyrights: [],
            copyright: [],
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
                "userId": 0
            },
            formLabelWidth: 100
        }
    },
    mounted() {
        this.getcopyRightsPage(1);
        // this.job()
    },

    methods: {
        job() {
            post("api/copyright/one", {  //这个里面的写路径的后面一部分，前面记得加上/api
                token: "",
                page: this.page,
                count: this.count,
                type: this.type,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log("请求失败");
                });
        },
        toEdit(copyRight) {
            this.dialogFormVisible = true;
            this.copyRight = cloneDeep(copyRight);
        },
        // 按page展示
        getcopyRightsPage(current) {
            const data = {
                current: current,
                size: 4
            }

            copyRightPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.copyrights = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },

        currentchange(current) {
            this.getcopyRightsPage(current);
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
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        // 按ID查询
        getCopyRightsById(id) {
            this.copyright = [];
            const params = {
                id: id
            }
            copyRightById(params).then(res => {
                this.dialogFormVisibleById = false;
                console.log("错误信息")
                console.log(res);
                this.copyright.push(res.data.copyright);
                const copyrights = this.copyright;
                this.copyrights = copyrights;
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该专利")
                console.log(err);
            })
        },
        refresh() {//刷新按钮
            this.getcopyRightsPage(1);
        },

        save() {
            const copyRight = this.copyRight
            if (copyRight.id == 0) {
                copyRightAdd(copyRight).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getcopyRightsPage(this.page.current)
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
                        this.getcopyRightsPage(this.page.current)
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