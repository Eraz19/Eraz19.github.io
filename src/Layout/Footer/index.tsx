import * as Icons   from "../../Icons";
import * as AppText from "../../AppText";
import      Style   from "./style.module.scss";


export function Component() : JSX.Element
{
    function HandleOpenWebPage(url : string) : void
    {
        const newWindow : Window | null = window.open(url);

        if (newWindow)
            newWindow.focus();
    };
    
    return (
        <div className={Style.Container}>
            <div
                className = {Style.Icon}
                title     = {"GitHub"}
                onClick   = {() =>
                {
                    HandleOpenWebPage(AppText.footerGitUrl);
                }}
            >
                <Icons.GitHub.Component/>
            </div>
            <div
                className = {Style.Icon}
                title     = {"LinkedIn"}
                onClick   = {() =>
                {
                    HandleOpenWebPage(AppText.footerLinkedInUrl);
                }}
            >
                <Icons.LinkedIn.Component/>
            </div>
        </div>
    );
};
