export type T_Project =
{
    id          : string; // Keep unicity
    title       : string;
    component   : JSX.Element;
    description : string;
};

export type T_Props =
{
    projects : T_Project[];
};
