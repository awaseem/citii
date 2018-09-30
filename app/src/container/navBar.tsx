import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from '../assets/colors';

interface Props {
  icons: { [iconName: string]: () => void },
  selected: string
}

export function NavBar(props: Props) {
  const navBarIcons = Object.keys(props.icons).map((key) => (
    <TouchableOpacity key={key} onPress={props.icons[key]} style={styles.navBarButton}>
      <FontAwesome5 size={20} name={key} />
      <View style={props.selected === key ? styles.navBarButtonSelected : undefined}/>
    </TouchableOpacity>
  ))
  return (
    <View style={styles.navBarButtonContainer}>
      {navBarIcons}
    </View>
  )
}

const styles = StyleSheet.create({
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