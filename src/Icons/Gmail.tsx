import type { SVGProps } from "react";


export function Component(props : SVGProps<SVGSVGElement>) : JSX.Element
{
	return (
        <svg
            {...props}
            xmlns   = {"http://www.w3.org/2000/svg"}
            width   = {"100%"}
            height  = {"100%"}
            viewBox = {"0 0 24 24"} 
        >
            <path
                fill = {"currentColor"}
                d    = {"M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"}
            />
        </svg>
    );
};
