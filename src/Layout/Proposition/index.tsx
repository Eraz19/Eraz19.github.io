import * as React from "react";


import * as Icons from "../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


const propositions : Types.T_Proposition[] =
[
    { icon: <Icons.FrontEnd.Component/>      , title: "Front-End", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.BackEnd.Component/>       , title: "Back-End" , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.MobileTablette.Component/>, title: "Mobile"   , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
];

export function Component() : JSX.Element
{
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() =>
    {
        const observer : IntersectionObserver = new IntersectionObserver((entries) =>
        {
            entries.forEach((entry) =>
            {
                if (entry.isIntersecting)
                    entry.target.classList.add(Style.Animate);
            });
        })

        function RemoveObserver() : void
        {
            if (ref.current)
                observer.unobserve(ref.current);
        };

        function SetObserver() : void
        {
            if (ref.current)
                observer.observe(ref.current);
        };

        SetObserver();

        return (RemoveObserver);
    }, [])

    return (
        <div
            ref       = {ref}
            className = {Style.Container}
        >
        {
            propositions.map((proposition : Types.T_Proposition, index : number) : JSX.Element =>
            {
                return (
                    <div
                        key       = {`Proposition_${index}`}
                        className = {Style.Proposition}
                    >
                        <div className={Style.Icon} >{proposition.icon} </div>
                        <div className={Style.Title}>{proposition.title}</div>
                        <div className={Style.Text} >{proposition.text} </div>
                    </div>
                );
            })
        }
        </div>
    );
};
