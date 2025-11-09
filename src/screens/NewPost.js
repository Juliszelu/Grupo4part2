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
            likes: []
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
        backgroundColor: "#F7EFE5",
        paddingTop: 100,
        paddingHorizontal: 25,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#8C7A6B",
        marginBottom: 25,
        textAlign: "center",
    },
    input: {
        width: "100%",
        backgroundColor: "#E8DCCB",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: "#5E4E3A",
        borderWidth: 1,
        borderColor: "#D3C3B3",
        textAlignVertical: "top",
        minHeight: 100,
        marginBottom: 12,
    },
    bottomButton: {
        backgroundColor: "#8C7A6B",
        paddingVertical: 14,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
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
        marginTop: 6,
    },
});
