import React, {Component} from 'react';
import GraphView from 'react-digraph/dist/components/graph-view'
import GraphConfig from './graph-config.js' // Configures node/edge types
import FormDialog from '../elements/FormDialog';
import GraphToolbar from './GraphToolbar';

const styles = {
  graph: {
    height: '80vh',
    width: '100%'
  }
};

const NODE_KEY = "id" // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
const EMPTY_TYPE = "empty"; // Empty node type
const SPECIAL_TYPE = "special"; 
//const SPECIAL_CHILD_SUBTYPE = "specialChild";
const EMPTY_EDGE_TYPE = "emptyEdge";
const SPECIAL_EDGE_TYPE = "specialEdge";

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate 
// elsewhere in the App or be generated from some other state upstream of this component.
const sample = {
  "nodes": [
    {
      "id": 1,
      "title": "Start",
      "x": 100,
      "y": 100,
      "type": EMPTY_TYPE
    },
    {
      "id": 2,
      "title": "Fork",
      "x": 450,
      "y": 100,
      "type": SPECIAL_TYPE,
      //"subtype": SPECIAL_TYPE
    },
    {
      "id": 3,
      "title": "False",
      "x": 100,
      "y": 450,
      "type": EMPTY_TYPE
    },
    {
      "id": 4,
      "title": "True",
      "x": 800,
      "y": 450,
      "type": EMPTY_TYPE
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "type": SPECIAL_EDGE_TYPE
    },
    {
      "source": 2,
      "target": 4,
      "type": EMPTY_EDGE_TYPE
    },
    {
      "source": 2,
      "target": 3,
      "type": EMPTY_EDGE_TYPE
    }
  ]
}

class Graph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dialog:{
        open:false,
      },
      graph: sample,
      selected: {}
    }
  }

  // Helper to find the index of a given node
  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex((node)=>{
      return node[NODE_KEY] === searchNode[NODE_KEY]
    })
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex((edge)=>{
      return edge.source === searchEdge.source &&
        edge.target === searchEdge.target
    })
  }

  // Given a nodeKey, return the corresponding node
  getViewNode = nodeKey => {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i]
  }

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc.. 
  // to sync updates from D3 with the graph
  onUpdateNode = viewNode => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({graph: graph});
  }

  // Node 'mouseUp' handler
  onSelectNode = viewNode => {
    // Deselect events will send Null viewNode
    if (!!viewNode){
      this.setState({selected: viewNode});
    } else{
      this.setState({selected: {}});
    }
  }

  // Edge 'mouseUp' handler
  onSelectEdge = viewEdge => {
    this.setState({selected: viewEdge});
  }

  // Updates the graph with a new node
  onCreateNode = (x,y) => {
    const graph = this.state.graph;

    // This is just an example - any sort of logic 
    // could be used here to determine node type
    // There is also support for subtypes. (see 'sample' above)
    // The subtype geometry will underlay the 'type' geometry for a node
    const type = Math.random() < 0.25 ? SPECIAL_TYPE : EMPTY_TYPE;

    const viewNode = {
      id: this.state.graph.nodes.length + 1,
      title: '',
      type: type,
      x: x,
      y: y
    }

    graph.nodes.push(viewNode);
    this.setState({graph: graph, selected: {}});
  }

  // Deletes a node from the graph
  onDeleteNode = viewNode => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);
    graph.nodes.splice(i, 1);

    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i)=>{
      return  edge.source !== viewNode[NODE_KEY] && 
              edge.target !== viewNode[NODE_KEY]
    })

    graph.edges = newEdges;

    this.setState({graph: graph, selected: {}});
  }

  // Creates a new node between two edges
  onCreateEdge = (sourceViewNode, targetViewNode) => {
    const graph = this.state.graph;

    // This is just an example - any sort of logic 
    // could be used here to determine edge type
    const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: type
    }
    
    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges.push(viewEdge);
      this.setState({graph: graph, selected: {}});
    }
  }

  // Called when an edge is reattached to a different target.
  onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;

    this.setState({graph: graph});
  }

  // Called when an edge is deleted
  onDeleteEdge = viewEdge => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    graph.edges.splice(i, 1);
    this.setState({graph: graph, selected: {}});
  }


  newNodeDialog = () => {
    this.setState({dialog:{open:true}});
  }

  addNewNode = (title, node, cancle) => {
    if (cancle){
      this.setState({dialog:{open:false}});
      return false;
    }
    const type = node === "logic" ? SPECIAL_TYPE : EMPTY_TYPE;
    const graph = this.state.graph;
    const viewNode = {
      id: this.state.graph.nodes.length + 1,
      title: title,
      type: type,
      x: 200,
      y: 200
    }

    graph.nodes.push(viewNode);
    this.setState({graph: graph, selected: {}, dialog:{open:false}});
  }


  addCircle = event => {
    const graph = this.state.graph;
    const title = prompt("Node Title")
    const viewNode = {
      id: this.state.graph.nodes.length + 1,
      title: title,
      type: EMPTY_TYPE,
      x: 200,
      y: 200
    }

    graph.nodes.push(viewNode);
    this.setState({graph: graph, selected: {}});
  }
  onDelete = () => {
    const {selected} = this.state;
    if (Object.keys(selected).length !== 0){
      selected.source || selected.target
      ? this.onDeleteEdge(selected)
      : this.onDeleteNode(selected);
    }
  }

  /*
   * Render
   */

  render() {
    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.state.selected;

    console.log(this.GraphView)

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;
    return (
      <div>
      <div id='graph' style={styles.graph}>
      
        <GraphView  ref={(el) => this.GraphView = el}
                    onDoubleClick={()=> alert("alo")}
                    nodeKey={NODE_KEY}
                    emptyType={EMPTY_TYPE}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    getViewNode={this.getViewNode}
                    onSelectNode={this.onSelectNode}
                    onCreateNode={this.onCreateNode}
                    onUpdateNode={this.onUpdateNode}
                    onDeleteNode={this.onDeleteNode}
                    onSelectEdge={this.onSelectEdge}
                    onCreateEdge={this.onCreateEdge}
                    onSwapEdge={this.onSwapEdge}
                    onDeleteEdge={this.onDeleteEdge}/>
      </div>
      <FormDialog open={this.state.dialog.open} newNode={this.addNewNode} zoomToFit={()=>{}}  />
      
      <GraphToolbar 
        addNew={this.newNodeDialog.bind(this)} 
        deleteElement={this.onDelete.bind(this)}
        zoomToFit={this.GraphView ? this.GraphView.handleZoomToFit.bind(this) :  false}
        />
      </div>
    );
  }

}

export default Graph;