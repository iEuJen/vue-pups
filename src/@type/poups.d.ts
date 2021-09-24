declare namespace Poups {
	interface State {
		list: Map<string, any>;
		zIndex: number;
		maskClickable: boolean;
		transitionName: 'vp-bounce' | 'vp-scale' | 'vp-fade' | string;
		boxStyle: Record<string, any>;
	}
}