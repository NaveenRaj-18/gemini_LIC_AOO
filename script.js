// ==================== STATE MANAGEMENT ====================
const totalDays = 100;
let completedDays = JSON.parse(localStorage.getItem('naveenLicTracker')) || [];

// ==================== TAB LOGIC ====================
function switchTab(event, tabId) {
    // Hide all tabs and remove active states from buttons
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show the clicked tab and highlight the button
    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ==================== TIMER LOGIC ====================
let timerInterval;
function startTimer(minutes) {
    clearInterval(timerInterval);
    let time = minutes * 60;
    const display = document.getElementById('timer-display');
    
    timerInterval = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        display.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Stop your current section.");
        }
        time--;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').innerText = "00:00";
}

// ==================== MISTAKE LOG LOGIC ====================
const mistakeBox = document.getElementById('mistake-textarea');
if(mistakeBox) {
    mistakeBox.value = localStorage.getItem('naveenMistakes') || '';
    mistakeBox.addEventListener('input', (e) => {
        localStorage.setItem('naveenMistakes', e.target.value);
    });
}

// ==================== RESOURCE LINKS ====================
const mockLinks = [
    { name: "Examsnet Previous Papers", desc: "10+ Real LIC AAO papers (2013-2023) completely free.", url: "https://www.examsnet.com/exams/licaao-model-previous-papers-online" },
    { name: "EduJha Free Mock", desc: "LIC AAO 2026 Free Mock Test & Practice Set.", url: "https://www.edujha.com/mock-tests/category/lic-aao" },
    { name: "Smartkeeda Testzone", desc: "High-level puzzles & AI-driven analytics. Excellent for Mains.", url: "https://testzone.smartkeeda.com/" },
    { name: "Cracku Free Test", desc: "High-quality free mock test with detailed solutions.", url: "https://cracku.in/lic-aao-mock-test" }
];

const studyLinks = [
    { name: "Feel Free to Learn (YouTube)", desc: "Best channel for Data Interpretation and Basic Math shortcuts.", url: "https://www.youtube.com/@FeelFreetoLearn" },
    { name: "AffairsCloud Current Affairs", desc: "The holy grail for General Awareness and Financial news.", url: "https://affairscloud.com/" },
    { name: "Art of Reasoning (YouTube)", desc: "Excellent tutorials on advanced Mains-level puzzles.", url: "https://www.youtube.com/results?search_query=art+of+reasoning+puzzles" },
    { name: "Meritshine (YouTube)", desc: "Great for building foundational banking/insurance English concepts.", url: "https://www.youtube.com/@Meritshine" }
];

function renderResources() {
    const mockContainer = document.getElementById('mock-links');
    const studyContainer = document.getElementById('study-links');
    
    if(!mockContainer || !studyContainer) return;

    mockLinks.forEach(link => {
        mockContainer.innerHTML += `<a href="${link.url}" target="_blank" class="resource-card"><strong>${link.name}</strong>${link.desc}</a>`;
    });
    
    studyLinks.forEach(link => {
        studyContainer.innerHTML += `<a href="${link.url}" target="_blank" class="resource-card" style="border-top-color: #e67e22;"><strong>${link.name}</strong>${link.desc}</a>`;
    });
}

// ==================== TRACKER LOGIC ====================
function generateSyllabus(day) {
    if (day <= 30) return { phase: 1, pName: "Foundations", details: "Speed Math, Percentage, Syllogisms, Inequalities." };
    if (day <= 70) return { phase: 2, pName: "Core Expansion", details: "Data Interpretation, Advanced Seating, Insurance Awareness." };
    return { phase: 3, pName: "Speed Mocks", details: "Timed Sectionals, Full Mocks, Descriptive Essay." };
}

function updateProgress() {
    const count = completedDays.length;
    document.getElementById('days-completed').innerText = count;
    document.getElementById('progress-fill').style.width = `${(count / totalDays) * 100}%`;
}

function toggleDay(day) {
    if (completedDays.includes(day)) {
        completedDays = completedDays.filter(d => d !== day);
    } else {
        completedDays.push(day);
    }
    localStorage.setItem('naveenLicTracker', JSON.stringify(completedDays));
    
    const card = document.getElementById(`day-${day}`);
    if (card) {
        card.classList.toggle('completed');
    }
    updateProgress();
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if(!container) return;

    for (let i = 1; i <= totalDays; i++) {
        const data = generateSyllabus(i);
        const isChecked = completedDays.includes(i) ? 'checked' : '';
        const completedClass = completedDays.includes(i) ? 'completed' : '';
        
        container.innerHTML += `
            <div class="day-card phase-${data.phase} ${completedClass}" id="day-${i}">
                <div><input type="checkbox" onchange="toggleDay(${i})" ${isChecked}></div>
                <div>
                    <strong style="font-size: 18px;">Day ${i} - ${data.pName}</strong>
                    <p style="margin-top: 5px; color: #555;">${data.details}</p>
                </div>
            </div>`;
    }
}

// Initialize Everything
renderTimeline();
renderResources();
updateProgress();