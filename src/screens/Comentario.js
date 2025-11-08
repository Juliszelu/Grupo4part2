import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default class Comentario extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido!!✨</Text>
          <Text style={styles.subtitle}>Pantalla profile</Text>
        </View>

        <Pressable 
          style={styles.bottomButton}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <FontAwesome5 name="user-plus" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#F7EFE5",
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 120,
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#8C7A6B",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#B29E8C",
    fontWeight: "500"
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8C7A6B",
    paddingVertical: 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600"
  }
});
