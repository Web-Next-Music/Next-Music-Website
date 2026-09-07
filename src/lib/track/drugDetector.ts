import DRUG_KEYWORDS from "@/app/ddetector/drug-keywords.json";

// Build a single regex from all keywords (longer first to prevent partial shadowing)
const _DRUG_ALT = [...DRUG_KEYWORDS]
	.sort((a, b) => b.length - a.length)
	.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
	.join("|");
const _W = "[\\wа-яёА-ЯЁ]"; // word-character class including Cyrillic

// Detect: keyword must stand alone (not surrounded by word chars on both sides)
const DRUG_DETECT_RE = new RegExp(`(?<!${_W})(${_DRUG_ALT})(?!${_W})`, "i");
// Highlight: match the full word that contains any drug keyword
const DRUG_HIGHLIGHT_RE = new RegExp(
	`(?<!${_W})${_W}*(?:${_DRUG_ALT})${_W}*(?!${_W})`,
	"gi",
);
const MARK = '<mark class="drugMark">$&</mark>';

export function hasDrugWord(text: string): boolean {
	DRUG_DETECT_RE.lastIndex = 0;
	return DRUG_DETECT_RE.test(text);
}

export function escHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export function highlightDrugs(rawText: string): string {
	return escHtml(rawText).replace(DRUG_HIGHLIGHT_RE, MARK);
}
