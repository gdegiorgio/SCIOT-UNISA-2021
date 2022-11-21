import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: "column"
    },
    temperatureInfoContainer: {
        flex: 0.3,
        backgroundColor: "transparent",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        fontSize : 24
    },
    tabsConstainer: {
        flex: 0.75,
        backgroundColor: "transparent"
    },
    stileTab : {
		color: '#333333', 
		fontWeight: "normal",
		fontSize : 18,
        alignSelf:"center",
        marginTop:"6%"
    },
    stileTabSelezionato : {
		color: '#333333', 
		fontWeight: "bold",
		fontSize : 18,
        alignSelf:"center",
        marginTop:"6%"
    },
    temperatureTextOK: {
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        color: "blue",
        fontWeight: "bold",
        fontSize : 24
    },
    temperatureTextWarning: {
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        color: "yellow",
        fontWeight: "bold",
        
        fontSize : 24
    },
    temperatureTextCritical: {
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        color: "red",
        fontWeight: "bold",
      
        fontSize : 24

    },
    infoText: {
        marginTop:"20%",
        alignSelf: "center",
        textAlign: "center",
        marginBottom : "5%",
        fontSize : 24

    }
})


export default styles