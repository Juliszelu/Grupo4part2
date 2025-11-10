import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
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
            comentarios:[]
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
                    <Text style={styles.buttonText} >Publicar</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",     // fondo blanco como Home
        paddingTop: 100,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#8C7A6B",
        textAlign: "center",
        marginBottom: 20,
    },

    input: {
        width: "100%",
        backgroundColor: "#FFFFFF",     
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: "#5A524A",
        borderWidth: 1,
        borderColor: "#E4D8CC",
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 3,
        shadowOffset: { height: 1 },
    },

    bottomButton: {
        backgroundColor: "#8C7A6B",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { height: 2 },
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "600",
    },

    error: {
        color: "#B34D4D",
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 6,
    },
});
