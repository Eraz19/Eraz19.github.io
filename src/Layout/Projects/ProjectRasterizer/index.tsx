import * as React               from "react";
import * as ErazLib             from "eraz-lib";
import * as ErazReactComponents from "eraz-react-components/dist";


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
        console.log(objMeshes);
    }, [objMeshes]);

    React.useEffect(() =>
    {    
        const worker = new Worker(new URL("./worker.ts", import.meta.url));

        let modelNames : string[] = [];

        fetch("https://api.github.com/repos/Eraz19/Portfolio/contents/src/OBJ_Files")
        .then((response : Response) =>
        {
            if (!response.ok)
                throw new Error('Error fetching OBJ files: ' + response.status);

            return (response.json());
        })
        .then((data) =>
        {
            const fetchPromises : Promise<any>[] = data.map((file : any) =>
            {
                const downloadUrl      : string   = file.download_url;
                const downloadUrlParts : string[] = downloadUrl.split("/");

                if (downloadUrlParts.length !== 0)
                    modelNames.push(downloadUrlParts[downloadUrlParts.length - 1].split(".")[0]);

                return (fetch(file.download_url));
            });

            Promise.all(fetchPromises)
            .then((responses) =>
            {
                return (Promise.all(responses.map((response) => { return (response.text()); })));
            })
            .then((fileContents : string[]) =>
            {
                worker.onmessage = (e : MessageEvent) =>
                {
                    setObjMeshes(e.data);
                    
                    if (props.onLoadEnd)
                        props.onLoadEnd();
                };

                let workerMessageContent : {[modelName : string] : string} = {};

                for (const [index, model] of fileContents.entries())
                    workerMessageContent[modelNames[index]] = model;
    
                worker.postMessage(workerMessageContent);
            })
            .catch((error) => { console.error('Error fetching OBJ file contents:', error); });
        })
        .catch((error) => { console.error('Error fetching OBJ files:', error); });

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
