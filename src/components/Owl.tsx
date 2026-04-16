
import React, { useEffect, useRef, useState } from 'react';

interface OwlProps {
  currentField: string;
  emailValue: string;
  passwordValue: string;
  showPassword: boolean;
}

const Owl: React.FC<OwlProps> = ({ currentField, emailValue, passwordValue, showPassword }) => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const owlContainerRef = useRef<HTMLDivElement>(null);
  
  const [blinking, setBlinking] = useState(false);
  
  // Effect for handling the wing animation based on showPassword
  useEffect(() => {
    if (leftWingRef.current && rightWingRef.current && owlContainerRef.current) {
      if (showPassword) {
        owlContainerRef.current.classList.add('eyes-covered');
        leftWingRef.current.classList.add('animate-wing-cover');
        leftWingRef.current.classList.remove('animate-wing-uncover');
        rightWingRef.current.classList.add('animate-wing-cover');
        rightWingRef.current.classList.remove('animate-wing-uncover');
        leftWingRef.current.style.transform = 'translateY(-10px) rotate(-50deg)';
        rightWingRef.current.style.transform = 'translateY(-10px) rotate(50deg)';
      } else {
        owlContainerRef.current.classList.remove('eyes-covered');
        leftWingRef.current.classList.add('animate-wing-uncover');
        leftWingRef.current.classList.remove('animate-wing-cover');
        rightWingRef.current.classList.add('animate-wing-uncover');
        rightWingRef.current.classList.remove('animate-wing-cover');
        leftWingRef.current.style.transform = 'translateY(0) rotate(0deg)';
        rightWingRef.current.style.transform = 'translateY(0) rotate(0deg)';
      }
    }
  }, [showPassword]);
  
  // Effect for tracking text with eyes
  useEffect(() => {
    if (!leftPupilRef.current || !rightPupilRef.current) return;
    
    let value = '';
    if (currentField === 'email') value = emailValue;
    if (currentField === 'password') value = passwordValue;
    
    const maxShift = 8; // maximum pixels to move pupil
    const textProgress = value.length ? Math.min(1, value.length / 20) : 0;
    const shift = -maxShift + (textProgress * maxShift * 2);
    
    leftPupilRef.current.style.transform = `translateX(${shift}px)`;
    rightPupilRef.current.style.transform = `translateX(${shift}px)`;
    
    // Occasional blinking
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 200);
      }
    }, 3000);
    
    return () => clearInterval(blinkInterval);
  }, [currentField, emailValue, passwordValue]);
  
  return (
    <div className="owl-container" ref={owlContainerRef}>
      <div className="owl-body">
        <div className={`owl-eye-container left`}>
          <div 
            ref={leftEyeRef} 
            className={`owl-eye ${blinking ? 'animate-blink' : ''}`}
          >
            <div ref={leftPupilRef} className="pupil"></div>
          </div>
        </div>
        <div className={`owl-eye-container right`}>
          <div 
            ref={rightEyeRef} 
            className={`owl-eye ${blinking ? 'animate-blink' : ''}`}
          >
            <div ref={rightPupilRef} className="pupil"></div>
          </div>
        </div>
        <div className="owl-beak"></div>
      </div>
      <div ref={leftWingRef} className="owl-wing left"></div>
      <div ref={rightWingRef} className="owl-wing right"></div>
      <div className="owl-feet">
        <div className="owl-foot"></div>
        <div className="owl-foot"></div>
      </div>
    </div>
  );
};

export default Owl;
