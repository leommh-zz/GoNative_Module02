import React, { Component } from 'react';

import { View, Text, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import OrganizationItem from './OrganizationItem';

import PropTypes from 'prop-types';

import Header from '../../components/Header';

import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

export default class Organizations extends Component {

  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  loadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);
    this.setState({ data, loading: false, refreshing: false });
  }

  componentDidMount() {
    this.loadOrganizations();
  }

  renderListItem = ({ item }) => <OrganizationItem organization={item} />

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
          onRefresh={this.loadOrganizations}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
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

