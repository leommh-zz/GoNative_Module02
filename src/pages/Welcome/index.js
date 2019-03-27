import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import PropTypes from 'prop-types';

import styles from './styles';

class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      navigation.navigate('User');
    } catch (err) {
      this.setState({ loading: false, error: true });
      console.tron.log(err);
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu usuário do github.
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={username => this.setState({ username })}
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text style={styles.buttonText}>Prosseguir</Text>
              )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
