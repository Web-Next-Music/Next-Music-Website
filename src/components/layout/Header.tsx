"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useRouter, usePathname } from "next/navigation";
import AuthButton from "@/components/common/AuthButton";
import Dropdown from "@/components/ui/Dropdown";
import dropdownStyles from "@/components/ui/Dropdown.module.scss";
import { useClickOutside } from "@/lib/useClickOutside";

const JUNE = 5;

let seasonalLogoDecided = false;

const seasonalLogoCheck =
	typeof window === "undefined"
		? null
		: fetch("https://www.diram1x.ru/cdn-cgi/trace")
				.then((r) => r.text())
				.then((text) => {
					const country = text.match(/^loc=(.*)$/m)?.[1]?.trim();
					const ts = Number(text.match(/^ts=(.*)$/m)?.[1]);
					const month = Number.isFinite(ts)
						? new Date(ts * 1000).getUTCMonth()
						: NaN;
					seasonalLogoDecided = month === JUNE && !!country && country !== "RU";
					return seasonalLogoDecided;
				})
				.catch(() => false);

export default function Header({
	isHiddenMode = false,
}: {
	isHiddenMode?: boolean;
}) {
	const NAV_LINKS = [
		...(isHiddenMode
			? [
					{ href: "https://discord.gg/ky6bcdy7KA", label: "Discord" },
					{ href: "https://boosty.to/diramix", label: "Boosty" },
					{ href: "https://github.com/Diramix", label: "Github" },
				]
			: [
					{ href: "/", label: "Home" },
					{ href: "/fckcensor-next", label: "FckCensor Next" },
					{ href: "/experiments", label: "Experiments" },
				]),
	];

	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [useCondemnedLogo, setUseCondemnedLogo] = useState(
		() => seasonalLogoDecided,
	);
	const burgerWrapRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		let cancelled = false;
		seasonalLogoCheck?.then((decided) => {
			if (!cancelled && decided) setUseCondemnedLogo(true);
		});

		return () => {
			cancelled = true;
		};
	}, []);

	const closeMenu = () => setOpen(false);

	useClickOutside(burgerWrapRef, open, closeMenu);

	return (
		<>
			<header className={styles.header}>
				<div className={styles.headerWrap}>
					<div
						className={styles.logo}
						onClick={!isHiddenMode ? () => router.push("/") : undefined}
						style={{
							pointerEvents: isHiddenMode ? "none" : "auto",
						}}
					>
						<div className={styles.logo}>
							<div
								className={styles.logoImg}
								style={{
									backgroundImage: isHiddenMode
										? 'url("/icons/ugcShare.webp")'
										: useCondemnedLogo
											? 'url("/icons/icon-256-condemned.png")'
											: 'url("/icons/icon-256.png")',
								}}
							/>
						</div>
						<div className={styles.logoText}>
							{isHiddenMode ? "UGC Share" : "Next Music"}
						</div>
					</div>

					<div className={styles.navWrap}>
						<nav className={styles.nav} aria-label="Main navigation">
							{NAV_LINKS.map((l) => (
								<Link
									key={l.href}
									href={l.href}
									className={
										l.href === "/"
											? pathname === "/"
												? styles.active
												: undefined
											: pathname.startsWith(l.href)
												? styles.active
												: undefined
									}
								>
									{l.label}
								</Link>
							))}
						</nav>

						{!isHiddenMode && (
							<div className={styles.headerRight}>
								<AuthButton />
							</div>
						)}

						<div className={styles.burger} ref={burgerWrapRef}>
							<button
								className={styles.burgerBtn}
								onClick={() => setOpen((v) => !v)}
								aria-label="Toggle navigation menu"
								aria-expanded={open}
							>
								<span
									className={`${styles.burgerIcon} ${open ? styles.burgerIconOpen : ""}`}
								>
									<span />
									<span />
									<span />
								</span>
							</button>

							<Dropdown open={open} align="end">
								{NAV_LINKS.map((l) => (
									<Link
										key={l.href}
										href={l.href}
										className={dropdownStyles.item}
										onClick={closeMenu}
									>
										{l.label}
									</Link>
								))}
							</Dropdown>
						</div>
					</div>
				</div>
			</header>
			<div id="mini-player-slot" />
		</>
	);
}
