import test from 'ava';
import { Graph } from 'graphlib';
import { NodeTypes, story } from './story';

test('creates story node with correct text and label', t => {
  const { graph } = story(new Graph({ compound: true }))('this is a test');

  t.is(graph.nodes().length, 1)
  t.is(graph.node(NodeTypes.Starting), 'this is a test')
});

test('creates a story with a single choice', t => {
  const { graph } = story(new Graph({ compound: true }))('this is a test')
    .choice('this is a single choice')

  t.is(graph.children(NodeTypes.Starting).length, 1)
  t.is(graph.node(graph.children(NodeTypes.Starting)[0]), 'this is a single choice')
})

test('creates a story with a two choice', t => {
  const { graph } = story(new Graph({ compound: true }))('this is a test')
    .choice('this is choice 1')
    .choice('this is choice 2')

  t.is(graph.children(NodeTypes.Starting).length, 2)
  graph.children(NodeTypes.Starting).forEach((nodeID, index) => {
    t.is(graph.node(nodeID), `this is choice ${index + 1}`)    
  })
})
