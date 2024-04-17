import * as React   from "react";
import * as Emailjs from "emailjs-com";


import * as Layout      from "../";
import * as Icons       from "../../Icons";
import * as ContactForm from "./ContactForm";
import * as AppText     from "../../AppText";
import      Style       from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [openModal       , setOpenModal       ] = React.useState<boolean>(false);
    const [sendMailResponse, setSendMailResponse] = React.useState<[boolean, string]>();

    React.useEffect(() =>
    {
        if (openModal) document.body.style.overflowY = "hidden";
        else           document.body.style.overflowY = "auto";
    }, [openModal]);

    function HandleOpenGitHubPage() : void
    {
        const newWindow : Window | null = window.open("https://github.com/Eraz19");

        if (newWindow)
            newWindow.focus();
    };

    function HandleSubmit(
        email   : string,
        subject : string,
        content : string,
    ) : void
    {
        const emailJsServiceId  : string | undefined = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
        const emailJsTemplateId : string | undefined = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
        const emailJsUserId     : string | undefined = process.env.REACT_APP_EMAIL_JS_USER_ID;

        if (emailJsServiceId && emailJsTemplateId && emailJsUserId)
        {
            Emailjs.send(emailJsServiceId, emailJsTemplateId, { email: email, subject: subject, content: content }, emailJsUserId)
            .then(
                () =>
                {
                    setSendMailResponse([true , "The email has been sent"]);
                    setTimeout(() => { setOpenModal(false); }, 500);
                },
                (error) =>
                {
                    setSendMailResponse([false, error.text]);
                },
            );
        }
    };

    return (
        <div className={Style.Container}>
            <div className={Style.Title}>{(context?.state?.language === "fr") ? "À Propos": "About Me"}</div>
            <div className={Style.Content}>
                <div className={Style.Text}>
                    <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_1_FR : AppText.aboutMe_1_EN }}/>
                    <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_2_FR : AppText.aboutMe_2_EN }}/>
                    <div dangerouslySetInnerHTML = {{ __html: (context?.state?.language === "fr") ? AppText.aboutMe_3_FR : AppText.aboutMe_3_EN }}/>
                </div>

                <div className={Style.Contact}>
                    <div
                        className = {Style.Button}
                        onClick   = {HandleOpenGitHubPage}
                    >
                        <div className={Style.ContactIcon}><Icons.GitHub.Component/></div>
                        <div className={Style.ContactText}>
                            <div className={Style.Text}>Eraz19</div>
                        </div>
                    </div>
                    <div
                        className = {Style.Button}
                        onClick   = {() => { setOpenModal(true); }}
                    >
                        <div className={Style.ContactIcon}><Icons.Gmail.Component/></div>
                        <div className={Style.ContactText}>
                            <div className={Style.Text}>{(context?.state?.language === "fr") ? "Me Contacter" : "Contact me"}</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                (openModal)
                ?   <div
                        className = {Style.Modal}
                        onClick   = {(e : React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        {
                            if (e.currentTarget == e.target)
                                setOpenModal(false);
                        }}
                    >
                    {
                        (sendMailResponse)
                        ?   (sendMailResponse[0] === true)
                            ?   <ContactForm.Component
                                    status   = {ContactForm.Types.Status.SUCCESS}
                                    onSubmit = {HandleSubmit}
                                />
                            :   <ContactForm.Component
                                    status       = {ContactForm.Types.Status.FAILURE}
                                    onSubmit     = {HandleSubmit}
                                    errorMessage = {sendMailResponse[1]}
                                />
                        :   <ContactForm.Component
                                status   = {ContactForm.Types.Status.NONE}
                                onSubmit = {HandleSubmit}
                            />
                    }    
                    </div>
                :   null
            }
        </div>
    );
};
