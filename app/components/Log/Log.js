import React from 'react'
import styles from '../Log/Log.style'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ProfilePicture from 'react-native-profile-picture';


export default class Log extends React.Component{
    constructor(props){
        super(props);
        this.state={
            temperature : "init",
            datetime : "init"
        }
    }

    componentMount=false
    componentDidMount(){
        this.componentMount=true;
        this._getStateFromProps(this.props.data)
    }

    render(){
        return(
            <View style={styles.containerView}>
            <View style={styles.logView}>
                <ProfilePicture
                isPicture={true}
                URLPicture="https://cdn-icons-png.flaticon.com/512/4158/4158502.png">
                </ProfilePicture>
                <View style={styles.logInfoView}>
                    <Text style={this.state.temperature<29 || this.state.temperature<16?styles.logInfoTextH1OK:styles.logInfoTextH1WARNING}>{this.state.temperature}</Text>
                    <Text style={styles.logInfoTextH2}>{this.state.datetime}</Text>
                </View>
            </View>
        </View >);
    }


    _getStateFromProps = (data) => {
        console.log("Props : " + JSON.stringify(data))
        if (this.componentMount) {
            self=this
            return new Promise(resolve => {

                let mls = Date.parse(data.datetime);
                let date = new Date(mls).toDateString();

                self.setState({
                    temperature : parseInt(data.temperature),
                    datetime : date
                }, () => { resolve() })
            })
        }

    }
}