// 登录态存储
import { defineStore } from "pinia";
import { ref } from "vue";
import Axios from 'axios'

export const useUserStore = defineStore('user_info', () => {
    const user_data = ref({
        'userName': undefined,
        'nickName': undefined,
        'perm': undefined
    })

    const fetchUserData = () => {
        return Axios({
          url: '/api/v1/user/me'
        })
        .then(function(r){
          if (r['data']['code'] != 0){
            return { isSuccess: false, msg: r['data']['msg'] }
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