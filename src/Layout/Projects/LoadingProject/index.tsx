import * as React from "react";

import      Animation1 from "../../../assets/Animation1.gif";
import * as Types      from "./types";
import      Style      from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const [isLoadingEnded, setIsLoadingEnded] = React.useState<boolean>(false);

    React.useEffect(() =>
    {
        if (props.type === "standard")
            setTimeout(() => { setIsLoadingEnded(true); }, 1000);
    }, []);

    return (
        <div className={`${Style.Content} ${(isLoadingEnded) ? Style.Loaded : ""}`}>
            <div className={Style.LoaderPage}>
                <div className={Style.Loader}>
                    <img
                        className = {Style.StyleLoaderImage}
                        src       = {Animation1}
                    />
                </div>
            </div>
            <div className={Style.Content2}>{ props.children({ onLoadEnd : () => { setIsLoadingEnded(true); } })}</div>
        </div>
    );
};
