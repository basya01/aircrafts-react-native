import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import Map from './routes/Map';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <Map />
        {/* <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
