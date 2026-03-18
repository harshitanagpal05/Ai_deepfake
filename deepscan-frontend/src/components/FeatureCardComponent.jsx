import React, { useRef, useState, useEffect } from 'react';
import './FeatureCardComponent.css';

export default function FeatureCardComponent({ title, subtitle, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max rotation 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`feature-card-wrapper ${isVisible ? 'is-visible' : ''}`}
      style={{ '--index': index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="landing__mini-card feature-card-interactive"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${
            rotation.x !== 0 || rotation.y !== 0 ? 1.05 : 1
          })`,
        }}
      >
        <div className="landing__mini-title">{title}</div>
        <div className="landing__mini-sub">{subtitle}</div>
      </div>
    </div>
  );
}
