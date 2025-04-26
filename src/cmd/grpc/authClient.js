// authClient.js
//import grpc from './grpcSetup'; 
import { AuthClient, AuthPromiseClient } from '../../proto/sso_grpc_web_pb'; 

const hostname = 'https://krypsy.online:44044';

export const authClient = new AuthClient(hostname, null, {});
export const authPromiseClient = new AuthPromiseClient(hostname, null, {});
