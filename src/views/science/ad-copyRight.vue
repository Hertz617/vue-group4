<template>
    <!-- el-table显示数据,分页 -->
    <!-- 著作权管理 -->

    <div class="copyrights">

        <div class="copyRight-tools">
            <el-button type="warning" @click="selectById">按著作权人ID查询数据</el-button>
            <el-button type="warning" @click="refresh">刷新查询</el-button>
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

        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>


    <!-- 查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="著作权信息查询">
        <el-form :model="copyright">
            <el-form-item label="著作权人编号" :label-width="140">
                <el-input v-model="searchText" autocomplete="off" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
                <el-button type="primary" @click="getCopyRightsById(searchText)">查询
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
} from '../../http/copyRight';
import {
    copyRightById,

    copyRightByUserId,
} from '../../http/major';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            currentCtrl: 0,
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
                const page = res.data.page;
                this.copyrights = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },


        selectById() {
            this.dialogFormVisibleById = true;
        },
        refresh() {//刷新按钮
            this.getcopyRightsPage(1);
            this.currentCtrl=0;
        },
        // 按ID查询
        getCopyRightsById(id) {
            this.currentCtrl=1;
            const params = {
                id: id
            }
            copyRightByUserId(params).then(res => {
                this.dialogFormVisibleById = false;
                const page = res.data;
                this.copyrights = page.copyrights;
                this.page = page;
            }).catch(err => {
                ElMessage("查询失败，没有该著作权")
                this.refresh();
            })
        },
        currentchange(current) {
            if (this.currentCtrl == 0) {
                this.getcopyRightsPage(current);
                this.page.current = current;//数据更新到目前显示的页面
            }else{
                this.getCopyRightsById(this.searchText);
                this.page.current = current;//数据更新到目前显示的页面
            }
        },

    }
});
</script>
<style lang = "scss" scoped></style>