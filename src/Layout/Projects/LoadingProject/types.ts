export type T_Props =
{
    type     : "standard";
    children : React.FC<any>;
} | 
{
    type     : "loading";
    children : React.FC<{ onLoadEnd : () => void } & any>;
};
