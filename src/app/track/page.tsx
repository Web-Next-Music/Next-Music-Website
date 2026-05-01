import type { Metadata } from "next";
import { Suspense } from "react";
import TrackPageClient from "@components/track/TrackPageClient";

export const metadata: Metadata = {
	title: "Next Music Player",
	description: "Custom web player for Yandex Music.",
	openGraph: {
		title: "Next Music Player",
		description: "Custom web player for Yandex Music",
		images: ["https://nm.diram1x.ru/icons/ugcShare.webp"],
		type: "website",
	},
};

export default function Page() {
	return (
		<Suspense fallback={<div />}>
			<TrackPageClient />
		</Suspense>
	);
}
