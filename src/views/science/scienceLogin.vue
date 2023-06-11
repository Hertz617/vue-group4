<template>
    <el-form-item label="用户ID">
        <el-input v-model="authCode"  placeholder="请输入用户ID" style="width:200px" >

        </el-input>
        <el-button @click="toJump" type="primary" >登录</el-button>
    </el-form-item>
</template>
    
<script>
import { defineComponent } from 'vue';
import { userinfoCheck } from '../../http/userinfo';
export default defineComponent({
    
    data() {
        localStorage.setItem("key", "1");
        return {
            authCode:"",
            

        }
    },
    methods: {
        toJump() {
            // console.log(this.authCode)
            //代码跳转
            //push,replace
            if(this.authCode=="a"){
                this.$router.push({ path: '/scienceAdmin'});

                // console.log("去管理员界面")
            }else{
                this.$router.push({ path: '/scienceClient' })
                localStorage.setItem("UserID", this.authCode);
                // console.log("去用户界面")
            }

        },

        check(){

        }

    }
});
</script>
<style lang = "scss" scoped></style>