import { Graph } from 'graphlib';
import * as shortID from 'shortid';

export function story(graph: Graph) {
  return (text: string) => {
    const ID = shortID.generate()
    graph.setNode(ID, text)
    return {
      choice: choice(graph)(ID)
    }
  }
}

function choice(graph: Graph) {
  return (parentID: string) => {
    return (text: string) => {
      const ID = shortID.generate()
      graph.setNode(ID, text)
      graph.setEdge(parentID, ID)
      return {
        choice: choice(graph)(parentID),
        story: story(graph)
      }
    }
  }
}
