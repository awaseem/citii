import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AppColors } from "../assets/colors";

interface Props {
  routes: { [routeName: string]: JSX.Element },
  defaultRouteName: string
}

interface State {
  currentView: string
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
      currentView: this.props.defaultRouteName
    }
  }

  async moveViewStack(routeName: string) {
    const endState = await (this.animateView as any).slideDownCustom(250) as {finished: boolean}
    this.setState({
      currentView: routeName
    })
    if (endState.finished) {
      (this.animateView as any).slideUpCustom(250)
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Animatable.View 
          useNativeDriver 
          ref={(ref: any)=> this.animateView = ref as Animatable.View} 
          style={styles.viewContainer}>
          <View style={styles.viewContainer}>
            {this.props.routes[this.state.currentView]}
          </View>
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  navBarButtonContainer: {
    marginTop: 45,
    marginLeft: 25,
    flexDirection: 'row'
  },
  navBarButton: {
    width: 25,
    height: 25,
    marginRight: 20
  },
  navBarButtonSelected: { 
    marginTop: 6,
    marginLeft: 4, 
    marginRight: 11, 
    borderBottomColor: AppColors.appTheme, 
    borderBottomWidth: 2 
  }
})