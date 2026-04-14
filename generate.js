const fs = require('fs');

// We use an SVG because GitHub allows them to be animated via CSS
const svgContent = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <style>
    .orb {
      fill: #8a2be2; /* Purple plasma color */
      transform-origin: center;
      animation: pulse 3s infinite alternate ease-in-out;
    }
    @keyframes pulse {
      0% { transform: scale(0.85); opacity: 0.7; }
      100% { transform: scale(1.15); opacity: 1; }
    }
  </style>
  <rect width="400" height="400" fill="#000000" />
  <circle class="orb" cx="200" cy="200" r="100" filter="url(#glow)" />
</svg>
`;

fs.writeFileSync('plasma-orb.svg', svgContent);
console.log('Orb SVG generated successfully!');
