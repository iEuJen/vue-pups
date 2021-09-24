<template>
    <div class="demo" @click="onClick">
        demo
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vPups } from '../index'
export default defineComponent({
	name: 'Demo',
	setup () {
		const onClick = async () => {
			const res = await vPups.show('Demo2')
			console.log('res', res)
		}

		return {
			onClick
		}
	}
})
</script>

<style lang="less" scoped>
.demo {
    background-color: #fff;
    padding: 10px;
}
</style>