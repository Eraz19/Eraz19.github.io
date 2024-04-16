import * as React from "react";


import * as Header      from "./Header";
import * as AboutMe     from "./AboutMe";
import * as Proposition from "./Proposition";
import * as Projects    from "./Projects";
import * as Skills      from "./Skills";
import * as Icons       from "../Icons";
import * as Types       from "./types";
import      Style       from "./style.module.scss";


export const MyContext = React.createContext<
    {
        state  : Types.T_Context | undefined;
        update : React.Dispatch<React.SetStateAction<Types.T_Context | undefined>>;
    } | undefined
>(undefined);

export function Component() : JSX.Element
{
    const [context, setContext] = React.useState<Types.T_Context>();

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
            .then((responses) =>
            {
                return (Promise.all(responses.map((response) => { return (response.text()); })));
            })
            .then((fileContents : string[]) =>
            {
                worker.onmessage = (e : MessageEvent) =>
                {
                    setContext(() => { return ({ rasterizerModels: e.data }); });
                };

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

    function HandleGoBackToTop(e : React.MouseEvent<HTMLDivElement, MouseEvent>) : void
    {
        e.preventDefault();

        window.scrollTo(
            {
                top     : 0,
                behavior: "smooth",
            }
        );
    };

    return (
        <MyContext.Provider value={{ state: context, update: setContext }}>
            <div className={Style.Container}>
                <Header.Component/>
                <div className={Style.AboutMe       }><AboutMe.Component/></div>
                <div className={Style.Proposition   }><Proposition.Component/></div>
                <div className={Style.Skill         }><Skills.Component/></div>
                <div className={Style.Project       }><Projects.Component/></div>
                <div
                    className = {Style.TopArrowButton}
                    onClick   = {HandleGoBackToTop}
                >
                    <Icons.TopArrow.Component/>
                </div>
            </div>
        </MyContext.Provider>
    );
};

export * as Types from "./types";
