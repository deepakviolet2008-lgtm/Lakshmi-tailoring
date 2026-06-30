gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  
  const tracks = document.querySelectorAll('.scissors-track');
  tracks.forEach(track => {
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent + originalContent;
  });

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el, i) => {
    gsap.fromTo(el, 
      {
        opacity: 0,
        y: 50,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none" 
        }
      }
    );
  });

  gsap.utils.toArray(".full-image img, .split img, .gallery img").forEach(img => {
    gsap.to(img, {
      y: -30, 
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
});



// --- PART 5: ADMISSION FORM TO GOOGLE SHEETS ---
const admissionForm = document.getElementById('admissionForm');
const admissionSuccess = document.getElementById('admissionSuccess');
const phoneInput = document.getElementById('applicantPhone');
const phoneError = document.getElementById('phoneError');

// PASTE YOUR COPIED GOOGLE WEB APP URL HERE:
const GOOGLE_APP_URL = "https://script.google.com/macros/s/AKfycbxxPdJWBQVNuEQeUnJe99nFPERYh0ks7h7u5aDei4q_TS0NqwJISVTVOLAbt_i1HTA/exec";

if (admissionForm) {
  admissionForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('applicantName').value.trim();
    const district = document.getElementById('applicantDistrict').value.trim();
    const phone = phoneInput.value.trim();

    // 10-digit phone regex validation rule pattern
    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
      phoneError.style.display = 'block';
      phoneInput.style.borderColor = '#ff4d4d';
      return;
    }

    phoneError.style.display = 'none';
    phoneInput.style.borderColor = 'rgba(212, 175, 55, 0.3)';

    // Package the payload object data matches your Apps Script variables
    const formData = {
      name: name,
      district: district,
      phone: phone
    };

    // Change the submit button text state visually to show processing
    const submitBtn = admissionForm.querySelector('.submit-admission-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting... ⏳";
    submitBtn.disabled = true;

    // Send the data package asynchronously to Google Sheets via AJAX Fetch API
    fetch(GOOGLE_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Bypasses cross-origin restrictions cleanly
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      // Handle success state UI alterations smoothly
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      admissionForm.reset();
      admissionSuccess.style.display = 'block';
      admissionSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })
    .catch(error => {
      console.error('Submission Error:', error);
      alert('Something went wrong. Please check your internet connection or try again.');
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    });
  });
}




gsap.utils.toArray(".full-image img, .split img, .gallery img").forEach(img => {
  
  gsap.to(img, {
    y: -30, 
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });

  img.addEventListener("mouseenter", () => {
    gsap.to(img, {
      y: "-=5", 
      borderColor: "#d4af37",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto" 
    });
  });

  img.addEventListener("mouseleave", () => {
    gsap.to(img, {
      y: "+=5", 
      borderColor: "rgba(212, 175, 55, 0.15)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  });
});


const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSelector = button.getAttribute('data-target');
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      const header = document.querySelector('.main-header');
      const headerHeight = header ? header.offsetHeight : 0;

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      
      const offsetPosition = elementPosition - headerHeight - 10; 

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});


  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slides = document.querySelectorAll('.carousel-slide');
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    const offset = currentIndex * -100;
    track.style.transform = `translate3d(${offset}%, 0px, 0px)`;
  }

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; 
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalSlides - 1;
      }
      updateCarousel();
    });
  }