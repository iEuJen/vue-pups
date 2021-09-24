<template>
	<div class="app">
		<button @click="onClick">打开弹窗</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vPups } from './popups'
export default defineComponent({
	name: 'App',
	setup () {
		const onClick = () => {
			vPups.show('Demo')
		}

		return {
			onClick
		}
	}
})
</script>

<style lang="less" scoped>
</style>
