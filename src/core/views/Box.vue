<template>
	<div class="vue_poups_box" :style="style">
		<transition name="vp-fade">
			<div
				v-show="show"
				class="vue_poups_box-mask"
				:style="{ zIndex }"
				@click="maskClickable && toClose('close')"
			/>
		</transition>
		<transition
			:name="transitionName"
			@after-leave="animationEnd"
		>
			<div
				v-show="show"
				class="vue_poups_box-slot"
				:style="{ zIndex }"
			>
				<slot :toClose="toClose"></slot>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'
export default defineComponent({
	name: 'popup-box',
	props: {
		zIndex: {
			type: Number,
			default: 2000
		},
		maskClickable: {
			type: Boolean,
			default: true
		},
		transitionName: {
			type: String,
			default: 'vp-bounce'
		},
		style: {
			type: Object,
			default: () => ({})
		}
	},
	emits: ['remove'],
	setup (props, { emit }) {
		const show = ref(false)
		const message = ref<unknown>(null)

		onMounted(() => {
			nextTick(() => {
				show.value = true
			})
		})

		const animationEnd = () => {
			emit('remove', message.value)
		}

		const toClose = (result: unknown) => {
			show.value = false
			message.value = result
		}

		return {
			show,
			animationEnd,
			toClose
		}
	},
})
</script>

<style lang="less">
.vue_poups_box {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	&-mask {
		background-color: rgba(0, 0, 0, .6);
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
}

.vp-fade {
  &-enter-active {
	animation: .2s vp-fade_in both ease-out;
  }

  &-leave-active {
	animation: .2s vp-fade_out both ease-in;
  }
}

.vp-scale {
	&-enter-active,
	&-leave-active {
		transition: 0.3s;
		transition-property: transform, opacity;
	}
	&-enter-from {
		transform: scale(0.7);
		opacity: 0;
	}

	&-leave-active {
		transform: scale(0.9);
		opacity: 0;
	}
}

.vp-bounce {
    &-enter-active {
        animation: vp-bounce_in_up 1s;
    }
    &-leave-active {
        animation: vp-bounce_out_down 1s;
    }
}

@keyframes vp-fade_in {
  from {
	opacity: 0;
  }
  to {
	opacity: 1;
  }
}

@keyframes vp-fade_out {
  from {
	opacity: 1;
  }
  to {
	opacity: 0;
  }
}

@keyframes vp-bounce_in_up {
    from,
    60%,
    75%,
    90%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 3000px, 0);
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
    }

    75% {
        -webkit-transform: translate3d(0, 10px, 0);
        transform: translate3d(0, 10px, 0);
    }

    90% {
        -webkit-transform: translate3d(0, -5px, 0);
        transform: translate3d(0, -5px, 0);
    }

    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes vp-bounce_out_down {
    20% {
        -webkit-transform: translate3d(0, 10px, 0);
        transform: translate3d(0, 10px, 0);
    }

    40%,
    45% {
        opacity: 1;
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, 2000px, 0);
        transform: translate3d(0, 2000px, 0);
    }
}
</style>