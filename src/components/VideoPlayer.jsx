import React, { useEffect, useRef, useState, useContext } from 'react';
import { RevochatContext } from '@/context/context';
import Peer from 'peerjs';

export const VideoPlayer = () => {

    const [remotePeerIdValue, setRemotePeerIdValue] = useState();
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const [peerId, setPeerId] = useState();

    const { revochatClient, currentUser, revoLogin } = useContext(RevochatContext);
    const [client, setClient] = useState(null)
    
    useEffect(() => {
        if (!currentUser || !currentUser.username) {
            return;
        }
        setClient(revochatClient)
    
        const peer = new Peer(peerId, {host: 'localhost', port: 9005, path: '/myapp',});
        peer.on('open', () => { // this is the peer id of the current user
            setPeerId(currentUser.username)
            console.log('My peer ID is: ' + currentUser.username);
    
        });
    
        peer.on('call', (call) => { // on receiving a call from remote peer we reply with our stream
            console.log('call received')
            var getUserMedia = navigator.getUserMedia 
            || navigator.webkitGetUserMedia 
            || navigator.mozGetUserMedia;
    
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
            call.answer(mediaStream)
            call.on('stream', function(remoteStream) {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });
            });
        })
        peerInstance.current = peer;
    }, [revoLogin])

        const call = (remotePeerId) => { // on clicking call button we send our stream to remote peer and wait for their stream
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {

              currentUserVideoRef.current.srcObject = mediaStream;
              currentUserVideoRef.current.play();

              console.log(remotePeerId)
              console.log(peerInstance.current)
              const call = peerInstance.current.call(remotePeerId, mediaStream) // calling remote peer with our stream as argument

              console.log(call)
              console.log('call sent')

              call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
              });
            });
        }

    return (
        <div className="App">
        <h1>Current user id is {peerId}</h1>
        <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
        <button onClick={() => call(remotePeerIdValue)}>Call</button>
        <div>
            <video ref={currentUserVideoRef} />
        </div>
        <div>
            <video ref={remoteVideoRef} />
        </div>
        </div>
    );
}