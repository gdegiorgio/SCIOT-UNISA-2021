import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    containerView : {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor:"transparent"
    },
    logView : {
        flex:1,
        flexDirection:"row",
        backgroundColor:"transparent"
    },
    buttoneAnnaffiato : {
        marginTop: "5%",
        marginLeft:"8%",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'green',
    },
    buttoneDaAnnaffiare: {
        marginTop: "5%",
        marginLeft:"10%",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'red',
    },    
    logInfoView : {
        flexDirection:"column"
    },
    logInfoTextH1OK : {
        marginTop:"4%",
        marginLeft : "8%",
        fontSize:18,
        color:"blue",
        width:"90%",
        fontWeight:"bold"
    },
    logInfoTextH1WARNING : {
        marginTop:"4%",
        marginLeft : "8%",
        fontSize:18,
        color:"red",
        width:"90%",
        fontWeight:"bold"
    },
    logInfoTextH2 : {
        marginLeft : "8%",
        fontSize:12,
        color:"black",
        width:"90%"
    }
})

export default styles