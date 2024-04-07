import * as React from "react";


import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const ref = React.useRef<HTMLDivElement>(null);
    const alreadyAnimated: React.MutableRefObject<boolean> = React.useRef<boolean>(false);

    const [selected, isSelected] = React.useState<boolean>(false);

    React.useEffect(() =>
    {
        const observer : IntersectionObserver = new IntersectionObserver((entries : IntersectionObserverEntry[]) =>
            {
                entries.forEach((entry) =>
                {                    
                    if (entry.isIntersecting && !alreadyAnimated.current)
                    {
                        entry.target.classList.add(Style.Animate);
                        alreadyAnimated.current = true;
                    }
                });
            })

        if (ref.current)
            observer.observe(ref.current);

        return (() => { observer.disconnect(); });
    }, []);

    React.useEffect(() =>
    {
        isSelected(props.isSelected);
    }, [props.isSelected]);

    return (
        <div
            ref       = {ref}
            style     = {{ ["--numberLetter" as string]: props.title.length }}
            className = {`${Style.Container} ${(props.side === "left") ? Style.Left : Style.Right} ${(alreadyAnimated.current) ? Style.Animate : ""} ${(selected) ? Style.Selected : ""}`}
        >
            <div className = {Style.ProjectSection}>
            {
                (props.onClick)
                ?   <div
                        className = {Style.ProjectContainer}
                        onClick   = {() =>
                        {
                            if (props.onClick && !props.isSelected)
                                props.onClick(ref.current ?? undefined);   
                        }}
                    >
                        {props.children}
                    </div>
                :   props.children
            }
            </div>
            <div className={Style.Description}>
                <div className={Style.TitleContainer}>
                    <div className={Style.Title}>
                        <div>{props.title}</div>   
                    </div>
                    <div className={Style.Subtitle}>{props.subtitle}</div>   
                </div>
                <div className={Style.Text}>
                    {props.text}
                    {
                        (props.link)
                        ?   <div className={Style.Contact}>
                                <div className={Style.Button}>
                                    <a href={props.link.url} target={"_blank"}>{props.link.label}</a>
                                </div>
                            </div>
                        :   null
                    }
                </div>
            </div>
        </div>
    );
};
