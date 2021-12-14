<template>
  <div class="box-card">
    <el-row>
      <el-col>
        <el-card shadow="always">
          <el-form label-position="left" label-width="80px" :model="user">
            <el-form-item label="手机号">
              <el-input v-model="user.phone">
                <template slot="append">
                  <el-button size="mini" :disabled="disa" @click="sendCode">
                    {{ sendCodeMsg }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="user.code"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="primary" @click="sendRegister">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        phone: "",
        code: "",
        pwd: "",
      },
      disa: false,
      sendCodeMsg: "发送验证码",
    };
  },
  methods: {
    async sendRegister() {
      const res = await this.$auths.signUpWithPhoneCode(
        this.user.phone,
        this.user.code,
        this.user.pwd
      );
      if (res) {
        console.log("注册成功");
        this.$router.push({ path: "/login" });
      }
    },
    async sendCode() {
      const res = await this.$auths.sendPhoneCode(this.user.phone);
      if (res) {
        // 验证码发送成功
        this.disabled = true;
        this.sendCodeMsg = "有效期5分钟";
      } else {
        console.log("短信发送失败");
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
