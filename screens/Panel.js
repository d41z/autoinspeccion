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
  TouchableHighlight
} from 'react-native';
import Orientation from 'react-native-orientation';
import ImagePicker from 'react-native-image-picker';

let screen = { width, height } = Dimensions.get('screen');


export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fotoUp: false,
      disabledButton: true,
      loading: false,
      openModal: false,
      imagePath: '',
      imagenUri: '',
      imageRef: require('../assets/fotoRef/obg-7.jpg'),
      ideaOP: true,
      btnEstado: true,
      imageHeight: height,
      imageWidth: width,
      openModalRef: false,
      openModalInstru: false,
    }
  }

  componentWillMount() {
    if (Platform.OS == 'ios') {
      Orientation.lockToLandscapeRight();
    }else{
      Orientation.lockToLandscapeLeft();    
    }
    
  }

  openImagePicker(){
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
            fotoUp: true,
            btnEstado: false,
            disabledButton: false

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
      openModalRef: true
    })
    
    
  }

  goToNextScreen(){


    this.props.navigation.navigate('kilometraje')
    this.setState({
      openModalInstru: true
    })
  }


  render(){


    return(
      <View style={styles.container}>
        <ImageBackground source={require('../assets/others/fondo-titulos.png')}
          style={styles.fondoHeader}>

           <View style={styles.containHeader}>

              <View style={{flex:0.8}}>
                <View style={{flexDirection: 'row'}}>
               <Image source={require('../assets/others/icono-titulos.png')}
                style={styles.logoLet} />
                <Text style={styles.textHeader}>
                  INGRESO DE FOTOGRAFÍAS
                </Text>
                </View>
                
              </View>
              
              

                <ImageBackground source={require('../assets/images/cabecera-fondo-amarillo.png')}
                                 resizeMode= 'contain'
                                 style={styles.containFotoObligatoria}>
                  
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    Fotos Obligatorias
                  </Text>
                  <View>
                    <Text style={{fontSize: 18, color: 'black'}}>
                      Foto 7 de 13
                    </Text>
                  </View>
                </View>
                  
                    

                </ImageBackground>

              

              <View style={{flex:0.3, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/images/fotos-obligatorias/cabecera-icono-tiempo.png')} style={styles.flecha} />
                <Text style={{textAlign: 'center'}}>
                  00:00
                </Text>
              </View>

              <View style={{flex:0.1}}>
                <TouchableWithoutFeedback
                          onPress={() => this.setState({ openModal: true })}>
                <Image source={require('../assets/modal/icono-ayuda.png')} style={styles.flecha} />
                </TouchableWithoutFeedback>
              </View>
     
            </View>


         </ImageBackground>

         <View style={{flex: 1, backgroundColor:'transparent', flexDirection: 'row'}}>

            <View style={styles.Body1}>
              <View style={{flex:1, backgroundColor:'white'}}>  
                <View style={{flex:1, paddingHorizontal: 10, paddingVertical: 10}}>
                  <Image resizeMode='contain' style={{flex:1, height: null, width: null, alignItems:'center', justifyContent:'center'}} source={this.state.imageRef} />
                </View>


              </View>
                <View style={{flex:0.3, backgroundColor:'orange', flexDirection: 'row'}}>
                  <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center'}}>
                    {this.state.fotoUp ? <Text style={{textAlign: 'center'}}>Ver Referencia</Text> : <Text></Text>}
                      <TouchableWithoutFeedback
                                onPress={this.cambioImagen.bind(this)}
                                disabled={this.state.btnEstado}
                                    >
                      {this.state.fotoUp ? <Image style={styles.iconCam} source={require('../assets/images/fotos-obligatorias/bt-ver-referencia.png')}/> : <Image style={styles.test1} source={require('../assets/images/fotos-obligatorias/bt-ver-referencia.png')}/>}
                      </TouchableWithoutFeedback>               
                  </View>
                  <View style={{flex:1, flexDirection: 'row',  backgroundColor: 'white', justifyContent: 'flex-end', alignItems: 'center'}}>                           
                      {this.state.fotoUp ? <Text style={{textAlign: 'center'}}>Repetir Foto</Text> : <Text style={{textAlign: 'center'}}>Tomar Foto</Text>}                                 
                      <TouchableWithoutFeedback
                                onPress={this.openImagePicker.bind(this)}  
                                  >
                      {this.state.fotoUp ? <Image style={styles.iconCam} source={require('../assets/images/fotos-obligatorias/bt-repetirfoto.png')}/> : <Image style={styles.iconCam} source={require('../assets/images/fotos-obligatorias/bt-tomar-foto.png')}/>}
                      </TouchableWithoutFeedback>        
                  </View>
                </View>
            </View>

             <View style={{flex:0.05}}>

             </View>

             <View style={styles.Body2}>
                 <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10, alignItems: 'center', paddingHorizontal: 10}}>
                     <Text style={{textAlign: 'center', fontFamily: 'FiraSans-Black', color: 'black'}}>Panel</Text>
                     <View style={{flex:1, paddingHorizontal: 10, paddingTop:5}}>
                         <Text style={{fontFamily: 'FiraSans-Regular', color: 'black'}}>Deben verse completos el volante, la radio y el panel del copiloto.</Text>

                     </View>
                     <TouchableWithoutFeedback
                         onPress={() => this.goToNextScreen()}
                         disabled={this.state.disabledButton}
                     >
                         {this.state.disabledButton ? <Image source={require('../assets/images/botones/bt-siguiente-off.png')}
                                                             style={styles.btnSiguiente}/>:<Image source={require('../assets/images/botones/bt-siguiente.png')}
                                                                                                  style={styles.btnSiguiente} />}
                     </TouchableWithoutFeedback>


                 </View>



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
                          <View style={styles.headerModel}>
                            <Image source={require('../assets/modal/icono-ayuda.png')} style={styles.flecha} />
                              <View style={{flex: 1, paddingLeft: height * 0.015}}>
                                <Text style={{fontFamily: 'FiraSans-Black', color: 'black'}}>FOTOS OBLIGATORIAS</Text>
                                <Text></Text>
                                <Text style={{fontFamily: 'FiraSans-Black', color: 'black', fontSize: 18}}>PANEL</Text>
                              </View>
                              <View style={{flex: 0.2}}>
                                <Image source={require('../assets/modal/linea.png')} style={styles.flecha} />
                              </View>

                              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/modal/icono-telefono-fijo.png')} style={styles.flecha} />
                                  <View style={{flex: 1, paddingLeft: height * 0.015}}>
                                    <Text style={{fontFamily: 'FiraSans-Black', color: 'black'}}>TELÉFONO FIJO</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'FiraSans-Regular', color: 'black'}}>22 3262 67 09</Text>
                                  </View>
                              </View>
                              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/modal/icono-whatsapp.png')} style={styles.flecha} />
                                  <View style={{flex: 1, paddingLeft: height * 0.015}}>
                                    <Text style={{fontFamily: 'FiraSans-Black', color: 'black'}}>WHATSAPP</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'FiraSans-Regular', color: 'black'}}>+569931300485</Text>
                                  </View>
                              </View>


                            
                          </View>
                          <View style={styles.BodyModel}>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                              <View style={{flex:1, alignItems: 'center'}}>
                                <Text style={{fontFamily: 'FiraSans-Regular', color: 'black'}}>
                                  Deben verse completos el volante, la radio y el panel del copiloto. Para ello, recomendamos ubicarse en el asiento posterior del vehículo para lograr un mejor ángulo.

                                </Text>
                                

                              </View>

                              
                                


                            </ScrollView>
                            
                          </View>
                          
                        </View>

                        
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.setState({ openModal: false })}>
                        <Image source={require('../assets/modal/bt-cerrar.png')}
                          style={styles.btnCerrarModal} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </Modal>
                <Modal
                  visible={this.state.openModalRef}
                  transparent={true}
                  animationType={'slide'}
                  onRequestClose={() => this.setState({ openModalRef: false })}
                  supportedOrientations={['landscape']}
                >
                  <View style={styles.modalConfirmation}>
                    <View style={styles.containerModal}>
                      <View style={styles.bordeModal}>
                        <View style={{flex:1}}>
                          
                          <Image resizeMode='contain' style={{flex:1, height: null, width: null, alignItems:'center', justifyContent:'center'}} source={require('../assets/fotoRef/obg-7.jpg')} />


                        </View>
                        

                        
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.setState({ openModalRef: false })}>
                        <Image source={require('../assets/modal/bt-cerrar.png')}
                          style={styles.btnCerrarModal} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </Modal>
                <Modal
                  visible={this.state.openModalInstru}
                  transparent={true}
                  animationType={'slide'}
                  onRequestClose={() => this.setState({ openModalInstru: false })}
                  supportedOrientations={['landscape']}
                >
                  <View style={styles.modalConfirmationInstru}>
                    <View style={styles.containerModalInstru}>
                      <View style={styles.bordeModalInstru}>
                        <View style={{flex:1, alignItems:'center', paddingHorizontal: width * 0.05}}>
                          
                          <Image  source={require('../assets/others/icono-titulos.png')} 
                                style={styles.logitoLet}/>

                          <Text style={{textAlign: 'center', fontFamily: 'FiraSans-Black', color: 'black', paddingBottom: width * 0.03}}>
                          Encender el motor antes de tomar la siguiente fotografía.
                          </Text>

                          <TouchableWithoutFeedback onPress={() => this.setState({ openModalInstru: false })}>
                          <Image  source={require('../assets/images/botones/bt-ok.png')} 
                                style={styles.btOk}/>
                          </TouchableWithoutFeedback>

                          
                        </View>
                        

                        
                      </View>
                      
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
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderColor: 'grey',
        borderBottomWidth: 0,
    },
    fondoHeader: {
        flex:0.2,
        backgroundColor: 'transparent',
    },
    logoLet: {
        width: height * 0.1,
        height: height * 0.1,
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
        width: height * 0.1,
        height: width * 0.12,
        resizeMode: 'contain',

    },
    textFotoObligatoria: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    containFotoObligatoria: {
        flex:1.2,
        flexDirection: 'row',
        width: height * 0.2,
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
    headerModel:{
        flex:0.4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: height * 0.02

    },
    BodyModel:{
        flex:1,

    },
    contentContainer:{
        paddingVertical: width * 0.02,
        paddingHorizontal: height * 0.02
    },
    Body1:{
        flex:1,
        backgroundColor:'blue',

    },
    Body2:{
        flex:0.6,
        borderRadius: 20,
        paddingVertical: 10

    },
    modalConfirmationInstru:{
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
    containerModalInstru: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bordeModalInstru: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: width * 0.5,
      width: height * 0.3,
      borderRadius: width * 0.02,
      borderColor: 'white',
      borderWidth: 0.665,
      backgroundColor: 'white'
    },
    logitoLet: {
      width: height * 0.25,
      height: width * 0.15,
      resizeMode: 'contain'
    },
    btOk: {
      width: height * 0.25,
      height: width * 0.13,
      resizeMode: 'contain'
    },




})