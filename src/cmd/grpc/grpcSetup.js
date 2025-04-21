// grpcSetup.js
import { grpc } from 'grpc-web';
import RNFetchBlob from 'react-native-fetch-blob';

global.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
global.FormData = RNFetchBlob.polyfill.FormData;

export default grpc;
