import React, { Component } from "react";
import { View, Text, Dimensions, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from "../components/button";
import InProgressListContainer from "./inprogressListContainer";
import { AppColors } from "../assets/colors";

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
        <View style={styles.viewContainer}>
          <InProgressListContainer />
        </View>
      ),
      (
        <View style={styles.viewContainer}>
          <InProgressListContainer />
        </View>
      ),
      (
        <View style={styles.viewContainer}>
          <InProgressListContainer />
        </View>
      )
    ]
  }

  async moveViewStack(index: number) {
    const endState = await (this.animateView as any).slideDownCustom(250) as {finished: boolean}
    this.setState({
      currentView: index
    })
    if (endState.finished) {
      (this.animateView as any).slideUpCustom(250)
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.navBarButtonContainer}>
          <TouchableOpacity onPress={() => this.moveViewStack(1)} style={styles.navBarButton}>
            <FontAwesome5 size={20} name={'calendar-check'} />
            <View style={this.state.currentView === 1 ? styles.navBarButtonSelected : undefined}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.moveViewStack(0)} style={styles.navBarButton}>
            <FontAwesome5 size={20} name={'list-alt'} />
            <View style={this.state.currentView === 0 ? styles.navBarButtonSelected : undefined}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.moveViewStack(2)} style={styles.navBarButton}>
            <FontAwesome5 size={20} name={'building'} />
            <View style={this.state.currentView === 2 ? styles.navBarButtonSelected : undefined}/>
          </TouchableOpacity>
        </View>
        <Animatable.View 
          useNativeDriver 
          ref={(ref: any)=> this.animateView = ref as Animatable.View} 
          style={styles.viewContainer}>
          {this.viewStack()[this.state.currentView]}
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