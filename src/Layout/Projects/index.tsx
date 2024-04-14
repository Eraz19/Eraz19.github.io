import * as React from "react";


import RasterizerThumbnail    from "../../assets/RasterizerThumbnail.png";
import GraphCollapseThumbnail from "../../assets/GraphCollapseThumbnail.png";

import * as Icons                from "../../Icons";
import * as ProjectRasterizer    from "./ProjectRasterizer";
import * as ProjectCollapseGraph from "./ProjectCollapseGraph";
import * as LoadingProject       from "./LoadingProject";
import * as Projet               from "./Project";
import      Style                from "./style.module.scss";


const projects =
[
    {
        title      : "Graph Collapse",
        subtitle   : "Graphics",
        text       : "This is a graphic project demonstrating my ability to work with the HTMLCanvas and graph structures. This project combines mathematics and motion physics in the code, serving as my first foray into this type of project. I am excited to showcase my newfound skills.",
        children   : ProjectCollapseGraph.Component,
        thumbnail  : GraphCollapseThumbnail,
        needLoading: false,
        clickable  : true,
        link       :
        {
            label : "Graph Collapse GitHub",
            url   : "https://github.com/Eraz19/Portfolio/tree/main/src/Layout/Projects/ProjectCollapseGraph",
        }
    },
    {
        title      : "Rasterizer",
        subtitle   : "Graphics • Mathematics",
        text       : "This is a rasterizer project that runs on the CPU, displaying 3D models from OBJ files at 30 frames per second. This project utilizes an HTMLCanvas and a custom CGI pipeline, all built from scratch. It provides a basic understanding of CGI and linear algebra. I am excited to showcase my skills in rasterization and CGI development.",
        children   : ProjectRasterizer.Component,
        thumbnail  : RasterizerThumbnail,
        needLoading: true,
        clickable  : true,
        link       :
        {
            label: "Rasterizer GitHub",
            url  : "https://github.com/Eraz19/ErazReactComponents/tree/master/src/Components/RasterizerDisplay",
        }
    },
]

export function Component() : JSX.Element
{
    const refs = React.useRef(projects.map(() => { return (React.createRef<HTMLDivElement>()); }));

    const [selectedProject, setSelectedProject] = React.useState<number>();

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
    
    return (
        <div className={Style.Container}>
            <div className={Style.Title}><div>PROJECTS</div></div>
            <div className={Style.Projects}>
            {
                projects.map((project, index) : JSX.Element =>
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
                                (selectedProject === index)
                                ?   <LoadingProject.Component type={(project.needLoading) ? "loading" : "standard"}>{project.children as React.FC<any>}</LoadingProject.Component>
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
