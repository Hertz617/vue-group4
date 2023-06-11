<template>
    <!-- subject -->
    <!-- el-table显示数据,分页 -->

    <div class="subjects">

        <div class="subject-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <!-- <el-button type="warning" @click="selectById">按ID查询数据</el-button> -->
            <!-- <el-button type="warning" @click="refresh">刷新查询</el-button> -->
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
            <el-table-column fixed="right" label="功能管理" width="120">
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
    <el-dialog v-model="dialogFormVisible" title="课题信息编辑">
        <el-form :model="Subject">
            <!-- <el-form-item label="编号" :label-width="formLabelWidth">
                <el-input v-model="Subject.id" autocomplete="off" />
            </el-form-item> -->
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
                <!-- <el-input v-model="Subject.finished" autocomplete="off" /> -->
                <el-select v-model="subject.finished" placeholder="请选择是否结项" autocomplete="off">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参与者" :label-width="formLabelWidth">
                <el-input v-model="Subject.participant" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题周期" :label-width="formLabelWidth">
                <el-input v-model="Subject.period" autocomplete="off" />
                <!-- <el-date-picker v-model="Subject.period" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" autocomplete="off" ></el-date-picker> -->
            </el-form-item>
            <el-form-item label="课题等级" :label-width="formLabelWidth">
                <el-input v-model="Subject.level" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题编号" :label-width="formLabelWidth">
                <el-input v-model="Subject.subjectNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题类型" :label-width="formLabelWidth">
                <!-- <el-input v-model="Subject.type" autocomplete="off" /> -->
                <el-select v-model="subject.type" placeholder="请选择课题类型" autocomplete="off">
                    <el-option label="科技类" value="科技类"></el-option>
                    <el-option label="教改类" value="教改类"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="Subject.attachment" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="Paper.attachment" autocomplete="off" />
                <el-upload class="upload-demo" v-model="Paper.attachment" autocomplete="off"
                    action:http-request="uploadFile" ref="upload" :limit="fileLimit" :on-remove="handleRemove"
                    :file-list="fileList" :on-exceed="handleExceed" :http-request="uploadHttpRequest"
                    :before-upload="beforeUpload" :show-file-list="false" :headers="headers">
                    action="/api/file/fileUpload" 
                    <el-button class="btn"><i class="el-icon-paperclip"></i>上传附件</el-button>
                </el-upload>
            </el-form-item> -->
            <!-- <el-form-item label="负责人" :label-width="formLabelWidth">
                <el-input v-model="Subject.userId" autocomplete="off" />
            </el-form-item> -->
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
    <!-- <el-dialog v-model="dialogFormVisibleById" title="ID查询">
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
    </el-dialog> -->
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
            fileList: "",
            //上传后的文件列表
            fileList: [],
            // 允许的文件类型
            fileType: ["pdf", "doc", "docx", "xls", "xlsx", "txt", "png", "jpg", "bmp", "jpeg"],
            // 运行上传文件大小，单位 M
            fileSize: 50,
            // 附件数量限制
            fileLimit: 5,
            //请求头
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
                "userId": parseInt(localStorage.getItem("UserID"))
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getSubjectsById(parseInt(localStorage.getItem("UserID")))
    },
    methods: {
        //上传文件之前
        beforeUpload(file) {
            if (file.type != "" || file.type != null || file.type != undefined) {
                //截取文件的后缀，判断文件类型
                const FileExt = file.name.replace(/.+\./, "").toLowerCase();
                //计算文件的大小
                const isLt5M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
                //如果大于50M
                if (!isLt5M) {
                    this.$showMessage('上传文件大小不能超过 50MB!');
                    return false;
                }
                //如果文件类型不在允许上传的范围内
                if (this.fileType.includes(FileExt)) {
                    return true;
                }
                else {
                    this.$message.error("上传文件格式不正确!");
                    return false;
                }
            }
        },
        //上传了的文件给移除的事件，由于我没有用到默认的展示，所以没有用到
        handleRemove() {
        },
        //这是我自定义的移除事件
        handleClose(i) {
            this.fileList.splice(i, 1);//删除上传的文件
            if (this.fileList.length == 0) {//如果删完了
                this.fileflag = true;//显示url必填的标识
                this.$set(this.rules.url, 0, { required: true, validator: this.validatorUrl, trigger: 'blur' })//然后动态的添加本地方法的校验规则
            }
        },
        //超出文件个数的回调
        handleExceed() {
            this.$message({
                type: 'warning',
                message: '超出最大上传文件数量的限制！'
            }); return
        },
        //上传文件的事件
        uploadFile(item) {
            this.$showMessage('文件上传中........')
            //上传文件的需要formdata类型;所以要转
            let FormDatas = new FormData()
            FormDatas.append('file', item.file);
            this.$axios({
                method: 'post',
                url: '/file/fileUpload',
                headers: this.headers,
                timeout: 30000,
                data: FormDatas
            }).then(res => {
                if (res.data.id != '' || res.data.id != null) {
                    this.fileList.push(item.file);//成功过后手动将文件添加到展示列表里
                    let i = this.fileList.indexOf(item.file)
                    this.fileList[i].id = res.data.id;//id也添加进去，最后整个大表单提交的时候需要的
                    if (this.fileList.length > 0) {//如果上传了附件就把校验规则给干掉
                        this.fileflag = false;
                        this.$set(this.rules.url, 0, '')
                    }
                    //this.handleSuccess();
                }
            })
        },
        //上传成功后的回调
        handleSuccess() {

        },
        toEdit(subject) {
            this.dialogFormVisible = true;
            this.Subject = cloneDeep(subject);
        },
        // 按page展示
        getSubjectsPage(current) {
            console.log("page")
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

        // 按ID查询专业
        getSubjectsById(id) {
            console.log("userid")
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
                ElMessage("您尚未上传课题")
                console.log(err);
            })
        },

        currentchange(current) {
            console.log("current")
            this.getSubjectsById(parseInt(localStorage.getItem("UserID")));
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
                        this.getSubjectsById(parseInt(localStorage.getItem("UserID")))
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
            this.Subject = {
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
                "userId": parseInt(localStorage.getItem("UserID"))
            }
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
                        this.getSubjectsById(parseInt(localStorage.getItem("UserID")))
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
                        this.getSubjectsById(parseInt(localStorage.getItem("UserID")))
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