import * as ProjectText from "../ProjectText";


export type T_Props = Omit<ProjectText.Types.T_Props, "animate"> & 
{
    children       : JSX.Element;
    childrenWidth  : `${number}%`;
    isSelected     : boolean;
    clickable      : boolean
};
