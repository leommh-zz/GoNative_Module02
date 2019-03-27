import React, { Component } from 'react';

import { View, Text, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import Header from '../../components/Header';

import RepositoryItem from './RepositoryItem';
import styles from './styles';
const TabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

export default class Repositories extends Component {

  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);
    this.setState({ data, loading: false, refreshing: false });
  }

  componentDidMount() {
    this.loadRepositories();
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
          onRefresh={this.loadRepositories}
          refreshing={refreshing}
        />
      </View>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {
          loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    )
  }
}
