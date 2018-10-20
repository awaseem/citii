import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AppColors } from "../assets/colors";

interface Props {
  points?: number
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
    if (prevProps.points !== this.props.points) {
      this.setState({
        show: true
      })
      setTimeout(() => {
        this.setState({
          show: false
        })
      }, 1000)
    }
  }

  render () {
    const { points } = this.props
    return (
      <View>
        {this.state.show ? 
          <Animatable.View 
            animation={'bounceIn'}
            useNativeDriver>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{`Points earned ${points}`}</Text>
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