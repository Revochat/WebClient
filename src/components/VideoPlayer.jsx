import React, { useEffect, useRef, useState, useContext } from 'react';
import { RevochatContext } from '@/context/context';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

export const VideoPlayer = () => {

    const [peerId, setPeerId] = useState(uuidv4());
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const { currentUser } = useContext(RevochatContext);

    useEffect(() => {

        const peer = new Peer(peerId, {host: 'localhost', port: 9000, path: '/myapp',});

        peer.on('open', (id) => { // this is the peer id of the current user
            setPeerId(id);
        });
    
        peer.on('call', (call) => { // on receiving a call from remote peer we reply with our stream
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
        }, []);

        const call = (remotePeerId) => { // on clicking call button we send our stream to remote peer and wait for their stream
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
        
              currentUserVideoRef.current.srcObject = mediaStream;
              currentUserVideoRef.current.play();
        
              console.log(remotePeerId)
              console.log(peerInstance.current)
              const call = peerInstance.current.call(remotePeerId, mediaStream) // calling remote peer with our stream as argument

              console.log(call)
        
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