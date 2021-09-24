declare const _default: import("vue").DefineComponent<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    maskClickable: {
        type: BooleanConstructor;
        default: boolean;
    };
    transitionName: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    show: import("vue").Ref<boolean>;
    animationEnd: () => void;
    toClose: (result: unknown) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "remove"[], "remove", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    zIndex?: unknown;
    maskClickable?: unknown;
    transitionName?: unknown;
    style?: unknown;
} & {
    style: Record<string, any>;
    zIndex: number;
    maskClickable: boolean;
    transitionName: string;
} & {}> & {
    onRemove?: ((...args: any[]) => any) | undefined;
}, {
    style: Record<string, any>;
    zIndex: number;
    maskClickable: boolean;
    transitionName: string;
}>;
export default _default;
