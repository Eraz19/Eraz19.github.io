import * as React               from "react";
import * as ErazReactComponents from "eraz-react-components";
import * as Emailjs             from "emailjs-com";

import * as Layout  from "../..";
import * as AppText from "../../../AppText";
import * as Icons   from "../../../Icons";
import * as Types   from "./types";
import      Style   from "./style.module.scss";


export function Component() : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [sendMailResponse, setSendMailResponse] = React.useState<[Types.E_EmailStatus, string]>([Types.E_EmailStatus.NONE, ""]);
    
    const [email         , setEmail         ] = React.useState<string> ("");
    const [isEmailValid  , setIsEmailValid  ] = React.useState<boolean>(true);
    const [subject       , setSubject       ] = React.useState<string> ("");
    const [isSubjectValid, setIsSubjectValid] = React.useState<boolean>(true);
    const [content       , setContent       ] = React.useState<string> ("");

    function CheckSubmition() : void
    {
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
                setSendMailResponse([Types.E_EmailStatus.PROCESSING, ""]);

                Emailjs.send(emailJsServiceId, emailJsTemplateId, { email: email, subject: subject, content: content }, emailJsUserId)
                .then(
                    () =>
                    {
                        setSendMailResponse([Types.E_EmailStatus.SUCCESS, (context?.state?.language === "fr") ? AppText.contactFormEmailSuccess_FR : AppText.contactFormEmailSuccess_EN]);
                        setEmail  ("");
                        setSubject("");
                        setContent("");

                        setTimeout(() => { setSendMailResponse([Types.E_EmailStatus.NONE, ""]) }, 1500);
                    },
                    () =>
                    {
                        setSendMailResponse([Types.E_EmailStatus.FAILURE, (context?.state?.language === "fr") ? AppText.contactFormEmailFailure_FR : AppText.contactFormEmailFailure_EN]);

                        setTimeout(() => { setSendMailResponse([Types.E_EmailStatus.NONE, ""]) }, 1500);
                    },
                );
            }
        };

        let isEmailValid    : boolean = false;
        let isSubjectEmpty  : boolean = false;

        if (ErazReactComponents.Input.TextInput.Utils.CheckValidEmail(email)) isEmailValid   = true;
        if (subject !== "")                                                   isSubjectEmpty = true;

        if (!isEmailValid ) setIsEmailValid(false);
        else                setIsEmailValid(true);

        if (!isSubjectEmpty) setIsSubjectValid (false);
        else                 setIsSubjectValid (true);

        if (isEmailValid && isSubjectEmpty)
            HandleSubmit(email, subject, content);
    };

    return (
        <div className={Style.Container}>
            <div className={Style.Header}>
                <label className={Style.Label}>
                    {AppText.contactFormEmailLabel}
                    <div className={Style.InputContainer}>
                        <input
                            type      = {"text"}
                            className = {Style.Input}
                            value     = {email}
                            onChange  = {(e : React.ChangeEvent<HTMLInputElement>) =>
                            {
                                setEmail(e.target.value ?? "");
                            }}
                        />
                        {
                            (!isEmailValid)
                            ?   <div
                                    className = {Style.ErrorIcon}
                                    title     = {(context?.state?.language === "fr") ? AppText.contactFormEmailError_FR : AppText.contactFormEmailError_EN}
                                >
                                    <Icons.Error.Component/>
                                </div>
                            :   null
                        }
                    </div>
                </label>
                <label className={Style.Label}>
                    {(context?.state?.language === "fr") ? AppText.contactFormObjectLabel_FR : AppText.contactFormObjectLabel_EN}
                    <div className={Style.InputContainer}>
                        <input
                            type      = {"text"}
                            className = {Style.Input}
                            value     = {subject}
                            onChange  = {(e : React.ChangeEvent<HTMLInputElement>) =>
                            {
                                setSubject(e.target.value ?? "");
                            }}
                        />
                        {
                            (!isSubjectValid)
                            ?   <div
                                    className = {Style.ErrorIcon}
                                    title     = {(context?.state?.language === "fr") ? AppText.contactFormObjectError_FR : AppText.contactFormObjectError_EN}
                                >
                                    <Icons.Error.Component/>
                                </div>
                            :   null
                        }
                    </div>
                </label>
            </div>
            <textarea
                rows        = {30}
                cols        = {50}
                placeholder = {(context?.state?.language === "fr") ? AppText.contactFormTextAreaPlaceholder_FR : AppText.contactFormTextAreaPlaceholder_EN}
                required    = {true}
                className   = {Style.Text}
                spellCheck  = {true}
                value       = {content}
                lang        = {(context?.state?.language === "fr") ? "fr" : "en-US"}
                onChange    = {(newValue : React.ChangeEvent<HTMLTextAreaElement>) => { setContent(newValue.target.value); }}
                onKeyDown   = {(event : React.KeyboardEvent<HTMLTextAreaElement>) =>
                {
                    if (event.key === "Tab")
                    {
                        event.preventDefault();
                        const start                        = event.currentTarget.selectionStart;
                        const end                          = event.currentTarget.selectionEnd;
                        const value                        = event.currentTarget.value;
                        event.currentTarget.value          = value.substring(0, start) + '\t' + value.substring(end);
                        event.currentTarget.selectionStart = event.currentTarget.selectionEnd = start + 1;
                    }
                }}
            />
            <div className={Style.Footer}>
                <div
                    className = {Style.Button}
                    title     = {(sendMailResponse && sendMailResponse[0] === Types.E_EmailStatus.FAILURE) ? sendMailResponse[1] : undefined}
                    onClick   = {CheckSubmition}
                >
                    <div className={Style.ButtonContent}>
                        <div className={Style.ButtonText}>
                            {(context?.state?.language === "fr") ? AppText.contactFormButton_FR : AppText.contactFormButton_EN}
                        </div>
                        {
                            (sendMailResponse && sendMailResponse[0] === Types.E_EmailStatus.FAILURE)
                            ?   <div className={Style.ButtonIcon}><Icons.Failure.Component/> </div>
                            :   (sendMailResponse && sendMailResponse[0] === Types.E_EmailStatus.SUCCESS)
                                ?   <div className={Style.ButtonIcon}><Icons.Success.Component/></div>
                                :   (sendMailResponse && sendMailResponse[0] === Types.E_EmailStatus.PROCESSING)
                                    ?   <div className={Style.ButtonIcon}><Icons.PointLoading.Component/></div>
                                    :   null
                        }
                    </div>
                </div>
            </div>
        </div>
    ); 
};
