import * as React from "react";


import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const indexAlreadyAnimated : React.MutableRefObject<number[]> = React.useRef<number[]>([]);
    const refs                                                    = React.useRef(props.projects.map(() => { return (React.createRef<HTMLDivElement>()); }));
    const observer                                                = React.useRef(
        new IntersectionObserver((entries) =>
        {
            function FoundAnimatedElementIndex(element : Element) : number | undefined
            {
                for (const [index, ref] of refs.current.entries())
                {
                    if (ref.current === element)
                        return (index);
                }

                return (undefined);
            };

            entries.forEach((entry) =>
            {
                const elementToAnimateIndex : number | undefined =  FoundAnimatedElementIndex(entry.target);

                if (elementToAnimateIndex != null && indexAlreadyAnimated.current.indexOf(elementToAnimateIndex) < 0 && entry.isIntersecting)
                {
                    indexAlreadyAnimated.current.push(elementToAnimateIndex);
                    entry.target.classList.add(Style.Animate);
                    entry.target.classList.add(Style.Visible);
                }
            });
        })
    );

    const [clickedProjectIndex, setClickedProjectIndex] = React.useState<number>();
    const [projects           , setProjects           ] = React.useState<Types.T_Project[]>([]);

    React.useEffect(() =>
    {
        function AddEvent() : void
        {
            window.addEventListener("click", HandleOnClickOutside);
        };

        function RemoveEvent() : void
        {
            window.removeEventListener("click", HandleOnClickOutside);
        };

        function SetObserver() : void
        {
            setTimeout(() =>
            {
                if (refs.current)
                {
                    refs.current.forEach((ref : React.RefObject<HTMLDivElement>) =>
                    {
                        if (ref.current)
                            observer.current.observe(ref.current);
                    });
                }
            }, 100);
        };

        function RemoveObserver() : void
        {
            if (refs.current)
            {
                refs.current.forEach((ref : React.RefObject<HTMLDivElement>) =>
                {
                    if (ref.current)
                        observer.current.unobserve(ref.current);
                });
            }
        };

        AddEvent();
        SetObserver();

        return (
            () =>
            {
                RemoveEvent();
                RemoveObserver();
            }
        );
    }, [])

    React.useEffect(() => { setProjects([...props.projects]); }, [props.projects]);

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
                window.scrollTo({ top: refOffsetTop + ((refHeight * 1.13) * .5) - (screenHeight * .5) })
            }
        }
    }, [clickedProjectIndex]);

    function HandleOnClickOutside(e : MouseEvent): void 
    {
        function IsClickInBounds(
            elem   : HTMLDivElement,
            mouseX : number,
            mouseY : number,
        ) : boolean
        {
            const rect = elem.getBoundingClientRect();

            return (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom);
        };

        if (refs.current)
        {
            let result : boolean = false;

            const mouseX : number = e.clientX;
            const mouseY : number = e.clientY;

            for (const ref of refs.current)
            {
                if (ref.current)
                    result = result || IsClickInBounds(ref.current, mouseX, mouseY);
            }

            if (!result) setClickedProjectIndex(undefined);
        }
    };

    return (
        <div
            className = {Style.Container}
            style     = {{ ["--clickedCellRow" as string]: (clickedProjectIndex) ? Math.floor(clickedProjectIndex / 2) : undefined }}
        >
        {
            projects.map((project : Types.T_Project, index : number) : JSX.Element =>
            {
                return (
                    <div
                        key       = {`project_${project.id}`}
                        ref       = {refs.current[index]}
                        className = {`${Style.Project} ${(clickedProjectIndex === index) ? Style.Clicked : ""} ${(indexAlreadyAnimated.current.indexOf(index) >= 0) ? Style.Visible : ""}`}
                    >
                        <div
                            onClick = {(e : React.MouseEvent<HTMLDivElement, MouseEvent>) =>
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
                    </div>
                )
            })
        }
        </div>
    );

};
