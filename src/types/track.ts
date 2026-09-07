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

export interface CachedTrack {
	id: string;
	url: string;
	title: string;
	artist: string;
	cover?: string;
	yandexUrl?: string;
}

export interface StoreSnapshot {
	legacy: LegacyTrack[];
	loaded: boolean;
}
