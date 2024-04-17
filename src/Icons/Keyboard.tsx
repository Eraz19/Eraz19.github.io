import type { SVGProps } from "react";


export function Component(props : SVGProps<SVGSVGElement>)
{
	return (
        <svg
            {...props}
            xmlns   = {"http://www.w3.org/2000/svg"}
            width   = {"100%"}
            height  = {"100%"}
            viewBox = {"0 0 16 16"}
        >
            <path
                fill     = {"currentColor"}
                fillRule = {"evenodd"}
                d        = {"M14 3H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m0 8H3V4h11zm-3-6h-1v1h1zm-1 2H9v1h1zm2-2h1v1h-1zm1 4h-1v1h1zM6 9h5v1H6zm7-2h-2v1h2zM8 5h1v1H8zm0 2H7v1h1zM4 9h1v1H4zm0-4h1v1H4zm3 0H6v1h1zM4 7h2v1H4z"}
                clipRule = {"evenodd"}
            />
        </svg>
    );
};
