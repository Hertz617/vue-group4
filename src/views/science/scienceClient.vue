<template>
    <div>
        <span>用户管理界面</span>
        <router-link to="login">返回登录</router-link>
        <el-container style="height: 100%; border: 1px solid  rgb(100, 150, 230)">  
            <el-aside width="200px" style="background-color: rgb(100, 150, 230)">
                <!-- 菜单默认打开第一个 -->
                <el-menu :default-openeds="['1']">
                    <!-- 索引表示他是左边导航栏的第几个 -->
                    <el-sub-menu index="1" style="background-color: rgb(100, 150, 230)">
                        <!-- 这个是大的导航栏 -->
                        <template #title><el-icon>
                                <location />
                            </el-icon><span>科研管理</span></template>
                        <!-- 这是大导航里面展开的小列表 -->
                        <el-menu-item-group style="background-color: rgb(78, 118, 181)">
                            <el-menu-item index="1-1">
                                <router-link to="cli-copyRight">著作权管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="cli-paper">论文管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="cli-patent">专利管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-4">
                                <router-link to="cli-subject">课题管理</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <!-- 让主体做子路由的显示 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>

</script>

<style lang = "scss" scoped></style>