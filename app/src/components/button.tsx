import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppColors } from '../assets/colors';

interface Props {
  text: string
  color: string
  inverted: boolean
}

export function Button(props: Props) {
  return (
    <TouchableOpacity style={[styles.button, { 
      backgroundColor: props.color
    }]}>
      <Text style={[
        styles.buttonText,
      {
        color: props.inverted ? AppColors.buttonText : AppColors.headerColor 
      }]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
  }
})