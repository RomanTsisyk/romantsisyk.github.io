// Image loader with fallback
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src*="mercedes-adapter"]');
    
    images.forEach(img => {
        // Create a placeholder while loading
        img.style.backgroundColor = '#1a1a2e';
        img.style.minHeight = '200px';
        
        // Handle loading errors
        img.onerror = function() {
            console.error('Failed to load image:', this.src);
            // Create a placeholder div
            const placeholder = document.createElement('div');
            placeholder.style.width = this.width ? this.width + 'px' : '100%';
            placeholder.style.height = this.height ? this.height + 'px' : '400px';
            placeholder.style.backgroundColor = '#1a1a2e';
            placeholder.style.borderRadius = '20px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#666';
            placeholder.style.fontSize = '14px';
            placeholder.innerHTML = `
                <div style="text-align: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p style="margin-top: 10px;">Mercedes Adapter</p>
                </div>
            `;
            this.parentNode.replaceChild(placeholder, this);
        };
        
        // Handle successful loading
        img.onload = function() {
            this.style.backgroundColor = 'transparent';
            this.style.minHeight = 'auto';
        };
    });
});
