<template>
	<component
		v-for="value in list"
		:key="value[0]"
		:is="value[1]"
		:z-index="zIndex"
		:maskClickable="maskClickable"
		:transitionName="transitionName"
		:style="boxStyle"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'vue-poups',
	props: {
		list: {
			type: Map as PropType<Map<string, any>>,
			default: () => new Map()
		},
		// 弹窗层级
		zIndex: {
			type: Number,
			default: 2000
		},
		// 遮罩层可点击
		maskClickable: {
			type: Boolean,
			default: true
		},
		transitionName: {
			type: String,
			default: 'vp-bounce'
		},
		boxStyle: {
			type: Object,
			default: () => ({})
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	setup (_props: Poups.State) {}
})
</script>