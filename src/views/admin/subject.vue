<template>
    <!-- subject -->
    <!-- el-table显示数据,分页 -->

    <div class="subjects">

        <div class="subject-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="selectById">按ID查询数据</el-button>
            <el-button type="warning" @click="refresh">刷新查询</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="subjects" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="60" align="center" />
            <el-table-column prop="name" label="课题名称" />
            <el-table-column prop="origin" label="课题来源" />
            <el-table-column prop="fee" label="课题费用" />
            <el-table-column prop="finished" label="是否结项" />
            <el-table-column prop="participant" label="参与者" />
            <el-table-column prop="period" label="课题周期" />
            <el-table-column prop="level" label="课题等级" />
            <el-table-column prop="subjectNo" label="课题编号" />
            <el-table-column prop="type" label="课题类型" />
            <el-table-column prop="attachment" label="佐证材料" />
            <el-table-column prop="userId" label="负责人" />
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
    <el-dialog v-model="dialogFormVisible" title="课题信息编辑">
        <el-form :model="Subject">
            <el-form-item label="编号" :label-width="formLabelWidth">
                <el-input v-model="Subject.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题名称" :label-width="formLabelWidth">
                <el-input v-model="Subject.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题来源" :label-width="formLabelWidth">
                <el-input v-model="Subject.origin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题费用" :label-width="formLabelWidth">
                <el-input v-model="Subject.fee" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否结项" :label-width="formLabelWidth">
                <el-input v-model="Subject.finished" autocomplete="off" />
            </el-form-item>
            <el-form-item label="参与者" :label-width="formLabelWidth">
                <el-input v-model="Subject.participant" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题周期" :label-width="formLabelWidth">
                <el-input v-model="Subject.period" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题等级" :label-width="formLabelWidth">
                <el-input v-model="Subject.level" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题编号" :label-width="formLabelWidth">
                <el-input v-model="Subject.subjectNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题类型" :label-width="formLabelWidth">
                <el-input v-model="Subject.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="Subject.attachment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
                <el-input v-model="Subject.userId" autocomplete="off" />
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


    <!-- ID查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="ID查询">
        <el-form :model="Subject">
            <el-form-item label="请输入ID" :label-width="120">
                <el-input v-model="searchText" placeholder="按ID搜索，请输入ID" style="margin-bottom: 20px;" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
                <el-button type="primary" @click="getSubjectsById(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import {
    subjectPage,
    subjectAdd,
    subjectEdit,
    subjectSelectById,
} from '../../http/subject';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            subjects: [],
            subject: [],
            page: {
                total: 0,
                current: 2,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            Subject: {
                "attachment": "",
                "fee": 0,
                "finished": "",
                "id": 0,
                "level": "",
                "name": "",
                "origin": "",
                "participant": "",
                "period": "",
                "subjectNo": "",
                "type": "",
                "userId": 0
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getSubjectsPage(1)
    },
    methods: {
        toEdit(subject) {
            this.dialogFormVisible = true;
            this.Subject = cloneDeep(subject);
        },
        // 按page展示
        getSubjectsPage(current) {
            const data = {
                current: current,
                size: 4
            }

            subjectPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.subjects = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },

        // 按ID查询专业
        getSubjectsById(id) {
            this.subject = [];
            const params = {
                id: id
            }
            subjectSelectById(params).then(res => {
                this.dialogFormVisibleById = false;
                this.subject.push(res.data.subject);
                const subjects = this.subject;
                this.subjects = subjects;
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该课题")
                console.log(err);
            })
        },

        currentchange(current) {
            this.getSubjectsPage(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        del(id) {
            if (confirm("是否删除") == true) {
                console.log(id);
                const params = {
                    id: id
                }
                subjectDelId(params).then(res => {
                    if (res.success) {
                        this.getSubjectsPage(this.page.current)
                    } else {
                        console.log(res.msg);
                        return false
                    }
                }).catch(err => {
                    ElMessage("删除失败")
                })
            }
        },
        //控制表单的显示
        toAdd() {//控制添加表单的显示
            this.dialogFormVisible = true;
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        refresh() {//刷新按钮
            this.getSubjectsPage(1);
        },

        save() {
            const subject = this.Subject
            if (subject.id == 0) {
                subjectAdd(subject).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getSubjectsPage(this.page.current)
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
                subjectEdit(subject).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getSubjectsPage(this.page.current)
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