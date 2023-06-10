<template>
  <div class="head">
    <div class="Paper-tools">
      <el-button type="warning" @click="toAdd">添加</el-button>
      <el-button type="warning" @click="searchById">根据论文编号搜索</el-button>
      <el-button type="warning" @click="searchByUserId">根据作者编号查询</el-button>
      <el-button type="warning" @click="refresh()">刷新查询</el-button>
    </div>
    <el-table :data="papers" style="width: 100%">
      <el-table-column fixed prop="id" label="论文编号" width="120" />
      <el-table-column fixed prop="name" label="论文题目" width="120" />
      <el-table-column fixed prop="publication" label="刊物" width="120" />
      <el-table-column fixed prop="publicationCate" label="刊物种类" width="120" />
      <el-table-column fixed prop="publishTime" label="发表时间" width="120" />
      <el-table-column fixed prop="type" label="论文类型" width="120" />
      <el-table-column fixed prop="userId" label="作者编号" width="120" />
      <el-table-column fixed prop="attachment" label="佐证材料" width="120" />
      <el-table-column fixed prop="count" label="引用次数" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
          <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
      @current-change="currentchange" />
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加Paper表单">
    <el-form :model="Paper">
      <el-form-item label="论文编号" :label-width="formLabelWidth">
        <el-input v-model="Paper.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="论文题目" :label-width="formLabelWidth">
        <el-input v-model="Paper.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="刊物" :label-width="formLabelWidth">
        <el-input v-model="Paper.publication" autocomplete="off" />
      </el-form-item>
      <el-form-item label="刊物种类" :label-width="formLabelWidth">
        <el-input v-model="Paper.publicationCate" autocomplete="off" />
      </el-form-item>
      <el-form-item label="发表时间" :label-width="formLabelWidth">
        <el-input v-model="Paper.publishTime" autocomplete="off" />
      </el-form-item>
      <el-form-item label="论文类型" :label-width="formLabelWidth">
        <el-input v-model="Paper.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作者编号" :label-width="formLabelWidth">
        <el-input v-model="Paper.userId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="佐证材料" :label-width="formLabelWidth">
        <el-input v-model="Paper.attachment" autocomplete="off" />
      </el-form-item>
      <el-form-item label="引用次数" :label-width="formLabelWidth">
        <el-input v-model="Paper.count" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save()"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisibleById" title="根据论文编号查询">
    <el-form :model="paper">
      <el-form-item label="请输入论文编号" :label-width="formLabelWidth">
        <el-input v-model="searchText" placeholder="请输入论文ID" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
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
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
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
  PaperAdd,
  PaperDelete,
  PaperEdit,
  GetOnePaper,
  getPaperByUserId,
} from "../../http/paper";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";

export default defineComponent({
  data() {
    return {
      papers: [],
      paper: [],
      pi: [],
      searchText: "",
      userId: '',
      fileList: "",

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
    },
    toEdit(Paper) {
      console.log(Paper);
      this.dialogFormVisible = true;
      this.Paper = cloneDeep(Paper);
    },
    getPaperPage(current) {
      const data = {
        current: current,
        size: 2,
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
      this.getPaperPage(current);
      this.page.current = current; //数据更新目前显示的页面
    },

    getPaperById(id) {
      console.log(id);
      this.paper = [];
      const params = {
        id: id,
      };
      GetOnePaper(params).then((res) => {
        this.dialogFormVisibleById = false;
        console.log(res);
        this.paper.push(res.data.paper);
        const papers = this.paper;
        this.papers = papers;
      });
    },

    getPapers(fileList) {
      this.papers = [];
      const params = {
        id: fileList,
      };
      console.log(params);
      getPaperByUserId(params).then((res) => {
        this.dialogFormVisibleByUserId = false;
        console.log(res);
        this.papers = res.data.papers;
        const pi = this.papers;
        this.pi = pi;
      });
    },


    del(id) {
      if (confirm("是否删除") == true) {
        console.log(id);
        const params = {
          id: id,
        };
        PaperDelete(params)
          .then((res) => {
            if (res.success) {
              this.getPaperPage(this.page.current);
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch((err) => { });
      }
    },

    toAdd() {
      this.dialogFormVisible = true;
    },
    searchById() {
      this.dialogFormVisibleById = true;
    },
    searchByUserId() {
      this.dialogFormVisibleByUserId = true;
    },
    save() {
      const Paper = this.Paper;
      if (Paper.id == 0) {
        PaperAdd(Paper)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getPaperPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        PaperEdit(Paper)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getPaperPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
