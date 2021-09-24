import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    list: {
        type: PropType<Map<string, any>>;
        default: () => Map<any, any>;
    };
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
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    list?: unknown;
    zIndex?: unknown;
    maskClickable?: unknown;
    transitionName?: unknown;
    boxStyle?: unknown;
} & {
    list: Map<string, any>;
    zIndex: number;
    maskClickable: boolean;
    transitionName: string;
    boxStyle: Record<string, any>;
} & {}>, {
    list: Map<string, any>;
    zIndex: number;
    maskClickable: boolean;
    transitionName: string;
    boxStyle: Record<string, any>;
}>;
export default _default;
