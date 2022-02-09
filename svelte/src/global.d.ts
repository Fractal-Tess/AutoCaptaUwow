/// <reference types="@sveltejs/kit" />
import { api as _api } from '../../electron/preload';

declare global {
	const api: typeof _api;
}
