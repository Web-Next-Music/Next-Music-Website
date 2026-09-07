"use client";

import { Search, X } from "lucide-react";
import Input, { type InputProps } from "./Input";
import IconButton from "./IconButton";

interface Props extends Omit<InputProps, "iconLeft" | "type"> {
	onClear?: () => void;
	iconSize?: number;
}

export default function SearchInput({
	onClear,
	value,
	placeholder = "Search",
	iconSize = 14,
	...rest
}: Props) {
	const showClear = Boolean(onClear && value);

	return (
		<Input
			type="search"
			value={value}
			placeholder={placeholder}
			iconLeft={<Search size={iconSize} />}
			iconRight={
				showClear ? (
					<IconButton label="Clear" size="sm" onClick={onClear}>
						<X size={iconSize} />
					</IconButton>
				) : undefined
			}
			{...rest}
		/>
	);
}
