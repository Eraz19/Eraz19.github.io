import * as ProjectList          from "../ProjectList";
import * as ProjectRasterizer    from "../ProjectRasterizer";
import * as ProjectCollapseGraph from "../ProjectCollapseGraph";
import * as Skills               from "./Skills";
import * as Proposition          from "./Proposition";
import * as Header               from "./Header";


export function Component() : JSX.Element
{

    
    return (
        <div>
            <Header.Component/>

            <Proposition.Component/>

            <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "10%" }}>
                <div style={{ fontSize: "100px", fontWeight: "10", marginLeft: "10%", marginTop: "5%", marginBottom: "3%", color: "#A1C181" }}>PROJECTS</div>
            </div>
            <div style={{ width : "100%", padding : "0 10%", boxSizing: "border-box"  }}>
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
                            },
                            {
                                id          : "3",
                                title       : "3",
                                component   : <ProjectCollapseGraph.Component/>,
                                description : "",
                            },
                            {
                                id          : "4",
                                title       : "4",
                                component   : <ProjectCollapseGraph.Component/>,
                                description : "",
                            },
                            {
                                id          : "5",
                                title       : "5",
                                component   : <ProjectCollapseGraph.Component/>,
                                description : "",
                            }
                        ]
                    }
                />
            </div>

            <Skills.Component/>
        </div>
    );
};
