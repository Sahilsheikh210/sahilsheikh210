![Dynamic Header](assets/header.svg)

&lt;!-- Pretext-powered dynamic content sections --&gt;
&lt;div align="center"&gt;

### 📊 Currently Coding In...
&lt;!-- This could be dynamically updated via Pretext layout --&gt;
![Python](https://img.shields.io/badge/Python-★★★★☆-3776AB?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-★★★★★-3178C6?style=for-the-badge)
![Rust](https://img.shields.io/badge/Rust-★★★☆☆-000000?style=for-the-badge)

&lt;/div&gt;

&lt;!-- Pretext allows us to create perfect multi-column layouts --&gt;
## 🌍 Multilingual Support
Pretext handles complex text perfectly:

&lt;div align="center"&gt;

**English** • **中文** • **العربية** • **日本語** • **한국어** • **Ελληνικά** • **עברית**

&lt;/div&gt;

## 🎯 Unique Features This Setup Enables

1. **Perfect Typography**: Pretext measures text without DOM reflow
2. **Dynamic Updates**: README updates automatically via GitHub Actions
3. **Responsive Layouts**: Text wraps perfectly at any width
4. **Multi-language**: Proper handling of CJK, RTL, and mixed scripts
5. **Animations**: SVG-based animations that work in GitHub

## 🔧 Advanced: Dynamic Stats Layout

You can extend the script to fetch your GitHub stats and lay them out precisely:

```javascript
// Add to generate-svg.js
const stats = [
  { label: 'Repositories', value: 42 },
  { label: 'Stars Earned', value: 1337 },
  { label: 'Commits', value: 5000 }
];

// Use Pretext to calculate perfect positioning
const statText = stats.map(s =&gt; `${s.label}: ${s.value}`).join('  •  ');
const statsPrepared = prepareWithSegments(statText, 'bold 16px monospace', {});
// ... layout and render as SVG
