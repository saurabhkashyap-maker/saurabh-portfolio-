// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
});

// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['AI Developer', 'Python Developer', 'Web App Builder', 'Automation Expert'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay);
    }
}

setTimeout(type, newTextDelay);

// Animated Counters
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetNumber = parseInt(target.getAttribute('data-target'));
            let currentNumber = 0;
            const increment = targetNumber / 50;
            
            const updateCounter = () => {
                if (currentNumber < targetNumber) {
                    currentNumber += increment;
                    target.textContent = Math.ceil(currentNumber);
                    requestAnimationFrame(updateCounter);
                } else {
                    target.textContent = targetNumber;
                }
            };
            
            updateCounter();
            observer.unobserve(target);
        }
    });
}, observerOptions);

statNumbers.forEach(number => observer.observe(number));

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// AI Chat Widget
const aiWidgetButton = document.getElementById('aiWidgetButton');
const aiChatBox = document.getElementById('aiChatBox');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

aiWidgetButton.addEventListener('click', () => {
    aiChatBox.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    aiChatBox.classList.remove('active');
});

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Simulate AI response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        
        // Simple response logic
        if (message.toLowerCase().includes('python')) {
            botMessage.textContent = "Saurabh is excellent at Python! He's built voice assistants and automation scripts with it.";
        } else if (message.toLowerCase().includes('project')) {
            botMessage.textContent = "He has 6+ projects including Jarvis AI, VidyaSetu website, and a code editor!";
        } else if (message.toLowerCase().includes('contact')) {
            botMessage.textContent = "You can reach him at saurabhjha.dev@gmail.com";
        } else if (message.toLowerCase().includes('website builder')) {
            botMessage.textContent = "Check out the AI Website Builder section! You can generate custom websites there.";
        } else {
            botMessage.textContent = "Saurabh is a skilled AI & Python developer. Check out his projects!";
        }
        
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Jarvis Mic Demo
const micButton = document.getElementById('micButton');
const micResponse = document.getElementById('micResponse');
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isListening = true;
        micButton.classList.add('listening');
        micResponse.textContent = 'Listening...';
    };

    recognition.onend = () => {
        isListening = false;
        micButton.classList.remove('listening');
        if (micResponse.textContent === 'Listening...') {
            micResponse.textContent = 'Click the mic and say something';
        }
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        // Simulate Jarvis responses
        if (transcript.includes('hello') || transcript.includes('hi')) {
            micResponse.textContent = 'Jarvis: Hello! How can I assist you today?';
        } else if (transcript.includes('weather')) {
            micResponse.textContent = 'Jarvis: The weather is sunny with a chance of code!';
        } else if (transcript.includes('what can you do')) {
            micResponse.textContent = 'Jarvis: I can open apps, tell weather, play music, and more!';
        } else if (transcript.includes('website')) {
            micResponse.textContent = 'Jarvis: You should try the AI Website Builder section!';
        } else {
            micResponse.textContent = `Jarvis: You said: "${transcript}" - Try asking about the AI Builder!`;
        }
    };

    micButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
} else {
    micButton.style.opacity = '0.5';
    micButton.title = 'Speech recognition not supported in this browser';
    micResponse.textContent = 'Speech recognition not supported. Try Chrome or Edge.';
}

// VidyaSetu Chatbot Demo
const demoChatInput = document.getElementById('demoChatInput');
const sendDemoMessage = document.getElementById('sendDemoMessage');
const demoChatMessages = document.getElementById('demoChatMessages');

function addDemoMessage(message, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    msgDiv.textContent = message;
    demoChatMessages.appendChild(msgDiv);
    demoChatMessages.scrollTop = demoChatMessages.scrollHeight;
}

sendDemoMessage.addEventListener('click', () => {
    const message = demoChatInput.value.trim();
    if (message === '') return;

    addDemoMessage(message, true);
    demoChatInput.value = '';

    // Simulate chatbot response
    setTimeout(() => {
        let response = '';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('course') || lowerMessage.includes('subject')) {
            response = 'We offer courses in Mathematics, Science, and Programming!';
        } else if (lowerMessage.includes('fee') || lowerMessage.includes('price')) {
            response = 'Our fees start at just ₹999/month for all subjects.';
        } else if (lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
            response = 'Classes are available from 4 PM to 8 PM, Monday to Friday.';
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = 'Hello! Welcome to VidyaSetu. How can I help you today?';
        } else {
            response = 'Thanks for your message. Our team will contact you soon!';
        }
        
        addDemoMessage(response);
    }, 500);
});

demoChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendDemoMessage.click();
});

// Code Editor Demo
const fixCodeBtn = document.getElementById('fixCodeBtn');
const codeInput = document.getElementById('codeInput');
const fixedCode = document.getElementById('fixedCode');

fixCodeBtn.addEventListener('click', () => {
    const code = codeInput.value;
    let fixed = '';
    
    // Simple "AI" code fixes
    if (code.includes('console.log')) {
        fixed = '✓ Code looks good! Adding semicolon: ' + code + ';';
    } else if (code.includes('function') && !code.includes('{')) {
        fixed = 'Missing curly braces! Try: function myFunction() { // code }';
    } else if (code.includes('if') && !code.includes('==') && !code.includes('===')) {
        fixed = 'Use === for comparison instead of =';
    } else {
        fixed = 'AI Suggestion: Try the AI Website Builder to generate complete websites!';
    }
    
    fixedCode.textContent = fixed;
});

// AI Website Builder
const generateBtn = document.getElementById('generateWebsite');
const websiteType = document.getElementById('websiteType');
const colorTheme = document.getElementById('colorTheme');
const requirements = document.getElementById('requirements');
const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const codeTabs = document.querySelectorAll('.code-tab');
const codePanels = document.querySelectorAll('.code-panel');
const copyBtn = document.getElementById('copyCode');
const previewBtn = document.getElementById('previewCode');
const livePreview = document.getElementById('livePreview');
const closePreview = document.getElementById('closePreview');
const previewFrame = document.getElementById('previewFrame');

// Tab switching
codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        codeTabs.forEach(t => t.classList.remove('active'));
        codePanels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        const tabName = tab.getAttribute('data-tab');
        document.getElementById(`${tabName}Panel`).classList.add('active');
    });
});

// Generate website code
generateBtn.addEventListener('click', () => {
    const type = websiteType.value;
    const theme = colorTheme.value;
    const req = requirements.value;
    
    // Show loading state
    generateBtn.innerHTML = '<span class="loading"></span> Generating...';
    generateBtn.disabled = true;

    setTimeout(() => {
        // Generate based on requirements
        const generated = generateWebsiteCode(type, theme, req);
        
        htmlCode.textContent = generated.html;
        cssCode.textContent = generated.css;
        jsCode.textContent = generated.js;
        
        // Reset button
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Website with AI';
        generateBtn.disabled = false;
    }, 1500);
});

// Generate website code function - ALL WEBSITE TYPES INCLUDED
function generateWebsiteCode(type, theme, req) {
    const themeColors = {
        dark: { primary: '#00ff88', bg: '#0a0a0a', text: '#ffffff', secondary: '#00b8ff' },
        light: { primary: '#0077ff', bg: '#ffffff', text: '#333333', secondary: '#00cc88' },
        blue: { primary: '#0066ff', bg: '#0a1a2f', text: '#ffffff', secondary: '#00ccff' },
        purple: { primary: '#aa00ff', bg: '#1a0a2f', text: '#ffffff', secondary: '#ff00aa' }
    };

    const color = themeColors[theme] || themeColors.blue;
    let html = '', css = '', js = '';

    // ========== PORTFOLIO WEBSITE ==========
    if (type === 'portfolio') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: ${color.bg}; color: ${color.text}; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .navbar { position: fixed; top: 0; width: 100%; background: ${color.bg}; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.3); z-index: 1000; }
        .navbar .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: ${color.primary}; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: ${color.text}; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: ${color.primary}; }
        .hero { height: 100vh; display: flex; align-items: center; text-align: center; background: linear-gradient(135deg, ${color.bg}, #000); padding-top: 60px; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: ${color.primary}; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { display: inline-block; padding: 1rem 2rem; background: ${color.primary}; color: ${color.bg}; text-decoration: none; border-radius: 5px; transition: transform 0.3s; }
        .btn:hover { transform: translateY(-3px); }
        section { padding: 80px 0; }
        h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: ${color.primary}; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .service-card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 10px; text-align: center; }
        .service-card h3 { color: ${color.primary}; margin-bottom: 1rem; }
        .contact form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .contact input, .contact textarea { padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: ${color.text}; }
        .contact button { padding: 1rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 5px; cursor: pointer; }
        @media (max-width: 768px) { .nav-links { display: none; } .hero h1 { font-size: 2rem; } }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">Portfolio</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    <section id="home" class="hero">
        <div class="container">
            <h1>Welcome to My Portfolio</h1>
            <p>${req.substring(0, 100)}</p>
            <a href="#contact" class="btn">Get In Touch</a>
        </div>
    </section>
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <p>I am a passionate developer creating amazing web experiences.</p>
        </div>
    </section>
    <section id="services" class="services">
        <div class="container">
            <h2>My Services</h2>
            <div class="services-grid">
                <div class="service-card"><h3>Web Design</h3><p>Beautiful responsive websites</p></div>
                <div class="service-card"><h3>Development</h3><p>Full-stack applications</p></div>
                <div class="service-card"><h3>SEO</h3><p>Search engine optimization</p></div>
            </div>
        </div>
    </section>
    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Me</h2>
            <form id="contactForm">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
    <script>
        document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }));
        document.getElementById('contactForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message!');
            this.reset();
        });
    </script>
</body>
</html>`;
    }

    // ========== BUSINESS WEBSITE ==========
    else if (type === 'business') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: ${color.bg}; color: ${color.text}; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .navbar { position: fixed; top: 0; width: 100%; background: ${color.bg}; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.3); z-index: 1000; }
        .navbar .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: bold; color: ${color.primary}; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: ${color.text}; text-decoration: none; }
        .hero { height: 100vh; display: flex; align-items: center; text-align: center; background: linear-gradient(135deg, ${color.bg}, #000); }
        .hero h1 { font-size: 4rem; margin-bottom: 1rem; color: ${color.primary}; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; }
        .btn { padding: 1rem 2rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1rem; }
        .features { padding: 80px 0; background: rgba(255,255,255,0.05); }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        .feature-card { text-align: center; padding: 2rem; }
        .feature-card h3 { color: ${color.primary}; margin: 1rem 0; }
        .about-company { padding: 80px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .contact { padding: 80px 0; background: rgba(255,255,255,0.05); }
        .contact form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .contact input, .contact textarea { padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: ${color.text}; }
        .contact button { padding: 1rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 5px; cursor: pointer; }
        footer { text-align: center; padding: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 768px) { .nav-links { display: none; } .features-grid { grid-template-columns: 1fr; } .about-company { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">BizCorp</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    <section id="home" class="hero">
        <div class="container">
            <h1>Welcome to BizCorp</h1>
            <p>${req.substring(0, 100)}</p>
            <button class="btn">Get Started</button>
        </div>
    </section>
    <section id="features" class="features">
        <div class="container">
            <h2 style="text-align:center; color:${color.primary};">Why Choose Us</h2>
            <div class="features-grid">
                <div class="feature-card"><h3>Innovation</h3><p>Cutting-edge solutions</p></div>
                <div class="feature-card"><h3>Quality</h3><p>Premium service</p></div>
                <div class="feature-card"><h3>Support</h3><p>24/7 customer care</p></div>
            </div>
        </div>
    </section>
    <section id="about" class="about-company container">
        <div><h2 style="color:${color.primary};">About Us</h2><p>We are a leading business solutions provider with years of experience in delivering excellence.</p></div>
        <div><img src="https://via.placeholder.com/500x300" alt="About" style="width:100%; border-radius:10px;"></div>
    </section>
    <section id="contact" class="contact">
        <div class="container">
            <h2 style="text-align:center; color:${color.primary};">Contact Us</h2>
            <form>
                <input type="text" placeholder="Name" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Message" required></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    </section>
    <footer>© 2024 BizCorp. All rights reserved.</footer>
    <script>
        document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }));
    </script>
</body>
</html>`;
    }

    // ========== LANDING PAGE ==========
    else if (type === 'landing') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: ${color.bg}; color: ${color.text}; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { position: fixed; top: 0; width: 100%; padding: 1.5rem 0; background: rgba(0,0,0,0.9); z-index: 1000; }
        .header .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 2rem; font-weight: bold; color: ${color.primary}; }
        .hero { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, ${color.bg}, #000); }
        .hero h1 { font-size: 4rem; margin-bottom: 1rem; color: ${color.primary}; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; max-width: 600px; }
        .cta-button { padding: 1rem 3rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 50px; font-size: 1.2rem; cursor: pointer; transition: transform 0.3s; }
        .cta-button:hover { transform: scale(1.05); }
        .features { padding: 80px 0; background: rgba(255,255,255,0.05); }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .feature { text-align: center; padding: 2rem; }
        .feature .icon { font-size: 3rem; color: ${color.primary}; margin-bottom: 1rem; }
        .testimonials { padding: 80px 0; }
        .testimonial-card { max-width: 600px; margin: 0 auto; text-align: center; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 10px; }
        .footer { text-align: center; padding: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .features-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="logo">BrandName</div>
            <button class="cta-button" style="padding:0.5rem 1.5rem; font-size:1rem;">Get Started</button>
        </div>
    </header>
    <section class="hero">
        <div class="container">
            <h1>Launch Your Product</h1>
            <p>${req.substring(0, 100)}</p>
            <button class="cta-button">Start Free Trial</button>
        </div>
    </section>
    <section class="features">
        <div class="container">
            <h2 style="text-align:center; color:${color.primary}; margin-bottom:3rem;">Amazing Features</h2>
            <div class="features-grid">
                <div class="feature"><div class="icon">⚡</div><h3>Fast</h3><p>Lightning quick performance</p></div>
                <div class="feature"><div class="icon">🔒</div><h3>Secure</h3><p>Enterprise-grade security</p></div>
                <div class="feature"><div class="icon">📱</div><h3>Responsive</h3><p>Works on all devices</p></div>
            </div>
        </div>
    </section>
    <section class="testimonials">
        <div class="container">
            <div class="testimonial-card">
                <p style="font-size:1.2rem; margin-bottom:1rem;">"This product changed my life! Highly recommended."</p>
                <p style="color:${color.primary};">- Happy Customer</p>
            </div>
        </div>
    </section>
    <footer class="footer">
        <p>© 2024 BrandName. All rights reserved.</p>
    </footer>
</body>
</html>`;
    }

    // ========== BLOG WEBSITE ==========
    else if (type === 'blog') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: ${color.bg}; color: ${color.text}; }
        .container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
        header { padding: 2rem 0; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .blog-title { font-size: 3rem; color: ${color.primary}; margin-bottom: 0.5rem; }
        .nav { padding: 1rem 0; text-align: center; }
        .nav a { color: ${color.text}; margin: 0 1rem; text-decoration: none; }
        .nav a:hover { color: ${color.primary}; }
        .featured-post { padding: 3rem; background: linear-gradient(135deg, ${color.primary}20, transparent); border-radius: 15px; margin: 2rem 0; }
        .featured-post h2 { font-size: 2rem; color: ${color.primary}; margin-bottom: 1rem; }
        .posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 3rem 0; }
        .post-card { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 10px; }
        .post-card h3 { color: ${color.primary}; margin-bottom: 0.5rem; }
        .post-meta { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }
        .read-more { color: ${color.primary}; text-decoration: none; display: inline-block; margin-top: 1rem; }
        .sidebar { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; margin: 2rem 0; }
        .footer { text-align: center; padding: 2rem; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 3rem; }
        @media (max-width: 768px) { .posts-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <header>
        <h1 class="blog-title">My Blog</h1>
        <p class="blog-subtitle">${req.substring(0, 50)}</p>
    </header>
    <div class="nav">
        <a href="#">Home</a>
        <a href="#">Technology</a>
        <a href="#">Lifestyle</a>
        <a href="#">Travel</a>
        <a href="#">Contact</a>
    </div>
    <div class="container">
        <article class="featured-post">
            <h2>Featured: Getting Started with Blogging</h2>
            <p>Learn how to start your own blog and share your ideas with the world. This comprehensive guide covers everything from setup to publishing.</p>
            <a href="#" class="read-more">Read More →</a>
        </article>
        <div class="posts-grid">
            <article class="post-card">
                <h3>10 Tips for Better Writing</h3>
                <div class="post-meta">Feb 26, 2024 • 5 min read</div>
                <p>Improve your writing skills with these simple yet effective techniques...</p>
                <a href="#" class="read-more">Read More →</a>
            </article>
            <article class="post-card">
                <h3>The Future of Technology</h3>
                <div class="post-meta">Feb 25, 2024 • 7 min read</div>
                <p>Exploring upcoming trends in AI, web development, and digital innovation...</p>
                <a href="#" class="read-more">Read More →</a>
            </article>
        </div>
        <aside class="sidebar">
            <h3 style="color:${color.primary}; margin-bottom:1rem;">About the Author</h3>
            <p>Passionate writer and developer sharing knowledge and experiences through engaging content.</p>
        </aside>
    </div>
    <footer class="footer">
        <p>© 2024 My Blog. All rights reserved.</p>
    </footer>
</body>
</html>`;
    }

    // ========== EDUCATION WEBSITE ==========
    else if (type === 'education') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Education Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: ${color.bg}; color: ${color.text}; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .navbar { background: ${color.bg}; padding: 1rem 0; border-bottom: 2px solid ${color.primary}; }
        .navbar .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: bold; color: ${color.primary}; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { color: ${color.text}; text-decoration: none; }
        .hero { padding: 100px 0; text-align: center; background: linear-gradient(135deg, ${color.bg}, #000); }
        .hero h1 { font-size: 3.5rem; color: ${color.primary}; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; max-width: 700px; margin: 0 auto 2rem; }
        .courses { padding: 80px 0; background: rgba(255,255,255,0.05); }
        .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        .course-card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 10px; text-align: center; }
        .course-card h3 { color: ${color.primary}; margin-bottom: 1rem; }
        .price { font-size: 1.5rem; color: ${color.primary}; margin: 1rem 0; }
        .enroll-btn { padding: 0.5rem 2rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 5px; cursor: pointer; }
        .features { padding: 60px 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
        .feature i { font-size: 2.5rem; color: ${color.primary}; margin-bottom: 1rem; }
        .contact { padding: 80px 0; background: rgba(255,255,255,0.05); }
        .contact form { max-width: 500px; margin: 0 auto; }
        .contact input, .contact textarea { width: 100%; padding: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: ${color.text}; }
        .contact button { width: 100%; padding: 1rem; background: ${color.primary}; color: ${color.bg}; border: none; border-radius: 5px; cursor: pointer; }
        footer { text-align: center; padding: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 768px) { .courses-grid, .features { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">EduLearn</div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#courses">Courses</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>
    <section id="home" class="hero">
        <div class="container">
            <h1>Learn Without Limits</h1>
            <p>${req.substring(0, 100)}</p>
            <button class="enroll-btn" style="padding:1rem 3rem;">Start Learning</button>
        </div>
    </section>
    <div class="features container">
        <div class="feature"><i>📚</i><h3>Expert Teachers</h3><p>Learn from industry professionals</p></div>
        <div class="feature"><i>⏰</i><h3>Flexible Timing</h3><p>Learn at your own pace</p></div>
        <div class="feature"><i>🎓</i><h3>Certification</h3><p>Get certified on completion</p></div>
    </div>
    <section id="courses" class="courses">
        <div class="container">
            <h2 style="text-align:center; color:${color.primary};">Popular Courses</h2>
            <div class="courses-grid">
                <div class="course-card"><h3>Web Development</h3><p>Learn HTML, CSS, JavaScript</p><div class="price">$49</div><button class="enroll-btn">Enroll</button></div>
                <div class="course-card"><h3>Python Programming</h3><p>Master Python basics to advanced</p><div class="price">$59</div><button class="enroll-btn">Enroll</button></div>
                <div class="course-card"><h3>Data Science</h3><p>Learn数据分析 and ML</p><div class="price">$79</div><button class="enroll-btn">Enroll</button></div>
            </div>
        </div>
    </section>
    <section id="contact" class="contact">
        <div class="container">
            <h2 style="text-align:center; color:${color.primary}; margin-bottom:2rem;">Contact Us</h2>
            <form>
                <input type="text" placeholder="Name" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
    <footer>© 2024 EduLearn. All rights reserved.</footer>
</body>
</html>`;
    }

    // Default CSS and JS
    css = "/* CSS is included in the HTML style tag */";
    js = "// JavaScript is included in the HTML script tag";

    return { html, css, js };
}

// Copy code
copyBtn.addEventListener('click', () => {
    let code = '';
    const activeTab = document.querySelector('.code-tab.active').getAttribute('data-tab');
    
    if (activeTab === 'html') code = htmlCode.textContent;
    else if (activeTab === 'css') code = cssCode.textContent;
    else if (activeTab === 'js') code = jsCode.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        alert('✅ Code copied to clipboard!');
    });
});

// Preview code
previewBtn.addEventListener('click', () => {
    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>${cssCode.textContent}</style>
</head>
<body>
    ${htmlCode.textContent}
    <script>${jsCode.textContent}<\/script>
</body>
</html>`;
    
    previewFrame.srcdoc = fullHTML;
    livePreview.classList.add('active');
});

closePreview.addEventListener('click', () => {
    livePreview.classList.remove('active');
});

// ========== CONTACT FORM WITH EMAIL (FORMSUBMIT) ==========
const contactForm = document.getElementById('contactForm');
const messageInput = document.getElementById('message');
const subjectInput = document.getElementById('subject');
const subjectSuggestion = document.getElementById('subjectSuggestion');

// Smart Subject Suggestions
messageInput.addEventListener('input', () => {
    const message = messageInput.value.toLowerCase();
    
    if (message.includes('project') || message.includes('work')) {
        subjectSuggestion.style.display = 'block';
        subjectSuggestion.textContent = '💡 Suggested subject: "Project Inquiry"';
        subjectInput.value = 'Project Inquiry';
    } else if (message.includes('job') || message.includes('hire')) {
        subjectSuggestion.style.display = 'block';
        subjectSuggestion.textContent = '💡 Suggested subject: "Collaboration Opportunity"';
        subjectInput.value = 'Collaboration Opportunity';
    } else if (message.includes('price') || message.includes('cost')) {
        subjectSuggestion.style.display = 'block';
        subjectSuggestion.textContent = '💡 Suggested subject: "Service Pricing Inquiry"';
        subjectInput.value = 'Service Pricing Inquiry';
    } else if (message.includes('website') || message.includes('builder')) {
        subjectSuggestion.style.display = 'block';
        subjectSuggestion.textContent = '💡 Suggested subject: "AI Website Builder Inquiry"';
        subjectInput.value = 'AI Website Builder Inquiry';
    } else {
        subjectSuggestion.style.display = 'none';
    }
});

// Form Submission with FormSubmit
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare form data
    const formData = new FormData(contactForm);
    
    // Send to FormSubmit
    fetch('https://formsubmit.co/ajax/saurabhjha.dev@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('✅ Message sent successfully! I will get back to you soon.');
            contactForm.reset();
            subjectSuggestion.style.display = 'none';
        } else {
            alert('❌ Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        alert('❌ Network error. Please check your connection and try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
