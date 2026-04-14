const fs = require('fs');
const { createCanvas } = require('canvas');
const { prepareWithSegments, layoutWithLines, measureLineStats } = require('@chenglou/pretext');

// Setup canvas for text measurement
const canvas = createCanvas(800, 400);
const ctx = canvas.getContext('2d');

const WIDTH = 800;
const LINE_HEIGHT = 42;
const FONT = '600 32px "SF Pro Display", Inter, system-ui, sans-serif';

const text = "Hello, I'm a developer who loves \\nbuilding unique interfaces \\nwith precise typography ✨";

// Prepare text with Pretext
const prepared = prepareWithSegments(text, FONT, { whiteSpace: 'pre-wrap' });
const { lines, lineCount, height } = layoutWithLines(prepared, WIDTH - 60, LINE_HEIGHT);

// Generate unique SVG with perfect layout
let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${height + 80}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${height + 80}">
  <defs>
    <!-- Unique gradient background -->
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
    </linearGradient>
    
    <!-- Text animation -->
    <style>
      @keyframes draw {
        from { stroke-dashoffset: 1000; opacity: 0; }
        to { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .line {
        animation: fadeIn 0.8s ease-out forwards;
        opacity: 0;
      }
      ${lines.map((_, i) => `.line-${i} { animation-delay: ${i * 0.2}s; }`).join('\n      ')}
    </style>
    
    <!-- Glow filter -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Animated background -->
  <rect width="100%" height="100%" fill="url(#grad1)" rx="15" ry="15"/>
  
  <!-- Decorative elements using Pretext layout data -->
  ${lines.map((line, i) => {
    const y = 50 + (i * LINE_HEIGHT);
    const x = 30;
    return `
  <g class="line line-${i}">
    <!-- Subtle highlight background -->
    <rect x="${x - 10}" y="${y - 28}" width="${line.width + 20}" height="36" 
          fill="rgba(255,255,255,0.1)" rx="8" ry="8"/>
    
    <!-- Main text with glow -->
    <text x="${x}" y="${y}" 
          font-family="SF Pro Display, Inter, sans-serif" 
          font-size="32" 
          font-weight="600" 
          fill="#ffffff" 
          filter="url(#glow)">${line.text}</text>
    
    <!-- Cursor effect on last line -->
    ${i === lines.length - 1 ? `
    <rect x="${x + line.width + 5}" y="${y - 24}" width="3" height="32" fill="#ffffff">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>` : ''}
  </g>`;
  }).join('')}
  
  <!-- Pretext stats badge -->
  <text x="${WIDTH - 20}" y="${height + 60}" 
        text-anchor="end" 
        font-family="monospace" 
        font-size="12" 
        fill="rgba(255,255,255,0.6)">
    Layout powered by Pretext • ${lineCount} lines • ${Math.round(height)}px height
  </text>
</svg>`;

fs.writeFileSync('assets/header.svg', svgContent);
console.log(`✅ Generated SVG with ${lineCount} lines, ${height}px height`);
