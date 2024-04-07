import * as Class from ".";


export class Instance
{
    globalIdVertex   : number;
    globalIdEdge     : number;
    graphVertices    : Class.Vertex.Instance[];
    graphEdges       : Class.Edge.Instance[];

    constructor () 
    {
        this.globalIdVertex = 0;
        this.globalIdEdge   = 0;
        this.graphVertices  = [];
        this.graphEdges     = [];
    };

    static Build(
        prev           : Class.Graph.Instance,
        amountOfVertex : number,
    ) : Class.Graph.Instance
    {
        function ClearGraphFromOldSubgraphVertices(graph : Class.Graph.Instance) : void
        {
            if (graph)
            {
                for (let i = 0; i < graph.graphVertices.length; ++i)
                {
                    if (graph.graphVertices[i].inSubgraph)
                    {
                        graph.graphVertices.splice(i, 1);
                        --i;
                    }
                }
            }
        };
    
        function AddGraphVertices(
            numOfVertex : number,
            graph       : Class.Graph.Instance,
        ) : void 
        {
            function IncrementGraphVertexCount(graph : Class.Graph.Instance) : number 
            { 
                return (graph.globalIdVertex++); 
            };

            for (let i = 0; i < numOfVertex; ++i)
                graph.graphVertices.push(new Class.Vertex.Instance(IncrementGraphVertexCount(graph)) );
        };

        function ClearEdgesArr (graph : Class.Graph.Instance) : void 
        { 
            graph.graphEdges = [];
        };

        function InitGraphEdgesArr(graph : Class.Graph.Instance) : void 
        {
            function IncrementGraphEdgeCount(graph : Class.Graph.Instance) : number 
            { 
                return (graph.globalIdEdge++); 
            };

            for (const vertexFrom of graph.graphVertices)
                for (const vertexTo of graph.graphVertices)
                    if (vertexFrom !== vertexTo)
                        graph.graphEdges.push(new Class.Edge.Instance(IncrementGraphEdgeCount(graph), vertexFrom, vertexTo));
        };

        let result : Class.Graph.Instance;
    
        if (!prev) result = new Class.Graph.Instance();
        else       result = prev;
    
        ClearGraphFromOldSubgraphVertices(result);
        AddGraphVertices                 (amountOfVertex - result.graphVertices.length, result);
        ClearEdgesArr                    (result);
        InitGraphEdgesArr                (result);
    
        return (result);
    };
};
