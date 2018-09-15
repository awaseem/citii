import * as shortID from 'shortid';

export interface Resources {
  readonly money: number;
  readonly happiness: number;
  readonly population: number;
}

export interface StoreNode {
  readonly ID: string;
  readonly imagePath: string;
  readonly text: string;
  readonly choices: ReadonlyArray<ChoiceNode>;
}

export interface ChoiceNode {
  readonly ID: string;
  readonly imagePath: string;
  readonly text: string;
  readonly resourcesEffected?: Resources;
  readonly next?: StoreNode;
}

export function story(text: string, imagePath: string) {
  // if there are zero nodes, we need to set one as a starting point for the quest
  const storyNode: StoreNode = {
    ID: shortID.generate(),
    imagePath,
    choices: [],
    text
  };
  return {
    choice: choice(storyNode),
    storyNode
  };
}

function choice(storyNode: StoreNode) {
  return (
    text: string,
    imagePath: string,
    resourcesEffected?: Resources,
    nextStoryNode?: StoreNode
  ) => {
    const ID = shortID.generate();
    const newStoryNode = {
      ...storyNode,
      choices: [
        ...storyNode.choices,
        {
          ID,
          next: nextStoryNode,
          resourcesEffected,
          text,
          imagePath
        }
      ]
    };
    return {
      choice: choice(newStoryNode),
      storyNode: newStoryNode
    };
  };
}
