import { VPups } from '@/index'

import Demo from './instances/Demo.vue'
import Demo2 from './instances/Demo2.vue'

// 生成弹窗实例
const vPups = new VPups({
	Demo,
	Demo2
})

export {
	vPups
}