"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Dropdown.module.scss";

interface Props {
	open: boolean;
	align?: "start" | "end";
	className?: string;
	children: ReactNode;
}

export default function Dropdown({
	open,
	align = "end",
	className,
	children,
}: Props) {
	if (!open) return null;

	return (
		<div
			className={cx(
				styles.dropdown,
				align === "end" ? styles.alignEnd : styles.alignStart,
				className,
			)}
			role="menu"
		>
			{children}
		</div>
	);
}
