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
                    <FontAwesome5 name="sign-in-alt" size={20} color="#fff" style={{ marginRight: 8 }} />
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
        backgroundColor: "#F7EFE5",
        justifyContent: "space-between",
    },
    header: {
        paddingTop: 120,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 6,
    },
    form: {
        paddingHorizontal: 30,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    bottomButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#A79277",
        padding: 14,
        margin: 25,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 5,
    }
});