import * as React               from "react";
import * as ErazLib             from "eraz-lib";
import * as ErazReactComponents from "eraz-react-components/dist";


import * as Icons     from "../../../Icons";
import * as Layout    from "../../../Layout";
import * as AppText   from "../../../AppText";
import * as SidePanel from "./SidePanel";
import      Style     from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [selectedObj, setSelectedObj] = React.useState<string>("");
    const [cameraState, setCameraState] = React.useState<ErazReactComponents.RasterizerDisplay.Rasterizer.Types.T_PolarCamera>();

    React.useEffect(() =>
    {
        function HandleOnKeyDown(e : KeyboardEvent) : void
        {
            if (e.key === "Alt")
            {
                context?.update((prev : Layout.Types.T_Context | undefined) =>
                {
                    if (prev?.showResterizerTutorial === true) return ({ ...prev, showResterizerTutorial: false });
                    else                                       return (prev);
                });
            }
        };

        window.addEventListener("keydown", HandleOnKeyDown);

        context?.update((prev : Layout.Types.T_Context | undefined) =>
        {
            console.log(prev?.showResterizerTutorial);

            if (prev && prev.showResterizerTutorial == null) return ({ ...prev, showResterizerTutorial: true });
            else                                             return (prev);
        });

        return (() => { window.removeEventListener("keydown", HandleOnKeyDown); });
    }, []);

    function HandleMouseEnter() : void { document.body.style.overflowY = "hidden"; };
    function HandleMouseLeave() : void { document.body.style.overflowY = "auto";   };

    function HandleActivateAltKeydown() : void
    {   
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Alt", code: "AltLeft", altKey: true }));

        if (context?.state?.showResterizerTutorial === true)
        {
            context?.update((prev : Layout.Types.T_Context | undefined) =>
            {
                if (prev) return ({ ...prev, showResterizerTutorial: false });
                else      return (prev);
            })    
        }
    };

    function HandleDisactivateAltKeyup() : void
    {               
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "Alt", code: "AltLeft", altKey: false }));
    };

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
                                return ({ edge : edge, color: { red: 0, green: 0, blue: 0 } });
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
                    keyboardSettings = {{ enabled: true }}
                    defaultCamera    =
                    {
                        {
                            anchor     : [0 ,0 ,0  ],
                            polarCoord : [22,25,1.5],
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
            <div
                className   = {Style.KeyboardIcon}
                onMouseDown = {HandleActivateAltKeydown}
                onMouseUp   = {HandleDisactivateAltKeyup}
                onMouseOut  = {HandleDisactivateAltKeyup}
            >
                <Icons.Keyboard.Component/>
            </div>
            {
                (context?.state?.showResterizerTutorial === null || context?.state?.showResterizerTutorial === true)
                ?   
                    <>
                        <div className={Style.TutorialBackgroundKeybinding}/>
                        <div className={Style.TutorialCurvedArrow}>
                                <Icons.CurvedArrow.Component/>
                            </div>
                            <div
                                className               = {Style.TutorialText}
                                dangerouslySetInnerHTML = {
                                    {
                                        __html: (context?.state?.language === "fr")
                                            ?   AppText.tutorial_FR.replace("Alt", "<div>Alt</div>")
                                            :   AppText.tutorial_EN.replace("Alt", "<div>Alt</div>")
                                    }
                                }
                            />
                        </>
                :   null
            }
        </div>
    );
};

export * as Types from "./types";
