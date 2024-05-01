import * as React from "react";


import * as Header      from "./Header";
import * as AboutMe     from "./AboutMe";
import * as ContactMe   from "./ContactMe/index";
import * as Projects    from "./Projects";
import * as Skills      from "./Skills";
import * as Footer      from "./Footer";
import * as Icons       from "../Icons";
import * as Types       from "./types";
import      Style       from "./style.module.scss";


export const MyContext : React.Context<Types.T_Context> = React.createContext<Types.T_Context>(undefined);

export function Component() : JSX.Element
{
    const [context, setContext] = React.useState<Types.T_ContextState>();

    const refAboutMe  = React.useRef<HTMLDivElement>(null);
    const refSkills   = React.useRef<HTMLDivElement>(null);
    const refProjects = React.useRef<HTMLDivElement>(null);
    const refContact  = React.useRef<HTMLDivElement>(null);

    React.useEffect(() =>
    {    
        const worker = new Worker(new URL("./Projects/ProjectRasterizer/worker.ts", import.meta.url));

        let modelNames : string[] = [];

        fetch("https://api.github.com/repos/Eraz19/Portfolio/contents/src/OBJ_Files")
        .then((response : Response) =>
        {
            if (!response.ok)
                throw new Error('Error fetching OBJ files: ' + response.status);

            return (response.json());
        })
        .then((data) =>
        {
            const fetchPromises : Promise<any>[] = data.map((file : any) =>
            {
                const downloadUrl      : string   = file.download_url;
                const downloadUrlParts : string[] = downloadUrl.split("/");

                if (downloadUrlParts.length !== 0)
                    modelNames.push(downloadUrlParts[downloadUrlParts.length - 1].split(".")[0]);

                return (fetch(file.download_url));
            });

            Promise.all(fetchPromises)
            .then((responses)               => { return (Promise.all(responses.map((response) => { return (response.text()); }))); })
            .then((fileContents : string[]) =>
            {
                worker.onmessage = (e : MessageEvent) => { setContext(() => { return ({ rasterizerModels: e.data }); }); };

                let workerMessageContent : {[modelName : string] : string} = {};

                for (const [index, model] of fileContents.entries())
                    workerMessageContent[modelNames[index]] = model;
    
                worker.postMessage(workerMessageContent);
            })
            .catch((error) => { console.error('Error fetching OBJ file contents:', error); });
        })
        .catch((error) => { console.error('Error fetching OBJ files:', error); });

        return () => { worker.terminate(); };
    }, []);

    React.useEffect(() =>
    {
        console.log(context?.section);

        if      (context?.section === Types.T_MenuSection.ABOUT_ME) window.scrollTo({ top: refAboutMe.current?.offsetTop  });
        else if (context?.section === Types.T_MenuSection.SKILLS  ) window.scrollTo({ top: refSkills.current?.offsetTop   });
        else if (context?.section === Types.T_MenuSection.PROJECTS) window.scrollTo({ top: refProjects.current?.offsetTop });
        else if (context?.section === Types.T_MenuSection.CONTACT ) window.scrollTo({ top: refContact.current?.offsetTop  });
    }, [context?.section]);

    function HandleGoBackToTop(e : React.MouseEvent<HTMLDivElement, MouseEvent>) : void
    {
        e.preventDefault();

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <MyContext.Provider value={{ state: context, update: setContext }}>
            <div className={Style.Container}>
                <Header.Component/>
                <div
                    ref       = {refAboutMe}
                    className = {Style.AboutMe}
                >
                    <AboutMe.Component/>
                </div>
                <div
                    ref       = {refSkills}
                    className = {Style.Skill}
                >
                    <Skills.Component/>
                </div>
                <div
                    ref       = {refProjects}
                    className = {Style.Project}
                >
                    <Projects.Component/>
                </div>
                <div
                    className = {Style.TopArrowButton}
                    onClick   = {HandleGoBackToTop}
                >
                    <Icons.TopArrow.Component/>
                </div>
                <div
                    ref       = {refContact}
                    className = {Style.ContactForm}
                >
                    <ContactMe.Component/>
                </div>
                <Footer.Component/>
            </div>
        </MyContext.Provider>
    );
};

export * as Types from "./types";
