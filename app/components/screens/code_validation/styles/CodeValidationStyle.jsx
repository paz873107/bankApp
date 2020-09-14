import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {     
    flex:1,   
    width: "100%",
    height: "100%",
    alignContent:"center",    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#79d8aa",
    },
    input:{    
    alignSelf:"center",
    width:310,
    height:50,
    marginTop: 50,
    marginBottom:40,
    backgroundColor:'white'
    },
    mainTitle:{
    fontSize: 30,
    color:"white",
    fontWeight: '8',
    textAlign:"center",
    },
    appButtonContainer: {
        width: '100%',
        marginBottom: '10px',
        marginTop: '20px',
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      } 
});
  
export default styles