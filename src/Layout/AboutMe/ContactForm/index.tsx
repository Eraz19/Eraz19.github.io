import * as React               from "react";
import * as ErazReactComponents from "eraz-react-components";


import * as Layout from "../../";
import * as Icons from "../../../Icons";
import * as Types from "./types";
import      Style from "./style.module.scss";


const emailStyleInput : ErazReactComponents.Input.TextInput.Types.T_Style =
{
    label:
    {
        normal:
        {
            color: "rgb(35, 61, 77)",
            fontWeight: 700,
        } 
    },
    input:
    {
        normal:
        {
            borderColor  : "rgb(35, 61, 77)",
            borderWidth  : "2px",
            borderRadius : "3px",
            color        : "rgb(35, 61, 77)",
        }
    },
    caret:
    {
        normal: { color: "rgb(35, 61, 77)", }
    }
};

const buttonStyle : ErazReactComponents.Button.Types.T_Style =
{
    normal:
    {
        paddingHorizontal : "60px",
        paddingVertical   : "10px",
        borderRadius      : "4px",
        background        : "rgb(23, 41, 51)"
    },
    hover:
    {
        background: "rgb(35, 61, 77)"
    },
};

export function Component(props : Types.T_Props) : JSX.Element
{
    const context = React.useContext(Layout.MyContext);

    const [email            , setEmail            ] = React.useState<string> ("");
    const [isEmailValid     , setIsEmailValid     ] = React.useState<boolean>(true);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState<string> ("");
    const [subject          , setSubject          ] = React.useState<string> ("");
    const [isSubjectValid   , setIsSubjectValid   ] = React.useState<boolean>(true);
    const [content          , setContent          ] = React.useState<string> ("");

    function CheckSubmition() : void
    {
        let isEmailValid   : boolean = false;
        let isSubjectEmpty  : boolean = false;

        if (ErazReactComponents.Input.TextInput.Utils.CheckValidEmail(email, setEmailErrorMessage)) isEmailValid  = true;
        if (subject !== "")                                                                         isSubjectEmpty = true;

        if (!isEmailValid ) setIsEmailValid(false);
        else                setIsEmailValid(true);

        if (!isSubjectEmpty) setIsSubjectValid (false);
        else                 setIsSubjectValid (true);

        if (isEmailValid && isSubjectEmpty)
            props.onSubmit(email, subject, content);
    };

    return (
        <div className={Style.Container}>
            <div className={Style.Header}>
                <div className={Style.Input}>
                    <ErazReactComponents.Input.TextInput.Component
                        type     = {"text"}
                        label    = {"Email"}
                        style    = {emailStyleInput}
                        onChange = {(newValue : string | null) => { setEmail(newValue ?? ""); }}
                    />
                    {
                        (!isEmailValid)
                        ?   <div
                                className = {Style.Icon}
                                title     = {emailErrorMessage + "\n\texample : example@gmail.com"}
                            >
                                <Icons.Error.Component color={"rgb(156, 37, 37)"}/>
                            </div>
                        :   null
                    }
                </div>
                <div className={Style.Input}>
                    <ErazReactComponents.Input.TextInput.Component
                        type     = {"text"}
                        label    = {"Object"}
                        style    = {emailStyleInput}
                        onChange = {(newValue : string | null) => { setSubject(newValue ?? ""); }}
                    />
                    {
                        (!isSubjectValid)
                        ?   <div
                                className = {Style.Icon}
                                title     = {"Object cannot be empty"}
                             >
                                <Icons.Error.Component color={"rgb(156, 37, 37)"}/>
                            </div>
                        :   null
                    }
                </div>
            </div>
            <textarea
                name        = {"message"}
                rows        = {30}
                cols        = {50}
                placeholder = {(context?.state?.language === "fr") ? "Ecrire votre message ici..." : "Type your message here..."}
                required    = {true}
                className   = {Style.Text}
                spellCheck  = {true}
                lang        = {"en-US"}
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
                <div title={(props.status === Types.Status.FAILURE) ? props.errorMessage : undefined}>
                    <ErazReactComponents.Button.Component
                        style   = {buttonStyle}
                        onClick = {CheckSubmition}
                    >
                        <div className={Style.ButtonContent}>
                            <div>{(context?.state?.language === "fr") ? "Envoyer Email" : "Send Email"}</div>
                            {
                                (props.status === Types.Status.FAILURE)
                                ?   <div className={Style.ButtonIcon}><Icons.Failure.Component/> </div>
                                :   (props.status === Types.Status.SUCCESS)
                                    ?   <div className={Style.ButtonIcon}><Icons.Success.Component/></div>
                                    :   null
                            }
                        </div>
                    </ErazReactComponents.Button.Component>
                </div>
            </div>
        </div>
    ); 
};

export * as Types from "./types";
