import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  Button,
  TouchableHighlight,
  BackHandler 
} from 'react-native';
import Orientation from 'react-native-orientation';
import ImagePicker from 'react-native-image-picker';

let screen = { width, height } = Dimensions.get('screen');


export default class DaPosteriorScreen extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      fotoUp1: false,
      disabledButton: false,
      loading: false,
      openModal: false,
      imagePath: '',
      imagenUri: '',
      imageRef: require('../assets/fotoRef/foto1.png'),
      ideaOP: true,
      btnEstado: true,
      imageHeight: height,
      imageWidth: width,

    }
  }

  handleBackButtonClick() {
    Orientation.lockToPortrait()
    this.props.navigation.goBack(null);
    return true;
}

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    if (Platform.OS == 'ios') {
      Orientation.lockToLandscapeRight();
    }else{
      Orientation.lockToLandscapeLeft();    
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentDidMount(){
  if (Platform.OS == 'ios') {
      Orientation.lockToLandscapeRight();
    }else{
      Orientation.lockToLandscapeLeft();    
    }
}

  openImagePicker1(){
      const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
      }

      ImagePicker.launchCamera(options, (response) => {
        if(response.didCancel){
          console.log('Response = ', response);
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          console.log(source)

          this.setState({
            imageRef: source,
            imageHeight: response.height,
            imageWidth: response.width,
            fotoUp1: true,
            btnEstado: false,
            disabledButton: true

          });

          if (Platform.OS == 'ios') {
            Orientation.lockToLandscapeRight();
          }else{
            Orientation.lockToLandscapeLeft();    
          }

        }
      })
  }

  cambioImagen=()=>{
   
    this.setState({
      imageRef: require('../assets/fotoRef/foto1.png'),
      disabledButton: true
    })

    
    
  }


    nextScreen(){
      
      Orientation.lockToPortrait();
      this.props.navigation.navigate('daSelectionScreen')
      
    

  }


  render(){


    return(
      <View style={styles.container}>
        <ImageBackground source={require('../assets/others/fondo-titulos.png')}
          style={styles.fondoHeader}>

           <View style={styles.containHeader}>

              <View style={{flex:1}}>
                <View style={{flexDirection: 'row'}}>
               <Image source={require('../assets/others/icono-titulos.png')}
                style={styles.logoLet} />
                <Text style={styles.textHeader}>
                  Daños
                </Text>
                </View>
                
              </View>
              
              
              <View style={{flex:0.25}}>
                <Image source={require('../assets/images/fotos-obligatorias/cabecera-icono-tiempo.png')} style={styles.flecha} />
              </View>

              <View style={{flex:0.25}}>
                <TouchableWithoutFeedback
                          onPress={() => this.setState({ openModal: true })}>
                <Image source={require('../assets/modal/icono-ayuda.png')} style={styles.flecha} />
                </TouchableWithoutFeedback>
              </View>

              <View style={{flex:0.25}}>
              <TouchableWithoutFeedback
                        onPress={() => this.nextScreen()}
                        >
                <View style={{flex:1, backgroundColor: 'orange', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign: 'center', color: 'white', alignItems:'center'}}>
                    siguiente >
                  </Text>
                  
                </View>
              </TouchableWithoutFeedback>

              </View>
     
            </View>


         </ImageBackground>

         <View style={{flex: 1, backgroundColor:'white'}}>
            <View style={{flex:1, alignItems:'center'}}>
                  <Text style={{textAlign: 'center', fontFamily: 'FiraSans-Medium', color: 'black', paddingVertical: width * 0.02}}>
                  ¿En que lugar en específico se encuentra el daño?
                  </Text>

                  <View style={{flexDirection: 'row'}}>

                    <TouchableWithoutFeedback
                      disabled={this.state.disabledButton}
                      onPress={this.openImagePicker1.bind(this)}
                      

                      >

                      {this.state.fotoUp1 ? <Image  source={require('../assets/images/botones/bt-verde-on.png')} style={styles.btnSi}/> : <Image  source={require('../assets/images/botones/bt-puerta-delantera-off.png')} style={styles.btnSi}/>}
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      disabled={!this.state.disabledButton}
                      onPress={this.openImagePicker1.bind(this)}
                      >
                    {this.state.fotoUp1 ?  <Image  source={require('../assets/images/fotos-obligatorias/bt-repetirfoto.png')} style={styles.icVerFoto}/> : <View></View>}
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                          onPress={() => this.setState({ openModal: true })}>
                    {this.state.fotoUp1 ? <Image  source={require('../assets/images/fotos-obligatorias/ic-verfoto.png')} style={styles.icVerFoto}/> : <View></View>}
                    </TouchableWithoutFeedback>

                  </View>


                  <Image  source={require('../assets/images/botones/bt-puerta-trasera-off.png')} 
                                style={styles.btnSi}/>

                  <Image  source={require('../assets/images/botones/bt-chapamanilla-off.png')} 
                                style={styles.btnSi}/>

                  <Image  source={require('../assets/images/botones/bt-tapabarro-delantero-off.png')} 
                                style={styles.btnSi}/>

                  <Image  source={require('../assets/images/botones/bt-tapabarro-trasero-off.png')} 
                                style={styles.btnSi}/>
                

                

           </View>
           <Modal
                  visible={this.state.openModal}
                  transparent={true}
                  animationType={'slide'}
                  onRequestClose={() => this.setState({ openModal: false })}
                  supportedOrientations={['landscape']}
                >
                  <View style={styles.modalConfirmation}>
                    <View style={styles.containerModal}>
                      <View style={styles.bordeModal}>
                        <View style={{flex:1}}>
                          <Image resizeMode='contain' style={{flex:1, height: null, width: null,
                           alignItems:'center', justifyContent:'center'}} source={this.state.imageRef} />
                        </View>

                        

                        
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.setState({ openModal: false })}>
                        <Image source={require('../assets/modal/bt-cerrar.png')}
                          style={styles.btnCerrarModal} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </Modal>

         </View>


        
      </View>

    );
  }
}

 const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        flex: 1
    },
    containHeader: {
      flex:1,
        flexDirection: 'row',
        width: height,
        height: width * 0.15,
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderColor: 'grey',
        borderBottomWidth: 0,
    },
    fondoHeader: {
        width: height,
        height: width * 0.15,
        backgroundColor: 'transparent',
    },
    logoLet: {
        width: width * 0.15,
        height: height * 0.3,
        resizeMode: 'contain',
    },
    textHeader: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontFamily: 'FiraSans-Black',
        fontSize: 18,
        color: 'black'


        
    },
    iconCam: {
      width: height * 0.2,
      height: width * 0.15,
      resizeMode: 'contain',
      
    },
    textFotoObligatoria: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    containFotoObligatoria: {
        flex:1,
        flexDirection: 'row',
        width: height * 0.3,
        height: width * 0.15,
        borderColor: 'grey',
        borderBottomWidth: 0,
        justifyContent:'center',

    },
    btnSiguiente: {
      width: width * 0.5,
      height: height * 0.10,
      resizeMode: 'contain',
      backgroundColor: 'transparent',
    },
    imagePhoto: {
      height: width, 
      width: height*0.5,

    },
    test1: {
      height: 0,
      width: 0
    },
    flecha: {
      width: width * 0.1,
      height: height * 0.1,
      resizeMode: 'contain',
    },
    modalConfirmation: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordeModal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: height * 0.4,
    width: width * 1.5,
    borderRadius: width * 0.02,
    borderColor: 'white',
    borderWidth: 0.666,
    backgroundColor: 'white',
  },
  iconoConfirmacionModal: {
    width: width * 0.15,
    height: height * 0.15,
    resizeMode: 'contain',
    marginLeft: width * 0.03,
  },
  btnCerrarModal: {
    position: 'absolute',
    top: -(height * 0.04),
    right: -(width * 0.04),
    width: 50,
    height: 50,

  },
  iconoAyudaModal: {
    width: width * 0.14,
    height: height * 0.14,
    resizeMode: 'contain',
    marginLeft: width * 0.03,
  },
  btsiguiente:{
    width: height * 0.15,
    height: width * 0.14,
  },
  btnSi:{
    width: width * 0.7,
    height: height * 0.065,
    resizeMode: 'contain',
  },
  icVerFoto:{
    width: height * 0.07,
    height: width * 0.1,
    resizeMode: 'contain',

  },



  })