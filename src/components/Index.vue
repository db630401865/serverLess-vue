<template>
  <div>
    <div class="box-card">
      <el-card shadow="always">
        <el-input v-model="addData.title" placeholder="请输入内容">
          <el-button slot="append" @click="addTodo">添加任务</el-button>
        </el-input>
      </el-card>
    </div>
    <el-card class="box-card">
      <div v-for="(todo, key) in todos" :key="key" class="text item">
        <template v-if="todo.done == false">
          <div class="lists">
            <el-checkbox v-model="todo.done" @change="todoDone(key)">
              {{ todo.title }}
            </el-checkbox>
            <div>
              <i class="el-icon-notebook-2" @click="showTodo(key)"></i> |
              <i class="el-icon-delete" @click="deleteTodo(key)"></i>
            </div>
          </div>
          <el-divider></el-divider>
        </template>
      </div>
    </el-card>
    <el-drawer title="任务详情" :visible.sync="drawer">
      <div class="dra">
        <p>任务：{{ drawerTodo.title }}</p>
        <p>
          附件：
          <br />
          <img :src="drawerTodo.tempfile" alt="" />
        </p>
        <p>
          <input type="file" ref="fil" />
          <el-button @click="upFile(drawerTodo._id)"> 点击上传 </el-button>
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addData: {
        title: "",
      },
      todos: [],
      drawer: false,
      drawerTodo: "",
    };
  },
  methods: {
    async getdata() {
      var back = await this.$cloudbase.callFunction({
        name: "gettodo",
      });
      this.todos = back.result.data;
      console.log(this.todos);
    },

    async addTodo() {
      var todoData = this.addData;
      var back = await this.$cloudbase.callFunction({
        name: "addtodo",
        data: todoData,
      });
      console.log(back);
      this.getdata();
    },

    async deleteTodo(key) {
      let todoInfo = this.todos[key];
      var back = await this.$cloudbase.callFunction({
        name: "deltodo",
        data: { _id: todoInfo._id },
      });
      console.log(back);
      this.getdata();
    },
    // 展示详情
    async showTodo(key) {
      var todoInfo = this.todos[key];
      console.log(todoInfo.fileId);
      if (todoInfo.fileId !== undefined) {
        // 获取上传的临时链接
        var back = await this.$cloudbase.getTempFileURL({
          fileList: [todoInfo.fileId],
        });
        this.drawerTodo = todoInfo;
        this.drawerTodo.tempfile = back.fileList[0].tempFileURL;
      }
      this.drawer = true;
    },
    // 上传
    async upFile(id) {
      var s = this.$refs.fil.files[0];
      // uploadFile 就是云对象存储提供的接口，集成到了vue 云开发插件中
      var back = await this.$cloudbase.uploadFile({
        // 云存储的路径
        cloudPath: "todo/" + Date.now() + s.name,
        // 需要上传的文件，File 类型
        filePath: this.$refs.fil.files[0],
      });
      console.log(id, back);
      var changeData = {
        _id: id,
        fileId: back.fileID,
      };
      var changeBack = await this.$cloudbase.callFunction({
        name: "puttodo",
        data: changeData,
      });
      console.log(changeBack);
    },
  },
  async mounted() {
    // var auth = this.$cloudbase.auth();
    // auth.anonymousAuthProvider().signIn();
    // 判断是否登陆
    var hls = await this.$auths.getLoginState();
    if (hls == null) {
      this.$router.push({ path: "/login" });
    }
    this.getdata();
  },
};
</script>
