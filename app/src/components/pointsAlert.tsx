import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AppColors } from "../assets/colors";
import { Todo } from "../data/todos/todoList";

interface Props {
  recentCompletedTodo?: Todo
}

interface State {
  show: boolean
}

export class PointsAlert extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.recentCompletedTodo != this.props.recentCompletedTodo) {
      this.setState({
        show: true
      })
    }
  }

  render () {
    const { recentCompletedTodo } = this.props
    return (
      <View>
        {this.state.show ? 
          <Animatable.View 
            animation={'bounceIn'}
            useNativeDriver>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{`Points earned ${recentCompletedTodo && recentCompletedTodo.points}`}</Text>
            </View>
          </Animatable.View> : 
          undefined
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pointsContainer: {
    marginTop: 1,
    marginLeft: 35,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  earnedText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.pointsColor,
    paddingBottom: 5
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.pointsColor
  }
})