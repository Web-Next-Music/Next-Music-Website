import rawMeta from "@/data/track-meta.json";

export const M3U_URL =
    "https://gist.githubusercontent.com/Diramix/5db074aec38196af20d7dc19be4cdd50/raw/list.m3u";
export const LEGACY_URL =
    "https://raw.githubusercontent.com/Hazzz895/FckCensorData/refs/heads/main/list.json";

export interface OfficialTrack {
    title: string;
    artist: string;
    cover: string;
    url: string;
}

export interface LegacyTrack {
    id: string;
    url: string;
    yandexUrl: string;
}

export interface TrackMeta {
    title: string;
    artist: string;
    cover?: string;
}

/**
 * Статический словарь метаданных, сгенерированный скриптом
 * scripts/fetch-track-meta.ts и встроенный в бандл при билде.
 *
 * Значение null означает что трек был запрошен, но API ничего не вернул
 * (удалён или недоступен). В компоненте это обрабатывается как "нет данных".
 */
export const TRACK_META = rawMeta as Record<string, TrackMeta | null>;

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
