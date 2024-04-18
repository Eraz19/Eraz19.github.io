import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    return (
        <div className={Style.Container}>
            <div
                className=
                {`
                    ${Style.TitleContainer}
                    ${(props.side === "left")  ? Style.Left    : Style.Right}
                `}>
                <div
                    className=
                    {`
                        ${Style.Title}
                        
                    `}
                >
                    <div className={`${(props.animate === true) ? Style.Animate : ""}`}>
                        {props.title}   
                    </div>
                </div>
                <div className={Style.Subtitle}>
                    {props.subtitle}
                </div>
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
                                ${(props.animate    === true  ) ? Style.Animate : ""         }
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
    );
};

export * as Types from "./types";
