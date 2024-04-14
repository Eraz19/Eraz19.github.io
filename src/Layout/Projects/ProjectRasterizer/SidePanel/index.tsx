import * as React from "react";


import * as Icons from "../../../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    const [selectedModel, setSelectedModel] = React.useState<number>();
    const [foldedSection, setFoldedSection] = React.useState<number[]>([]);

    function HandleSectionFolding(sectionIndex : number) : void
    {
        function FoldSection(sectionIndex : number) : void
        {
            setFoldedSection((prev : number[]) : number[] => { return ([...prev, sectionIndex]); });
        };
    
        function UnfoldSection(sectionIndex : number) : void
        {
            setFoldedSection((prev : number[]) : number[] => { return (prev.filter((value : number) => { return (value !== sectionIndex); })); });
        };

        if (foldedSection.includes(sectionIndex)) UnfoldSection(sectionIndex);
        else                                      FoldSection  (sectionIndex);
    };

    return (
        <div className={Style.Container}>
            <div className={Style.Section}>
                <div className={Style.Title}>
                    <div>MODELS</div>
                    <div
                        onClick   = {() => { HandleSectionFolding(0); }}
                        className = {(foldedSection.includes(0)) ? Style.Folded : ""}
                    >
                        <Icons.DownArrowHead.Component/>
                    </div>
                </div>
                <div className={`${Style.OBJModelsList} ${(foldedSection.includes(0)) ? Style.Folded : ""}`}>
                {
                    props.OBJModelOptions.map((OBJmodelOption : string, index : number) : JSX.Element =>
                    {
                        return (
                            <div
                                key       = {`Option_${index}`}
                                className = {`${Style.OBJModelOption} ${(selectedModel === index) ? Style.Selected : ""}`}
                                onClick   = {() =>
                                {
                                    props.getOBJModelOption(OBJmodelOption);
                                    setSelectedModel(index);
                                }}
                            >
                                {OBJmodelOption}
                            </div>
                        );
                    })
                }
                </div>
            </div>
            <hr className={Style.Separator}/>
            <div className={Style.Section}>
                <div className={Style.Title}>
                    <div>CAMERA ANGLE</div>
                    <div
                        onClick   = {() => { HandleSectionFolding(1); }}
                        className = {(foldedSection.includes(1)) ? Style.Folded : ""}
                    >
                        <Icons.DownArrowHead.Component/>
                    </div>
                </div>
                <div className={`${Style.Values} ${(foldedSection.includes(1)) ? Style.Folded : ""}`}>
                    <div className={Style.Value}>
                        <div>LONGITUDE</div>
                        <div>{`${props.cameraDetails?.polarCoord[1].toFixed(2)}°`}</div>
                    </div>
                    <div className={Style.Value}>
                        <div>LATITUDE</div>
                        <div>{`${props.cameraDetails?.polarCoord[0].toFixed(2)}°`}</div>
                    </div>
                </div>
            </div>
            <hr className={Style.Separator}/>
            <div className={Style.Section}>
                <div className={Style.Title}>
                    <div>CAMERA ANCHOR</div>
                    <div
                        onClick   = {() => { HandleSectionFolding(2); }}
                        className = {(foldedSection.includes(2)) ? Style.Folded : ""}
                    >
                        <Icons.DownArrowHead.Component/>
                    </div>
                </div>
                <div className={`${Style.Values} ${(foldedSection.includes(2)) ? Style.Folded : ""}`}>
                    <div className={Style.Value}>
                        <div>X</div>
                        <div>{props.cameraDetails?.anchor[0].toFixed(2)}</div>
                    </div>
                    <div className={Style.Value}>
                        <div>Y</div>
                        <div>{props.cameraDetails?.anchor[1].toFixed(2)}</div>
                    </div>
                    <div className={Style.Value}>
                        <div>Z</div>
                        <div>{props.cameraDetails?.anchor[2].toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <hr className={Style.Separator}/>
            <div className={Style.Section}>
                <div className={Style.Title}>
                    <div>CAMERA ZOOM</div>
                    <div
                        onClick   = {() => { HandleSectionFolding(3); }}
                        className = {(foldedSection.includes(3)) ? Style.Folded : ""}
                    >
                        <Icons.DownArrowHead.Component/>
                    </div>
                </div>
                <div className={`${Style.Values} ${(foldedSection.includes(3)) ? Style.Folded : ""}`}>
                    <div className={Style.Value}>
                        <div>ZOOM</div>
                        <div>{props.cameraDetails?.polarCoord[2].toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
