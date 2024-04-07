import * as Class from ".";


export class Instance
{
    id                   : number;
    from                 : Class.Vertex.Instance;
    to                   : Class.Vertex.Instance;
    current              : Class.Vertex.Instance;
    currentAnimationStep : number;
    edgeColor            : string;
    edgeComplete         : boolean;

    constructor (
        edgeId   : number,
        edgeFrom : Class.Vertex.Instance,
        edgeTo   : Class.Vertex.Instance,
    )
    {
        this.id                   = edgeId;
        this.from                 = edgeFrom;
        this.to                   = edgeTo;
        this.current              = new Class.Vertex.Instance(-1);
        this.currentAnimationStep = 0;
        this.edgeColor            = "";
        this.edgeComplete         = false;
    }
};