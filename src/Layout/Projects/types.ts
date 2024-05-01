export type T_Projects = [T_Project,T_Project,T_Project];
export type T_Project  =
{
    title     : string;
    subtitle  : string;
    text      : string;
    link     ?:
    {
        label : string;
        url   : string;
    };
};
