import * as shortID from 'shortid';

export interface Resources {
  readonly money: number;
  readonly happiness: number;
  readonly population: number;
}

export interface StoryNode {
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
  readonly next?: StoryNode;
}

export function story(text: string, imagePath: string) {
  // if there are zero nodes, we need to set one as a starting point for the quest
  const storyNode: StoryNode = {
    ID: shortID.generate(),
    choices: [],
    imagePath,
    text
  };
  return {
    choice: choice(storyNode),
    storyNode
  };
}

function choice(storyNode: StoryNode) {
  return (
    text: string,
    imagePath: string,
    resourcesEffected?: Resources,
    nextStoryNode?: StoryNode
  ) => {
    const ID = shortID.generate();
    const newStoryNode = {
      ...storyNode,
      choices: [
        ...storyNode.choices,
        {
          ID,
          imagePath,
          next: nextStoryNode,
          resourcesEffected,
          text,
        }
      ]
    };
    return {
      choice: choice(newStoryNode),
      storyNode: newStoryNode
    };
  };
}
