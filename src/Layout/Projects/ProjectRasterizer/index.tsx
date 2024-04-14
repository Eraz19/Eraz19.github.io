import * as React               from "react";
import * as ErazLib             from "eraz-lib";
import * as ErazReactComponents from "eraz-react-components/dist";


import * as OBJFiles   from "../../../OBJ_Files";
import * as SidePanel  from "./SidePanel";
import * as Types      from "./types";
import      Style      from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const [objMeshes  , setObjMeshes  ] = React.useState<Types.T_ObjContentList<ErazLib.Parser.OBJ.Types.T_OBJParsingResult>>({});
    const [selectedObj, setSelectedObj] = React.useState<string>("");
    const [cameraState, setCameraState] = React.useState<ErazReactComponents.RasterizerDisplay.Rasterizer.Types.T_PolarCamera>();

    React.useEffect(() =>
    {    
        const worker = new Worker(new URL("./worker.ts", import.meta.url));

        worker.onmessage = (e : MessageEvent) =>
        {
            setObjMeshes(e.data);
            
            if (props.onLoadEnd)
                props.onLoadEnd();
        };

        worker.postMessage(
            {
                "Gun"          : OBJFiles.Gun    .object,
                "Cube"         : OBJFiles.Cube   .object,
                "Grenade"      : OBJFiles.Grenade.object,
                "Jimmy Neutron": OBJFiles.Jimmy  .object,
                "Mailbox"      : OBJFiles.Mailbox.object,
            }
        );

        return () => { worker.terminate(); };
    }, []);

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
                            vertices: objMeshes[selectedObj]?.vertices ?? [],
                            edges   : (objMeshes[selectedObj]?.edges   ?? []).map((edge : ErazLib.Parser.OBJ.Types.T_Edge) =>
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
                    OBJModelOptions   = {Object.keys(objMeshes)}
                    getOBJModelOption = {setSelectedObj}
                    cameraDetails     = {cameraState}
                />
            </div>
        </div>
    );
};
