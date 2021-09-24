import { App, Plugin } from 'vue';
import { toggleListener } from './toggleListener';
/** 样式 */
declare class Style {
    get zIndex(): number;
    set zIndex(zIndex: number);
    get clickable(): boolean;
    set clickable(clickable: boolean);
    get transitionName(): 'vp-bounce' | 'vp-scale' | 'vp-fade' | string;
    set transitionName(name: 'vp-bounce' | 'vp-scale' | 'vp-fade' | string);
    get boxStyle(): Record<string, any>;
    set boxStyle(style: Record<string, any>);
}
/** 弹窗类 */
export declare class VPups<T extends Record<string, any>> {
    private _instances;
    private _app;
    private _appId;
    /** 弹窗状态切换监听器 */
    readonly toggleListener: typeof toggleListener;
    readonly style: Style;
    constructor(instances: T, id?: string);
    private _init;
    /**
     * 弹出某个实例弹窗
     * @param name 实例名
     * @param props 实例属性, 作用于 vue 组件的 props
     */
    show(name: keyof T, props?: Record<string, any>): Promise<unknown>;
    /** 清除所有实例 */
    clear(): void;
    /** 挂载插件, 同 vue 的 createApp().use */
    use(plugin: Plugin, ...options: any[]): App<any>;
}
export {};
