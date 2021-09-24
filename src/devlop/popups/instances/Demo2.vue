<template>
    <div class="demo2" @click="$emit('close', '回调参数')">
        不可通过遮罩关闭
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { vPups } from '../index'
export default defineComponent({
	name: 'Demo2',
	setup () {
		onMounted(() => {
			vPups.style.clickable = false
		})

		onUnmounted(() => {
			vPups.style.clickable = true
		})
	}
})
</script>

<style lang="less" scoped>
.demo2 {
    background-color: #dfdfdf;
    padding: 16px;
}
</style>