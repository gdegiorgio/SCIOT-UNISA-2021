import React from "react";
import { View, FlatList } from "react-native";
import Plant from "./Plant";
import * as functions from "./Plant.function"




export default class PlantList extends React.Component {


    renderItem = ({ item }) => (
        <Plant data={item} onUpdateStatus={this._fetchData}/>
      );
    

    constructor(props) {
        super(props)
        this.state = {
            plant_list: []
        }
    }

    componentMount = false;
    componentDidMount(){
        this.componentMount = true;
        this._fetchData();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.plant_list}
                    renderItem={this.renderItem}
                >
                </FlatList>
            </View>
        );
    }


    
    _fetchData = () => {
        console.log("Calling")
        functions.getAllPlants().then(data => {
            this.setState(
                {plant_list:data}
            )
        })
    }
}