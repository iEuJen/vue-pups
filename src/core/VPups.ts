import { App, createApp, h, Plugin, reactive } from 'vue'
import { onlyKeyCreator } from '../helper/index'
import AppVue from './views/App.vue'
import BoxVue from './views/Box.vue'
import { toggleListener } from './toggleListener'

const state = reactive<Poups.State>({
	list: new Map(),
	zIndex: 2000,
	maskClickable: true,
	transitionName: 'vp-bounce',
	boxStyle: {}
})

/** 样式 */
class Style {
	// 遮罩/弹窗的层级设置
	get zIndex () {
		return state.zIndex
	}

	set zIndex (zIndex: number) {
		toggleListener.onDepthSet(zIndex)
		state.zIndex = zIndex
	}

	// 遮罩可点击设置, 设置为 false, 则无法通过点击遮罩关闭弹窗
	get clickable () {
		return state.maskClickable
	}

	set clickable (clickable: boolean) {
		state.maskClickable = clickable
	}

	// 过渡动画名称
	get transitionName () {
		return state.transitionName
	}

	set transitionName (name: 'vp-bounce' | 'vp-scale' | 'vp-fade' | string) {
		state.transitionName = name
	}

	// 盒子样式
	get boxStyle () {
		return state.boxStyle
	}

	set boxStyle (style: Record<string, any>) {
		state.boxStyle = style
	}
}

/** 弹窗类 */
export class VPups<T extends Record<string, any>> {
	private _instances: T
	private _app!: App
	private _appId

	/** 弹窗状态切换监听器 */
	public readonly toggleListener: typeof toggleListener

	public readonly style: Style

	constructor (instances: T, id = 'vue-poups') {
		this._appId = id
		this._instances = instances
		this.toggleListener = toggleListener
		this.style = new Style()
		this._init()
	}

	private _init () {
		const popupapp = document.getElementById(this._appId)
		if (popupapp) {
			console.warn(`document element "#${this._appId}" has already been exists`)
			popupapp.remove()
		}

		// 创建弹窗容器
		const div = document.createElement('div')
		div.setAttribute('id', this._appId)
		document.body.appendChild(div)

		// 创建 vue 实例
		this._app = createApp({
			render: () => {
				return h(AppVue, {
					...state
				})
			}
		})

		// 挂载 vue 实例
		this._app.mount(`#${this._appId}`)
	}

	/**
	 * 弹出某个实例弹窗
	 * @param name 实例名
	 * @param props 实例属性, 作用于 vue 组件的 props
	 */
	public show (name: keyof T, props?: Record<string, any>) {
		this.toggleListener.onShow()
		const TheIns = this._instances[name]
		if (!TheIns) throw new Error(`不存在的实例名: ${name}`)

		return new Promise(resolve => {
			const key = onlyKeyCreator() // 唯一键

			// BoxVue props
			const BoxProps = {
				onRemove: (message: unknown) => {
					this.toggleListener.onHide()
					state.list.delete(key)
					resolve(message)
				}
			}

			// BoxVue children
			const children = {
				// 将实例插入到 BoxVue 默认插槽中，并监听实例 close 事件
				// 实例触发 close 事件，调用 BoxVue 的 toClose 方法
				default: ({ toClose }: any) => {
					const PropsObject: any = {
						...props,
						onClose: (message: unknown = 'close') => toClose(message)
					}

					const scopeId = TheIns.__scopeId
					if (scopeId) {
						PropsObject[scopeId] = ''
					}

					return h(TheIns, PropsObject)
				}
			}

			// 添加到列表
			const component = h(BoxVue, BoxProps, children)
			state.list.set(key, component)
		})
	}

	/** 清除所有实例 */
	public clear () {
		this.toggleListener.onHide()
		state.list.clear()
	}

	/** 挂载插件, 同 vue 的 createApp().use */
	public use (plugin: Plugin, ...options: any[]) {
		return this._app.use(plugin, options)
	}
}