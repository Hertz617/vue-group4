<template>
  <!-- el-table显示数据,分页 -->

  <div class="patent">
    <div class="patent-tools">
      <el-button type="warning" @click="selectById">按发明人ID查询数据</el-button>
      <el-button type="warning" @click="refresh">刷新查询</el-button>
    </div>
    <!-- 表单显示部分 -->
    <el-table :data="patent" style="width: 100%">
      <el-table-column fixed prop="id" width="50" />
      <el-table-column prop="name" label="专利名称" width="180" />
      <el-table-column prop="userId" label="发明人" width="100" />
      <el-table-column prop="type" label="专利类型" width="120" />
      <el-table-column prop="empowerTime" label="授权时间" width="250" />
      <el-table-column prop="attachment" label="佐证材料" width="250" />
      <el-table-column prop="address" label="申请地址" width="150" />
      <el-table-column prop="patentNo" label="专利号" width="180" />

    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
      @current-change="currentchange" />
  </div>


  <!-- 按id查询按钮点击后出现的表单 -->
  <el-dialog v-model="dialogFormVisibleById" title="专利查询">
    <el-form :model="adPatent">
      <el-form-item label="请输入发明人ID" :label-width="formLabelWidth">
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
      currentCtrl: 0,
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
    this.getPatentPage(1)

  },
  methods: {
    toEdit(adpatent) {
      this.dialogFormVisible = true;
      this.adPatent = cloneDeep(adpatent);
    },
    refresh() {//刷新按钮
      this.getPatentPage(1);
      this.currentCtrl = 0;
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
      if (this.currentCtrl == 0) {
        this.getPatentPage(current);
        this.page.current = current;//数据更新到目前显示的页面
      } else {
        this.getById(this.searchText);
        this.page.current = current;//数据更新到目前显示的页面
      }
    },

    selectById() {
      this.dialogFormVisibleById = true;
    },
    // 按ID查询
    getById(id) {
      this.currentCtrl=1;
      const params = {
        id: id
      }
      patentPageId(params).then(res => {
        console.log(res)
        this.dialogFormVisibleById = false;
        const page = res.data;
        this.patent = page.patents;
        this.page = page;
      }).catch(err => {
        ElMessage("查询失败，没有该专利")
        this.refresh();
        console.log(err);
      })
    },
  }
});
</script>
<style lang = "scss" scoped></style>
  