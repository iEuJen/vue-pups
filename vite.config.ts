import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { babel } from '@rollup/plugin-babel'
import dts from 'vite-plugin-dts'
import Banner from 'vite-plugin-banner'
import camelCase from 'lodash.camelcase'
import tsconfig from './tsconfig.json'
import pkg from './package.json'

// 版权信息
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * © 2021-~ ieujen
 */
`

/** 获取 tsconfig 里面的别名 */
const getAlias = () => {
	const paths = tsconfig.compilerOptions.paths
	const alias = {}
	if (paths.toString() !== '[object Object]') return alias
	Object.entries(paths).forEach(([key, vals]) => {
		key = key.replace('/*', '')
		const value = vals[0].replace('/*', '')
		Reflect.set(alias, key, path.resolve(__dirname, value))
	})
	return alias
}

// https://vitejs.dev/config/
export default ({ mode }) => {
	// 是否生产环境
	const isProd = mode === 'production'
	// 程序入口
	const entry = isProd ? './src/index.ts' : './src/devlop/main.ts'

	// rollup 配置
	const rollupOptions = {
		external: ['vue'],
		output: {
			globals: {
				vue: 'Vue'
			}
		},
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript'
				],
				extensions: ['.js', '.ts', '.vue'],
				// 兼容旧版本浏览器的polyfill
				// babelHelpers: 'runtime',
				// plugins: [
				// 	[
				// 		'@babel/plugin-transform-runtime',
				// 		{
				// 			corejs: 3
				// 		}
				// 	]
				// ]
			})
		]
	}

	return defineConfig({
		server: {
			port: 12346,
		},
		build: {
			outDir: 'dist',
			lib: {
				entry: path.resolve(__dirname, entry),
				name: camelCase(pkg.name),
			},
			rollupOptions,
		},
		plugins: [
			vue(),
			Banner(banner),
			dts({
				outputDir: path.resolve(__dirname, './dist/types'),
				insertTypesEntry: true,
				copyDtsFiles: false,
			})
		],
		resolve: {
			alias: getAlias()
		},
	})
}
