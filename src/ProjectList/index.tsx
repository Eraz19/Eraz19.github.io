import * as React from "react";


import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const refs = React.useRef(props.projects.map(() => React.createRef<HTMLDivElement>()));

    const [clickedProjectIndex, setClickedProjectIndex] = React.useState<number>();
    const [projects           , setProjects           ] = React.useState<Types.T_Project[]>([]);

    React.useEffect(() =>
    {
        setProjects([...props.projects]);
    }, [props.projects]);

    React.useEffect(() =>
    {
        if (clickedProjectIndex != null)
        {
            const ref = refs.current[clickedProjectIndex].current;

            if (ref)
            {
                const refOffsetTop : number = ref.offsetTop;
                const refHeight    : number = ref.clientHeight;
                const screenHeight : number = screen.height;


                // Calculate the vertical and horizontal scroll positions
                window.scrollTo({ top: refOffsetTop + ((refHeight * 1.65) * .5) - (screenHeight * .5) })
            }
        }
    }, [clickedProjectIndex]);

    return (
        <div
            className={Style.Container}
            style     = {{ ["--clickedCellRow" as string]: (clickedProjectIndex) ? Math.floor(clickedProjectIndex / 2) : undefined }}
        >
            {
                projects.map((project : Types.T_Project, index : number) : JSX.Element =>
                {
                    return (
                        <div
                            key       = {`project_${project.id}`}
                            className = {`${Style.Project} ${(clickedProjectIndex === index) ? Style.Clicked : ""}`}
                            ref       = {refs.current[index]}
                            onClick   = {(e : React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                            {
                                if (e.target === e.currentTarget) 
                                {
                                    if (index === clickedProjectIndex) setClickedProjectIndex(undefined);
                                    else                               setClickedProjectIndex(() => { return (index); });
                                }
                            }}
                        >
                            {
                                (index === clickedProjectIndex)
                                ?   project.component
                                :   <div>{project.title}</div>   
                            }
                        </div>
                    )
                })
            }
        </div>
    );

};
