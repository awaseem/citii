import * as shortID from 'shortid';

export enum NodeTypes {
  Starting = 'Starting'
}

export interface StoreNode {
  readonly ID: string;
  readonly text: string;
  readonly choices: ReadonlyArray<ChoiceNode>;
}

export interface ChoiceNode {
  readonly ID: string;
  readonly text: string;
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
  return (text: string) => {
    const ID = shortID.generate();
    const newStoryNode = {
      ...storyNode,
      choices: [
        ...storyNode.choices,
        {
          ID,
          text
        }
      ]
    };
    return {
      choice: choice(newStoryNode),
      continue: continueStory(ID, newStoryNode),
      storyNode: newStoryNode
    };
  };
}

function continueStory(choiceID: string, storyNode: StoreNode) {
  return (nextStoryNode: StoreNode) => {
    const choices = storyNode.choices.map(
      storyToChoiceBy(choiceID, nextStoryNode)
    );
    return {
      ...storyNode,
      choices
    };
  };
}

function storyToChoiceBy(choiceID: string, nextStoryNode: StoreNode) {
  return (choiceNode: ChoiceNode) =>
    choiceNode.ID === choiceID
      ? {
          ...choice,
          next: nextStoryNode
        }
      : choiceNode;
}
