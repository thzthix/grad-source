import React, {useEffect, useRef, useState} from 'react';
import ScoreBoard from '../Components/ScoreBoard';
import Webcam from "react-webcam";
import {Camera} from "@mediapipe/camera_utils";

import {FACEMESH_TESSELATION, HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS, Results} from '@mediapipe/holistic';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'
import React from 'react'

const useWebcamAndCanvas = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
  
    const onResults = (results) => {
     
      
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    if (canvasCtx == null) throw new Error('Could not get context');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  
    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  
    canvasCtx.globalCompositeOperation = 'source-over';
    // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
    //   {color: '#00FF00', lineWidth: 4});
    // drawLandmarks(canvasCtx, results.poseLandmarks,
    //   {color: '#FF0000', lineWidth: 2});
    
   
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
      {color: '#CC0000', lineWidth: 5});
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
      {color: '#00FF00', lineWidth: 2});
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      {color: '#00CC00', lineWidth: 5});
    drawLandmarks(canvasCtx, results.rightHandLandmarks,
      {color: '#FF0000', lineWidth: 2});
  
  
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        {color: '#00CC00', lineWidth: 5});
   
  
    drawLandmarks(canvasCtx, results.poseLandmarks,
      {color: '#FF0000', lineWidth: 2});
  
  
    canvasCtx.restore();
    return { webcamRef, canvasRef, onResults };
}
}

export default useWebcamAndCanvas