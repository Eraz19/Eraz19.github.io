import * as Types from "./types";
import      Style from "./style.module.scss";


export function Component(props : Types.T_Props) : JSX.Element
{
    return (
        <div className={Style.Container}>
            <div className={Style.OBJModelsList}>
            {
                props.OBJModelOptions.map((OBJmodelOption : string, index : number) : JSX.Element =>
                {
                    return (
                        <div
                            key       = {`Option_${index}`}
                            className = {Style.OBJModelOption}
                            onClick   = {() =>
                            {
                                props.getOBJModelOption(OBJmodelOption);
                            }}
                        >
                            {OBJmodelOption}
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};
