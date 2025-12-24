// Snowflake animation using canvas
const canvas = document.getElementById('snowflakeCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
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
        this.y = -10;
        this.radius = Math.random() * 3 + 2; // Size between 2-5
        this.speed = Math.random() * 1 + 0.5; // Fall speed
        this.drift = Math.random() * 0.5 - 0.25; // Horizontal drift
        this.opacity = Math.random() * 0.6 + 0.4; // Opacity between 0.4-1
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;

        // Reset snowflake if it goes off screen
        if (this.y > canvas.height) {
            this.reset();
        }

        // Wrap around horizontally
        if (this.x > canvas.width + 10) {
            this.x = -10;
        } else if (this.x < -10) {
            this.x = canvas.width + 10;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create golden gradient for snowflake
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, '#FFD700'); // Golden
        gradient.addColorStop(0.5, '#FFA500'); // Orange-gold
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)'); // Transparent gold
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkle effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Create snowflakes array
const snowflakes = [];
const numberOfSnowflakes = 100;

for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = new Snowflake();
    snowflake.y = Math.random() * canvas.height; // Spread initial positions
    snowflakes.push(snowflake);
}

// Animation loop
function animate() {
    // Clear canvas with slight fade effect for trailing
    ctx.fillStyle = 'rgba(139, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each snowflake
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();
