import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			pages: '../dist/www',
			assets: '../dist/www'
		}),
		files: {
			lib: 'src/lib'
		}
	}
};
