import * as React from "react";


import * as Layout from "../";
import * as Icons  from "../../Icons";
import      Style  from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    return (
        <div className={Style.Container}>
            
            <div className={Style.Main}>
                <div className={Style.Menu}>
                    <div
                        className = {Style.MenuItem}
                        onClick   = {() =>
                        {
                            context?.update((prev : Layout.Types.T_ContextState | undefined) : Layout.Types.T_ContextState | undefined =>
                            {
                                if (prev) return ({ ...prev, section : Layout.Types.T_MenuSection.ABOUT_ME });
                                else      return (prev);
                            });
                        }}
                    >
                        ABOUT ME
                    </div>
                    <div
                        className = {Style.MenuItem}
                        onClick   = {() =>
                        {
                            context?.update((prev : Layout.Types.T_ContextState | undefined) : Layout.Types.T_ContextState | undefined =>
                            {
                                if (prev) return ({ ...prev, section : Layout.Types.T_MenuSection.SKILLS });
                                else      return (prev);
                            });
                        }}
                    >
                        SKILLS
                    </div>
                    <div
                        className = {Style.MenuItem}
                        onClick   = {() =>
                        {
                            context?.update((prev : Layout.Types.T_ContextState | undefined) : Layout.Types.T_ContextState | undefined =>
                            {
                                if (prev) return ({ ...prev, section : Layout.Types.T_MenuSection.PROJECTS });
                                else      return (prev);
                            });
                        }}
                    >
                        PROJECTS
                    </div>
                    <div
                        className = {Style.MenuItem}
                        onClick   = {() =>
                        {
                            context?.update((prev : Layout.Types.T_ContextState | undefined) : Layout.Types.T_ContextState | undefined =>
                            {
                                if (prev) return ({ ...prev, section : Layout.Types.T_MenuSection.CONTACT });
                                else      return (prev);
                            });
                        }}
                    >
                        CONTACT
                    </div>
                </div>
                <hr className={Style.Separator}/>
                <div className={Style.Text}>
                    <div className={Style.PresentationTitle}>
                        <div className={Style.TitleContainer}>
                            <div className={`${Style.Title} ${Style.Title1}`}>
                                FULLSTACK
                                <div className={Style.Cursor}/>
                            </div>
                        </div>
                        <div className={Style.TitleContainer}>
                            <div className={`${Style.Title} ${Style.Title2}`}>
                                SOFTWARE ENGINEER
                                <div className={Style.Cursor}/>
                            </div>
                            <div className={Style.Cursor}/>
                        </div>
                    </div>
                    <div className={Style.Name}>ALEXANDER DOUIEB</div>
                </div>
            </div>
            
            <div className={Style.MultiLanguage}>
                <div>{(context?.state?.language === "fr") ? "FR" : "EN-US"}</div>
                <div
                    className = {Style.MultiLanguageIcon}
                    onClick   = {() =>
                    {
                        context?.update((prev : Layout.Types.T_ContextState | undefined) : Layout.Types.T_ContextState | undefined =>
                        {
                            if (prev) return ({...prev, language: (prev?.language === "fr") ? "en" : "fr"});
                            else      return (prev);
                        });
                    }}
                >
                    <Icons.MultiLanguage.Component/>
                </div>
            </div>
        </div>
    );
};
