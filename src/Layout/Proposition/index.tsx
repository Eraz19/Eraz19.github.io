import * as React from "react";


import * as Icons   from "../../Icons";
import * as Types   from "./types";
import * as AppText from "../../AppText";
import      Style   from "./style.module.scss";


const propositions : Types.T_Proposition[] =
[
    { icon: <Icons.FrontEnd.Component/>      , title: "Front-End", text: AppText.propositionFrontEnd },
    { icon: <Icons.BackEnd.Component/>       , title: "Back-End" , text: AppText.propositionBackEnd  },
    { icon: <Icons.MobileTablette.Component/>, title: "Mobile"   , text: AppText.propositionMobile   },
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
                        <div className={Style.Text} dangerouslySetInnerHTML={{ __html: proposition.text }}/>
                    </div>
                );
            })
        }
        </div>
    );
};
