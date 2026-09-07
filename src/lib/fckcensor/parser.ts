import type { LegacyTrack } from "@/types/track";

export function parseLegacy(data: {
	tracks: Record<string, string>;
}): LegacyTrack[] {
	return Object.entries(data.tracks).map(([id, url]) => ({
		id,
		url,
		yandexUrl: `https://music.yandex.ru/track/${id}`,
	}));
}
