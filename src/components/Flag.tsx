const langToFlag = {
    arabic: "🇸🇦",
    bengali: "🇧🇩",
    cantonese: "🇭🇰",
    catalan: "🇪🇸",
    czech: "🇨🇿",
    danish: "🇩🇰",
    dutch: "🇳🇱",
    esperanto: "🌍",
    english: "🇬🇧",
    finnish: "🇫🇮",
    french: "🇫🇷",
    greek: "🇬🇷",
    hebrew: "🇮🇱",
    hindi: "🇮🇳",
    hungarian: "🇭🇺",
    indonesian: "🇮🇩",
    italian: "🇮🇹",
    japanese: "🇯🇵",
    korean: "🇰🇷",
    malay: "🇲🇾",
    mandarin: "🇨🇳",
    norwegian: "🇳🇴",
    persian: "🇮🇷",
    polish: "🇵🇱",
    portuguese: "🇧🇷",
    punjabi: "🇵🇰",
    romanian: "🇷🇴",
    russian: "🇷🇺",
    spanish: "🇪🇸",
    swahili: "🇹🇿",
    sweedish: "🇸🇪",
    tagalog: "🇵🇭",
    thai: "🇹🇭",
    turkish: "🇹🇷",
    ukranian: "🇺🇦",
    urdu: "🇵🇰",
    vietnamese: "🇻🇳",
};

type FlagProps = {
    language: string;
} & JSX.IntrinsicElements["span"]

export function Flag({ language, ...props }: FlagProps) {
    return (
        <span {...props} >{langToFlag[language]}</span>
    )
}