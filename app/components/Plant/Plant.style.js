import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    containerView : {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor:"transparent"
    },
    plantView : {
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
    plantInfoView : {
        flexDirection:"column"
    },
    plantInfoTextH1 : {
        marginTop:"4%",
        marginLeft : "8%",
        fontSize:18,
        color:"black",
        width:"90%"
    },
    plantInfoTextH2 : {
        marginLeft : "8%",
        fontSize:12,
        color:"black",
        width:"90%"
    }
})

export default styles