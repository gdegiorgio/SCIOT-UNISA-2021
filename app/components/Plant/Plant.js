import React from 'react'
import styles from './Plant.style'
import ReactRoundedImage from "react-rounded-image";
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ProfilePicture from 'react-native-profile-picture';
import * as functions from "./Plant.function"

export default class Plant extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            plantID: "",
            nomeScientifico: "",
            img: "",
            da_annaffiare: false,
        }

    }

    componentMount = false;

    componentDidMount() {
        console.log("Did mount")
        this.componentMount = true;
        this._getStateFromProps(this.props.data).then(() => {
            let img = functions.getURLImage(this.state.nome.toLowerCase())
            this.setState({
                img: img
            })
        });




    }




    render() {
        return (

        <View style={styles.containerView}>
            <View style={styles.plantView}>
                <ProfilePicture
                isPicture={true}
                URLPicture={this.state.img}>
                </ProfilePicture>
                <View style={styles.plantInfoView}>
                    <Text style={styles.plantInfoTextH1}>{this.state.nome}</Text>
                    <Text style={styles.plantInfoTextH2}>{this.state.nomeScientifico}</Text>
                </View>
            </View>
            {this.state.da_annaffiare==false?null:
            <Text style={{marginTop:"5%"}}>Needs water!</Text>}
            <TouchableOpacity
                key={this.state.plantID}
                onPress={this._onClickWaterPlant}
                style={this.state.da_annaffiare==true?styles.buttoneDaAnnaffiare:styles.buttoneAnnaffiato}>
            </TouchableOpacity>
        </View >);
    }

    _onClickWaterPlant = () => {
        if (this.componentMount) {
            if(this.state.da_annaffiare===false)
                return
            Alert.alert(
                "Attenzione",
                "Sei davvero sicuro di voler dare acqua a questa pianta? (" + this.state.nomeScientifico +  ")",
                [
                  {
                    text: "Dai acqua",
                    onPress:
                    ()=>{functions.daiAcqua(this.state.plantID);this._printSuccessAlert(); this.props.onUpdateStatus()}
                  },
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  }]
              );
        }
    }

    _printSuccessAlert(){Alert.alert("Success", "Operation succeded")}
    _getStateFromProps = (plantData) => {
        console.log("Props : " + JSON.stringify(plantData))
        if (this.componentMount) {
            return new Promise(resolve => {
                this.setState({
                    nome: plantData.nome,
                    plantID: plantData.plantID,
                    nomeScientifico: plantData.nomeScientifico,
                    da_annaffiare: plantData.da_annaffiare,
                    onUpdate : plantData.onUpdate
                }, () => { resolve() })
            })
        }

    }

}



