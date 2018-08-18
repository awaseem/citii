import * as shortID from 'shortid';

interface Resources {
  readonly money: number;
  readonly happiness: number;
  readonly population: number;
}

interface StoreNode {
  readonly ID: string;
  readonly text: string;
  readonly choices: ReadonlyArray<ChoiceNode>;
}

interface ChoiceNode {
  readonly ID: string;
  readonly text: string;
  readonly resourcesEffected?: Resources;
  readonly next?: StoreNode;
}

export function story(text: string) {
  // if there are zero nodes, we need to set one as a starting point for the quest
  const storyNode: StoreNode = {
    ID: shortID.generate(),
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
          text
        }
      ]
    };
    return {
      choice: choice(newStoryNode),
      storyNode: newStoryNode
    };
  };
}
