import * as React from "react";


import * as Layout  from "../";
import * as Icons   from "../../Icons";
import * as Types   from "./types";
import * as AppText from "../../AppText";
import      Style   from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const ref = React.useRef<HTMLDivElement>(null);

    const [content, setContent] = React.useState<Types.T_Proposition[]>(
        [
            { icon: <Icons.FrontEnd.Component/>      , title: "Front-End", text: AppText.propositionFrontEnd_EN },
            { icon: <Icons.BackEnd.Component/>       , title: "Back-End" , text: AppText.propositionBackEnd_EN  },
            { icon: <Icons.MobileTablette.Component/>, title: "Mobile"   , text: AppText.propositionMobile_EN   },
        ]
    );

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
    }, []);

    React.useEffect(() =>
    {
        setContent((prev : Types.T_Proposition[]) : Types.T_Proposition[] =>
        {
            return (
                prev.map((proposition : Types.T_Proposition) : Types.T_Proposition =>
                {
                    if      (proposition.title === "Front-End") return ({...proposition, text: (context?.state?.language === "fr") ? AppText.propositionFrontEnd_FR : AppText.propositionFrontEnd_EN });
                    else if (proposition.title === "Back-End" ) return ({...proposition, text: (context?.state?.language === "fr") ? AppText.propositionBackEnd_FR  : AppText.propositionBackEnd_EN  });
                    else                                        return ({...proposition, text: (context?.state?.language === "fr") ? AppText.propositionMobile_FR   : AppText.propositionMobile_EN   });
                })
            );
        })
    }, [context?.state?.language]);

    return (
        <div
            ref       = {ref}
            className = {Style.Container}
        >
        {
            content.map((proposition : Types.T_Proposition, index : number) : JSX.Element =>
            {
                return (
                    <div
                        key       = {`Proposition_${index}`}
                        className = {Style.Proposition}
                    >
                        <div className={Style.Icon} >{proposition.icon} </div>
                        <div className={Style.Title}>{proposition.title}</div>
                        <div
                            className               = {Style.Text}
                            dangerouslySetInnerHTML = {{ __html: proposition.text }}
                        />
                    </div>
                );
            })
        }
        </div>
    );
};
