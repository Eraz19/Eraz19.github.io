import * as React from "react";


import * as Utils from "./Utils";
import      Style from "./style.module.scss";


const PERCENT_VERTEX : number = 17
const PERCENT_EDGES  : number = 10

export function Component() : JSX.Element
{
    const prevMouseX : React.MutableRefObject<number | undefined> = React.useRef();
    const prevMouseY : React.MutableRefObject<number | undefined> = React.useRef();
    const mouseMovementX : React.MutableRefObject<number> = React.useRef(0);
    const mouseMovementY : React.MutableRefObject<number> = React.useRef(0);
    const mouseStopTimeout : React.MutableRefObject<NodeJS.Timeout | undefined> = React.useRef();
    const ref = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() =>
    {
        const observer = new ResizeObserver(HandleResize);

        function AddEvents(elemRef : HTMLCanvasElement | undefined) : void
		{
			if (elemRef)
				observer.observe(elemRef);
		};
		
		function RemoveEvents() : void
		{
			observer.disconnect();
		};

        if (ref.current)
        {
            const context : CanvasRenderingContext2D | null = ref.current.getContext("2d")

            if (context)
            {
                AddEvents(ref.current);

                setTimeout(() =>
                {
                    Utils.RenderCanvas(context, /*prevCanvasSize.current, */PERCENT_VERTEX, PERCENT_EDGES, mouseMovementX, mouseMovementY); 
                }, 1000);  
            }
        }

        return (() => { RemoveEvents(); });
    }, []);

    function HandleResize() : void
	{
		if (ref.current)
		{
            ref.current.width  = ref.current.clientWidth;
            ref.current.height = ref.current.clientHeight;
		}
	};

    function HandleMouseMove(e : React.MouseEvent<HTMLCanvasElement,MouseEvent>) : void
    {
        clearTimeout(mouseStopTimeout.current);

        if (prevMouseX.current && prevMouseY.current)
        {  
            mouseMovementX.current = e.movementX;
            mouseMovementY.current = e.movementY;

            mouseStopTimeout.current = setTimeout(() =>
            {
                mouseMovementX.current = 0;
                mouseMovementY.current = 0;
            }, 100);
        }

        prevMouseX.current = e.clientX;
        prevMouseY.current = e.clientY; 
    };

    function HandleMouseLeave() : void
    {
        mouseMovementX.current = 0;
        mouseMovementY.current = 0;
    };

    return (
        <canvas
            ref          = {ref}
            onMouseMove  = {HandleMouseMove}
            onMouseLeave = {HandleMouseLeave}
            className    = {Style.Container}
        />
    );
};
