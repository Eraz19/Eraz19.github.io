import * as React from "react";


import * as Icons from "../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


const propositions : Types.T_Proposition[] =
[
    { icon: <Icons.FrontEnd.Component/>      , title: "Front-End", text: "Skilled front-end developer with expertise in <b>TypeScript</b>, <b>HTML</b>, and <b>CSS/SASS</b>. Proficient in <b>React</b> and <b>Vue.js</b> frameworks, with a focus on React. Builds responsive and user-friendly web applications with a keen eye for detail and a deep understanding of user experience. Passionate about creating high-quality web experiences." },
    { icon: <Icons.BackEnd.Component/>       , title: "Back-End" , text: "Skilled back-end engineer with expertise in <b>Node.js</b>, <b>Express</b>, and REST API design. Adaptable to new network protocols and experienced in requesting data from <b>SQL/NoSQL</b> databases, including <b>MongoDB</b>. Passionate about building scalable and reliable back-end systems." },
    { icon: <Icons.MobileTablette.Component/>, title: "Mobile"   , text: "Mobile app developer with experience in <b>React Native</b> and <b>Capacitor</b> for building mobile apps with React code, maintaining a single code base for web and mobile apps. Committed to building user-friendly and performant mobile apps." },
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
