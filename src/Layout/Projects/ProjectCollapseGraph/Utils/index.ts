import * as ErazLib from "eraz-lib";


import * as Class from "../Class";
import * as Utils from "./utils";



const EDGE_MAX_DRAWING_STEPS  : number = 100;
const ZONE_CANCEL_VELOCITY    : number = 50;
const ZONE_CHANGE_VERTEX_VIEW : number = 50;
const PERCENT_VERTEX          : number = 15;
const PERCENT_EDGES           : number = 10;
const GRAVITATIONAL_FACTOR    : number = 2000;
const AMOUNT_OF_LAYER         : number = 3;
const SPREADING_VERTEX_FACTOR : number = 4;
const FRAME_HORIZONTAL_OFFSET : number = 200;
const FRAME_VERTICAL_OFFSET   : number = 100;
const AMOUNT_OF_VERTEX        : number = 180;
const TIME_BEFORE_COLLAPSE    : number = 2000;


let graph    : Class.Graph.Instance;
let subgraph : Class.Subgraph.Instance;


export function RenderCanvas(
    canvasContext  : CanvasRenderingContext2D,
    //prevCanvasSize : { width: number; height: number; } | undefined,
    percentVertex  : number,
    percentEdges   : number,
    mouseMovementX : React.MutableRefObject<number>,
    mouseMovementY : React.MutableRefObject<number>,
) : void
{
    function GetAccelerationVector(
        attractor      : Class.Vertex.Instance,
        vertexToCenter : ErazLib.Graphic.Vector.Types.T_Vec2D,
    ) : ErazLib.Graphic.Vector.Types.T_Vec2D 
    {
        const gravity_unit_vector : ErazLib.Graphic.Vector.Types.T_Vec2D = ErazLib.Graphic.Vector.Utils.Normalize(vertexToCenter);
        const gravity_norm        : number                               = ErazLib.Graphic.Vector.Utils.Norm     (vertexToCenter);
        const attractor_mass      : number                               = attractor.size;
        const acceleration_norm   : number                               = (attractor_mass / (Math.pow(gravity_norm, 1.75))) * GRAVITATIONAL_FACTOR;
    
        return (ErazLib.Graphic.Vector.Utils.Scale(gravity_unit_vector, acceleration_norm));
    };

    function AnimateGraph(
        graph    : Class.Graph.Instance,
        subgraph : Class.Subgraph.Instance,
    ) : void
    {
        function AreAllEdgesCompleted(edgeArr : Class.Edge.Instance[]) : boolean 
        {
            for (const edge of edgeArr)
                if (edge.edgeComplete === false)
                    return (false);
    
            return (true);
        };
    
        function PreparingCollapse(subgraph : Class.Subgraph.Instance) : void
        {
            function InitCollapseVertexData(subgraph : Class.Subgraph.Instance) : void 
            {
                function GetSubgraphAverageVertexVector2D(subgraph : Class.Subgraph.Instance) : ErazLib.Graphic.Vector.Types.T_Vec2D
                {
                    function SumVertexArrayVector2D(vertexArr : Class.Vertex.Instance[]) : ErazLib.Graphic.Vector.Types.T_Vec2D
                    {
                        let sumArrValue : ErazLib.Graphic.Vector.Types.T_Vec2D = [0,0];
                    
                        for (const vertex of vertexArr)
                            ErazLib.Graphic.Vector.Utils.Add_Mut(sumArrValue, vertex.coord);
                    
                        return (sumArrValue);
                    };
    
                    const average_vertex_coord : ErazLib.Graphic.Vector.Types.T_Vec2D = SumVertexArrayVector2D(subgraph.subgraphVertices);
                
                    average_vertex_coord[0] /= subgraph.subgraphVertices.length;
                    average_vertex_coord[1] /= subgraph.subgraphVertices.length;
                
                    return (average_vertex_coord);
                }
    
                subgraph.centerOfCollapse.coord          = GetSubgraphAverageVertexVector2D(subgraph);
                subgraph.centerOfCollapse.layer          = ErazLib.Primitive.Number.Utils.Random_Integer(1, AMOUNT_OF_LAYER);
                subgraph.centerOfCollapse.color          = Utils.ColorSelector(subgraph.centerOfCollapse.layer);
                subgraph.centerOfCollapse.size           = Utils.SizeSelector(subgraph.centerOfCollapse.layer);
                subgraph.centerOfCollapse.isAnHypergraph = true;
            };
    
            InitCollapseVertexData(subgraph);
    
            subgraph.centerOfCollapseAlreadySelected = true;
            setTimeout(() =>
            {
                subgraph.startCollapse = true;
            }, TIME_BEFORE_COLLAPSE);
        };
    
        function DuringCollapse(subgraph : Class.Subgraph.Instance) : void 
        {
            function VertexAlreadyCollapse(subgraph : Class.Subgraph.Instance) : boolean
            {
                for (const vertex of subgraph.subgraphVertices)
                    if (ErazLib.Graphic.Vector.Utils.IsEqual(vertex.coord, subgraph.centerOfCollapse.coord))
                        return (true);
            
                return (false);
            };
    
            function UpdateVerticesForCollapse(subgraph : Class.Subgraph.Instance) : void 
            {
                function UpdateVerticesViewInCollpase(
                    vertex           : Class.Vertex.Instance,
                    centerOfCollapse : Class.Vertex.Instance,
                    vertexToCenter   : ErazLib.Graphic.Vector.Types.T_Vec2D,
                ) : void
                {
                    function AdjustSizesToCollapse(
                        vertex           : Class.Vertex.Instance,
                        centerOfCollapse : Class.Vertex.Instance,
                    ) : void 
                    {
                        vertex.size -= (vertex.size - centerOfCollapse.size) * 0.01;
                        if (vertex.hypergraphRingSize - 1 > 0)
                            vertex.hypergraphRingSize -= vertex.hypergraphRingSize * 0.01;
                    };
    
                    if      (ErazLib.Graphic.Vector.Utils.IsEqual(vertex.coord, centerOfCollapse.coord)) vertex.color = "transparent";
                    else if (ErazLib.Graphic.Vector.Utils.Norm(vertexToCenter) < ZONE_CHANGE_VERTEX_VIEW)
                    {
                        vertex.textToDisplay = "";
                        vertex.layer         = centerOfCollapse.layer;
                        vertex.color         = centerOfCollapse.color;
                    }
    
                    AdjustSizesToCollapse(vertex, centerOfCollapse);
                };
    
                function CancelVelocity(
                    vertex                : Class.Vertex.Instance,
                    centerOfCollapseCoord : ErazLib.Graphic.Vector.Types.T_Vec2D,
                ) : void 
                {
                    vertex.collapseVelocity = [0,0];
                    vertex.coord            = [...centerOfCollapseCoord];
                };
    
                for (const vertex of subgraph.subgraphVertices)
                {
                    const vertexToCenter : ErazLib.Graphic.Vector.Types.T_Vec2D = ErazLib.Graphic.Vector.Utils.Sub(subgraph.centerOfCollapse.coord, vertex.coord);
    
                    UpdateVerticesViewInCollpase(vertex, subgraph.centerOfCollapse, vertexToCenter);
    
                    if (ErazLib.Graphic.Vector.Utils.Norm(vertexToCenter) > ZONE_CANCEL_VELOCITY)
                    {
                        const acceleration : ErazLib.Graphic.Vector.Types.T_Vec2D = GetAccelerationVector(subgraph.centerOfCollapse, vertexToCenter); 
    
                        ErazLib.Graphic.Vector.Utils.Add_Mut(vertex.collapseVelocity, acceleration);
                        ErazLib.Graphic.Vector.Utils.Add_Mut(vertex.coord, vertex.collapseVelocity);
                    }
                    else 
                        CancelVelocity(vertex, subgraph.centerOfCollapse.coord);
                }
            };
    
            UpdateVerticesForCollapse(subgraph);
    
            if (VertexAlreadyCollapse(subgraph))
                DrawVertex(subgraph.centerOfCollapse)
        };
    
        function AllVerticesCollapsed(
            vertexArr        : Class.Vertex.Instance[],
            centerOfCollapse : Class.Vertex.Instance,
        ) : boolean
        {
            for (const vertex of vertexArr)
                if (!ErazLib.Graphic.Vector.Utils.IsEqual(vertex.coord, centerOfCollapse.coord))
                    return (false);
    
            return (true);
        };
    
        function UpdateEdgeState(subgraph : Class.Subgraph.Instance) : void 
        {
            for (const edge of subgraph.subgraphEdges)
            {   
                if (edge.currentAnimationStep <= EDGE_MAX_DRAWING_STEPS)
                {
                    if (edge.currentAnimationStep === EDGE_MAX_DRAWING_STEPS - 1)
                    {
                        edge.current      = edge.to;
                        edge.edgeComplete = true;
                    }	
                    else
                    {
                        let edgeLenght : ErazLib.Graphic.Vector.Types.T_Vec2D = ErazLib.Graphic.Vector.Utils.Sub(edge.to.coord, edge.from.coord);
                        let edgeSlope  : number                               = ( edgeLenght[1] / edgeLenght[0]);
                        let step       : number                               = (edgeLenght[0] / EDGE_MAX_DRAWING_STEPS);
                        
                        edge.current.coord[0] = edge.from.coord[0] + edge.currentAnimationStep * step;
                        edge.current.coord[1] = (edgeSlope * (edge.current.coord[0] - edge.from.coord[0])) + edge.from.coord[1];
                    }
                    edge.currentAnimationStep++;
                }
            }
        };
    
        function DrawHalo(vertex : Class.Vertex.Instance) : void
        {
            if (vertex.currentHypergraphRingSize < vertex.hypergraphRingSize)
                vertex.currentHypergraphRingSize += 1;
    
            canvasContext.beginPath();
            canvasContext.arc(vertex.coord[0], vertex.coord[1], vertex.currentHypergraphRingSize, 0, 2 * Math.PI);
            canvasContext.strokeStyle = vertex.color;
            canvasContext.stroke();
        };
    
        function DrawVertex(vertex : Class.Vertex.Instance) : void 
        {
            let gapTextVertex : number;
    
            if (vertex.hypergraphRingSize !== 0) gapTextVertex = vertex.hypergraphRingSize + 3;
            else                                 gapTextVertex = 10;
    
            canvasContext.beginPath();
            canvasContext.arc(vertex.coord[0], vertex.coord[1], vertex.size, 0, 2 * Math.PI);
            canvasContext.fillStyle = vertex.color;
            canvasContext.fill();
            canvasContext.fillText(vertex.textToDisplay, vertex.coord[0] + gapTextVertex, vertex.coord[1] + gapTextVertex);
        };
    
        function DrawEdge(edge : Class.Edge.Instance) : void 
        {
            canvasContext.beginPath(); 
            canvasContext.moveTo(edge.from.coord[0], edge.from.coord[1]);
            canvasContext.lineTo(edge.current.coord[0], edge.current.coord[1]);
            canvasContext.lineWidth = 0.7;
            canvasContext.strokeStyle = edge.edgeColor;
            canvasContext.stroke();
        };

        requestAnimationFrame(() => { AnimateGraph(graph, subgraph); });
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

        UpdatesEntitiesToMouseMovement(graph, subgraph);

        /* For Resize
        if (prevCanvasSize && (prevCanvasSize.width !== canvasContext.canvas.width || prevCanvasSize.height !== canvasContext.canvas.height))
            ResizeFrame(graph, canvasContext.canvas.width - prevCanvasSize.width, canvasContext.canvas.height - prevCanvasSize.height);

        prevCanvasSize = { width: canvasContext.canvas.width, height: canvasContext.canvas.height };
        */

        if (AreAllEdgesCompleted(subgraph.subgraphEdges))
        {
            //Preparing Collapse
            if (subgraph.centerOfCollapseAlreadySelected === false)
                PreparingCollapse(subgraph);
    
            //During Collapse
            if (subgraph.startCollapse)
                DuringCollapse(subgraph);
    
            //After Collapse
            if (AllVerticesCollapsed(subgraph.subgraphVertices, subgraph.centerOfCollapse))
            {
                let hypergraph : Class.Vertex.Instance = new Class.Vertex.Instance(0);
                
                Class.Vertex.Instance.Copy(subgraph.centerOfCollapse, hypergraph);
                hypergraph.hypergraphRingSize = hypergraph.size + ErazLib.Primitive.Number.Utils.Random_Integer(5, 10);
    
                graph.graphVertices.push(hypergraph);
                graph    = Class.Graph.Instance.Build(graph, AMOUNT_OF_VERTEX);
                subgraph = Class.Subgraph.Instance.Build(graph, subgraph, PERCENT_VERTEX, PERCENT_EDGES, canvasContext.canvas.width, canvasContext.canvas.height, SPREADING_VERTEX_FACTOR, AMOUNT_OF_LAYER);
    
                for (const vertex of graph.graphVertices)
                    if (vertex.inSubgraph === false && ErazLib.Graphic.Vector.Utils.IsEqual(vertex.coord, [0,0]))
                        vertex.SetVertexData(FRAME_HORIZONTAL_OFFSET, FRAME_VERTICAL_OFFSET, canvasContext.canvas.width, canvasContext.canvas.height, AMOUNT_OF_LAYER);
            }    
        }
        else
            UpdateEdgeState(subgraph);
            
        //Continualy Drawing The Entitites
        if (graph)
        {
            for (const vertex of graph.graphVertices)
            {
                if (vertex.isAnHypergraph === true)
                    DrawHalo(vertex);
    
                DrawVertex(vertex);
            }
        }	
    
        if (subgraph)
            for (const edge of subgraph.subgraphEdges)
                DrawEdge(edge);
    };
    
    function UpdatesEntitiesToMouseMovement(
        graph    : Class.Graph.Instance,
        subgraph : Class.Subgraph.Instance,
    ) : void 
    {
        function AjustVelocityVectorToMouseMovement(subgraph : Class.Subgraph.Instance) : void
        {
            for (const vertex of subgraph.subgraphVertices)
            {
                const vertexToCenter : ErazLib.Graphic.Vector.Types.T_Vec2D = ErazLib.Graphic.Vector.Utils.Sub(subgraph.centerOfCollapse.coord, vertex.coord);
                const acceleration  : ErazLib.Graphic.Vector.Types.T_Vec2D  = GetAccelerationVector(subgraph.centerOfCollapse, vertexToCenter);
                const velocity_norm : number                                = ErazLib.Graphic.Vector.Utils.Norm(vertex.collapseVelocity);
                
                vertex.collapseVelocity = ErazLib.Graphic.Vector.Utils.Scale(ErazLib.Graphic.Vector.Utils.Normalize(vertexToCenter), velocity_norm);
                ErazLib.Graphic.Vector.Utils.Add_Mut(vertex.collapseVelocity, acceleration);
            }
        };

        function MoveVertex(vertex : Class.Vertex.Instance) : void
        {
            if (vertex.layer === 1)
            {
                vertex.coord[0] -= mouseMovementX.current * 0.3;
                vertex.coord[1] -= mouseMovementY.current * 0.6;
            }
            else if (vertex.layer === 2)
            {
                vertex.coord[0] -= mouseMovementX.current * 0.2;
                vertex.coord[1] -= mouseMovementY.current * 0.4;
            }  
            else
            {
                vertex.coord[0] -= mouseMovementX.current * 0.1;
                vertex.coord[1] -= mouseMovementY.current * 0.2;
            }	
        };

        function UpdateVerticesGraphToMouseMovevement(graph : Class.Graph.Instance) : void
        {
            for (const vertex of graph.graphVertices)
                MoveVertex(vertex);
        };

        UpdateVerticesGraphToMouseMovevement(graph);
        MoveVertex(subgraph.centerOfCollapse);

        if (subgraph.startCollapse)
            AjustVelocityVectorToMouseMovement(subgraph);
    };

	graph = Class.Graph.Instance.Build(graph, AMOUNT_OF_VERTEX);
	
	if (graph)
		subgraph = Class.Subgraph.Instance.Build(graph, subgraph, percentVertex, percentEdges, canvasContext.canvas.width, canvasContext.canvas.height, SPREADING_VERTEX_FACTOR, AMOUNT_OF_LAYER);

	for (const vertex of graph.graphVertices)
		if (vertex.inSubgraph === false)
			vertex.SetVertexData(FRAME_HORIZONTAL_OFFSET, FRAME_VERTICAL_OFFSET, canvasContext.canvas.width, canvasContext.canvas.height, AMOUNT_OF_LAYER);

	AnimateGraph(graph, subgraph);
};
