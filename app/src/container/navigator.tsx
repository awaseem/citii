import React, { Component } from "react";
import { View, Text, Dimensions, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button } from "../components/button";
import InProgressListContainer from "./inprogressListContainer";

interface Props {}

interface State {
  currentView: number
}

Animatable.initializeRegistryWithDefinitions({
  slideDownCustom: {
    from: {
      translateX: 0
    },
    to: {
      translateX: Dimensions.get('window').width
    },
  },
  slideUpCustom: {
    from: {
      translateX: Dimensions.get('window').width
    },
    to: {
      translateX: 0
    },
  }
});

export default class Navigator extends Component<Props, State> {
  animateView: Animatable.View;

  constructor(props: Props) {
    super(props)
    this.state = {
      currentView: 0
    }
  }

  viewStack() {
    return [
      (
        <View style={{ flex: 1 }}>
          <InProgressListContainer />
        </View>
      ),
      (
        <View style={{ flex: 1 }}>
          <InProgressListContainer />
        </View>
      )
    ]
  }

  async moveViewStack() {
    const endState = await (this.animateView as any).slideDownCustom(250) as {finished: boolean}
    this.setState({
      currentView: this.state.currentView + 1
    })
    if (endState.finished) {
      (this.animateView as any).slideUpCustom(250)
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <View>
          <Button color={'black'} inverted onPress={this.moveViewStack.bind(this)} text={'Move'} />
        </View>
        <Animatable.View 
          useNativeDriver 
          ref={(ref: any)=> this.animateView = ref as Animatable.View} 
          style={{flex: 1}}>
          {this.viewStack()[this.state.currentView]}
        </Animatable.View>
      </View>
    )
  }
}