/** 弹窗状态变更监听器 */
class ToggleListener {
	onShow () {
		document.body.style.overflow = 'hidden'
	}

	onHide () {
		document.body.style.overflow = ''
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
	onDepthSet (zIndex: number) {}
}

export const toggleListener = new ToggleListener()