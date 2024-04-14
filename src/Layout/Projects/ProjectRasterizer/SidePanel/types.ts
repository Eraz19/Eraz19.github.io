import * as ErazReactComponents from "eraz-react-components/dist";


export type T_Props =
{
    OBJModelOptions   : string[];
    getOBJModelOption : (option : string) => void;
    cameraDetails     : ErazReactComponents.RasterizerDisplay.Rasterizer.Types.T_PolarCamera | undefined;
};
