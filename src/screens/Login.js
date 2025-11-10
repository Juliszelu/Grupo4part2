import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.navigation.navigate('Home');
            }
        })
    }
    login() {
        const { email, password } = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Usuario logueado correctamente');
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMessage: 'Credenciales inválidas o usuario inexistente' });
            });
    }
    register() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    <Text style={styles.subtitle}>Ingresá tus datos para continuar</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Email'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Contraseña'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                    />

                    {this.state.errorMessage !== '' ? (
                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                    ) : null}
                </View>

                <Pressable
                    style={styles.bottomButton}
                    onPress={() => this.register()}
                >
                    <FontAwesome5 name="user-edit" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Registrarse</Text>
                </Pressable>

                <Pressable
                    style={styles.bottomButton}
                    onPress={() => this.login()}
                >
                    <FontAwesome5 name="sign-in-alt" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Ingresar</Text>
                </Pressable>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF9F7",
        paddingTop: 100,
        paddingHorizontal: 24,
    },

    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#8C7A6B",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        color: "#7A6E65",
        textAlign: "center",
    },

    form: {
        width: "100%",
        marginTop: 10,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: "#5A524A",
        borderWidth: 1,
        borderColor: "#E4D8CC",
        marginVertical: 10,
    },

    bottomButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8C7A6B",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 16,
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
        marginTop: 8,
        fontSize: 14,
    },
});
