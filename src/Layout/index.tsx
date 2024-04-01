import * as ProjectList          from "../ProjectList";
import * as ProjectRasterizer    from "../ProjectRasterizer";
import * as ProjectCollapseGraph from "../ProjectCollapseGraph";
import      Style                from "./style.module.scss";


const presentationFirstPart : string = 
`I am a software engineer with 5 years of experience in the field. My expertise lies in full-stack development, where I enjoy using my skills in both 
front-end and back-endtechnologies to create dynamic and user-friendly applications. I am a dedicated learner and am constantly seeking to expand my 
knowledge and skills. One area of software engineering that I am particularly passionate about is the development of graphical software. I enjoy the 
challenge of creating visually appealing and intuitive interfaces that make it easy for users to interact with the underlying data and logic.`

const presentationSecondPart : string = `I am confident in my ability to provide high-quality solutions to meet the needs of any project and I am always
eager to take on new challenges.Thank you for considering my portfolio. I look forward to the opportunity to work with you.`


export function Component() : JSX.Element
{
    return (
        <div className={Style.Container}>
            
            <div className={Style.TextContainer}>
                <div className={Style.PresentationFristPart}>{presentationFirstPart}</div>
                <div className={Style.PresentationSecondPart}>{presentationSecondPart}</div>
            </div>
            <div style={{ width : "100%", padding : "10%", boxSizing: "border-box" }}>
                <ProjectList.Component
                    projects=
                    {
                        [
                            {
                                id          : "1",
                                title       : "1",
                                component   : <ProjectRasterizer.Component/>,
                                description : "",
                            },
                            {
                                id          : "2",
                                title       : "2",
                                component   : <ProjectCollapseGraph.Component/>,
                                description : "",
                            }
                        ]
                    }
                />
            </div>
        </div>
    );
};
