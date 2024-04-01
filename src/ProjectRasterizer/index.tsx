import * as React               from "react";
import * as ErazLib             from "eraz-lib";
import * as ErazReactComponents from "eraz-react-components/dist";


import * as OBJFiles from "../OBJ_Files";
import * as Types    from "./types";
import      Style    from "./style.module.scss";


export function Component() : JSX.Element
{
    const [objMeshes  , setObjMeshes  ] = React.useState<Types.T_ObjContentList<ErazLib.Parser.OBJ.Types.T_OBJParsingResult>>({});
    const [selectedObj, setSelectedObj] = React.useState<string>("");
    const [onLoad     , setOnLoad     ] = React.useState<boolean>(true);

    React.useEffect(() =>
    {    
        const worker = new Worker(new URL("../worker.ts", import.meta.url));

        worker.onmessage = (e : MessageEvent) =>
        {
            setObjMeshes(e.data);
            setOnLoad(false);
        };

        setOnLoad(true);
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

    return (
        <div className={Style.Container}>
            <div className={Style.Rasterizer}>
                <div
                    onMouseEnter={() => { document.body.style.overflow = "hidden" }}
                    onMouseLeave={() => { document.body.style.overflow = "auto" }}
                >
                {
                    (onLoad)
                    ?   <div className={Style.LoaderPage}>
                            <div className={Style.Loader}>
                                <div className={Style.Spinner}><ErazReactComponents.LoaderSpinner.Component/></div>
                                <div className={Style.Text}>Wait few sec ...</div>
                            </div>
                        </div>
                    :   <ErazReactComponents.RasterizerDisplay.Component
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
                        />
                }
                </div>
            </div>
            <div className={Style.SidePanel}>
                <div className={Style.SidePanelPage}>
                {
                    Object.keys(objMeshes).map((key : string) : JSX.Element=>
                    {
                        return (<div className={Style.ObjOptions} onClick={() => { setSelectedObj(key); }}>{key}</div>);
                    })
                }
                </div>
            </div>
        </div>
    );
};
