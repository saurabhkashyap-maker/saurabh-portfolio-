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

// Generate website code function
function generateWebsiteCode(type, theme, req) {
    const themeColors = {
        dark: { primary: '#00ff88', bg: '#0a0a0a', text: '#ffffff', secondary: '#00b8ff' },
        light: { primary: '#0077ff', bg: '#ffffff', text: '#333333', secondary: '#00cc88' },
        blue: { primary: '#0066ff', bg: '#0a1a2f', text: '#ffffff', secondary: '#00ccff' },
        purple: { primary: '#aa00ff', bg: '#1a0a2f', text: '#ffffff', secondary: '#ff00aa' }
    };

    const color = themeColors[theme] || themeColors.dark;

    let html = '', css = '', js = '';

    if (type === 'portfolio') {
        html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="logo">Portfolio</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <h1>Welcome to My Portfolio</h1>
            <p>${req.substring(0, 100)}</p>
            <a href="#contact" class="btn">Get In Touch</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <p>I am a passionate developer creating amazing web experiences.</p>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <h2>My Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Web Design</h3>
                    <p>Beautiful, responsive websites</p>
                </div>
                <div class="service-card">
                    <h3>Development</h3>
                    <p>Full-stack web applications</p>
                </div>
                <div class="service-card">
                    <h3>SEO</h3>
                    <p>Optimize for search engines</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
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

    <script src="script.js"></script>
</body>
</html>`;

        css = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: ${color.text};
    background: ${color.bg};
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: ${color.bg};
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${color.primary};
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: ${color.text};
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: ${color.primary};
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, ${color.bg}, #000);
    padding-top: 60px;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${color.primary};
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.btn {
    display: inline-block;
    padding: 1rem 2rem;
    background: ${color.primary};
    color: ${color.bg};
    text-decoration: none;
    border-radius: 5px;
    transition: transform 0.3s;
}

.btn:hover {
    transform: translateY(-3px);
}

/* Sections */
section {
    padding: 80px 0;
}

h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: ${color.primary};
}

/* Services Grid */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.service-card {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s;
}

.service-card:hover {
    transform: translateY(-10px);
}

.service-card h3 {
    color: ${color.primary};
    margin-bottom: 1rem;
}

/* Contact Form */
.contact form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact input,
.contact textarea {
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 5px;
    color: ${color.text};
}

.contact button {
    padding: 1rem;
    background: ${color.primary};
    color: ${color.bg};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.3s;
}

.contact button:hover {
    transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
}`;

        js = `// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message!');
    this.reset();
});`;
    }

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

// Smart Contact Form with Subject Suggestions
const messageInput = document.getElementById('message');
const subjectInput = document.getElementById('subject');
const subjectSuggestion = document.getElementById('subjectSuggestion');

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

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo - in production, this would send an email to saurabhjha.dev@gmail.com');
    contactForm.reset();
    subjectSuggestion.style.display = 'none';
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
