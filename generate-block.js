const fs = require('fs');

const svgContent = `
<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Dark theme colors for the blocks */
    .top { fill: #2d2d2d; }
    .left { fill: #1f1f1f; }
    .right { fill: #141414; }
    
    /* Neon accent colors for the main block */
    .main-top { fill: #8a2be2; }
    .main-left { fill: #6a1b9a; }
    .main-right { fill: #4a148c; }
    
    /* Font styling for your text placeholder */
    .text-overlay { 
      font-family: 'Courier New', monospace; 
      fill: #00ffcc; 
      font-size: 20px; 
      font-weight: bold; 
      text-shadow: 0px 0px 5px rgba(0,255,204,0.5);
    }

    /* CSS "Physics" Animation: Floating effect */
    .float-1 { animation: float 4s ease-in-out infinite; }
    .float-2 { animation: float 5s ease-in-out infinite 1s; }
    .float-3 { animation: float 3s ease-in-out infinite 0.5s; }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
  </style>

  <rect width="100%" height="100%" fill="#0d1117" />

  <g class="float-2" transform="translate(150, 150)">
    <polygon points="50,0 100,25 50,50 0,25" class="top" />
    <polygon points="0,25 50,50 50,150 0,125" class="left" />
    <polygon points="50,50 100,25 100,125 50,150" class="right" />
  </g>

  <g class="float-1" transform="translate(300, 180)">
    <polygon points="100,0 200,50 100,100 0,50" class="main-top" />
    <polygon points="0,50 100,100 100,200 0,150" class="main-left" />
    <polygon points="100,100 200,50 200,150 100,200" class="main-right" />
    
    <text x="15" y="130" transform="skewY(26.5)" class="text-overlay">SAHIL_SHEIKH</text>
    <text x="15" y="160" transform="skewY(26.5)" class="text-overlay" fill="#ffffff" font-size="14px">STATUS: ONLINE</text>
  </g>
  
  <g class="float-3" transform="translate(550, 100)">
    <polygon points="50,0 100,25 50,50 0,25" class="top" />
    <polygon points="0,25 50,50 50,100 0,75" class="left" />
    <polygon points="50,50 100,25 100,75 50,100" class="right" />
  </g>
</svg>
`;

fs.writeFileSync('city-blocks.svg', svgContent);
console.log('3D City Blocks SVG generated successfully!');
