import * as React from "react";


import * as Layout  from "..";
import * as Icons   from "../../Icons";
import * as Types   from "./types";
import * as AppText from "../../AppText";
import      Style   from "./style.module.scss";


const skillList : {[key : string] : Types.T_Skill} =
{
    "HTML"       : { icon: <Icons.HTML.Component/>       , label: "HTML"        , color : "#e44d26"},
    "CSS"        : { icon: <Icons.Css.Component/>        , label: "Css"         , color : "#1b73ba"},
    "SASS"       : { icon: <Icons.Sass.Component/>       , label: "Sass"        , color : "#cc6699"},
    "TS"         : { icon: <Icons.Ts.Component/>         , label: "TypeScript"  , color : "#3178c6"},
    "REACT"      : { icon: <Icons.ReactJs.Component/>    , label: "ReactJs"     , color : "#00d8ff"},
    "REDUX"      : { icon: <Icons.Redux.Component/>      , label: "Redux"       , color : "#764abc"},
    "REACTNATIVE": { icon: <Icons.ReactNative.Component/>, label: "ReactNative" , color : "#61dafb"},
    "VUE"        : { icon: <Icons.VueJs.Component/>      , label: "VueJs"       , color : "#41b883"},
    "NODE"       : { icon: <Icons.NodeJs.Component/>     , label: "NodeJs"      , color : "#8db689"},
    "EXPRESS"    : { icon: <Icons.Express.Component/>    , label: "Express"     , color : "#595959"},
    "PYTHON"     : { icon: <Icons.Python.Component/>     , label: "Python"      , color : "#e0d4a5"},
    "FLASK"      : { icon: <Icons.Flask.Component/>      , label: "Flask"       , color : "#2f2f2f"},
    "CAPACITOR"  : { icon: <Icons.CapacitorJs.Component/>, label: "Capacitor"   , color : "#53b9ff"},
    "WEBPACK"    : { icon: <Icons.Webpack.Component/>    , label: "Webpack"     , color : "#8ed6fb"},
};

export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const ref = React.useRef<HTMLDivElement>(null);

    const [selectedCategory, setSelectedCategory] = React.useState<number>();
    const [content         , setContent         ] = React.useState<Types.T_SkillCategory[]>(
        [
            {
                icon  : <Icons.FrontEnd.Component/>      ,
                title : "Front-End", text: AppText.skillCategoryFrontEnd_EN,
                skills:
                [
                    ["HTML", "CSS", "SASS", "TS"],
                    ["REACT", "REDUX", "VUE"],
                    ["WEBPACK"]
                ],
            },
            {
                icon : <Icons.BackEnd.Component/>       ,
                title: "Back-End" , text: AppText.skillCategoryBackEnd_EN, 
                skills:
                [
                    ["NODE", "EXPRESS"],
                    ["PYTHON", "FLASK"]
                ],
            },
            {
                icon : <Icons.MobileTablette.Component/>,
                title: "Mobile"   , text: AppText.skillCategoryMobile_EN,  
                skills:
                [
                    ["HTML", "CSS", "SASS", "TS"],
                    ["REACT", "REDUX"],
                    ["WEBPACK", "CAPACITOR"],
                    ["REACTNATIVE"]
                ],
            },
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
        }, { threshold : .5})

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
        setContent((prev : Types.T_SkillCategory[]) : Types.T_SkillCategory[] =>
        {
            return (
                prev.map((proposition : Types.T_SkillCategory) : Types.T_SkillCategory =>
                {
                    if      (proposition.title === "Front-End") return ({...proposition, text: (context?.state?.language === "fr") ? AppText.skillCategoryFrontEnd_FR : AppText.skillCategoryFrontEnd_EN });
                    else if (proposition.title === "Back-End" ) return ({...proposition, text: (context?.state?.language === "fr") ? AppText.skillCategoryBackEnd_FR  : AppText.skillCategoryBackEnd_EN  });
                    else                                        return ({...proposition, text: (context?.state?.language === "fr") ? AppText.skillCategoryMobile_FR   : AppText.skillCategoryMobile_EN   });
                })
            );
        })
    }, [context?.state?.language]);

    return (
        <>
            <div
                ref       = {ref}
                className = {Style.Container}
            >
            {
                content.map((skillCategory : Types.T_SkillCategory, index : number) : JSX.Element =>
                {
                    return (
                        <div className={Style.SkillCategoryContainer}>
                            <div
                                key       = {`SkillCategory_${index}`}
                                className = {Style.SkillCategory}
                            >
                                <div className={Style.Icon} >{skillCategory.icon} </div>
                                <div className={Style.Title}>{skillCategory.title}</div>
                                <div
                                    className               = {Style.Text}
                                    dangerouslySetInnerHTML = {{ __html: skillCategory.text }}
                                />
                            </div>
                            <div
                                className = {`${Style.Button} ${(selectedCategory === index) ? Style.Selected : ""}`}
                                onClick   = {() =>
                                {
                                    if (selectedCategory === index) setSelectedCategory(undefined);
                                    else                            setSelectedCategory(index);
                                }}
                            >
                                Skills
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <div>
            {
                (selectedCategory != null)
                ?   <div className={Style.Skills}>
                    {
                        content[selectedCategory].skills.map((skills : string[]) : JSX.Element[] =>
                        {
                            return (
                                skills.map((skill : string) : JSX.Element =>
                                {
                                    return (
                                        <div
                                            className = {Style.Skill}
                                            title     = {skillList[skill].label}
                                            style     = {{ ["--color" as string] : skillList[skill].color }}
                                        >
                                            <div className={Style.IconCircle}>
                                                <div className={Style.Icon}>{skillList[skill].icon}</div>
                                            </div>
                                            <div
                                                className = {Style.IconShadow}
                                                title     = {undefined}
                                            >
                                                <div className={Style.Icon}>{skillList[skill].icon}</div>
                                            </div>
                                        </div>
                                    );
                                })
                                .reduce((prev : JSX.Element[], current : JSX.Element) : JSX.Element[] => { return ([...prev, current]); }, [])
                            );
                        })
                    }
                    </div>
                :   null
            }
            </div>
        </>
    );
};
