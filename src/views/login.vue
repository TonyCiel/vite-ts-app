<template>
  <div class="login-page">
    <header class="login-header">
      <div
        class="login-title flexlayout flexlayout_middle flexlayout_horizontal"
      >
        <img class="login-title-icon" src="/@/assets/logo_blue.png" />
        <p>vue3.0管理平台</p>
      </div>
      <div class="login-desc">
        前端UI项目，基于vue3.0 、elementPlus、typescript、node等流行技术栈。
      </div>
    </header>
    <section class="login-content">
      <el-form
        label-position="top"
        label-width="100px"
        :model="loginFrom"
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item label="用户名:" prop="name">
          <el-input
            v-model="loginFrom.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码: " prop="password">
          <el-input
            show-password
            type="password"
            placeholder="请输入密码"
            v-model="loginFrom.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click.stop="submitLogin"
            :type="loginBtnDisabled ? 'primary' : 'info'"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, Ref, ref, unref, onMounted } from "vue";
import { valideForm } from "../utils/formUtils";
import { ElMessage } from "element-plus";
import { setStore } from "../utils/store";
import { homePage } from "../../env.js";
import { encryptAES } from "../utils/CryptyE";
import { login } from "../api/user/index";
import useBasicHook from '../hooks/basic';
export default defineComponent({
  setup() {
    const {router,store} = useBasicHook();
    const loginForm: Ref = ref(); // 使用ref拿dom元素的时候一定要记得 在setup中return出去
    const state = reactive({
      loginFrom: {
        name: "test",
        password: "test@2021&123",
      },
      loginRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    });
    // 登录按钮是否置灰
    const loginBtnDisabled = computed(() => {
      let { name, password } = state.loginFrom;
      return name && password;
    });
    // 模拟登录，账号密码是否正确 Admin admin2021
    const isAllowPass = computed(() => {
      return (
        state.loginFrom.name === "Admin" &&
        state.loginFrom.password === "admin2021"
      );
    });
    // 登录
    const submitLogin = async () => {
      if (!loginBtnDisabled.value) return;
      let result = await valideForm(loginForm);
      if (!result) {
        return;
      }
      let {name,password} = state.loginFrom;
      let res = await login({
          account: name,
          password: encryptAES(password,'998877001'),
      })
      store.commit("UPDATE_USERINFO", res.data);
      setStore("token", "ax1KywunnAmsp949Gyu", "session"); // 随便设置一个token，没用node生成了
      ElMessage.success("欢迎回来～");
      router.push({
        path: homePage,
      });
    };
    // onMounted(() => {
    //   console.log('fromRed',loginForm.value)
    //   console.log('from',unref(loginForm))
    // })
    return {
      ...toRefs(state),
      loginBtnDisabled,
      loginForm,
      submitLogin,
      isAllowPass,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "/@/styles/common.scss";
.login-page {
  @include bgCss(center, 100%);
  width: 100vw;
  height: 100vh;
  background-image: url(/@/assets/loginBg.svg);
  padding-top: 20vh;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .login-header {
    margin: 0 auto;
    text-align: center;
    .login-title {
      position: relative;
      width: 100%;
      height: 56px;
      line-height: 56px;
      color: rgba(12, 12, 12, 0.85);
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      .login-title-icon {
        width: 46px;
        margin-right: 10px;
      }
    }
    .login-desc {
      margin-top: 12px;
      margin-bottom: 40px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
  .login-content {
    width: 410px;
    margin: 0 auto;
    :deep .el-input__inner {
      background-color: white;
    }
    :deep .el-button {
      width: 100%;
    }
  }
}
</style>
