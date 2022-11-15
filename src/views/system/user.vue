<template>
  <el-row type="flex">
    <!-- 角色管理列表 -->
    <el-col :span="6" style="height: calc(100vh - 130px) ">
      <basic-container class="role-wrap">
        <ul>
          <li @click="activeRoleIndex = 0" class="role-title flexlayout flexlayout_middle"
            :class="{ isActive: activeRoleIndex == 0 }">
            <i class="el-icon-office-building"></i>全部角色
          </li>
          <li @click="activeRoleIndex = index + 1" :class="{ isActive: activeRoleIndex == index + 1 }"
            class="role-title flexlayout flexlayout_middle" v-for="(item, index) in roleList" :key="index">
            <p class="flexitem_auto">{{ item['roleName'] }}</p>
            <i @click.stop="editRole(item)" class="el-icon-edit-outline"></i>
            <i @click.stop="reqDeleteRole(item)" class="el-icon-delete"></i>
          </li>
          <li class="role-title">
            <el-button size="small" type="primary" @click="isShowRoleModel = true">新增角色</el-button>
          </li>
        </ul>
      </basic-container>
    </el-col>
    <!-- 用户列表 -->
    <el-col :span="18">
      <basic-container>
        <el-button size="small" type="primary" @click="isShowUserModel = true">+ 新 增 用 户</el-button>
        <basic-table class="user-table" :options="tableOptions" :tableData="myData">
          <template v-slot:operation="{ row }">
            <el-button type="text" @click="editUser(row)">编辑</el-button>
            <el-button type="text" @click="resDeleteUser(row.id)">删除</el-button>
          </template>
        </basic-table>
      </basic-container>
    </el-col>
    <!-- 用户新增或编辑 -->
    <el-dialog v-model="isShowUserModel" title="新增用户" width="30%" append-to-body>
      <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input placeholder="请输入用户名" size="small" v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="账号名" prop="account">
          <el-input placeholder="请输入账号名" size="small" v-model="userInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" size="small" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleids">
          <!-- <el-input size="small" v-model="userInfo.roleids"></el-input> -->
          <el-select size="small" style="width: 100%" v-model="userInfo.roleids" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="`option${item['id']}`" :label="item['roleName']"
              :value="item['id']">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="isShowUserModel = false">取 消</el-button>
          <el-button size="small" type="primary" @click="saveUserInfo">保 存</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 角色新增或编辑 -->
    <el-dialog v-model="isShowRoleModel" title="新增角色" width="30%" append-to-body>
      <div style="margin-bottom: 10px">角色名称:</div>
      <el-input size="small" placeholder="请输入角色名称" v-model="roleInfo.roleName"></el-input>
      <div style="margin: 10px 0">菜单权限:</div>
      <el-tree :data="menuData" show-checkbox node-key="id" ref="menuTree" :props="treeMenuProp">
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="isShowUserModel = false">取 消</el-button>
          <el-button size="small" :loading="isloadingSave" type="primary" @click="saveRoleInfo">保 存</el-button>
        </span>
      </template>
    </el-dialog>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, Ref, ref, unref } from "vue";
import BasicContainer from "../../components/basic-container/index.vue";
import BasicTable from "../../components/basic-table/index.vue";
import {
  getUserList,
  saveRole,
  getRoleList,
  deleteRole,
  saveUser,
  deleteUser
} from "../../api/user/index";
import { reqMenuRoute } from '../../api/system/index'
import { ElMessage, ElMessageBox } from "element-plus";
import { valideForm } from "../../utils/formUtils";
import { encryptAES } from "../../utils/CryptyE";
import { listToTree } from '../../utils/index';
import { User, Role } from '../../type/user';
import { SearchFormSizeEnum , TableInputTypeEnum } from '@/components/basic-table/index';
export default defineComponent({
  components: {
    BasicContainer,
    BasicTable,
  },

  setup() {
    onMounted(async () => {
      getMenuList();
      await reqRoleList();
      await requestUsers();
    });
    // state
    const userForm: Ref = ref();
    const menuTree: Ref = ref();
    const userInfo: Ref<User> = ref({
      userName: "",
      password: "",
      account: "",
      roleids: '',
      id: ''
    });
    const roleInfo: Ref<Role> = ref(
      { roleName: "", id: "" }
    )
    const state = reactive({
      isloadingSave: false,
      tableOptions: {
        border: true,
        selection: true,
        searchFormSize: SearchFormSizeEnum.SMALL,
        column: [
          {
            label: "ID",
            prop: "id",
            search: true,
            type: TableInputTypeEnum.TEXT,
            placeholder: '请输入ID',
          },
          {
            label: "用户名",
            prop: "userName",
            search: true,
            placeholder: '请输入用户名'
          },
          {
            label: "账号",
            prop: "userAccount",
          },
          {
            label: "角色名称",
            prop: "roleName",
            search: true,
            type: TableInputTypeEnum.SELECT,
            placeholder: '请选择角色名称',
            filterable: true,
            dicData: [{
              label: '超级管理',
              value: '0909'
            },
            {
              label: '普通用户',
              value: '0901'
            }]
          },
        ],
      },
      myData: [],
      isShowUserModel: false,
      userRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        // password: [
        //   { required: true, message: "请输入用户密码", trigger: "blur" },
        // ],
        account: [{ required: true, message: "请输入用账号", trigger: "blur" }],
        roleids: [{ required: true, message: "请选中", trigger: "blur" }],
      },
      roleList: [], // 角色列表
      activeRoleIndex: 0, // 选中的角色列表
      isShowRoleModel: false, // 新增角色弹窗
      treeMenuProp: { // 菜单树
        children: 'children',
        label: 'name'
      },
      menuData: []
    });
    // 获取菜单
    const getMenuList = async () => {
      const res = await reqMenuRoute();
      let menuData = res.data.data || res.data || [];
      state.menuData = listToTree(menuData, -1) || []
    }
    // 获取用户列表
    const requestUsers = async () => {
      const { data } = await getUserList();
      state.myData = data.map((item: any) => {
        let list: any = state.roleList.find((i: any) => item.roleIds == i.id);
        return {
          ...list,
          ...item,
        };
      });
      console.log(state.myData)
    };
    // 保存角色信息
    const saveRoleInfo = async () => {
      const { roleName, id } = unref(roleInfo);
      const roleMenus = menuTree.value.getCheckedKeys().join(',');
      console.log('roleMenus', roleMenus)
      if (!roleName) {
        ElMessage.error("请输入角色名称");
        return;
      }
      if (!roleMenus) {
        ElMessage.error("请选择菜单权限");
        return;
      }
      state.isloadingSave = true;
      const res = await saveRole({
        roleName,
        id: id,
        roleMenus
      });
      ElMessage.success("保存成功");
      state.isloadingSave = false;
      state.isShowRoleModel = false;
      reqRoleList();
    };
    // 获取角色列表
    const reqRoleList = async () => {
      const { data } = await getRoleList();
      state.roleList = data.map(item => {
        item.id = String(item.id);
        return item
      });
    };
    const reqDeleteRole = (item) => {
      messageConfirm('删除角色后，该角色的菜单将会失效，确定删除该角色?', async () => {
        await deleteRole({ id: item.id });
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        reqRoleList();
      })
    };
    // 提交确认提醒
    const messageConfirm = (message, callback) => {
      ElMessageBox.confirm(
        message,
        "温馨提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        callback();
      });
    }
    // 编辑角色
    const editRole = (item: Role) => {
      roleInfo.value = Object.assign({}, item);
      let menuIds = item.roleMenus ? item.roleMenus.split(',') : []
      state.isShowRoleModel = true;
      setTimeout(() => { menuTree.value.setCheckedKeys(menuIds) })
    };
    // 保存用户
    const saveUserInfo = async () => {
      let result = await valideForm(userForm);
      if (!result) {
        return;
      }
      state.isloadingSave = true;
      let params = Object.assign({}, unref(userInfo));
      if (!params.id && !params.password) {
        ElMessage.error("请输入密码以便登录");
        return
      }
      if (params.password) {
        params.password = encryptAES(params.password, "998877001");
      }
      console.log('params', params)
      return;
      await saveUser(params);
      state.isloadingSave = false;
      state.isShowUserModel = false;
      requestUsers();
    };
    // 删除用户
    const resDeleteUser = (id: string | number) => {
      messageConfirm('删除用户后，用户将不能登录，确定删除该用户?', async () => {
        await deleteUser({ id: id });
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        requestUsers();
      })
    };
    // 编辑用户
    const editUser = (row: User) => {
      userInfo.value = row;
      userInfo.value.account = row.userAccount;
      userInfo.value.roleids = row.roleIds;
      state.isShowUserModel = true;
    }
    return {
      ...toRefs(state),
      saveRoleInfo,
      editRole,
      reqDeleteRole,
      saveUserInfo,
      userInfo,
      userForm,
      menuTree,
      resDeleteUser,
      editUser,
      roleInfo
    };
  },
});
</script>

<style lang="scss" scoped>
.role-wrap {
  .role-title {
    margin: 0;
    padding: 10px 20px;
    color: #333;
    cursor: pointer;

    & p {
      margin: 0;
    }

    & i {
      color: #409eff;
      font-size: 18px;
      padding-left: 10px;
    }

    &.isActive {
      color: #409eff;
      border-right: 2px solid #409eff;
      background: #f6fffe;
      font-weight: 500;
    }
  }

  padding: 0 !important;
}

.user-table {
  margin-top: 20px;
}
</style>