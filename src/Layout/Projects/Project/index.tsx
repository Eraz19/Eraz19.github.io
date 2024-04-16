import * as React from "react";


import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const ref = React.useRef<HTMLDivElement>(null);

    const [selected, isSelected] = React.useState<boolean>(false);
    const [animate , setAnimate] = React.useState<boolean>(false);

    React.useEffect(() =>
    {
        const observer : IntersectionObserver = new IntersectionObserver((entries : IntersectionObserverEntry[]) =>
            {
                entries.forEach((entry) =>
                {                    
                    if (entry.isIntersecting && !animate)
                        setAnimate(true);
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
            className =
            {`
                ${Style.Container}
                ${(props.side === "left") ? Style.Left     : Style.Right}
                ${(selected   === true  ) ? Style.Selected : ""         }
            `}
        >
            <div
                className=
                {`
                    ${Style.ProjectSection}
                    ${(selected === true) ? Style.Selected : "" }
                `}
                style={{ ["--project-size" as string] : props.childrenWidth }}
            >
            {
                <div
                    className =
                    {`
                        ${Style.ProjectContainer}
                        ${(props.side === "left") ? Style.Left     : Style.Right}
                        ${(animate    === true  ) ? Style.Animate  : ""         }
                    `}
                >
                    {props.children}
                </div>
            }
            </div>
            <div
                className=
                {`
                    ${Style.Description}
                    ${(props.side === "left") ? Style.Left     : Style.Right}
                    ${(selected   === true  ) ? Style.Selected : ""         }
                `}
                style={{ ["--project-size" as string] : props.childrenWidth }}
            >
                <div
                    className=
                    {`
                        ${Style.TitleContainer}
                        ${(props.side === "left") ? Style.Left : Style.Right}
                    `}
                >
                    <div className={Style.Title}>
                        <div className={(animate === true) ? Style.Animate : ""}>{props.title}</div>   
                    </div>
                    <div className={Style.Subtitle}>{props.subtitle}</div>   
                </div>
                <div
                    className=
                    {`
                        ${Style.Text}
                        ${(props.side === "left") ? Style.Left : Style.Right}
                    `}
                >
                    {props.text}
                    {
                        (props.link)
                        ?   <div
                                className=
                                {`
                                    ${Style.Contact}
                                    ${(props.side === "left") ? Style.Left    : Style.Right}
                                    ${(animate    === true  ) ? Style.Animate : ""         }
                                `}
                            >
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
