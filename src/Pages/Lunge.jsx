import { useState } from 'react';

const Lunge = () => {
  const [counter, setCounter] = useState(0);
  let isLungePosition = false; // 런지 위치에 있는지 여부
  
  const calculateAngle = (a, b, c) => {
    // ...각도 계산 로직은 동일하게 유지
  };

  const onResults = (results) => {
    // ...웹캠과 캔버스 처리 로직은 동일하게 유지

    if (results.poseLandmarks) {
      // 런지는 주로 한쪽 다리의 움직임을 기반으로 판단하므로, 허벅지와 종아리가 이루는 각도를 계산
      const rightHip = results.poseLandmarks[24]; // 오른쪽 엉덩이
      const rightKnee = results.poseLandmarks[26]; // 오른쪽 무릎
      const rightAnkle = results.poseLandmarks[28]; // 오른쪽 발목

      const leftHip = results.poseLandmarks[23]; // 왼쪽 엉덩이
      const leftKnee = results.poseLandmarks[25]; // 왼쪽 무릎
      const leftAnkle = results.poseLandmarks[27]; // 왼쪽 발목

      let rightLegAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
      let leftLegAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

      // 각도를 기반으로 한 게이지바 그리기 로직 유지
      rightLegAngle = Math.round(linearInterpolate(rightLegAngle, 160, 90, 100, 0));
      leftLegAngle = Math.round(linearInterpolate(leftLegAngle, 160, 90, 100, 0));

      // 운동 단계 로직
      if (isLungePosition && (rightLegAngle >= 90 || leftLegAngle >= 90)) {
        setCounter((prev) => prev + 1);
        isLungePosition = false; // 런지에서 일어남
      } else if (!isLungePosition && (rightLegAngle <= 80 || leftLegAngle <= 80)) {
        isLungePosition = true; // 런지에서 내려감
      }
    }
  };

  return (
    // ...컴포넌트 반환 로직은 동일하게 유지
    <></>
  );
};

export default Lunge;
