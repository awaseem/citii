import { Graph } from 'graphlib';

function choice(graph: Graph) {
  return (parentStory: string) => {
    return (id: string, text: string) => {
      graph.setNode(id, text)
      graph.setEdge(parentStory, id)
      return {
        choice: choice(graph)(parentStory)
      }
    }
  }
}

function story(graph: Graph) {
  return (id: string, text: string) => {
    graph.setNode(id, text)
    return {
      choice: choice(graph)(id)
    }
  }
}
