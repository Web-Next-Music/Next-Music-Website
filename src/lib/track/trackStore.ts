import {
	LEGACY_URL,
	TRACK_META,
	parseLegacy,
	type LegacyTrack,
	type TrackMeta,
} from "@/lib/fckcensor";
import type { CachedTrack, StoreSnapshot } from "@/types/track";

export type { CachedTrack, StoreSnapshot };

let legacy: LegacyTrack[] = [];
let loaded = false;
let promise: Promise<void> | null = null;
const listeners = new Set<() => void>();

let snapshot: StoreSnapshot = { legacy, loaded };

function notify() {
	snapshot = { legacy, loaded };
	listeners.forEach((fn) => fn());
}

export function subscribeStore(fn: () => void): () => void {
	listeners.add(fn);
	return () => listeners.delete(fn);
}

export function getStoreSnapshot(): StoreSnapshot {
	return snapshot;
}

const SERVER_SNAPSHOT: StoreSnapshot = {
	legacy: [],
	loaded: false,
};
export function getServerSnapshot(): StoreSnapshot {
	return SERVER_SNAPSHOT;
}

export function ensureTracksLoaded(): Promise<void> {
	if (loaded) return Promise.resolve();
	if (promise) return promise;

	promise = fetch(LEGACY_URL)
		.then((r) => r.json())
		.then(parseLegacy)
		.then((leg) => {
			legacy = leg;
			loaded = true;
			notify();
		})
		.catch((err) => {
			console.error("[trackStore] Failed to load tracks:", err);
			promise = null;
		});

	return promise!;
}

export function findTrackById(id: string): CachedTrack | null {
	for (const t of legacy) {
		if (t.id === id) {
			const meta = (TRACK_META[t.id] ?? null) as TrackMeta | null;
			return {
				id,
				url: t.url,
				title: meta?.title || `Track #${id}`,
				artist: meta?.artist || "",
				cover: meta?.cover,
				yandexUrl: t.yandexUrl,
			};
		}
	}

	return null;
}
