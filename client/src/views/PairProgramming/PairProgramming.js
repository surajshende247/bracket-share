import React from 'react'
import './PairProgramming.css'

import {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function PairProgramming() {
    const [codeSnippet, setCodeSnippet] = useState('');

    const updateCodeSnippet = (e) => {
        e.preventDefault();
        setCodeSnippet(e.target.value);
        socket.emit('codechange',{code: e.target.value});
    }

    useEffect(() => {
        socket.on('codechange', (data) => {
            setCodeSnippet(data.code);
        });
    });

    return (
        <div>
            <h1>Pair Programming</h1>
            <textarea 
            className="pairProgramming" 
            placeholder="Pair Programming"
            value={codeSnippet}
            onChange={updateCodeSnippet}></textarea>
        </div>
    )
}

export default PairProgramming