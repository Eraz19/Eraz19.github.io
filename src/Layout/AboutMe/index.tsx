import * as React   from "react";
import * as Emailjs from "emailjs-com";


import * as Icons       from "../../Icons";
import * as ContactForm from "./ContactForm";
import      Style       from "./style.module.scss";


const presentationFirstPart : string = 
`I am a software engineer with 5 years of experience in the field. My expertise lies in full-stack development, where I enjoy using my skills in both 
front-end and back-end technologies to create dynamic and user-friendly applications. I am a dedicated learner and am constantly seeking to expand my 
knowledge and skills. One area of software engineering that I am particularly passionate about is the development of graphical software. I enjoy the 
challenge of creating visually appealing and intuitive interfaces that make it easy for users to interact with the underlying data and logic.`;

const presentationSecondPart : string = `I am confident in my ability to provide high-quality solutions to meet the needs of any project and I am always
eager to take on new challenges.Thank you for considering my portfolio. I look forward to the opportunity to work with you.`;


export function Component() : JSX.Element
{
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
            <div className={Style.Title}>About Me</div>
            <div className={Style.Content}>
                <div className={Style.Text}>
                    <div>{presentationFirstPart}</div>
                    <div>{presentationSecondPart}</div>
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
                            <div className={Style.Text}>Contact me</div>
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
