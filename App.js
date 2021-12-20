import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [imageUri, setImageUri] = useState('');

  const openCamera = () => {
    console.log('clicked');
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) console.log('user cancel image  picker');
      else if (response.error) console.log('error', response.error);
      else if (response.customeButton) {
        console.log('error', response.customeButton);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setImageUri(source);
      }
    });
  };

  const openLibrary = () => {
    console.log('clicked');
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) console.log('user cancel image  picker');
      else if (response.error) console.log('error', response.error);
      else if (response.customeButton) {
        console.log('error', response.customeButton);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        console.log('error', response.assets[0].uri);
        setImageUri(source);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={(backgroundStyle, {flex: 1})}>
      <View style={styles.sectionContainer}>
        <Image
          style={styles.image}
          source={
            !imageUri ? {uri: 'https://reactjs.org/logo-og.png'} : imageUri
          }
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text style={styles.textStyle}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            openLibrary();
          }}>
          <Text style={styles.textStyle}>Gallrey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'blue',
    fontFamily: 'Helvetica',
  },
  button: {
    height: 50,
    marginVertical: 10,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default App;
