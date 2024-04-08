import * as React from "react";


import RasterizerThumbnail    from "../../assets/RasterizerThumbnail.png";
import GraphCollapseThumbnail from "../../assets/GraphCollapseThumbnail.png";

import * as Icons                from "../../Icons";
import * as ProjectRasterizer    from "./ProjectRasterizer";
import * as ProjectCollapseGraph from "./ProjectCollapseGraph";
import * as LoadingProject       from "./LoadingProject";
import * as Projet               from "./Project";
import      Style                from "./style.module.scss";


const tests =
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
    const refs                                                            = React.useRef(tests.map(() => { return (React.createRef<HTMLDivElement>()); }));
    const selectedProjectIndex : React.MutableRefObject<number|undefined> = React.useRef();

    const [selectedProject, setSelectedProject] = React.useState<number>();

    React.useEffect(() =>
    {
        function HandleClick(e : MouseEvent)
        {
            function IsClickInsideSelectedProject() : boolean
            {
                if (selectedProjectIndex.current != null && refs.current.length > selectedProjectIndex.current)
                {
                    const selectedElement : HTMLDivElement | null = refs.current[selectedProjectIndex.current].current;

                    if (selectedElement != null)
                    {
                        const elemBounds : DOMRect = selectedElement.getBoundingClientRect();

                        if (e.clientX >= elemBounds.left && e.clientX <= elemBounds.left + elemBounds.width && e.clientY >= elemBounds.top && e.clientY <= elemBounds.top + elemBounds.height)
                            return (true);
                    }
                }

                return (false);
            };

            if (e.target && !IsClickInsideSelectedProject())
                setSelectedProject(undefined);
        };

        window.addEventListener("click", HandleClick);

        return (() => { window.removeEventListener("click", HandleClick);  });
    }, []);

    React.useEffect(() =>
    {
        selectedProjectIndex.current = selectedProject;
    }, [selectedProject])
    
    return (
        <div className={Style.Container}>
            <div className={Style.Title}><div>PROJECTS</div></div>
            <div className={Style.Projects}>
            {
                tests.map((test, index) : JSX.Element =>
                {
                    return (
                        <div
                            key       = {`Project_${index}`}
                            ref       = {refs.current[index]}
                            className = {`${Style.Project} ${(selectedProject === index) ? Style.Selected : ""}`}
                        >
                        {
                            <Projet.Component
                                    isSelected = {(selectedProject === index) ? true : false}
                                    text       = {test.text}
                                    title      = {test.title}
                                    subtitle   = {test.subtitle}
                                    side       = {(index % 2) ? "right" : "left"}
                                    link       = {test.link}
                                    onClick    = {
                                        (test.clickable)
                                        ?   (elem ?: HTMLDivElement) =>
                                            {
                                                setSelectedProject(index);

                                                setTimeout(() =>
                                                {
                                                    if (elem)
                                                        window.scrollTo({ top: elem.offsetTop - ((window.innerHeight * 5) / 100), behavior : "smooth" });
                                                }, 450);
                                            }
                                        :   undefined
                                    }
                                >
                                {
                                    (selectedProject === index)
                                    ?   <LoadingProject.Component type={(test.needLoading) ? "loading" : "standard"}>{test.children as React.FC<any>}</LoadingProject.Component>
                                    :   <div className={Style.Thumbnail}><img src={test.thumbnail}/>
                                            <div>
                                                <div className={Style.ResizeIcon}>
                                                    <Icons.Resize.Component/>
                                                    <div className={Style.ResizeIconText}>Click to extends</div>
                                                </div>
                                            </div>
                                        </div>
                                }
                                </Projet.Component>
                        }
                        </div>
                    )
                })          
            }
            </div>
        </div>
    );
};
