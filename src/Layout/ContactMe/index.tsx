import * as ContactForm from "./ContactForm";
import      Style       from "./style.module.scss";


export function Component() : JSX.Element
{

    return (
        <div className={Style.Container}>
            <div className={Style.Form}><ContactForm.Component/></div>
        </div>
    );
};
