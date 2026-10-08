# 🎂 Birthday Surprise Website for Tariro 💖

A beautiful, animated birthday surprise website with girly colors and cool animations!

## Features

- ✨ **Confetti Rain** - Continuous colorful confetti falling from the sky
- 🎉 **Celebrate Button** - Click to trigger a celebration burst!
- 💖 **Floating Hearts** - Hearts floating up from the bottom
- 🌸 **Girly Color Scheme** - Pinks, purples, and pastels
- 🎀 **Smooth Animations** - Bouncing, pulsing, and shimmering effects
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⌨️ **Keyboard Support** - Press Space to celebrate!
- 👸 **Photo Display** - Circular photo with glowing border animation

## How to Use

1. **Add Tariro's photo**: Place a photo named `tariro.jpg` in the same folder as `index.html`
2. Open `index.html` in your web browser
3. Click the "Click to Celebrate! 🎉" button for a special animation
4. Enjoy the confetti, hearts, and sparkles!

## Adding the Photo

The website looks for a photo file named `tariro.jpg` in the same directory. To add Tariro's photo:

1. Rename your photo to `tariro.jpg` (or .png)
2. Place it in the `birthday-surprise` folder next to `index.html`
3. Refresh the page to see the photo appear

The photo will display as:
- A circular image with a pink glowing border
- Floating animation effect
- If no photo is found, a princess emoji placeholder appears

## Customization

### Change the Name

Edit the name in `index.html`:
- Line 6: Page title
- Line 7: Meta description
- Line 40: "Tariro Madiri 💖"
- Line 44: Subtitle message

### Change the Birthday Message

Edit the text in `index.html`:
- Update the card title (line 49)
- Modify the card message (lines 50-53)
- Change the birthday wishes (lines 63-67)

### Change Colors

Edit the CSS variables in `style.css`:
```css
:root {
  --pink-light: #ffb6c1;
  --pink-medium: #ff69b4;
  --pink-dark: #ff1493;
  /* ... more colors */
}
```

### Adjust Animations

Modify animation durations and effects in `style.css` or `script.js`.

## Mobile Responsiveness

The website is fully responsive with breakpoints for:
- **Desktop** (> 768px) - Full layout with grid
- **Tablet** (481px - 768px) - Single column, adjusted spacing
- **Mobile** (< 480px) - Optimized for small screens with smaller fonts and touch-friendly buttons

## Tech Stack

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (no frameworks needed)

## Deployment

You can deploy this anywhere that hosts static sites:
- GitHub Pages
- Netlify
- Vercel
- Or simply open the HTML file directly in a browser!

Made with 💖 for Tariro Madiri!
