import type { SVGProps } from "react";


export function Component(props : SVGProps<SVGSVGElement>)
{
	return (
        <svg
            {...props}
            xmlns   = {"http://www.w3.org/2000/svg"}
            width   = {"100%"}
            height  = {"100%" }
            viewBox = {"0 0 24 24"}
        >
            <g
                fill        = {"none"}
                stroke      = {"currentColor"}
                strokeWidth = {0.8}
            >
                <rect
                    width     = {7}
                    height    = {5}
                    rx        = {0.6}
                    transform = {"matrix(1 0 0 -1 3 22)"}
                />
                <rect
                    width     = {7}
                    height    = {5}
                    rx        = {0.6}
                    transform = {"matrix(1 0 0 -1 8.5 7)"}
                />
                <rect
                    width     = {7}
                    height    = {5}
                    rx        = {0.6}
                    transform = {"matrix(1 0 0 -1 14 22)"}
                />
                <path d={"M6.5 17v-3.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2V17M12 11.5V7"}/>
            </g>
        </svg>
    );
};
