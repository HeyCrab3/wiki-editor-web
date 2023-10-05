<template>
    <a-layout style="height: 100%;">
      <a-layout>
        <a-layout-sider style="width: 270px">
            <div style="padding: 10px;">
                <img style="width: 32px" src="/light.png" alt="logo"/>
                <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴 | Wiki 内容编辑器</h2>
            </div>
            <MenuNext/>
        </a-layout-sider>
        <a-layout-content style="padding: 10px">
          <a-result style="margin: auto; margin-top: 20%;" status="warning" title="坐和放宽">
              <template #subtitle>
                暂未开放，敬请期待
              </template>
            </a-result>
          <FeedBack/>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<style>

</style>

<script lang="ts" setup>
import MenuNext from '../components/menu_next.vue'
import FeedBack from '../components/feedback.vue'
document.title = '我收到的分享 | 仙舟通鉴编辑器'
</script>