"use client";

import { createContext, useContext } from "react";
import type { PlayerContextValue } from "@/types/ui";

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
	return useContext(PlayerContext);
}
