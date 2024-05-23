import gsap from 'gsap';

// Utility function to create and animate the shooting star
export function createShootingStar() {

    console.log("animating...");
    // Create shooting star element
    const shootingStar = document.createElement('div');
    shootingStar.id = 'shooting-star';
    shootingStar.style.position = 'absolute';
    shootingStar.style.width = '45px';
    shootingStar.style.height = '45px';
    shootingStar.style.borderRadius = '100%';
    shootingStar.style.backgroundColor = 'white';
    document.body.appendChild(shootingStar);

    // Set initial position of the shooting star
    gsap.set(shootingStar, { x: -20, y: 20 });

    // Animate the shooting star
    gsap.to(shootingStar, {
        x: window.innerWidth + 20,
        y: -200,
        rotation: 160,
        duration: 2,
        ease: 'power3.inOut',
        onComplete: () => {
            // Remove shooting star element from DOM after animation completes
            shootingStar.remove();
        }
    });
}
