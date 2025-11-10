import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            error: ''
        };
    }

    register() {
        const { email, username, password } = this.state;

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection('users').add({ email, username });
                this.props.navigation.navigate('Login');
            })
            .catch(() => this.setState({ error: 'Hubo un error' }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear cuenta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#B29E8C"
                    onChangeText={text => this.setState({ email: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor="#B29E8C"
                    onChangeText={text => this.setState({ username: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#B29E8C"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />

                {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}

                <Pressable style={styles.button} onPress={() => this.register()}>
                    <FontAwesome5 name="check" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.backText}>Ya tengo cuenta</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 100,
        paddingHorizontal: 24,
        alignItems: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#8C7A6B",
        marginBottom: 25
    },

    input: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginVertical: 8,
        color: "#5A524A",
        borderWidth: 1,
        borderColor: "#E4D8CC",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 3,
        shadowOffset: { height: 1 },
    },

    button: {
        backgroundColor: "#8C7A6B",
        paddingVertical: 14,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { height: 2 },
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },

    backText: {
        marginTop: 15,
        color: "#8C7A6B",
        fontWeight: "500",
        textDecorationLine: "underline",
        fontSize: 15,
    },

    error: {
        marginTop: 8,
        color: "#B34D4D",
        fontWeight: "600"
    }
});
