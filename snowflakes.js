// Canvas setup
const canvas = document.getElementById('snowflakes');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Snowflake class
class Snowflake {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 3 + 2; // Size between 2-5
        this.speed = Math.random() * 0.5 + 0.3; // Slow falling speed
        this.drift = Math.random() * 0.5 - 0.25; // Horizontal drift
        this.opacity = Math.random() * 0.6 + 0.4; // Opacity between 0.4-1
    }
    
    update() {
        this.y += this.speed;
        this.x += this.drift;
        
        // Reset snowflake when it falls off screen
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
        
        // Keep snowflakes within horizontal bounds
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#FFD700'; // Golden color
        
        // Draw a more detailed golden snowflake
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow effect
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Create snowflakes
const snowflakes = [];
const numberOfSnowflakes = 100;

for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push(new Snowflake());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });
    
    requestAnimationFrame(animate);
}

// Start animation
animate();
