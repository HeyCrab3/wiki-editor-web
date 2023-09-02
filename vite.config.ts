import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { execSync } from 'child_process';
const _APP_INFO_ = {
	// SHA 
	GIT_SHA:execSync('git rev-parse --short HEAD').toString().trim(),
	// 提交时间
	GIT_COMMIT_DATE:execSync('git log -1 --format=%cI').toString().trim(),
	//HASH
	GIT_HASH:execSync('git rev-parse HEAD').toString().trim(),
	//最后提交 message
	GIT_LAST_COMMIT_MESSAGE:execSync('git show -s --format=%s').toString().trim()
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    _APP_INFO_: JSON.stringify(_APP_INFO_)
  },
  plugins: [vue()],
  server: {
    port: 3555,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:50000/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#FFF'
        }
      },
      javascriptEnabled: true
    }
  }
})