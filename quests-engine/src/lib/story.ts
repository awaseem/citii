import { Graph } from 'graphlib';
import * as shortID from 'shortid';

export enum NodeTypes {
  Starting = 'Starting'
}

export function story(graph: Graph, parentID?: string) {
  return (text: string) => {
    // if there are zero nodes, we need to set one as a starting point for the quest
    const ID = graph.nodes().length <= 0 ? NodeTypes.Starting : shortID.generate();
    graph.setNode(ID, text);
    if (parentID) {
      graph.setParent(ID, parentID);
    }
    return {
      choice: choice(graph)(ID),
      graph
    };
  };
}

function choice(graph: Graph) {
  return (parentID: string) => {
    return (text: string) => {
      const ID = shortID.generate();
      graph.setNode(ID, text);
      graph.setParent(ID, parentID);
      return {
        choice: choice(graph)(parentID),
        graph
      };
    };
  };
}
