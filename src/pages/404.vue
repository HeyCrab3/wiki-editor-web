<template>
    <arco-layout id="layout" style="height: 100%;">
      <arco-layout-header><home_menu style="position: fixed"/></arco-layout-header>
      <arco-layout-content>
        <div style="padding: 24px; text-align: center; margin-top: 30px; height: 100%;">
          <Result status="404" title="404" sub-title="非常抱歉（鞠躬），但是我们无法在服务器上找到你需要的内容">
            <template #extra>
              <Button type="primary" @click="router.push('/')">带我回家！</Button>
            </template>
          </Result>
        </div>
        <Footer/>
      </arco-layout-content>      
    </arco-layout>
    <arco-back-top target-container="#layout" :style="{position:'absolute'}" />
</template>

<style>
.arco-layout-footer div div .arco-link{
    margin-bottom: 5px;
}
.hero h2{
    font-size: 2rem;
    margin: 10px;
}
.hero p, .hero div{
    margin-left: 10px;
}
.hero div{
    margin-top: 10px;
}
.card-container {
  display: flex;
  justify-content: space-around;
}

.card {
  height: 400px;
  width: 250px;
  background: #FFF;
  box-shadow: 0px 0px 6px #EDEDED;
  border-radius: 10px;
  text-align: center;
  display: inline-block;
  position: relative;
}

.card .icon svg {
  width: 40px;
  height: 40px;
  margin-top: 40px;
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Result, Button } from 'ant-design-vue'
import home_menu from '../components/home_menu.vue'
import { useUserStore } from '../store/user'
import { RightOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import Footer from '../components/footer.vue'
const router = useRouter()
const user = useUserStore();
onMounted(() => {
    document.title = "404 | 仙舟通鉴编辑器"
})
</script>