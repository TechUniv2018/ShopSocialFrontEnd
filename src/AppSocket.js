import React from 'react';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import App from './App';

const uri = 'http://localhost/test';
const options = { transports: ['websocket'] };
const socket = io.connect(process.env.SOCKET_URL);
socket.on('message', msg => console.log(msg));
export default class AppSocket extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    );
  }
}
