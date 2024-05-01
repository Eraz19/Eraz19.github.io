import * as React   from "react";


import * as Layout               from "..";
import * as ProjectRasterizer    from "./ProjectRasterizer";
import * as ProjectCollapseGraph from "./ProjectCollapseGraph";
import * as AnimatedCube         from "./ProjectAnimatedCube";
import * as AppText              from "../../AppText";
import * as Types                from "./types";
import      Style                from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [projects, setProjects] = React.useState<Types.T_Projects>(
        [
            {
                title   : AppText.projectGraphCollapseTitle_EN,
                subtitle: AppText.projectGraphCollapseSubtitle,
                text    : AppText.projectGraphCollapse_EN,
                link    :
                {
                    label: `${AppText.projectGraphCollapseSubtitle} GitHub`,
                    url  : AppText.projectGraphCollapseUrl,
                } 
            },
            {
                title   : AppText.projectAnimatedCubeTitle,
                subtitle: AppText.projectAnimatedCubeSubtitle,
                text    : AppText.projectRasterizer_EN,
            },
            {
                title   : AppText.projectRasterizerTitle_EN,
                subtitle: AppText.projectRasterizerSubtitle,
                text    : AppText.projectRasterizer_EN,
                link    :
                {
                    label: `${AppText.projectRasterizerSubtitle} GitHub`,
                    url  : AppText.projectAnimatedCubeUrl,
                } 
            }
        ]
    );
    
    React.useEffect(() =>
    {
        setProjects((prev : Types.T_Projects) : Types.T_Projects =>
        {
            return (
                [
                    {
                        ...prev[0],
                        text : (context?.state?.language === "fr") ? AppText.projectGraphCollapse_FR      : AppText.projectGraphCollapse_EN,
                        title: (context?.state?.language === "fr") ? AppText.projectGraphCollapseTitle_FR : AppText.projectGraphCollapseTitle_EN,
                    },
                    {
                        ...prev[1],
                        text : (context?.state?.language === "fr") ? AppText.projectAnimatedCube_FR   : AppText.projectAnimatedCube_EN,
                        title: (context?.state?.language === "fr") ? AppText.projectAnimatedCubeTitle : AppText.projectAnimatedCubeTitle,
                    },
                    {
                        ...prev[2],
                        text : (context?.state?.language === "fr") ? AppText.projectRasterizer_FR      : AppText.projectRasterizer_EN,
                        title: (context?.state?.language === "fr") ? AppText.projectRasterizerTitle_FR : AppText.projectRasterizerTitle_EN,
                    }
                ]
            );
        })
    }, [context?.state?.language]);

    function HandleOpenGitHubPage(url : string | undefined) : void
    {
        if (url)
        {
            const newWindow : Window | null = window.open(url);

            if (newWindow)
                newWindow.focus();   
        }
    };
    
    return (
        <div className={Style.Container}>

            <div className={`${Style.Project} ${Style.Graph}`}>
                <ProjectCollapseGraph.Component/>
                <div className={Style.TitleContainer}>
                    <div className={Style.Title   }>{projects[0].title}   </div>
                    <div className={Style.Subtitle}>{projects[0].subtitle}</div>
                </div>
                <div className={Style.TextContainer}>
                    <div className={Style.Text}>{projects[0].text}</div>
                    <hr className={Style.Separator}/>
                    <div
                        className = {Style.Button}
                        onClick   = {() => { HandleOpenGitHubPage(projects[0].link?.url); }}
                    >
                        {projects[0].link?.label}
                    </div>
                </div>
            </div>
            <div className={`${Style.Project} ${Style.Cube}`}>
                <div className={Style.TitleContainer}>
                    <div className={Style.Title   }>{projects[1].title}   </div>
                    <div className={Style.Subtitle}>{projects[1].subtitle}</div>
                </div>
                <div className={Style.TextContainer}>
                    <div className={Style.Text}>{projects[1].text}</div>
                </div>
                <AnimatedCube.Component/>
            </div>
            <div className={`${Style.Project} ${Style.Rasterizer}`}>
                <div className={Style.TitleContainer}>
                    <div className={Style.Title   }>{projects[2].title}   </div>
                    <div className={Style.Subtitle}>{projects[2].subtitle}</div>
                </div>
                <div className={Style.TextContainer}>
                    <div className={Style.Text}>{projects[2].text}</div>
                    <hr className={Style.Separator}/>
                    <div
                        className = {Style.Button}
                        onClick   = {() => { HandleOpenGitHubPage(projects[2].link?.url); }}
                    >
                        {projects[2].link?.label}
                    </div>
                </div>
                <div className={Style.Element}>
                    <ProjectRasterizer.Component/>
                </div>
            </div>
        </div>
    );
};
