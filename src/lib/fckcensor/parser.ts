import type { OfficialTrack, LegacyTrack } from "@/types/track";

export function parseM3U(text: string): OfficialTrack[] {
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean);
	const tracks: OfficialTrack[] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!line.startsWith("#EXTINF")) continue;
		const logoMatch = line.match(/tvg-logo="([^"]+)"/);
		const cover = logoMatch?.[1] ?? "";
		const commaIdx = line.indexOf(",", line.lastIndexOf('"'));
		const fullTitle = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : "";
		const dashIdx = fullTitle.indexOf(" - ");
		const artist =
			dashIdx >= 0 ? fullTitle.slice(0, dashIdx).trim() : fullTitle;
		const title = dashIdx >= 0 ? fullTitle.slice(dashIdx + 3).trim() : "";
		const url = lines[i + 1] ?? "";
		if (!url.startsWith("http")) continue;
		tracks.push({ title, artist, cover, url });
	}
	return tracks;
}

export function parseLegacy(data: {
	tracks: Record<string, string>;
}): LegacyTrack[] {
	return Object.entries(data.tracks).map(([id, url]) => ({
		id,
		url,
		yandexUrl: `https://music.yandex.ru/track/${id}`,
	}));
}
