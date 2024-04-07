import * as ErazLib from "eraz-lib";


import * as Class from ".";
import * as Utils from "../Utils/utils";


export class Instance
{
    centerOfDistribution            : ErazLib.Graphic.Vector.Types.T_Vec2D;
    subgraphVertices                : Class.Vertex.Instance[];
    subgraphEdges                   : Class.Edge.Instance[];
    centerOfCollapse                : Class.Vertex.Instance;
    centerOfCollapseAlreadySelected : boolean;
    startCollapse                   : boolean;

    constructor ()
    {
        this.centerOfDistribution            = [0,0];
        this.subgraphVertices                = [];
        this.subgraphEdges                   = [];
        this.centerOfCollapse                = new Class.Vertex.Instance(ErazLib.Primitive.Number.Utils.Random_Integer(-30000, -1));
        this.centerOfCollapseAlreadySelected = false;
        this.startCollapse                   = false;
    };

    static Build(
        graph                 : Class.Graph.Instance,
        prev                  : Class.Subgraph.Instance,
        percentVertices       : number,
        percentEdges          : number,
        canvasWidth           : number,
        canvasHeight          : number,
        spreadingVertexFactor : number,
        amountOfLayer         : number,
    ) : Class.Subgraph.Instance
    {
        function ClearSubgraph(subgraph : Class.Subgraph.Instance) : void
        {
            subgraph.subgraphVertices                = [];
            subgraph.subgraphEdges                   = [];
            subgraph.centerOfCollapseAlreadySelected = false;
            subgraph.startCollapse                   = false;
        };

        function LinkGraphVerticesToSubgraph(
            graph             : Class.Graph.Instance,
            subgraph          : Class.Subgraph.Instance,
            percentVertices   : number,
            spreadingVariance : number,
        ) : void 
        {
            function IsInCenterOfDistributionArea(
                vertex               : Class.Vertex.Instance,
                centerOfDistribution : ErazLib.Graphic.Vector.Types.T_Vec2D,
                spreadingVariance    : number,
            ) : boolean
            {
                return (
                    (vertex.coord[0] >= centerOfDistribution[0] - spreadingVariance) &&
                    (vertex.coord[0] <= centerOfDistribution[0] + spreadingVariance) && 
                    (vertex.coord[1] >= centerOfDistribution[1] - spreadingVariance) &&
                    (vertex.coord[1] <= centerOfDistribution[1] + spreadingVariance)
                );
            };

            for (const vertexRef of graph.graphVertices)
            {
                if (Math.random() < (percentVertices * 0.01))
                {
                    if (ErazLib.Graphic.Vector.Utils.IsEqual(vertexRef.coord, [0,0]) || IsInCenterOfDistributionArea(vertexRef, subgraph.centerOfDistribution, spreadingVariance))
                    {
                        subgraph.subgraphVertices.push(vertexRef);
                        vertexRef.inSubgraph = true;
                    }
                }
            }
        };

        function InitSubgraphVertexData(
            vertex               : Class.Vertex.Instance,
            spreadingVariance    : number,
            centerOfDistribution : ErazLib.Graphic.Vector.Types.T_Vec2D,
        ) : void 
        {
            vertex.layer = ErazLib.Primitive.Number.Utils.Random_Integer(1, amountOfLayer);
            vertex.size  = Utils.SizeSelector (vertex.layer);
            vertex.color = Utils.ColorSelector(vertex.layer);
            vertex.coord =
            [
                ErazLib.Primitive.Number.Utils.Random_Integer(centerOfDistribution[0] - spreadingVariance, centerOfDistribution[0] + spreadingVariance),
                ErazLib.Primitive.Number.Utils.Random_Integer(centerOfDistribution[1] - spreadingVariance, centerOfDistribution[1] + spreadingVariance),
            ];
        };

        function LinkGraphEdgesToSubgraph(
            graph        : Class.Graph.Instance,
            subgraph     : Class.Subgraph.Instance,
            percentEdges : number,
        ): void 
        {
            function IsEdgeContainsVertex(
                subgraphVertices : Class.Vertex.Instance[],
                graphEdge        : Class.Edge.Instance,
            ) : boolean 
            {	
                return (subgraphVertices.indexOf(graphEdge.from) >= 0 && subgraphVertices.indexOf(graphEdge.to) >= 0);
            };

            for (const edge of graph.graphEdges)
            {
                const linkToSubgraph : boolean = Math.random() < (percentEdges * 0.01);

                if (IsEdgeContainsVertex(subgraph.subgraphVertices, edge) && linkToSubgraph)
                    subgraph.subgraphEdges.push(edge);
            }
        };

        function SelectColorEdge(edge : Class.Edge.Instance) : void 
        {   
            let transparency : number = 0;

            if      (edge.from.layer === 1 && edge.to.layer === 1) transparency = 1;
            else if (edge.from.layer === 1 || edge.to.layer === 1) transparency = 0.8;
            else if (edge.from.layer === 2 && edge.to.layer === 2) transparency = 0.5;
            else if (edge.from.layer === 2 || edge.to.layer === 2) transparency = 0.4;
            else if (edge.from.layer === 3 && edge.to.layer === 3) transparency = 0.2;
                

            edge.edgeColor = `rgba(88, 98, 141, ${transparency})`;
        };

        let result : Class.Subgraph.Instance;
    
        const spreadingVariance = graph.graphVertices.length * spreadingVertexFactor;
    
        if (!prev) result = new Class.Subgraph.Instance();
        else 
        {
            ClearSubgraph(prev);
            result = prev;
        }
    
        result.centerOfDistribution =
        [
            ErazLib.Primitive.Number.Utils.Random_Integer((canvasWidth * 0.20), (canvasWidth) * 0.80), 
            ErazLib.Primitive.Number.Utils.Random_Integer((canvasHeight * 0.45), (canvasHeight) * 0.55)
        ];
    
        LinkGraphVerticesToSubgraph(graph, result, percentVertices, spreadingVariance);
    
        for (const vertex of result.subgraphVertices)
            if (ErazLib.Graphic.Vector.Utils.IsEqual(vertex.coord, [0,0]))
                InitSubgraphVertexData(vertex, spreadingVariance, result.centerOfDistribution);
    
        LinkGraphEdgesToSubgraph(graph, result, percentEdges);
        
        for (const edge of result.subgraphEdges)
        {
            Class.Vertex.Instance.Copy(edge.from, edge.current);
            SelectColorEdge(edge);
        }
    
        return (result);
    }
};