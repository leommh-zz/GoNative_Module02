import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  loading: {
    marginTop: metrics.baseMargin * 2,
  },
  listContainer: {
    flex: 1,
    margin: 5,
  }
});

export default styles;
