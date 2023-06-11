<template>
  <div class="head">
    <div class="Paper-tools">
      <el-button type="warning" @click="searchById">根据论文编号搜索</el-button>
      <el-button type="warning" @click="searchByUserId">根据作者编号查询</el-button>
      <el-button type="warning" @click="refresh()">刷新查询</el-button>
    </div>
    <el-table :data="papers" style="width: 100%">
      <el-table-column fixed prop="id" label="论文编号" width="80" />
      <el-table-column prop="name" label="论文题目" width="120" />
      <el-table-column prop="publication" label="刊物" width="120" />
      <el-table-column prop="publicationCate" label="刊物种类" width="120" />
      <el-table-column prop="publishTime" label="发表时间" width="120" />
      <el-table-column prop="type" label="论文类型" width="120" />
      <el-table-column prop="userId" label="作者编号" width="120" />
      <el-table-column prop="attachment" label="佐证材料" width="120" />
      <el-table-column prop="count" label="引用次数" width="120" />
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
      @current-change="currentchange" />
  </div>

  <el-dialog v-model="dialogFormVisibleById" title="根据论文编号查询">
    <el-form :model="paper">
      <el-form-item label="请输入论文编号" :label-width="formLabelWidth">
        <el-input v-model="searchText" placeholder="请输入论文ID" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
        <el-button type="primary" @click="getPaperById(searchText)">查询
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisibleByUserId" title="根据作者编号查询">
    <el-form :model="paper">
      <el-form-item label="请输入作者编号" :label-width="formLabelWidth">
        <el-input v-model="fileList" placeholder="请输入作者ID" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleByUserId = false">Cancel</el-button>
        <el-button type="primary" @click="getPapers(fileList)">查询
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";

import {
  PaperPage,

  GetOnePaper,
  getPaperByUserId,
} from "../../http/paper";


export default defineComponent({
  data() {
    return {
      papers: [],
      paper: [],
      pi: [],
      searchText: "",
      userId: '',
      fileList: "",
      currentCtrl: 0,
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      dialogFormVisible: false,
      dialogFormVisibleById: false,
      dialogFormVisibleByUserId: false,
      Paper: {
        attachment: "", //佐证材料
        count: 0, //引用次数
        id: 0, //论文编号
        name: "", //论文题目
        publication: "", //刊物
        publicationCate: "", //刊物类型
        publishTime: "", //发表时间
        type: "", //类型
        userId: 0, //作者Id
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getPaperPage(1);
  },

  methods: {
    refresh() {
      this.getPaperPage(1);
      this.currentCtrl = 0;
    },
    getPaperPage(current) {
      const data = {
        current: current,
        size: 4,
      };
      PaperPage(data).then((res) => {
        console.log(res);
        const page = res.data.page;
        this.papers = page.records;
        this.page = page;
      }).catch((err) => {
        console.log(err);
      });
    },

    currentchange(current) {
      // console.log(current);
      if (this.currentCtrl == 0) {
        console.log("0")
        this.getPaperPage(current);
        this.page.current = current;//数据更新到目前显示的页面
      } else if (this.currentCtrl == 1) {
        console.log("1")
        this.getPapers(this.fileList);
        this.page.current = current;//数据更新到目前显示的页面
      } else {
        console.log("2")
        console.log(current)
        this.getPaperById(this.searchText);
        this.page.current = current;//数据更新到目前显示的页面
      }
    },

    getPaperById(id) {
      console.log(id);
      this.paper = [];
      const params = {
        id: id,
      };
      GetOnePaper(params).then((res) => {
        this.dialogFormVisibleById = false;
        this.paper.push(res.data.paper);
        const papers = this.paper;
        this.papers = papers;
        this.page = res.data;
      }).catch((err) => {
        ElMessage("没有查询到该论文");
      });
    },
    //userid
    getPapers(fileList) {
      this.papers = [];
      const params = {
        id: fileList,
      };
      getPaperByUserId(params).then((res) => {
        this.dialogFormVisibleByUserId = false;
        if (res.success) {
          const page = res.data;
          this.papers = page.papers;
          this.page = page;
        } else {
          ElMessage("没有查询到该作者");
          this.refresh();
        }
      })
    },



    searchById() {
      this.currentCtrl = 2;
      this.dialogFormVisibleById = true;
    },
    searchByUserId() {
      this.currentCtrl = 1;
      this.dialogFormVisibleByUserId = true;
    },

  },
});
</script>

<style lang="scss" scoped></style>
