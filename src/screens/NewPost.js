import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            error: ''
        };
    }

    publicarPost() {
        if (!this.state.description) {
            this.setState({ error: 'Escribí algo antes de publicar.' });
            return;
        }

        db.collection('posts').add({
            email: auth.currentUser.email,
            texto: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comentarios: []
        })
            .then(() => {
                this.setState({ description: '' });
                this.props.navigation.navigate('Home');
            })
            .catch((e) => {
                console.log(e);
                this.setState({ error: 'No se pudo publicar. Probá de nuevo.' });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo post</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Publica algo..."
                    multiline
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.description}
                />

                {this.state.error ? <Text style={styles.error} >{this.state.error}</Text> : null}

                <Pressable style={styles.bottomButton} onPress={() => this.publicarPost()}>
                    <FontAwesome5 name="paper-plane" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Publicar</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAF9F7",
      paddingTop: 90,
      paddingHorizontal: 22,
    },

    title: {
      fontSize: 28,
      fontWeight: "800",
      color: "#8C7A6B",
      textAlign: "center",
      marginBottom: 20,
    },

    input: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 14,
      padding: 16,
      fontSize: 16,
      color: "#52463E",
      borderWidth: 1.4,
      borderColor: "#E7D8C8",
      minHeight: 110,
      textAlignVertical: "top",
      marginBottom: 12,
    },

    bottomButton: {
      backgroundColor: "#8C7A6B",
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 12,
      flexDirection: "row",
      justifyContent: "center",
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "700",
    },

    error: {
      color: "#C45757",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 6,
      marginTop: 4,
    },
});
