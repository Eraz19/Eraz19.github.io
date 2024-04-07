export type T_Link =
{
    label : string;
    url   : string;
};

export type T_Props =
{
    children  : JSX.Element;
    isSelected: boolean;
    text      : string;
    title     : string;
    subtitle  : string;
    side      : "left" | "right";
    link     ?: T_Link;
    onClick  ?: (elem ?: HTMLDivElement) => void;
};