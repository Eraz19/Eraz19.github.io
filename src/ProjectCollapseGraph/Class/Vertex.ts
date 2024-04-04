import * as ErazLib from "eraz-lib";


import * as Class from ".";
import * as Utils from "../Utils/utils";


export class Instance
{
    id                        : number;
    coord                     : ErazLib.Graphic.Vector.Types.T_Vec2D;
    layer                     : number;
    color                     : string;
    size                      : number;
    inSubgraph                : boolean;
    textToDisplay             : string;
    collapseVelocity          : ErazLib.Graphic.Vector.Types.T_Vec2D;
    isAnHypergraph            : boolean;
    hypergraphRingSize        : number;
    currentHypergraphRingSize : number;

    constructor (vertexId : number)
    {
        this.id                        = vertexId;
        this.coord                     = [0,0];
        this.layer                     = 0;
        this.color                     = "";
        this.size                      = 0;
        this.inSubgraph                = false;
        this.textToDisplay             = "";
        this.collapseVelocity          = [0,0];
        this.isAnHypergraph            = false;
        this.hypergraphRingSize        = 0;
        this.currentHypergraphRingSize = 0;
    };

    static Copy(
        src  : Class.Vertex.Instance,
        dest : Class.Vertex.Instance,
    ) : void
    {
        dest.id             = src.id;
        dest.layer          = src.layer;
        dest.color          = src.color;
        dest.size           = src.size;
        dest.inSubgraph     = src.inSubgraph;
        dest.textToDisplay  = src.textToDisplay;
        dest.isAnHypergraph = src.isAnHypergraph;
        dest.coord          = [...src.coord]
    };

    SetVertexData(
        frameHorizontalOffset : number,
        frameVerticalOffset   : number,
        canvasWidth           : number,
        canvasHeight          : number,
        amountOfLayer         : number,
    )
    {
        this.layer = ErazLib.Primitive.Number.Utils.Random_Integer(1, amountOfLayer);
        this.size  = Utils.SizeSelector (this.layer);
        this.color = Utils.ColorSelector(this.layer);
        this.coord =
        [
            ErazLib.Primitive.Number.Utils.Random_Integer(-frameHorizontalOffset, canvasWidth + frameHorizontalOffset),
            ErazLib.Primitive.Number.Utils.Random_Integer(-frameVerticalOffset  , canvasHeight + frameVerticalOffset)
        ];
    }
};
