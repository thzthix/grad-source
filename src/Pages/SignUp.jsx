import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
const { login } = useAuth();
const navigate = useNavigate(); 
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    weight: '',
    height: '',
    age: '',
    gender: '', // 성별 상태 추가
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 백엔드에 user 데이터를 전송하는 로직
    try {
      const response = await fetch('http://localhost:3001/api/users/signup', { // 경로는 실제 백엔드 API 경로에 맞게 조정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        login(data);
        localStorage.setItem('token', data.token); // 토큰 저장
        navigate('/'); //메인 페이지로 리디렉션
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="이름을 입력하세요" name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력하세요" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호를 입력하세요" name="password" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWeight">
          <Form.Label>체중</Form.Label>
          <Form.Control type="number" placeholder="체중을 입력하세요" name="weight" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicHeight">
          <Form.Label>키</Form.Label>
          <Form.Control type="number" placeholder="키를 입력하세요" name="height" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>나이</Form.Label>
          <Form.Control type="number" placeholder="나이를 입력하세요" name="age" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>성별</Form.Label>
          <Form.Control as="select" name="gender" onChange={handleChange}>
            <option value="">성별을 선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
            <option value="preferNotToSay">선택하지 않음</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>

    
  );
};

export default SignUp;
