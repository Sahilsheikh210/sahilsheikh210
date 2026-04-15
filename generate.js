const fs = require('fs');
const path = require('path');

let ASSETS_DIR = path.join(__dirname, 'flappy-bird-assets-master', 'sprites');

// If the folder is nested (common with github downloads)
if (!fs.existsSync(ASSETS_DIR)) {
    ASSETS_DIR = path.join(__dirname, 'flappy-bird-assets-master', 'flappy-bird-assets-master', 'sprites');
}

console.log(`Using assets from: ${ASSETS_DIR}`);

// Convert an image file to a base64 Data URI
function getBase64Image(filename) {
    const filePath = path.join(ASSETS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`CRITICAL ERROR: Could not find ${filename} at ${filePath}`);
    }
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
}

// Read needed assets
const bgDay = getBase64Image('background-day.png');
const base = getBase64Image('base.png');
const pipeGreen = getBase64Image('pipe-green.png');

// The pipe assets face upwards by default. For the top pipe, we can rotate it by 180deg in SVG or rely on it
const birdMid = getBase64Image('redbird-midflap.png');
const birdDown = getBase64Image('redbird-downflap.png');
const birdUp = getBase64Image('redbird-upflap.png');

// Parameters for SVG
const SVG_WIDTH = 288;
const SVG_HEIGHT = 512;
const BASE_HEIGHT = 112;

function generateSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" width="${SVG_WIDTH}" height="${SVG_HEIGHT}">
    <defs>
        <!-- CSS Animations -->
        <style>
            @keyframes animateBg {
                0% { transform: translateX(0); }
                100% { transform: translateX(-288px); }
            }
            @keyframes animateBase {
                0% { transform: translateX(0); }
                100% { transform: translateX(-48px); /* 336 - 288 = 48 */ }
            }
            @keyframes animatePipes {
                0% { transform: translateX(288px); }
                100% { transform: translateX(-60px); }
            }
            @keyframes fly {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(15px) rotate(5deg); }
            }
            @keyframes flap {
                0%, 100% { opacity: 1; }
                33% { opacity: 0; }
                66% { opacity: 0; }
            }
            @keyframes flapDown {
                0%, 100% { opacity: 0; }
                33% { opacity: 1; }
                66% { opacity: 0; }
            }
            @keyframes flapUp {
                0%, 100% { opacity: 0; }
                33% { opacity: 0; }
                66% { opacity: 1; }
            }

            .scrolling-bg { animation: animateBg 15s linear infinite; }
            .scrolling-base { animation: animateBase 1.5s linear infinite; }
            
            /* Layer 1 pipes (distance) */
            .pipes-1 { animation: animatePipes 6s linear infinite; }
            .pipes-2 { animation: animatePipes 6s linear infinite; animation-delay: -2s; }
            .pipes-3 { animation: animatePipes 6s linear infinite; animation-delay: -4s; }
            
            .bird-container { animation: fly 1.2s ease-in-out infinite; transform-origin: center; }
            .bird { position: absolute; }
            .bird-mid { animation: flap 0.3s steps(1) infinite; }
            .bird-down { animation: flapDown 0.3s steps(1) infinite; }
            .bird-up { animation: flapUp 0.3s steps(1) infinite; }
        </style>
    </defs>

    <!-- Backgrounds. We need two side-by-side to loop smoothly -->
    <g class="scrolling-bg">
        <image href="${bgDay}" x="0" y="0" width="288" height="512" />
        <image href="${bgDay}" x="288" y="0" width="288" height="512" />
        <image href="${bgDay}" x="576" y="0" width="288" height="512" />
    </g>

    <!-- Moving Pipes Layer -->
    <!-- Pipe 1 -->
    <g class="pipes-1">
        <!-- Top Pipe (Rotated 180deg) -->
        <image href="${pipeGreen}" x="0" y="-150" width="52" height="320" transform="rotate(180, 26, 10)" />
        <!-- Bottom Pipe -->
        <image href="${pipeGreen}" x="0" y="270" width="52" height="320" />
    </g>

    <!-- Pipe 2 -->
    <g class="pipes-2">
        <!-- Top Pipe -->
        <image href="${pipeGreen}" x="0" y="-100" width="52" height="320" transform="rotate(180, 26, 60)" />
        <!-- Bottom Pipe -->
        <image href="${pipeGreen}" x="0" y="320" width="52" height="320" />
    </g>

    <!-- Pipe 3 -->
    <g class="pipes-3">
        <!-- Top Pipe -->
        <image href="${pipeGreen}" x="0" y="-200" width="52" height="320" transform="rotate(180, 26, -40)" />
        <!-- Bottom Pipe -->
        <image href="${pipeGreen}" x="0" y="220" width="52" height="320" />
    </g>

    <!-- Base / Ground -->
    <!-- We need enough base to loop smoothly -->
    <g transform="translate(0, ${SVG_HEIGHT - BASE_HEIGHT})">
        <g class="scrolling-base">
            <image href="${base}" x="0" y="0" width="336" height="112" />
            <image href="${base}" x="336" y="0" width="336" height="112" />
        </g>
    </g>

    <!-- Bird Animation -->
    <g class="bird-container" transform="translate(100, 220)">
        <image href="${birdMid}" x="0" y="0" width="34" height="24" class="bird-mid" />
        <image href="${birdDown}" x="0" y="0" width="34" height="24" class="bird-down" />
        <image href="${birdUp}" x="0" y="0" width="34" height="24" class="bird-up" />
    </g>

</svg>`;
}

const svgContent = generateSVG();
const outputPath = path.join(__dirname, 'flappy-bird.svg');

fs.writeFileSync(outputPath, svgContent);
console.log(`Generated SVG animated banner at ${outputPath}`);
