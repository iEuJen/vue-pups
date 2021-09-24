import { createApp } from 'vue'
import App from './App.vue'

import { vPups } from './popups/index'

vPups.use({
	install () {
		console.log('安装vue插件成功')
	}
})

createApp(App).mount('#app')
