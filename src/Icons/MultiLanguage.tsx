import type { SVGProps } from "react";


export function Component(props: SVGProps<SVGSVGElement>) : JSX.Element
{
	return (
        <svg
            {...props}
            xmlns   = {"http://www.w3.org/2000/svg"}
            width   = {"100%"}
            height  = {"100%"}
            viewBox = {"0 0 24 24"}
        >
            <g
                fill           = {"none"}
                stroke         = {"currentColor"}
                strokeLinecap  = {"round"}
                strokeLinejoin = {"round"}
                strokeWidth    = {1.5}
            >
                <path d={"M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12"}/>
                <path d={"M13 2.05S16 6 16 12s-3 9.95-3 9.95m-2 0S8 18 8 12s3-9.95 3-9.95M2.63 15.5h18.74m-18.74-7h18.74"}/>
            </g>
        </svg>
    );
};
