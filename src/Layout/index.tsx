import * as Header      from "./Header";
import * as AboutMe     from "./AboutMe";
import * as Proposition from "./Proposition";
import * as Projects    from "./Projects";
import * as Skills      from "./Skills";
import * as Icons       from "../Icons";

import Style from "./style.module.scss";


export function Component() : JSX.Element
{
    function HandleGoBackToTop(e : React.MouseEvent<HTMLDivElement, MouseEvent>) : void
    {
        e.preventDefault();

        window.scrollTo(
            {
                top     : 0,
                behavior: "smooth",
            }
        );
    };

    return (
        <div className={Style.Container}>
            <Header.Component/>
            <div className={Style.AboutMe       }><AboutMe.Component/></div>
            <div className={Style.Proposition   }><Proposition.Component/></div>
            <div className={Style.Skill         }><Skills.Component/></div>
            <div className={Style.Project       }><Projects.Component/></div>
            <div
                className = {Style.TopArrowButton}
                onClick   = {HandleGoBackToTop}
            >
                <Icons.TopArrow.Component/>
            </div>
        </div>
    );
};
