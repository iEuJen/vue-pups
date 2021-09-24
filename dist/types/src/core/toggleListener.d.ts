/** 弹窗状态变更监听器 */
declare class ToggleListener {
    onShow(): void;
    onHide(): void;
    onDepthSet(zIndex: number): void;
}
export declare const toggleListener: ToggleListener;
export {};
