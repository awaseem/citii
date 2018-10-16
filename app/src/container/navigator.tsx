import React, { Component} from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AppColors } from "../assets/colors";

interface Props {
  routes: { [routeName: string]: any },
  defaultRouteName: string
}

interface State {
  currentView: string,
  propsToPass?: Object
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

export type MoveViewStack = (routeName: string, propsToPass?: Object) => Promise<void>

export default class Navigator extends Component<Props, State> {
  animateView: Animatable.View;

  constructor(props: Props) {
    super(props)
    this.state = {
      currentView: this.props.defaultRouteName,
      propsToPass: {}
    }
  }

  async moveViewStack(routeName: string, propsToPass?: Object) {
    const endState = await (this.animateView as any).slideDownCustom(250) as {finished: boolean}
    if (endState.finished) {
      (this.animateView as any).slideUpCustom(250)
    }
    this.setState({
      currentView: routeName,
      propsToPass
    })
  }

  render() {
    const ScreenView = this.props.routes[this.state.currentView]
    return (
      <View style={styles.viewContainer}>
        <Animatable.View 
          useNativeDriver 
          ref={(ref: any)=> this.animateView = ref as Animatable.View} 
          style={styles.viewContainer}>
          <View style={styles.viewContainer}>
            {React.createElement(
              ScreenView,
              {
                ...this.state.propsToPass,
                moveViewStack: this.moveViewStack.bind(this)
              }
            )}
          </View>
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  }
})