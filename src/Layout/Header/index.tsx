import * as React from "react";


import AlexanderOnLaptop1 from "../../assets/AlexanderOnLaptop1.png";

import * as Layout from "../";
import * as Icons  from "../../Icons";
import      Style  from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    return (
        <div className={Style.Container}>
            <div className={Style.Image}>
                <img src={AlexanderOnLaptop1}/>
            </div>
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
            <div className={Style.MultiLanguage}>
                <div>{(context?.state?.language === "fr") ? "FR" : "EN-US"}</div>
                <div
                    className = {Style.MultiLanguageIcon}
                    onClick   = {() =>
                    {
                        context?.update((prev : Layout.Types.T_Context | undefined) : Layout.Types.T_Context | undefined =>
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
