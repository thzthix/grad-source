// usePoseDetection 훅을 import합니다.
import usePoseDetection from '../hooks/usePoseDetection'; 
import React, {useEffect, useRef, useState} from 'react';
import Webcam from "react-webcam";
import calculateAngle  from '../utils/calculateAngle';

const onResults = (results) => {
  // ...웹캠과 캔버스 처리 로직은 동일하게 유지

  if (results.poseLandmarks) {
    // 스쿼트는 주로 다리의 움직임을 기반으로 판단하므로, 허벅지와 종아리가 이루는 각도를 계산
    const rightHip = results.poseLandmarks[24]; // 오른쪽 엉덩이
    const rightKnee = results.poseLandmarks[26]; // 오른쪽 무릎
    const rightAnkle = results.poseLandmarks[28]; // 오른쪽 발목

    const leftHip = results.poseLandmarks[23]; // 왼쪽 엉덩이
    const leftKnee = results.poseLandmarks[25]; // 왼쪽 무릎
    const leftAnkle = results.poseLandmarks[27]; // 왼쪽 발목

    let rightLegAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
    let leftLegAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

    // ...각도를 기반으로 한 게이지바 그리기 로직 유지

    // rightLegAngle = Math.round(linearInterpolate(rightLegAngle, 160, 90, 100, 0));
    // leftLegAngle = Math.round(linearInterpolate(leftLegAngle, 160, 90, 100, 0));

    // // 운동 단계 로직
    // if (fullyBent && rightLegAngle >= 90 && leftLegAngle >= 90) {
    //   setCounter((prev) => prev + 1);
    //   fullyBent = false; // 스쿼트에서 일어남
    // } else if (!fullyBent && rightLegAngle <= 80 && leftLegAngle <= 80) {
    //   fullyBent = true; // 스쿼트에서 내려감
    // }
  }
};

const Squat = () => {
   // usePoseDetection 훅을 사용하여 webcamRef, canvasRef, pose를 가져옵니다.
   const { webcamRef, canvasRef, pose } = usePoseDetection(onResults);
    const [counter, setCounter] = useState(0);
    let fullyBent = false;
    
    const calculateAngle = (a, b, c) => {
      // ...각도 계산 로직은 동일하게 유지
    };
  
    
  
    return (
      // ...컴포넌트 반환 로직은 동일하게 유지
      <>
        <div>
          {/* <video ref={webcamRef} style={{display: 'block'}} autoPlay muted playsInline></video>
    <canvas ref={canvasRef} style={{width: '100%'}}></canvas> */}
    <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 1200,
            height: 800,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 1200,
            height: 800,
          }}
        />
    </div>
    <div>스쿼트 횟수: {counter}</div>
      </>
    );
  };
  
  export default Squat;
  