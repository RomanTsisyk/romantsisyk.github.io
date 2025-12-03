# 📱 Float Navigation Panel - Documentation

## ✨ Description
An elegant floating navigation panel for quick switching between portfolio projects. Located in the bottom-right corner with a beautiful animated float button. The panel is **open by default** on first visit to help users understand navigation options.

## 🎯 Key Features

### Visual Features:
- 🎨 Float button with gradient and pulse animation
- ✨ Smooth panel slide animation
- 🔄 Hover effects on all items
- 📱 Fully responsive design
- 🌟 Current project highlighting with "CURRENT" badge
- 💫 Open by default for better discoverability

### Functionality:
- **Keyboard Navigation:**
  - Press `N` to toggle the panel open/closed
  - Press `Escape` to close the panel
- **Memory:** Remembers user's panel state preference (open/closed)
- **Icons:** Each project has a unique icon for quick visual identification
- **Tooltips:** Hover over button to see "Switch Projects" tooltip

## 📦 Installation

### 1. For a new project page:

Copy content from `shared/project-navigation-template.html` and add:

1. **Styles** in `<head>` before `</head>`
2. **HTML** right after `<body>`
3. **JavaScript** at the beginning of your `<script>` block

### 2. Configure for your specific project:

Change the current project on your page:

```html
<!-- Instead of a link to your project -->
<a href="../your-project/index.html" class="project-nav-item">
    
<!-- Make it "current" -->
<div class="project-nav-item current">
    <span class="icon">📱</span>
    <span class="text">
        <span class="name">Your Project</span>
        <span class="desc">Your Description</span>
    </span>
    <span class="current-indicator">CURRENT</span>
</div>
```

## 🗂️ Project List

| Project | Icon | Path | Description |
|---------|------|------|-------------|
| Main Portfolio | 🏠 | `/index.html` | Portfolio homepage |
| HP Poly Lens | 🎧 | `/poly lens portfolio/` | Enterprise Headset Management |
| Kasa Stefczyka | 💳 | `/portfolio kasa stefczyka/` | Banking Application |
| Earnly | 💰 | `/earnly portfolio/` | Financial Management |
| FollowMyMoney | 📊 | `/followmymoney-portfolio/` | Expense Tracking |
| Fels | 🏢 | `/portfolio fels/` | Business Solutions |
| Adapter | 🔌 | `/portfolio adapter/` | Integration Platform |
| Netti Demo | 📱 | `/netti portfolio-demo/` | App Portfolio Demo |

## 🎨 Customization

### Change Colors:
```css
.project-nav-button {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

.project-nav-item:hover {
    background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.2);
}
```

### Change Position:
```css
.project-nav-float {
    bottom: 30px;  /* Distance from bottom */
    right: 30px;   /* Distance from right */
    /* or left: 30px; for left positioning */
}
```

### Add New Project:
```html
<a href="../new-project/index.html" class="project-nav-item">
    <span class="icon">🚀</span>
    <span class="text">
        <span class="name">New Project</span>
        <span class="desc">Project Description</span>
    </span>
</a>
```

## 🔧 Technical Details

### CSS Classes:
- `.project-nav-float` - Main container
- `.project-nav-button` - Float button
- `.project-nav-panel` - Navigation panel
- `.project-nav-panel.hidden` - Hidden state
- `.project-nav-item` - Menu item
- `.project-nav-item.current` - Current project
- `.project-nav-item.home` - Home link
- `.current-indicator` - "CURRENT" badge

### JavaScript Functions:
- `toggleProjectNav()` - Opens/closes panel
- `localStorage` - Saves user preference
- Event listeners for keyboard and clicks

### Z-index Hierarchy:
```css
.project-nav-float: 10000  /* Always on top */
```

## 📱 Mobile Adaptation

On screens smaller than 768px:
- Reduced distance from edges (20px)
- Smaller button size (56px)
- Adjusted panel positioning

## ⚡ Performance

- CSS animations instead of JavaScript
- Backdrop filter for blur effect (GPU accelerated)
- localStorage for state persistence
- Minimal DOM manipulation

## 🐛 Troubleshooting

### Panel not opening:
1. Check if `toggleProjectNav()` function is added
2. Check console for JavaScript errors
3. Verify localStorage is not blocked

### Styles not applying:
1. Ensure styles are added before your custom styles
2. Check for conflicts with existing CSS classes

### Wrong links:
1. Check paths to project folders
2. Ensure all `index.html` files exist

### Panel state not remembered:
1. Check if localStorage is enabled in browser
2. Clear localStorage if needed: `localStorage.clear()`

## 💡 Tips

- **First Visit:** Panel opens automatically to show navigation options
- **Keyboard Shortcut:** Press `N` for quick toggle
- **User Preference:** Panel remembers if you prefer it open or closed
- **Smooth Animation:** All transitions are optimized for 60fps

## 📄 Version

**Version:** 2.0.0  
**Created:** January 2024  
**Type:** Float Navigation Panel

---

💡 **Pro Tip:** Press `N` on any project page to quickly toggle the navigation panel!