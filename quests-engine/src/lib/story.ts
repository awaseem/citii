import * as shortID from 'shortid';

export enum NodeTypes {
  Starting = 'Starting'
}

export interface StoreNode { 
  readonly ID: string
  readonly text: string
  readonly choices: ReadonlyArray<ChoiceNode>
}

export interface ChoiceNode {
  readonly ID: string
  readonly text: string
}

export function story(text: string) {
  // if there are zero nodes, we need to set one as a starting point for the quest
  const storyNode: StoreNode = {
    ID: shortID.generate(),
    choices: [],
    text
  }
  return {
    choice: choice(storyNode),
    storyNode
  };
}

function choice(storyNode: StoreNode) {
  return (text: string) => {
    const newStoryNode = {
      ...storyNode,
      choices: [...storyNode.choices, {
        ID: shortID.generate(),
        text
      }]
    }
    return {
      choice: choice(newStoryNode),
      storyNode: newStoryNode
    }
  }
}
