import React from "react";
import Log from "./Log";
import * as functions from "./Log.function"
import { View, FlatList } from "react-native";


const renderItem = ({ item }) => (
    <Log data={item} />
);

export default class LogList extends React.Component {




    constructor(props) {
        super(props)
        this.state = {
            temp_logs: []
        }
    }


    componentMount = false;
    componentDidMount() {
        this.componentMount = true;
        this._fetchData()
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.temp_logs}
                    renderItem={renderItem}
                >
                </FlatList>
            </View>
        )
    }

    _fetchData = () => {
        console.log("Getting logs")
        functions.getTempLogs().then(data => {
            this.setState(
                { temp_logs: data }
            )
        })
    }
}
