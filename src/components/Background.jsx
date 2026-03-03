import React from 'react';

const Background = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.2)', // Zoom in to avoid black borders/letterboxing
          filter: 'brightness(0.9)' // Slightly brighter than original but not too bright
        }}
      >
        <source src="/background_video_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(5, 5, 16, 0.5)' // Increased overlay opacity for better text visibility
      }}></div>
    </div>
  );
};

export default Background;
