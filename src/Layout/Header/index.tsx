import * as Icons             from "../../Icons";
import      AlexanderOnLaptop from "../../assets/AlexanderOnLaptop.png"
import      Style             from "./style.module.scss";


const presentationFirstPart : string = 
`I am a software engineer with 5 years of experience in the field. My expertise lies in full-stack development, where I enjoy using my skills in both 
front-end and back-endtechnologies to create dynamic and user-friendly applications. I am a dedicated learner and am constantly seeking to expand my 
knowledge and skills. One area of software engineering that I am particularly passionate about is the development of graphical software. I enjoy the 
challenge of creating visually appealing and intuitive interfaces that make it easy for users to interact with the underlying data and logic.`;

const presentationSecondPart : string = `I am confident in my ability to provide high-quality solutions to meet the needs of any project and I am always
eager to take on new challenges.Thank you for considering my portfolio. I look forward to the opportunity to work with you.`;

export function Component() : JSX.Element
{
    function HandleCopyMailAddressClick() : void
    {
        navigator.clipboard
        .writeText("alexanderdouieb@gmail.com")
        .then(() =>
        {
            alert("alexanderdouieb@gmail.com Copied");
        });
    };

    function HandleOpenGitHubPage() : void
    {
        const newWindow : Window | null = window.open("https://github.com/Eraz19");

        if (newWindow)
            newWindow.focus();
    };

    return (
        <div className={Style.Container}>
            <div className={Style.TextContainer}>
                <div className={Style.PresentationTitle}>FULL-STACK SOFTWARE ENGINEER</div>
                <div className={Style.PresentationFristPart}>{presentationFirstPart}</div>
                <div className={Style.PresentationSecondPart}>{presentationSecondPart}</div>
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
                        onClick   = {HandleCopyMailAddressClick}
                    >
                        <div className={Style.ContactIcon}><Icons.Gmail.Component/></div>
                        <div className={Style.ContactText}>
                            <div className={Style.Text}>alexanderdouieb@gmail.com</div>
                        </div>
                    </div>
                </div>
                <div className={Style.EmtyBorder}/>
                <div className={Style.Image}>
                    <img src={AlexanderOnLaptop}/>
                </div>
            </div>
        </div>
    );
};
