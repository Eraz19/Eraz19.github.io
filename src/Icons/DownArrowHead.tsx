import type { SVGProps } from "react";


export function Component(props : SVGProps<SVGSVGElement>)
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
                d    = {"m12 15l-5-5h10z"}
            />
        </svg>
    );
};
