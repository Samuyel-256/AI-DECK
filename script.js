// Global Variables
let currentView = 'grid';
let currentCategory = 'all';
let isDarkTheme = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Show loading animation
  const loader = document.querySelector('.loader-container');
  
  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00e5ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00e5ff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
  
  // Setup event listeners
  setupEventListeners();
  
  // Hide loader after 2 seconds
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 500);
  }, 2000);
});

// Setup all event listeners
function setupEventListeners() {
  // Login tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (tab === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
      } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
      }
    });
  });
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    filterTools(query, currentCategory);
  });
  
  // Category filters
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = category;
      filterTools(document.getElementById('searchInput').value.toLowerCase(), category);
    });
  });
  
  // View toggle
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = view;
      
      const toolContainer = document.getElementById('toolContainer');
      if (view === 'grid') {
        toolContainer.classList.remove('list-view');
      } else {
        toolContainer.classList.add('list-view');
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const icon = document.querySelector('.password-toggle i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Toggle theme (dark/light)
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-toggle i');
  
  if (isDarkTheme) {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    body.classList.remove('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  
  isDarkTheme = !isDarkTheme;
}

// Login user
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email === 'admin@example.com' && password === 'admin123') {
    // Show loading animation
    const loader = document.querySelector('.loader-container');
    loader.style.display = 'flex';
    loader.classList.remove('hidden');
    
    setTimeout(() => {
      document.querySelector('.login-container').style.display = 'none';
      document.getElementById('mainPage').style.display = 'block';
      
      // Hide loader
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 500);
      
      // Load tools with animation delay
      loadTools();
    }, 1500);
  } else {
    // Show error with shake animation
    const form = document.getElementById('loginForm');
    form.classList.add('shake');
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email or password';
    
    // Remove existing error message if any
    const existingError = form.querySelector('.error-message');
    if (existingError) form.removeChild(existingError);
    
    // Add new error message
    form.appendChild(errorMsg);
    
    // Remove shake animation after it completes
    setTimeout(() => form.classList.remove('shake'), 500);
  }
}

// Show signup message
function showSignupMessage() {
  const form = document.getElementById('signupForm');
  
  // Create success message
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Sign up successful! Please check your email for verification.';
  
  // Remove existing messages if any
  const existingMsg = form.querySelector('.success-message');
  if (existingMsg) form.removeChild(existingMsg);
  
  // Add new success message
  form.appendChild(successMsg);
  
  // Clear form fields
  document.getElementById('fullname').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('confirm-password').value = '';
  
  // Switch back to login tab after 3 seconds
  setTimeout(() => {
    document.querySelector('.tab-btn[data-tab="login"]').click();
  }, 3000);
}

// Logout user
function logout() {
  // Show loading animation
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'flex';
  loader.classList.remove('hidden');
  
  setTimeout(() => {
    document.getElementById('mainPage').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
    
    // Reset form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    // Hide loader
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 500);
  }, 1000);
}

// Load AI tools
function loadTools() {
  const tools = [
    { 
      name: "ChatGPT", 
      category: "chatbot",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", 
      link: "https://chat.openai.com",
      description: "Advanced AI chatbot by OpenAI that can generate human-like text responses and assist with various tasks.",
      rating: 4.9
    },
    { 
      name: "Claude", 
      category: "chatbot",
      image: "https://seeklogo.com/images/A/anthropic-logo-3FBBFEC3BA-seeklogo.com.png", 
      link: "https://claude.ai",
      description: "Anthropic's conversational AI assistant designed to be helpful, harmless, and honest.",
      rating: 4.7
    },
    { 
      name: "MidJourney", 
      category: "image",
      image: "https://seeklogo.com/images/M/midjourney-logo-800E4E0C69-seeklogo.com.png", 
      link: "https://midjourney.com",
      description: "AI art generator that creates stunning images from text descriptions using advanced machine learning.",
      rating: 4.8
    },
    { 
      name: "DALL·E", 
      category: "image",
      image: "https://openai.com/content/images/2022/04/openai-avatar.png", 
      link: "https://openai.com/dall-e",
      description: "OpenAI's image generation model that creates realistic images and art from natural language descriptions.",
      rating: 4.8
    },
    { 
      name: "Canva", 
      category: "image",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Canva_Logo_2021.svg", 
      link: "https://canva.com",
      description: "Design platform with AI features for creating graphics, presentations, posters, and other visual content.",
      rating: 4.7
    },
    { 
      name: "Runway", 
      category: "video",
      image: "https://runwayml.com/static/images/logo.svg", 
      link: "https://runwayml.com",
      description: "Creative toolkit with AI magic tools for video editing, generation, and visual effects.",
      rating: 4.6
    },
    { 
      name: "ElevenLabs", 
      category: "voice",
      image: "https://logowik.com/content/uploads/images/elevenlabs-ai2761.logowik.com.webp", 
      link: "https://elevenlabs.io",
      description: "AI voice generator with the most realistic and versatile AI speech software.",
      rating: 4.7
    },
    { 
      name: "GitHub Copilot", 
      category: "code",
      image: "https://github.githubassets.com/images/modules/site/copilot-logo.png", 
      link: "https://github.com/features/copilot",
      description: "AI pair programmer that helps you write code faster with suggestions based on comments and context.",
      rating: 4.8
    },
    { 
      name: "Replit", 
      category: "code",
      image: "https://replit.com/public/images/logo.svg", 
      link: "https://replit.com",
      description: "Collaborative browser-based IDE with AI coding features to help you code faster.",
      rating: 4.5
    },
    { 
      name: "Notion AI", 
      category: "productivity",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", 
      link: "https://notion.so",
      description: "AI writing assistant integrated with Notion's all-in-one workspace for notes, tasks, and organization.",
      rating: 4.6
    },
    { 
      name: "Gemini", 
      category: "chatbot",
      image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_1.max-1000x1000.png", 
      link: "https://gemini.google.com",
      description: "Google's multimodal AI that can understand and generate text, images, audio, and code.",
      rating: 4.7
    },
    { 
      name: "Grammarly", 
      category: "text",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Grammarly_Logo.png", 
      link: "https://grammarly.com",
      description: "AI writing assistant that helps you write clear, mistake-free text across documents, emails, and messages.",
      rating: 4.7
    },
    { 
      name: "QuillBot", 
      category: "text",
      image: "https://assets.quillbot.com/images/quillbot-brand-logo.svg", 
      link: "https://quillbot.com",
      description: "AI-powered paraphrasing tool that helps you rewrite and enhance any sentence, paragraph, or article.",
      rating: 4.5
    },
    { 
      name: "Copy.ai", 
      category: "text",
      image: "https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/62828bf98ae43a0b64d8c417_favicon-256.png", 
      link: "https://copy.ai",
      description: "AI copywriting tool that generates high-quality copy for marketing, blogs, social media, and more.",
      rating: 4.6
    },
    { 
      name: "Stable Diffusion", 
      category: "image",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Stable_Diffusion_logo.png", 
      link: "https://stability.ai",
      description: "Open-source AI art generator that creates detailed images based on text descriptions.",
      rating: 4.7
    },
    { 
      name: "Synthesia", 
      category: "video",
      image: "https://assets-global.website-files.com/61dc0796f359b6145bc06581/6398a345a613a35e8e8d8a7a_Meta%20Image.png", 
      link: "https://synthesia.io",
      description: "AI video generation platform that creates videos with virtual avatars from text.",
      rating: 4.5
    },
    { 
      name: "Murf.ai", 
      category: "voice",
      image: "https://murf.ai/static/murf-logo-with-name.svg", 
      link: "https://murf.ai",
      description: "AI voice generator that creates studio-quality voiceovers for videos and presentations.",
      rating: 4.6
    },
    { 
      name: "Tabnine", 
      category: "code",
      image: "https://www.tabnine.com/favicon.ico", 
      link: "https://tabnine.com",
      description: "AI code completion tool that helps developers write code faster with whole-line and full-function completions.",
      rating: 4.5
    },
    { 
      name: "Tome", 
      category: "productivity",
      image: "https://tome.app/images/favicon.ico", 
      link: "https://tome.app",
      description: "AI-powered storytelling format that generates presentations with a single prompt.",
      rating: 4.4
    },
    { 
      name: "ClickUp", 
      category: "productivity",
      image: "https://clickup.com/landing/images/clickup-logo.svg", 
      link: "https://clickup.com",
      description: "Productivity platform with AI features for task management, docs, goals, and projects.",
      rating: 4.5
    },
    { 
      name: "Jasper", 
      category: "text",
      image: "https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b86c02fc30e5f_Favicon%20256.png", 
      link: "https://jasper.ai",
      description: "AI content creation platform that helps teams create marketing copy, social media posts, and blog content.",
      rating: 4.6
    },
    { 
      name: "Descript", 
      category: "video",
      image: "https://assets-global.website-files.com/5d761d627a6dfa6a5b28ab12/5e9f94da97f7d95f3c1d18cd_favicon-256.png", 
      link: "https://descript.com",
      description: "All-in-one audio and video editing software with AI tools like Overdub for voice cloning.",
      rating: 4.7
    },
    { 
      name: "Perplexity", 
      category: "chatbot",
      image: "https://www.perplexity.ai/favicon.ico", 
      link: "https://perplexity.ai",
      description: "AI-powered search engine that provides answers to complex questions with cited sources.",
      rating: 4.5
    },
    { 
      name: "Otter.ai", 
      category: "voice",
      image: "https://assets.otter.ai/img/otter-favicon.svg", 
      link: "https://otter.ai",
      description: "AI meeting assistant that records, transcribes, and summarizes meetings in real-time.",
      rating: 4.6
    }
  ];

  const container = document.getElementById('toolContainer');
  
  // Clear container
  container.innerHTML = '';
  
  // Filter tools by category if needed
  const filteredTools = currentCategory === 'all' ? 
    tools : 
    tools.filter(tool => tool.category === currentCategory);
  
  // Create tool cards with delay for animation
  filteredTools.forEach((tool, index) => {
    setTimeout(() => {
      const toolCard = document.createElement('div');
      toolCard.className = 'tool-card';
      toolCard.setAttribute('data-category', tool.category);
      
      // Create card content based on view type
      if (currentView === 'grid') {
        toolCard.innerHTML = `
          <div class="tool-card-header">
            <img src="${tool.image}" alt="${tool.name}">
            <div class="tool-card-title">
              <h3>${tool.name}</h3>
              <span class="tool-card-category">${tool.category}</span>
            </div>
          </div>
          <div class="tool-card-body">
            <p>${tool.description}</p>
          </div>
          <div class="tool-card-footer">
            <a href="${tool.link}" class="tool-card-link" target="_blank">Visit Tool <i class="fas fa-external-link-alt"></i></a>
            <div class="tool-card-rating">
              ${getStarRating(tool.rating)}
              <span>${tool.rating.toFixed(1)}</span>
            </div>
          </div>
        `;
      } else {
        toolCard.innerHTML = `
          <div class="tool-card-header">
            <img src="${tool.image}" alt="${tool.name}">
            <div class="tool-card-title">
              <h3>${tool.name}</h3>
              <span class="tool-card-category">${tool.category}</span>
            </div>
          </div>
          <div class="tool-card-body">
            <p>${tool.description}</p>
          </div>
          <div class="tool-card-footer">
            <a href="${tool.link}" class="tool-card-link" target="_blank">Visit Tool <i class="fas fa-external-link-alt"></i></a>
            <div class="tool-card-rating">
              ${getStarRating(tool.rating)}
              <span>${tool.rating.toFixed(1)}</span>
            </div>
          </div>
        `;
      }
      
      container.appendChild(toolCard);
    }, index * 100); // Staggered animation
  });
}

// Generate star rating HTML
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Filter tools by search query and category
function filterTools(query, category) {
  const cards = document.querySelectorAll('.tool-card');
  
  cards.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    const cardCategory = card.getAttribute('data-category');
    const matchesSearch = name.includes(query);
    const matchesCategory = category === 'all' || cardCategory === category;
    
    if (matchesSearch && matchesCategory) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
