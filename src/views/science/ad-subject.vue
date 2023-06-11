<template>
    <!-- subject -->
    <!-- el-table显示数据,分页 -->

    <div class="subjects">

        <div class="subject-tools">
            <el-button type="warning" @click="selectById">按负责人ID查询数据</el-button>
            <el-button type="warning" @click="refresh">刷新查询</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="subjects" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="60" align="center" />
            <el-table-column prop="name" label="课题名称" />
            <el-table-column prop="userId" label="负责人" />
            <el-table-column prop="origin" label="课题来源" />
            <el-table-column prop="fee" label="课题费用" />
            <el-table-column prop="finished" label="是否结项" />
            <el-table-column prop="participant" label="参与者" />
            <el-table-column prop="period" label="课题周期" />
            <el-table-column prop="level" label="课题等级" />
            <el-table-column prop="subjectNo" label="课题编号" />
            <el-table-column prop="type" label="课题类型" />
            <el-table-column prop="attachment" label="佐证材料" />
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>

    <!-- ID查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="ID查询">
        <el-form :model="Subject">
            <el-form-item label="请输入负责人ID" :label-width="120">
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
    subjectSelectByUserId,
} from '../../http/subject';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            subjects: [],
            subject: [],
            currentCtrl: 0,
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
                const page = res.data.page;
                this.subjects = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },
        refresh() {//刷新按钮
            this.getSubjectsPage(1);
            this.currentCtrl = 0;
        },

        // 按ID查询专业
        getSubjectsById(id) {
            this.currentCtrl = 1;
            this.subject = [];
            const params = {
                id: id
            }
            subjectSelectByUserId(params).then(res => {
                console.log(res)
                this.dialogFormVisibleById = false;
                const page = res.data;
                this.subjects = page.subjects;
                this.page = page;
            }).catch(err => {
                ElMessage("查询失败，没有该课题")
                this.refresh();
                console.log(err);
            })
        },

        currentchange(current) {
            if (this.currentCtrl == 0) {
                this.getSubjectsPage(current);
                this.page.current = current;//数据更新到目前显示的页面
            } else {
                this.getSubjectsById(this.searchText);
                this.page.current = current;//数据更新到目前显示的页面
            }
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        refresh() {//刷新按钮
            this.getSubjectsPage(1);
        },

    }
});
</script>
<style lang = "scss" scoped></style>