import * as ErazLib from "eraz-lib";


import * as ProjectRasterizer from "../Layout/Projects/ProjectRasterizer";


export enum T_MenuSection
{
    ABOUT_ME,
    SKILLS,
    PROJECTS,
    CONTACT,
};

export type T_ContextState =
{
    rasterizerModels        : ProjectRasterizer.Types.T_ObjContentList<ErazLib.Parser.OBJ.Types.T_OBJParsingResult>;
    language               ?: "en" | "fr";
    showResterizerTutorial ?: boolean;
    section                ?: T_MenuSection;
};

export type T_Context = 
{
    state  : T_ContextState | undefined;
    update : React.Dispatch<React.SetStateAction<T_ContextState | undefined>>;
} | undefined;
