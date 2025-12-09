import React from 'react';
import './MDLayout.css';

export default function MDLayout({ 
  children, 
  chapterNumber, 
  chapterTitle, 
  partName = "Part I: Foundations",
  difficulty = "Intermediate (Standard)"
}) {
  
  // Extract chapter number from title if not provided
  const getChapterNumber = () => {
    if (chapterNumber) return chapterNumber;
    const match = chapterTitle?.match(/Chapter (\d+)/i);
    return match ? match[1] : "1";
  };

  return (
    <div className="md-layout-container">
      {/* Header Section */}
      <div className="chapter-header-section">
        <div className="book-title-header">
          <h1>Physical AI & Humanoid Robotics</h1>
          <h2>{partName}</h2>
        </div>
        
        <div className="part-header">
          <div className="part-tag">{partName}</div>
        </div>
        
        <div className="chapter-title-section">
          <h1>{chapterTitle}</h1>
        </div>
        
        <div className="target-level-section">
          <h3>Target Level: <span className="level-badge">{difficulty}</span></h3>
        </div>
        
        <div className="personalize-section">
          <button className="personalize-button">Personalize Content</button>
          <p className="personalize-note">AI will rewrite the content to match your selected difficulty level.</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="md-content-wrapper">
        {children}
      </div>

      {/* Navigation */}
      <div className="chapter-navigation">
        <div className="prev-next">
          <a href="/docs" className="nav-btn prev-btn">← Back to Book Overview</a>
          <a href="#" className="nav-btn next-btn">Next: Chapter {parseInt(getChapterNumber()) + 1} →</a>
        </div>
        <div className="progress-indicator">
          <div className="progress-bar" style={{width: `${(getChapterNumber() / 6) * 100}%`}}></div>
          <span>Progress: {getChapterNumber()}/6 Chapters</span>
        </div>
      </div>
    </div>
  );
}