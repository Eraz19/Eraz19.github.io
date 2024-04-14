import * as Icons from "../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


const skills : Types.T_SkillCard[] =
[
    { icon: <Icons.C.Component/>          , label: "C"          },
    { icon: <Icons.CSharp.Component/>     , label: "CSharp"     },
    { icon: <Icons.HTML.Component/>       , label: "HTML"       },
    { icon: <Icons.Css.Component/>        , label: "Css"        },
    { icon: <Icons.Sass.Component/>       , label: "Sass"       },
    { icon: <Icons.Ts.Component/>         , label: "TypeScript" },
    { icon: <Icons.ReactJs.Component/>    , label: "ReactJs"    },
    { icon: <Icons.VueJs.Component/>      , label: "VueJs"      },
    { icon: <Icons.NodeJs.Component/>     , label: "NodeJs"     },
    { icon: <Icons.Python.Component/>     , label: "Python"     },
    { icon: <Icons.CapacitorJs.Component/>, label: "Capacitor"  },
    { icon: <Icons.Webpack.Component/>    , label: "Webpack"    },
];

export function Component() : JSX.Element
{
    return (
        <div className={Style.Container}>
            {
                skills.map((skill : Types.T_SkillCard, index : number) : JSX.Element =>
                {
                    return (
                        <div
                            key       = {`Skill_${index}`}
                            className = {Style.CardContainer}
                        >
                            <div className={Style.Card}>
                                <div className={Style.CardIcon}>{skill.icon} </div>
                                <div className={Style.CardTitle}>{skill.label}</div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
