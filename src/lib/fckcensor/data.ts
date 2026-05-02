import rawMeta from "@/data/track-meta.json";
import type { TrackMeta } from "@/types/track";

export const TRACK_META = rawMeta as Record<string, TrackMeta | null>;
