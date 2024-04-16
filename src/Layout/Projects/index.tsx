import * as React from "react";


import RasterizerThumbnail    from "../../assets/RasterizerThumbnail.png";
import GraphCollapseThumbnail from "../../assets/GraphCollapseThumbnail.png";

import * as Layout               from "../";
import * as Icons                from "../../Icons";
import * as ProjectRasterizer    from "./ProjectRasterizer";
import * as ProjectCollapseGraph from "./ProjectCollapseGraph";
import * as AnimatedCube         from "./AnimatedCube";
import * as LoadingProject       from "./LoadingProject";
import * as Projet               from "./Project";
import * as AppText              from "../../AppText";
import * as Types                from "./types";
import      Style                from "./style.module.scss";


const projectsModel : Types.T_ProjectModel[] =
[
    {
        title      : "Graph Collapse",
        subtitle   : "Algorithmics",
        text       : AppText.projectGraphCollapse_EN,
        children   : <ProjectCollapseGraph.Component/>,
        thumbnail  : GraphCollapseThumbnail,
        needLoading: true,
        clickable  : true,
        link       :
        {
            label : "Graph Collapse GitHub",
            url   : "https://github.com/Eraz19/Portfolio/tree/main/src/Layout/Projects/ProjectCollapseGraph",
        },
    },
    {
        title      : "Rasterizer",
        subtitle   : "Mathematics",
        text       : AppText.projectRasterizer_EN,
        children   : <ProjectRasterizer.Component/>,
        thumbnail  : RasterizerThumbnail,
        needLoading: true,
        clickable  : true,
        link       :
        {
            label: "Rasterizer GitHub",
            url  : "https://github.com/Eraz19/ErazReactComponents/tree/master/src/Components/RasterizerDisplay",
        },
    },
    {
        title      : "Animated Cube",
        subtitle   : "CSS",
        text       : AppText.projectAnimatedCube_EN,
        children   : <AnimatedCube.Component/>,
        needLoading: false,
        clickable  : false,
    }
];

export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const refs = React.useRef(projectsModel.map(() => { return (React.createRef<HTMLDivElement>()); }));

    const [selectedProject, setSelectedProject] = React.useState<number>();
    const [projects       , setProjects       ] = React.useState<Types.T_ProjectModel[]>(projectsModel);

    React.useEffect(() =>
    {
        function HandleClick(e : MouseEvent)
        {
            function IsClickInsideElement(element : Element) : boolean
            {
                const elemBounds : DOMRect = element.getBoundingClientRect();

                if (e.clientX >= elemBounds.left && e.clientX <= elemBounds.left + elemBounds.width && e.clientY >= elemBounds.top && e.clientY <= elemBounds.top + elemBounds.height)
                    return (true);

                return (false);
            };

            function IndexOfElementClicked(elements : (Element | null | undefined)[]) : number | undefined
            {
                for (const [index, element] of elements.entries())
                {
                    if (element && IsClickInsideElement(element))
                        return (index);
                }

                return (undefined);
            };

            if (refs.current != null)
            {
                const indexElement : number | undefined = IndexOfElementClicked(refs.current.map((ref : React.RefObject<HTMLDivElement>) => { return (ref.current?.children[0]?.children[0]); }));

                if (indexElement != null && projects[indexElement].clickable && window.innerWidth > 1100)
                {
                    setSelectedProject(indexElement);

                    setTimeout(() =>
                    {
                        if (refs.current)
                        {
                            const selectedElement : HTMLDivElement | null = refs.current[indexElement].current;

                            setTimeout(() =>
                            {
                                if (selectedElement)
                                    window.scrollTo({ top: selectedElement.offsetTop - ((window.innerHeight) * 5 / 100), behavior : "smooth" });
                            }, 530);
                        }                            
                    }, 500);
                }
                else
                    setSelectedProject(undefined);
            }
        };

        window.addEventListener("click", HandleClick);

        return (() => { window.removeEventListener("click", HandleClick);  });
    }, []);
    
    React.useEffect(() =>
    {
        setProjects((prev : Types.T_ProjectModel[]) : Types.T_ProjectModel[] =>
        {
            return (
                prev.map((project : Types.T_ProjectModel) : Types.T_ProjectModel =>
                {
                    if      (project.title === "Graph Collapse") return ({...project, text: (context?.state?.language === "fr") ? AppText.projectGraphCollapse_FR : AppText.projectGraphCollapse_EN });
                    else if (project.title === "Rasterizer"    ) return ({...project, text: (context?.state?.language === "fr") ? AppText.projectRasterizer_FR    : AppText.projectRasterizer_EN    });
                    else                                         return ({...project, text: (context?.state?.language === "fr") ? AppText.projectAnimatedCube_FR  : AppText.projectAnimatedCube_EN  });
                })
            );
        })
    }, [context?.state?.language]);
    
    return (
        <div className={Style.Container}>
            <div className={Style.Title}><div>PROJECTS</div></div>
            <div className={Style.Projects}>
            {
                projects.map((project : Types.T_ProjectModel, index : number) : JSX.Element =>
                {
                    return (
                        <div
                            key       = {`Project_${index}`}
                            ref       = {refs.current[index]}
                            className = {Style.Project}
                        >
                            <Projet.Component
                                isSelected = {(selectedProject === index) ? true : false}
                                text       = {project.text}
                                title      = {project.title}
                                subtitle   = {project.subtitle}
                                side       = {(index % 2) ? "right" : "left"}
                                link       = {project.link}
                                clickable  = {project.clickable}
                            >
                            {
                                (project.clickable)
                                ?   (selectedProject === index)
                                    ?   <LoadingProject.Component>{project.children}</LoadingProject.Component>
                                    :   <div className={Style.Thumbnail}>
                                            
                                                <div className={Style.ThumbnailImage}>
                                                    <img src={project.thumbnail}/>
                                                </div>
                                                <div className={Style.ResizeBackground}>
                                                    <div className={Style.ResizeIcon}>
                                                        <Icons.Resize.Component/>
                                                        <div className={Style.ResizeIconText}>Click to extends</div>
                                                    </div>
                                                </div>
                                        </div>
                                :   project.children
                                
                            }
                            </Projet.Component>
                        </div>
                    )
                })          
            }
            </div>
        </div>
    );
};
