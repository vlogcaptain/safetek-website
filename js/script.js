document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scrolled Animation
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (navToggle && mobileNav && overlay) {
        const toggleMenu = () => {
            navToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        };

        navToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when links are clicked
        const mobileLinks = mobileNav.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 3. Smooth Scrolling for Navigation Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Hero Background Slider
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Crossfade slides every 5 seconds
    }

    // 5. Video Player Play Button Toggle
    const videoThumb = document.querySelector('.video-thumbnail-wrapper');
    const videoIframe = document.getElementById('youtube-iframe');
    
    if (videoThumb && videoIframe) {
        videoThumb.addEventListener('click', () => {
            // Hide thumbnail
            videoThumb.style.display = 'none';
            // Show iframe
            videoIframe.style.display = 'block';
            
            // Add autoplay parameter to trigger video playing automatically
            let src = videoIframe.getAttribute('src');
            if (src && !src.includes('autoplay=1')) {
                src = src.replace('autoplay=0', 'autoplay=1');
                if (!src.includes('autoplay=1')) {
                    src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
                }
                videoIframe.setAttribute('src', src);
            }
        });
    }

    // 6. FAQ Accordion Handler
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question-btn');
        const answer = item.querySelector('.faq-answer');
        
        if (btn && answer) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle active class on current item
                item.classList.toggle('active');
                
                if (!isActive) {
                    // Set height to scrollHeight for smooth transition
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // 7. Navigation Active Link Highlights
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 8. Contact Form Submitting Simulation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Gather input values
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const elevatorNo = contactForm.querySelector('input[name="elevatorNo"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !elevatorNo) {
                alert('필수 입력 항목(이름, 이메일, 승강기 번호)을 채워주세요.');
                return;
            }
            
            // Show premium success feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = 'var(--text-muted)';
            submitBtn.innerHTML = '보내는 중...';
            
            setTimeout(() => {
                alert(`감사합니다, ${name}님! 문의 내용이 정상적으로 접수되었습니다. 담당자가 신속히 연락해 드리겠습니다.`);
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
});
