<template>
    <div>
        <button @click="toJump">跳转页面传值</button>
    </div>
</template>
    
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    methods: {
        toJump() {
            //代码跳转
            //push,replace
            this.$router.push({ path: '/testGet', query: { id: "1" } })

        }
    }
});
</script>
<style lang = "scss" scoped></style>