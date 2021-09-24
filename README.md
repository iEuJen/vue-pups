# vue-pups 文档

> 实用的应用级弹窗开发工具

- 组件式开发，函数式调用
- 让弹窗摆脱 Template/v-show/v-if 的限制
- 异步函数回调，实现更加灵活可控的弹窗流程控制



## 简单上手

**安装**

```shell
npm install vue-pups
```

**引入**

```ts
import { VPups } from 'vue-pups'
import 'vue-pups/dist/style.css'
```

**开发弹窗组件**

```vue
# @/popups/instances/Popup1.vue
<template>
    <div class="Popup1">
        <div>Popup1</div>
        <button @click="$emit('close', 'confirm')">确认按钮</button>
        <button @click="$emit('close')">关闭按钮</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Popup1',
})
</script>

<style scoped>
.Popup1 {
    background-color: #fff;
    padding: 12px;
}
</style>
```

**实例化并挂载组件**

```ts
// @/popups/index.ts
import Popup1 from '@/popups/instances/Popup1.vue'

const vPups = new VPups({
    Popup1,
})

export { vPups }
```

**在页面中使用**

```vue
# @/views/Home.vue
<template>
    <div class="Home">
        <button @click="onClick">打开弹窗</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vPups } from '@/popups/index.ts'

export default defineComponent({
	name: 'Home',
    setup () {
        const onClick = async () => {
			const res = await vPups.show('Popup1')
            console.log(res) // close / confirm
        }

        return {
            onClick
        }
    }
})
</script>

<style scoped>
.Home {
    width: 100vw;
    height: 100vh;
}
</style>
```



## API

### VPups

**类型**

```ts
declare class VPups<T extends Record<string, any>> {
    /**
     * 构造函数
     * @param instances 弹窗实例集对象
     * @param id 弹窗 root元素的 id，一般用于需要创建多个 VPups 实例时使用，默认为 vue-poups
     */
    constructor(instances: T, id?: string);
    
    /** 弹窗状态切换监听器 */
    readonly toggleListener: {
        /** 任意弹窗被唤起时，此函数将被调用，可被覆写。默认函数设置了窗口不可滚动 */
        onShow(): void;
        /** 任意弹窗被关闭时，此函数将被调用，可被覆写。默认函数恢复了窗口滚动 */
        onHide(): void;
		/** 当 style.zIndex 被修改时，此函数将被调用，可被覆写。默认为空函数 */
        onDepthSet(zIndex: number): void;
    }
    
    readonly style: {
        // 设置弹窗层级
        // 当存在别的组件与本组件默认的 z-index 冲突时，可通过设置此属性进行修改
        get zIndex(): number;
        set zIndex(zIndex: number);
        
		// 设置遮罩层的可点击性,设置为 false,则不能通过点击遮罩关闭弹窗
        // 当需要阻止用户通过点击遮罩层关闭弹窗时，可通过设置此属性进行修改
        // 针对单个弹窗的需求，可以在对应弹窗组件的 onMounted 和 onUnmounted 生命周期函数中进行切换
        get clickable(): boolean;
        set clickable(clickable: boolean);
        
		// vue 内置组件 transition 的过渡类名
		// 内置了三种形式的过渡动画，弹跳/缩放/淡出淡入，
        // 亦可使用自定义的过渡类名，自定义默认类名不可内置于 scoped 组件样式中
        get transitionName(): 'vp-bounce' | 'vp-scale' | 'vp-fade' | string;
        set transitionName(name: 'vp-bounce' | 'vp-scale' | 'vp-fade' | string);
        
		// 弹窗盒子(.vue_poups_box)的内联样式
        get boxStyle(): Record<string, any>;
        set boxStyle(style: Record<string, any>);
    };

    /**
     * 弹出某个实例弹窗
     * @param name 实例弹窗名
     * @param props 实例弹窗属性, 作用于 vue 组件的 props
     */
    show(name: keyof T, props?: Record<string, any>): Promise<unknown>;
    
    /** 
     * 清除所有实例弹窗
     * 不会执行过渡动画，所有弹窗将直接消失
     */
    clear(): void;
    
    /** 
     * 挂载插件, 同 vue 的 createApp().use
     * vue-pups 实际上是创建一个平行于主程序的 vue app，因此，同样可以使用跟主程序一样的方式进行插件挂载
     * 如果你的弹窗需要用到跟主程序一样的第三方库/路由/vuex，则可以通过此方法进行挂载
     */
    use(plugin: Plugin, ...options: any[]): App<any>;
}
```

###　事件

vue-pups 监听了来自弹窗组件的 `close`事件，你可以在编写的弹窗实例中，触发`close`事件以关闭弹窗，同时传递回调参数，以供后续判断。

具体例子，可参考上方**简单上手**一节中，关于**开发弹窗组件**一目。



##  兼容性

1. vue-pups 源码使用了部分 es6 高阶 API，如果你的程序与之不兼容，可以拉取源码，并将 vite.config.ts 中 @babel/plugin-transform-runtime 部分的注释打开，此后自行编译即可。此操作将增加包的体积。
2. 或者在你自己的程序中，引入对应 polyfill 进行兼容。一般5/6年内的手机都没问题，就怕超级钉子户。
3. 注意：本程序只兼容了vue3版本，请不要在vue2版本的程序中使用
