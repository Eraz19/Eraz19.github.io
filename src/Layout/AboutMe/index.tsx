import * as React   from "react";


import FirstLayer  from "../../assets/FirstLayer.png";
import SecondLayer from "../../assets/SecondLayer.png";
import ThirdLayer  from "../../assets/ThirdLayer.png";
import ForthLayer  from "../../assets/ForthLayer.png";
//import Moche from "../../assets/Moche.png";


import * as Layout      from "../";
import * as AppText     from "../../AppText";
import      Style       from "./style.module.scss";


export function Component() : JSX.Element
{
    const ref = React.useRef<HTMLDivElement>(null);

    const context = React.useContext(Layout.MyContext);

    React.useEffect(() =>
    {
        const observer : IntersectionObserver = new IntersectionObserver((entries) =>
        {
            entries.forEach((entry) =>
            {
                if (entry.isIntersecting)
                    entry.target.classList.add(Style.Animate);
            });
        }, { threshold: .9 });

        function RemoveObserver() : void
        {
            if (ref.current)
                observer.unobserve(ref.current);
        };

        function SetObserver() : void
        {
            if (ref.current)
                observer.observe(ref.current);
        };

        SetObserver();

        return (RemoveObserver);
    }, []);

    return (
        <div
            ref       = {ref}
            className = {Style.Container}
        >
            <div className={Style.TextContainer}>
                <div className={Style.Title}>{(context?.state?.language === "fr") ? AppText.aboutMeTitle_FR : AppText.aboutMeTitle_EN}</div>
                <div className={Style.Content}>
                    <div className={Style.Text}>
                        <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_1_FR : AppText.aboutMe_1_EN }}/>
                        <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_2_FR : AppText.aboutMe_2_EN }}/>
                        <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_3_FR : AppText.aboutMe_3_EN }}/>
                    </div>
                </div>
            </div>
            <div className = {Style.ImageContainer}>
                <img className={`${Style.Layer} ${Style.Forth} `}  src={ForthLayer} />
                <img className={`${Style.Layer} ${Style.Third} `}  src={ThirdLayer} />
                <img className={`${Style.Layer} ${Style.Second}`} src={SecondLayer}/>
                <img className={`${Style.Layer} ${Style.First} `}  src={FirstLayer} />
            </div>
        </div>
    );
};
