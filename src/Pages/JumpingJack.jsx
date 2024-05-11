import { useState } from 'react';

const JumpingJacks = () => {
  const [counter, setCounter] = useState(0);
  let isJumpingJackPosition = false; // Jumping Jack 실행 포즈 여부
  
  const calculateAngle = (a, b, c) => {
    // ...각도 계산 로직은 동일하게 유지
  };

  const onResults = (results) => {
    // ...웹캠과 캔버스 처리 로직은 동일하게 유지

    if (results.poseLandmarks) {
      // Jumping Jacks는 팔과 다리가 모두 벌어지는 동작을 포함하므로, 팔과 다리의 위치를 기반으로 판단
      const leftShoulder = results.poseLandmarks[11];
      const rightShoulder = results.poseLandmarks[12];
      const leftHip = results.poseLandmarks[23];
      const rightHip = results.poseLandmarks[24];
      const leftAnkle = results.poseLandmarks[27];
      const rightAnkle = results.poseLandmarks[28];

      // 팔과 다리가 모두 벌어진 상태인지 확인하기 위한 간단한 거리 계산
      const isArmsWide = calculateDistance(leftShoulder, rightShoulder) > someThreshold;
      const isLegsWide = calculateDistance(leftAnkle, rightAnkle) > someThreshold;

      // 운동 단계 로직
      if (isJumpingJackPosition && !isArmsWide && !isLegsWide) {
        setCounter((prev) => prev + 1);
        isJumpingJackPosition = false; // 팔과 다리를 모았음
      } else if (!isJumpingJackPosition && isArmsWide && isLegsWide) {
        isJumpingJackPosition = true; // 팔과 다리를 벌림
      }
    }
  };

  return (
    // 컴포넌트 반환 로직
    <>
      <div>Jumping Jacks Count: {counter}</div>
    </>
  );
};

export default JumpingJacks;

function calculateDistance(point1, point2) {
  // 두 점 사이의 거리 계산 로직
  const distance = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  return distance;
}

// 'someThreshold'는 거리에 따라 조정해야 할 수 있으며, 테스트를 통해 적절한 값을 찾아야 합니다.
