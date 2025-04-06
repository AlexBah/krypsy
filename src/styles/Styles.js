import { StyleSheet } from 'react-native';

const COLORS = {
    backgroundColor: '#333',
    textColor: '#f0f0f0',
    opacity: 0.7,
    buttonColor: '#288BA2',
};

const SIZES = {
    backgroundHeight: '100%',
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.backgroundColor,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontPicture: {
    height: '50%',
    width: '100%',
    resizeMode: "contain",
  },
  h1: {
    color: COLORS.textColor,
    fontSize: 30,
    fontFamily: "SemiBold",
    alignSelf: "center",
  },
  h2: {
    color: COLORS.textColor,
    fontSize: 20,
    fontFamily: "SemiBold",
    alignSelf: "center",
    opacity: COLORS.opacity,
  },
  h3: {
    color: COLORS.textColor,
    fontSize: 14,
    fontFamily: "SemiBold",
    alignSelf: "center",
    margin: 5,
    opacity: COLORS.opacity,
  },
  inputBorder: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 2,
    margin: 15,
    paddingHorizontal: 10,
    borderColor: COLORS.textColor,
    borderRadius: 23,
    paddingVertical: 2,
    opacity: COLORS.opacity,
  },
  inputIcon: {
    size: 23,
    color: COLORS.textColor,
    opacity: COLORS.opacity,
  },
  inputText: {
    height: 40,
    textAlignVertical: 'center', 
    textAlign: 'center',    
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: "SemiBold",
    color: COLORS.textColor,
    opacity: COLORS.opacity,
  },
  phoneInput: {
    width: 240,
  },
  smsInput: {
    width: 70,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: COLORS.buttonColor,
    paddingVertical: 2,
    borderRadius: 23,
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    opacity: COLORS.opacity,
    margin: 5,
  },
  circleFilled: {
    backgroundColor: COLORS.textColor,
  },
  circleEmpty: {
    backgroundColor: COLORS.backgroundColor,
  },
  circleContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  gridContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
  },
  gridRow: {
    flexDirection: 'row',
    height: '25%',
  },
  gridButton: {
    borderWidth: 1,
    borderRadius: 10,
    width: '20%',
    borderColor: COLORS.textColor,
    opacity: COLORS.opacity,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridButtonEmpty: {
    opacity: 0,
  },
});

export default styles;
