<template>
    <div>
        <span>管理员界面</span>
        <router-link to="login">返回登录</router-link>
          <el-container style="height: 750px; border: 1px solid #8c5d5d">
                    <el-aside width="200px" style="background-color: rgb(194, 207, 228)">
                <!-- 菜单默认打开第一个 -->
                <el-menu :default-openeds="['1']">
                    <!-- 索引表示他是左边导航栏的第几个 -->
                    <el-sub-menu index="1">
                        <!-- 这个是大的导航栏 -->
                        <template #title><el-icon>
                                <location />
                            </el-icon><span>科研管理</span></template>
                        <!-- 这是大导航里面展开的小列表 -->
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="ad-copyRight">著作权管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="ad-paper">论文管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="ad-patent">专利管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-4">
                                <router-link to="ad-subject">课题管理</router-link>
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