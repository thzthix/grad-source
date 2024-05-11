// usePoseDetection.js
import { useRef, useEffect, useState } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import Webcam from "react-webcam";

import {FACEMESH_TESSELATION, HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS, Results} from '@mediapipe/holistic';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'

const usePoseDetection = (onExternalResults) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [pose, setPose] = useState(null);

    useEffect(() => {
        const holistic = new Holistic({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
        });

        holistic.setOptions({
            selfieMode: true,
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            refineFaceLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        holistic.onResults((results) => {
            // 포즈 결과를 상태로 저장
            setPose(results)
              // 외부에서 전달받은 onResults 함수 호출
        if (onExternalResults) {
            onExternalResults(results);
        }
            if (canvasRef.current && results) {
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
            }
        });

        

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await holistic.send({image: webcamRef.current.video});
                },
                width: 1280,
                height: 720,
            });


            camera.start();
        }
    }, []);

    return { webcamRef, canvasRef, pose };
};

export default usePoseDetection;
