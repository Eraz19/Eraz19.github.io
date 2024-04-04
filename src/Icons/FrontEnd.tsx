import type { SVGProps } from "react";


export function Component(props : SVGProps<SVGSVGElement>)
{
	return (
        <svg
            {...props}
            xmlns   = {"http://www.w3.org/2000/svg"}
            width   = {"100%"}
            height  = {"100%"}
            viewBox = {"0 0 48 48"}
        >
            <g
                fill           = {"none"}
                stroke         = {"currentColor"}
                strokeLinecap  = {"round"}
                strokeLinejoin = {"round"}
                strokeWidth    = {1.4}
            >
                <path d={"M21 6H9a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V21M24 34v8"}/>
                <path d={"m32 6l-4 4l4 4m6-8l4 4l-4 4M14 42h20"}/>
            </g>
        </svg>
    );
};
