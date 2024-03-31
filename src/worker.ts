import * as ErazLib from "eraz-lib";


import * as Types from "./ProjectRasterizer/types";


self.addEventListener("message", (event : MessageEvent) =>
{
    let result : Types.T_ObjContentList<ErazLib.Parser.OBJ.Types.T_OBJParsingResult> = {};

    const objFilesContent : [string,ErazLib.Parser.OBJ.Types.T_OBJParsingResult][] = Object
        .entries(event.data as Types.T_ObjContentList<string>)
        .map((objFileContent : [string,string]) : [string,ErazLib.Parser.OBJ.Types.T_OBJParsingResult] =>
        {
            return ([objFileContent[0],ErazLib.Parser.OBJ.ParseOBJFile(objFileContent[1])]);
        });

    for (const objFileContent of objFilesContent)
        result[objFileContent[0]] = objFileContent[1];

    postMessage(result);
});
