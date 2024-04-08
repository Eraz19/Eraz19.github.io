import AlexanderOnLaptop1 from "../../assets/AlexanderOnLaptop1.png";
import Style              from "./style.module.scss";


export function Component() : JSX.Element
{
    return (
        <div className={Style.Container}>
            <div className={Style.Image}>
                <img src={AlexanderOnLaptop1}/>
            </div>
            <div className={Style.PresentationTitle}>
                <div className={Style.TitleContainer}>
                    <div className={`${Style.Title} ${Style.Title1}`}>FULL-STACK</div>
                </div>
                <div className={Style.TitleContainer}>
                    <div className={`${Style.Title} ${Style.Title2}`}>SOFTWARE ENGINEER</div>
                </div>
            </div>
            <div className={Style.Name}>ALEXANDER DOUIEB</div>
        </div>
    );
};
