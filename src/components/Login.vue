<template>
  <div class="box-card">
    <el-row>
      <el-col>
        <el-card shadow="always">
          <el-form label-position="left" label-width="80px" :model="user">
            <el-form-item label="手机号">
              <el-input v-model="user.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="primary" @click="Login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        phoneNumber: "",
        password: "",
      },
    };
  },
  methods: {
    async Login() {
      // 登陆
      const res = await this.$auths.signInWithPhoneCodeOrPassword(this.user);
      if (res) {
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>
<style>
.box-card {
  margin: 0 auto;
  width: 580px;
  margin-bottom: 20px;
}
</style>
