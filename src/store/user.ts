// 登录态存储
import { defineStore } from "pinia";
import { ref } from "vue";
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";

export const useUserStore = defineStore('user_info', () => {
    const router = useRouter();
    const user_data = ref({
        'userName': undefined,
        'nickName': undefined,
        'phone': undefined,
        'perm': undefined,
        'loggedIn': false
    })

    const fetchUserData = () => {
        return Axios({
          url: '/api/v2/user/me'
        })
        .then(function(r){
          if (r['data']['code'] != 0){
            if (r['data']['msg'] != '无效会话') message.error(r['data']['msg'])
          } else {
            user_data.value = r['data']['userdata']
            user_data.value['loggedIn'] = true
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