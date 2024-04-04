import * as Icons from "../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


const skills : Types.T_SkillCard[] =
[
    { icon: <Icons.C.Component/>          , title: "C"          , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.CSharp.Component/>     , title: "CSharp"     , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.HTML.Component/>       , title: "HTML"       , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.Css.Component/>        , title: "Css"        , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.Sass.Component/>       , title: "Sass"       , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.Ts.Component/>         , title: "Ts"         , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.ReactJs.Component/>    , title: "ReactJs"    , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.VueJs.Component/>      , title: "VueJs"      , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.NodeJs.Component/>     , title: "NodeJs"     , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.Python.Component/>     , title: "Python"     , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.CapacitorJs.Component/>, title: "Capacitor"  , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
    { icon: <Icons.Webpack.Component/>    , title: "Webpack"    , text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget nisl nisi. Sed quis nibh eu nisl elementum imperdiet. In hac habitasse platea dictumst. Sed finibus, eros a convallis tincidunt, mi nunc congue nibh, vitae interdum sapien sapien vel nisl" },
];

export function Component() : JSX.Element
{
    return (
        <div className={Style.Container}>
            <div className={Style.Title}>SKILLS</div>
            <div className={Style.SkillCards}>
            {
                skills.map((skill : Types.T_SkillCard) : JSX.Element =>
                {
                    return (
                        <div className={Style.CardContainer}>
                            <div className={Style.Card}>
                                <div className={Style.CardIcon} >{skill.icon} </div>
                                <div className={Style.CardTitle}>{skill.title}</div>
                                <div className={Style.CardText} >{skill.text} </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};
