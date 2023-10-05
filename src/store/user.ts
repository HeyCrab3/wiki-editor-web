// 登录态存储
import { defineStore } from "pinia";
import { ref } from "vue";
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { Message } from "@arco-design/web-vue";

export const useUserStore = defineStore('user_info', () => {
    const router = useRouter();
    const user_data = ref({
        'userName': undefined,
        'nickName': undefined,
        'phone': undefined,
        'perm': undefined
    })

    const fetchUserData = () => {
        return Axios({
          url: '/api/v2/user/me'
        })
        .then(function(r){
          if (r['data']['code'] != 0){
            if (router.currentRoute.value.fullPath == '/' || router.currentRoute.value.fullPath == '/app'){
              console.log('不在需登录页面内')
            }else{
              Message.error('登录已失效，请重新登录')
              router.push(`/login?redirect_to=${router.currentRoute.value.fullPath}`)
            }
          } else {
            user_data.value = r['data']['userdata']
            return { isSuccess: true, msg: undefined }
          }
        })
        .catch(function(err){
          console.error(`${new Date().toLocaleString()} 请求时发生错误！fetchUserData(): 26:57 ${err}`)
          return { isSuccess: false, msg: err.message }
        })
      }      
    return { user_data, fetchUserData }
})