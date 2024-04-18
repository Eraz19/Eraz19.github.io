import Style from "./style.module.scss";


export function Component() : JSX.Element
{
    return (
        <div className={Style.Cube}>
            <div className={Style.CubeExt}>
                <div className={`${Style.FaceExt} ${Style.Front} `}/>
                <div className={`${Style.FaceExt} ${Style.Back}  `}/>
                <div className={`${Style.FaceExt} ${Style.Top}   `}/>
                <div className={`${Style.FaceExt} ${Style.Bottom}`}/>
                <div className={`${Style.FaceExt} ${Style.Left}  `}/>
                <div className={`${Style.FaceExt} ${Style.Right} `}/>
                <div className={Style.CubeInt}>
                    <div className={`${Style.FaceInt} ${Style.Front} `}/>
                    <div className={`${Style.FaceInt} ${Style.Back}  `}/>
                    <div className={`${Style.FaceInt} ${Style.Top}   `}/>
                    <div className={`${Style.FaceInt} ${Style.Bottom}`}/>
                    <div className={`${Style.FaceInt} ${Style.Left}  `}/>
                    <div className={`${Style.FaceInt} ${Style.Right} `}/>
                </div>
            </div>
        </div>
    );
};
