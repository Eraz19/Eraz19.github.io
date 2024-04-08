import * as Header      from "./Header";
import * as AboutMe     from "./AboutMe";
import * as Proposition from "./Proposition";
import * as Projects    from "./Projects";
import * as Skills      from "./Skills";


export function Component() : JSX.Element
{
    return (
        <div>
            <Header.Component/>
            <div style={{ margin: "10% 0%" }}><AboutMe.Component/></div>
            <div style={{ margin: "4% 0%" }}><Proposition.Component/></div>
            <Projects.Component/>
            <Skills.Component/>
        </div>
    );
};
