/** 唯一随机值创建器 */
export const onlyKeyCreator = (): string => {
	let str = Math.random().toString(36).substr(3)
	str += Date.now().toString(16).substr(4)
	return str
}