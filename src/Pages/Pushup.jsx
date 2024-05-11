import React, {useEffect, useRef, useState} from 'react';
import ScoreBoard from '../Components/ScoreBoard';
import Webcam from "react-webcam";
import {Camera} from "@mediapipe/camera_utils";

import {FACEMESH_TESSELATION, HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS, Results} from '@mediapipe/holistic';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'

const PushUp=()=>{


    const [counter, setCounter]=useState(0)
   
    let hasCounted = false;
    //운동 단계를 추적하는 변수 (예제 코드에서는 사용하지 않지만, 상태 관리를 위해 유지)
    let exercisePhase = "none"
    
     //팔이 완전히 굽혀져 있는지 여부를 추적하는 변수
    let fullyBent = false
    //초기 direction 값을 "up"으로 설정
    let direction = "down"  
    //정규화된 각도를 기반으로 판단, 팔이 굽혀지고 있는 상태
  
    const  calculateAngle=(a, b, c)=> {
      const aPoint = {x: a.x, y: a.y}
      const bPoint = {x: b.x, y: b.y}
      const cPoint = {x: c.x, y: c.y}
  
      const radians = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) 
      - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
      let angle = Math.abs(radians * 180.0 / Math.PI);
  
      if (angle > 180.0) {
          angle = 360 - angle;
      }
  
      return angle;}
  
  
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
  
  
      // onResults 함수 내에서 각도 계산 예시
    if (results.poseLandmarks) {
      // 예를 들어, 오른쪽 어깨, 팔꿈치, 손목의 랜드마크 인덱스는 각각 11, 13, 15입니다.
  
      const rightShoulder=results.poseLandmarks[11]
      const rightElbow=results.poseLandmarks[13]
      const rightWrist=results.poseLandmarks[15]
  
      const leftShoulder=results.poseLandmarks[12]
      const leftElbow=results.poseLandmarks[14]
      const leftWrist=results.poseLandmarks[16]
      let rightAngle = calculateAngle(
        rightShoulder,rightElbow,rightWrist
      );
      let leftAngle = calculateAngle(
        leftShoulder,leftElbow,leftWrist
      );
      
  
  
  
  // console.log(rightAngle,leftAngle)
  
      leftAngle = Math.round(linearInterpolate(leftAngle, 34, 180, 100, 0));
      rightAngle = Math.round(linearInterpolate(rightAngle, 34, 173, 100, 0));
  
      
  
  
      //정규화된 각도를 기반으로 판단, 팔이 굽혀지고 있는 상태
  
      // 운동 단계 로직
  // 운동 단계 로직
  // 운동 단계 로직
  // 초기 상태 설정
  
  function updateCounterIfNeeded() {
    // 운동의 상태와 각도 조건을 확인하여 카운터를 업데이트할지 결정
    if (exercisePhase === "down" && !fullyBent && leftAngle >= 80 && rightAngle >= 80) {
      setCounter(prev => prev + 1);
      fullyBent = true;  // 완전히 굽혔음을 표시
    } else if ((leftAngle <= 70 || rightAngle <= 70) && fullyBent) {
      // 팔이 충분히 펴졌고, 이전에 완전히 굽혔던 상태였다면, 다음 굽힘 준비
      fullyBent = false;
    }
  }
  
  // 운동 상태를 업데이트하는 로직
  if (leftAngle >= 10 && rightAngle >= 10) {
    exercisePhase = "down";
    updateCounterIfNeeded();  // 카운터 업데이트 여부 검사 및 업데이트
  } else if (leftAngle <= 70 || rightAngle <= 70) {
    exercisePhase = "up";
    updateCounterIfNeeded();  // 카운터 업데이트 여부 검사 및 업데이트
  }
  
  const feedbackMessages = []
  if (exercisePhase == "down"){
    if (!fullyBent){
      //팔이 완전히 굽혀지지 않았으면, 팔을 더 굽혀야 함을 알림
      feedbackMessages.push("좋아요, 이제 팔을 더 굽혀주세요")
  
      
  
  
    }else{
      //팔이 완전히 굽혀졌다면, 좋은 자세임을 피드백
      feedbackMessages.push("잘하셨습니다! 이제 팔을 완전히 펴주세요")
  
    }
//    # 예를 들어, 어깨, 엉덩이, 발목 랜드마크의 좌표를 추출
//   shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
//   hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
//   ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
  
  // # 각도 계산
  // body_alignment_angle = calculate_angle(shoulder, hip, ankle)
  
  // # 피드백 제공
  // if not (175 <= body_alignment_angle <= 185):
  // feedback_messages.append("등에서 다리까지 일직선이 되도록 조정해주세요.")
  
  //         # 조건문을 사용하여 손과 전완이 일직선이 되는지 확인합니다.
  // if not (160 <= hand_forearm_alignment_left <= 180 and 160 <= hand_forearm_alignment_right <= 180):
  // feedback_messages.append("손이 전완과 일직선이 되도록 조정해주세요.")
  // # 피드백 메시지 화면에 표시
    
      
    
  
  }else if (exercisePhase=="up"){
    //상승 단계일 경우
    if(fullyBent && (leftAngle >= 10 && rightAngle >= 10)){
      // 팔이 완전히 굽혀진 상태에서 두 팔의 각도가 모두 GIVE_FEEDBACK 이상일 경우, 팔을 완전히 펴라는 피드백
      feedbackMessages.push("팔을 더 펴주세요")
  
    }else if(!fullyBent && counter>0){
      // 팔이 완전히 굽혀진 상태가 아니거나, 둘 중 하나의 팔 각도가 GIVE_FEEDBACK보다 작을 경우, 팔을 더 펴야 함을 알림
      feedbackMessages.push("잘했어요 한번 더")
    }
  
  }

  
  draw()
      
  
  
  
      
  
  
   // 왼쪽 및 오른쪽 게이지바 그리기
   drawGaugeBar(canvasCtx, leftAngle, true); // 왼쪽 게이지바
   drawGaugeBar(canvasCtx, rightAngle, false); // 오른쪽 게이지바
  
   drawLabels(canvasCtx)
    
  
    
    }}
  
    useEffect(() => {
      const holistic = new Holistic({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
        }
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
      holistic.onResults(onResults);
  
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        if (!webcamRef.current?.video) return
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (!webcamRef.current?.video) return
            await holistic.send({image: webcamRef.current.video});
          },
          width: 1200,
          height: 800,
        });
        camera.start();
      }
    }, [])
    return (
      <div className="App">
        <div><h3>Push-up</h3></div>
         <div>  <button onClick={()=>{
          setCounter(0)
          exercisePhase="none"
          fullyBent=false
        }}>Start</button></div>
        <ScoreBoard score={counter}/>
     
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
    );
  
  }

  export default PushUp