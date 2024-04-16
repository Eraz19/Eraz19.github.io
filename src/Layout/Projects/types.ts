export type T_ProjectModel =
{
    title        : string;
    subtitle     : string;
    text         : string;
    children     : JSX.Element;
    clickable    : boolean;
    needLoading  : boolean;
    thumbnail   ?: string;
    link        ?:
    {
        label : string;
        url   : string;
    };
};
