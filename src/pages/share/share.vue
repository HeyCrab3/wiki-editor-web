<template>
    <arco-layout id="layout" style="height: 100%;">
      <arco-layout-header><home_menu style="position: fixed"/></arco-layout-header>
      <arco-layout-content>
        <div style="padding: 24px; text-align: center; margin-top: 30px; height: 80%; justify-content: center; align-items: center; display: flex;">
            <ShareBox/>
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
import { onMounted, ref } from 'vue';
import home_menu from '../../components/home_menu.vue'
import { useUserStore } from '../../store/user'
import { RightOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import Footer from '../../components/footer.vue'
import ShareBox from '../../components/share/share_box.vue'
const router = useRouter()
const user = useUserStore();

onMounted(() => {
    document.title = "收到分享 | 仙舟通鉴编辑器"
})
</script>