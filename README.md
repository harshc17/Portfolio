# Harsh Chandak — Portfolio Website

A premium, high-performance personal portfolio website designed for software engineers and full-stack developers. Built with a focus on immersive 3D interactions, cinematic aesthetics, and buttery-smooth animations.

![Portfolio Preview](./preview.png)

## 🚀 Key Features

- **Premium Cinematic Theme**: Deep charcoal & slate palette with refined blue accents and glassmorphism.
- **Immersive 3D Experience**: Custom Three.js particle system with constellation lines and floating geometric shapes.
- **Advanced Animations**: GSAP ScrollTrigger for motion blur reveals, magnetic buttons, and parallax effects.
- **Interactive UI**: Custom cursor with scale effects, hover-glow cards, and 3D tilt interactions.
- **Performance Optimized**: Vanilla JS with no heavy framework overhead, optimized assets, and responsive layout.
- **Fully Responsive**: Flawless experience across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3 (Modern Variables & Flexbox/Grid), JavaScript (ES6+)
- **3D Graphics**: [Three.js](https://threejs.org/) (WebGL)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/) + ScrollTrigger
- **Interactions**: [Vanilla-Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
- **Icons**: SVG Icons (Feather/Lucide style)
- **Form Handling**: [Formspree](https://formspree.io/)

## 📂 Project Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling (Theme tokens, Layout, Animations)
├── script.js           # Logic (Three.js scene, GSAP animations, Interactions)
└── profile-photo.jpg   # (Optional) User profile image
```

## ⚡ Quick Start

1. **Clone the repository** (or download files):
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. **Open in VS Code**:
   ```bash
   code portfolio
   ```

3. **Run with Live Server**:
   - Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
   - Right-click `index.html` → "Open with Live Server".

## 🎨 Customization

### 1. Update Content
Edit `index.html` to change your name, projects, and bio. The structure is semantically organized by sections:
- `<!-- ===== HERO ===== -->`
- `<!-- ===== ABOUT ===== -->`
- `<!-- ===== PROJECTS ===== -->`

### 2. Configure Contact Form
The contact form uses **Formspree**. To make it work:
1. Go to [formspree.io](https://formspree.io/) and create a free form.
2. Update the `action` attribute in `index.html` (line ~611):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 3. Adjust Theme
Open `styles.css` and modify the CSS variables at the top to change the color scheme:
```css
:root {
    --bg-primary: #0f1117;   /* Main background */
    --accent: #3b82f6;       /* Main accent color */
    /* ... */
}
```

## 📄 License
This project is open source and available under the [MIT License](LICENSE). Feel free to use it as a template for your own portfolio!

---
*Designed & Developed by Harsh Chandak*
