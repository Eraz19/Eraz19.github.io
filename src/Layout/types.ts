import * as ErazLib from "eraz-lib";


import * as ProjectRasterizer from "../Layout/Projects/ProjectRasterizer";


export type T_Context =
{
    rasterizerModels  : ProjectRasterizer.Types.T_ObjContentList<ErazLib.Parser.OBJ.Types.T_OBJParsingResult>;
    language         ?: "en" | "fr";
};
