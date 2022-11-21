import React from "react";
import { View, Text, Dimensions, TouchableOpacity, Animated } from "react-native";
import PlantList from "../components/Plant/PlantList";
import LogList from "../components/Log/LogList";
import styles from "./Homescreen.style";
import { TabView, SceneMap } from 'react-native-tab-view';
import { getLastTempLog } from "../components/Log/Log.function";



const TabviewLabels = { 0: { key: "logs", title: "Temperature History" }, 1: { key: "plants", title: "Plants status" } }




export default class Homescreen extends React.Component {


    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            headerShown: false,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [],
            scenes: [],
            greenhouseTemperature: "",
            tabselezionato: TabviewLabels[0].title
        }

    }

    componentMounted = false;

    componentDidMount() {
        this.componentMounted = true
        this._setRouteTab()
        this._fetchLastTempLog();
    }

    render() {
        return (<View style={styles.topContainer}>
            <View style={styles.temperatureInfoContainer}>
                <Text style={styles.infoText}>Greenhouse Temperature</Text>
                <Text style={this.state.greenhouseTemperature !="" && (this.state.greenhouseTemperature<29 || this.state.greenhouseTemperature>16)?styles.temperatureTextOK : styles.temperatureTextCritical}>
                    {this.state.greenhouseTemperature !=""?this.state.greenhouseTemperature + "°" : "Non available"}
                </Text>
            </View>
            <View style={styles.tabsConstainer}>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap(this.state.scenes)}
                    onIndexChange={this._setIndex}
                    initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                    renderTabBar={this._renderTabBar}
                />
            </View>
        </View>)
    }

    _setIndex = (index) => {
        if (this.componentMounted) {
            this.setState({ index: index, tabselezionato: TabviewLabels[index].title })
        }
    }


    _renderTabBar = () => {
        if (this.componentMounted) {
            return (
                <View style={{ 'flexDirection': 'row' }} >
                    {this.state.routes.map((route, i) => {
                        return (

                            <TouchableOpacity key={route.title} style={{ 'flex': 1, 'alignContent': "center", 'alignItems': 'center', 'backgroundColor': 'white', 'height': 50, 'top': 1 }} onPress={() => this._setIndex(i)}>
                                <Animated.Text style={[
                                    styles.stileTab,
                                    this.state.tabselezionato == route.title ? styles.stileTabSelezionato : styles.stileTab
                                ]}>{route.title}</Animated.Text>
                            </TouchableOpacity>

                        );
                    })}
                </View>
            );
        }

    }

    _setRouteTab = () => {
        if (this.componentMounted) {
            let scenes = [];
            let routes = [];



            const LogsRoute = () => (
                <View style={{marginTop:"3%", marginLeft:"3%"}}>
                    <LogList />
                </View>
            );
            const PlantsRoute = () => (
                <View style={{marginTop:"3%", marginLeft:"3%"}}>
                    <PlantList />
                </View>
            );

            scenes['logs'] = LogsRoute
            routes.push(TabviewLabels[0])


            scenes['plants'] = PlantsRoute
            routes.push(TabviewLabels[1])


            this.setState({
                scenes: scenes,
                routes: routes
            })
        }

    }


    _fetchLastTempLog(){
        getLastTempLog().then((data)=>{ console.log("CERI : ", JSON.stringify(data)); this.setState({greenhouseTemperature:parseInt(data[0].temperature)})})
    }

}