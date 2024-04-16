import * as React               from "react";
import * as ErazLib             from "eraz-lib";
import * as ErazReactComponents from "eraz-react-components/dist";


import * as Layout    from "../../../Layout";
import * as SidePanel from "./SidePanel";
import      Style     from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [selectedObj, setSelectedObj] = React.useState<string>("");
    const [cameraState, setCameraState] = React.useState<ErazReactComponents.RasterizerDisplay.Rasterizer.Types.T_PolarCamera>();

    function HandleMouseEnter() : void { document.body.style.overflowY = "hidden"; };
    function HandleMouseLeave() : void { document.body.style.overflowY = "auto";   };

    return (
        <div className={Style.Container}>
            <div
                className    = {Style.Rasterizer}
                onMouseEnter = {HandleMouseEnter}
                onMouseLeave = {HandleMouseLeave}
            >
                <ErazReactComponents.RasterizerDisplay.Component
                    mesh             =
                    {
                        {
                            vertices: context?.state?.rasterizerModels[selectedObj]?.vertices ?? [],
                            edges   : (context?.state?.rasterizerModels[selectedObj]?.edges   ?? []).map((edge : ErazLib.Parser.OBJ.Types.T_Edge) =>
                            {
                                return (
                                    {
                                        edge : edge,
                                        color: { red: 0, green: 0, blue: 0 },
                                    }
                                );
                            })
                        }
                    }
                    zoomSettings     = 
                    {
                        {
                            maxRadius: 5,
                            minRadius: 0.5,
                        }
                    }
                    keyboardSettings =
                    {
                        {
                            enabled: true,
                        }
                    }
                    defaultCamera    =
                    {
                        {
                            anchor     : [0 ,0 ,0  ],
                            polarCoord : [22,25,1.5]
                        }
                    }
                    cameraDebug={(value: ErazReactComponents.RasterizerDisplay.Rasterizer.Types.T_PolarCamera) =>
                        {
                            if (value)
                                setCameraState({...value});
                        }
                    }
                />
            </div>
            <div className={Style.SidePanel}>
                <SidePanel.Component
                    OBJModelOptions   = {Object.keys(context?.state?.rasterizerModels ?? {})}
                    getOBJModelOption = {setSelectedObj}
                    cameraDetails     = {cameraState}
                />
            </div>
        </div>
    );
};

export * as Types from "./types";
