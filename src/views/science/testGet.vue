<template>
    <div>

        <button @click="toJump">跳转页面传值</button>
    </div>
</template>
    
<script>
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
    data() {
        localStorage.getItem("key");
        return {
            
            data: 0,
            routerParams:0,
        }
    },
    mounted() {

        this.getParams();
    },
    methods: {
        getParams() {
            console.log(localStorage.getItem("key"));
            console.log(parseInt(localStorage.getItem("key")));
            // 取到路由带过来的参数
             var UserID = this.$route.query.UserID
            // 将数据放在当前组件的数据内
            console.log("传来的参数==" + UserID)
            this.textareText = UserID
            if(UserID=="1"){
                // this.$router.push({ path: '/testGet', query: { UserID: 1 } })
                console.log("去管理员界面")
            }else{
                // this.$router.push({ path: '/testGet', query: { UserID: 1 } })
                console.log("去用户界面")
            }
        },
        

    }

});
</script>
<style lang = "scss" scoped></style>