import test from 'ava';
import { story } from './story';

test('creates story node with correct text and label', t => {
  const { storyNode } = story('this is a test');

  t.is(storyNode.text, 'this is a test');
});

test('creates a story with a single choice', t => {
  const { storyNode } = story('this is a test').choice(
    'this is a single choice'
  );

  t.is(storyNode.choices.length, 1);
  t.is(storyNode.choices[0].text, 'this is a single choice');
});

test('creates a story with a two choice', t => {
  const { storyNode } = story('this is a test')
    .choice('this is a single choice')
    .choice('this is the second choice');

  t.is(storyNode.choices.length, 2);
  t.is(storyNode.choices[0].text, 'this is a single choice');
  t.is(storyNode.choices[1].text, 'this is the second choice');
});

test('creates a story with a two choice where one has a story attached', t => {
  const { storyNode: singleChoiceStory } = story(
    'this is the story for a single choice'
  );

  const { storyNode } = story('this is a test')
    .choice('this is a single choice', undefined, singleChoiceStory)
    .choice('this is the second choice');

  t.is(storyNode.choices.length, 2);
  t.is(storyNode.choices[0].text, 'this is a single choice');
  t.is(storyNode.choices[1].text, 'this is the second choice');

  const next = storyNode.choices[0].next;
  t.is(next, singleChoiceStory);
});

test('creates a story with a two choice where one has a story attached and the second choice updates a money', t => {
  const { storyNode: singleChoiceStory } = story(
    'this is the story for a single choice'
  );

  const { storyNode } = story('this is a test')
    .choice('this is a single choice', undefined, singleChoiceStory)
    .choice('this is the second choice', {
      happiness: 0,
      money: 0,
      population: 0
    });

  t.is(storyNode.choices.length, 2);
  t.is(storyNode.choices[0].text, 'this is a single choice');
  t.is(storyNode.choices[1].text, 'this is the second choice');
  t.deepEqual(storyNode.choices[1].resourcesEffected, {
    happiness: 0,
    money: 0,
    population: 0
  });

  const next = storyNode.choices[0].next;
  t.is(next, singleChoiceStory);
});
