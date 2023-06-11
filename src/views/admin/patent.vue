<template>
    <!-- el-table显示数据,分页 -->
  
    <div class="patent">
      <div class="patent-tools">
        <el-button type="warning" @click="toAdd">添加</el-button>
        <!--             <el-button type="warning" @click="selectById">按ID查询数据</el-button> -->
      </div>
      <!-- 表单显示部分 -->
      <el-table :data="patent" style="width: 100%">
        <el-table-column fixed prop="id" width="50" />
        <el-table-column prop="name" label="专利名称" width="180" />
        <el-table-column prop="userId" label="发明人" width="80" />
        <el-table-column prop="type" label="专利类型" width="120" />
        <el-table-column prop="empowerTime" label="授权时间" width="250" />
        <el-table-column prop="attachment" label="佐证材料" width="180" />
        <el-table-column prop="address" label="申请地址" width="150" />
        <el-table-column prop="patentNo" label="专利号" width="180" />
        <el-table-column fixed="right" label="功能管理" width="100">
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
    <el-dialog v-model="dialogFormVisible" title="专利编辑">
      <el-form :model="adPatent">
        <el-form-item label="专利名称" :label-width="formLabelWidth">
          <el-input v-model="adPatent.name" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="发明人" :label-width="formLabelWidth">
          <el-input v-model="adPatent.userId" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="专利类型" :label-width="formLabelWidth">
          <!-- <el-input v-model="adPatent.type" autocomplete="off" /> -->
          <el-select v-model="adPatent.type" placeholder="请选择专利类型" autocomplete="off">
            <el-option label="发明专利" value="发明专利"></el-option>
            <el-option label="实用新型专利" value=" 实用新型专利"></el-option>
            <el-option label="外观设计" value="外观设计"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权时间" :label-width="formLabelWidth">
          <el-date-picker v-model="adPatent.empowerTime" autocomplete="off" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="佐证材料" :label-width="formLabelWidth">
          <el-input v-model="adPatent.attachment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="申请地址" :label-width="formLabelWidth">
          <el-input v-model="adPatent.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专利号" :label-width="formLabelWidth">
          <el-input v-model="adPatent.patentNo" autocomplete="off" />
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
  
    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="专利查询">
      <el-form :model="adPatent">
        <el-form-item label="请输入专利ID" :label-width="formLabelWidth">
          <el-input v-model="searchText" placeholder="按专利ID查询，请输入专利ID" autocomplete="off" />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
          <el-button type="primary" @click="getById(searchText)">查询
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
    
  <script>
  import { defineComponent } from 'vue';
  import { patentAdd, patentDelId, patentPage, patentEdit, patentPageId } from '../../http/patent';
  import { cloneDeep } from 'lodash-es';
  export default defineComponent({
    name: 'cli-patent',
    data() {
      return {
        UserID: 0,
        searchText: "",
        patent: [],
        patents: [],
        page: {
          total: 0,
          current: 1,
          size: 5
        },
        dialogFormVisible: false,
        dialogFormVisibleById: false,
        adPatent: {
          "address": "",
          "attachment": "",
          "empowerTime": "",
          "id": 0,
          "name": "",
          "patentNo": "",
          "type": "",
          "userId": 0
        },
        formLabelWidth: 120,
      }
    },
    mounted() {
      this.getById(parseInt(localStorage.getItem("UserID")))
  
    },
    methods: {
      toEdit(adpatent) {
        this.dialogFormVisible = true;
        this.adPatent = cloneDeep(adpatent);
      },
      // 按page展示
      getPatentPage(current) {
        // console.log(parseInt(sessionStorage.getItem("key")))
        const data = {
          current: current,
          size: 5
        }
        patentPage(data).then(res => {
          const page = res.data.page;
          this.patent = page.records;
          this.page = page;
        }).catch(err => {
          console.log(err);
        })
      },
      currentchange(current) {
        // console.log(current);
        this.getById(parseInt(localStorage.getItem("UserID")));
        this.page.current = current;//数据更新到目前显示的页面
      },
      //删除
      del(id) {
        if (confirm("是否删除") == true) {
          // console.log(id);
          const params = {
            id: id
          }
  
          patentDelId(params).then(res => {
            console.log(res)
            if (res.success) {
              this.getById(parseInt(localStorage.getItem("UserID")));
            } else {
              // console.log(res.msg);
              return false
            }
          }).catch(err => {
            ElMessage('删除失败')
          })
        }
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.adPatent = {
          "address": "",
          "attachment": "",
          "empowerTime": "",
          "id": 0,
          "name": "",
          "patentNo": "",
          "type": "",
          "userId": parseInt(localStorage.getItem("UserID"))
        }
      },
      selectById() {
        this.dialogFormVisibleById = true;
      },
      // 按ID查询
      getById(id) {
        console.log(parseInt(localStorage.getItem("UserID")))
        // this.patents = [];//新建一个数组
        const params = {
          id: id
        }
        patentPageId(params).then(res => {
          console.log(res)
          this.dialogFormVisibleById = false;
          const page = res.data;
          this.patent = page.patents;
          console.log(this.patent)
          this.page = page;
        }).catch(err => {
          ElMessage("您尚未上传专利")
          console.log(err);
        })
      },
      save() {
        const adpatent = this.adPatent
        if (adpatent.id == 0) {
          patentAdd(adpatent).then(res => {
            if (res.success) {
              this.dialogFormVisible = false
              this.getById(parseInt(localStorage.getItem("UserID")));
              ElMessage(res.msg)
            } else {
              ElMessage(res.msg)
              return false
            }
          }).catch(err => {
            ElMessage('网络添加错误联系管理员')
          })
        }
        else {
          patentEdit(adpatent).then(res => {
            if (res.success) {
              this.dialogFormVisible = false
              this.getById(parseInt(localStorage.getItem("UserID")));//更新页面
              ElMessage(res.msg)
            } else {
              ElMessage(res.msg)
              return false
            }
  
          }).catch(err => {
            ElMessage('网络编辑错误联系管理员')
          })
        }
      }
    }
  });
  </script>
  <style lang = "scss" scoped></style>
    