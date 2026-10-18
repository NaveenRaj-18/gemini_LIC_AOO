const totalDays = 100;
let completedDays = JSON.parse(localStorage.getItem('naveenLicTracker')) || [];

function generateSyllabus(day) {
    if (day <= 30) {
        return {
            phase: 1,
            phaseName: "Phase 1: Foundations",
            qTask: "Speed Math & Arithmetic: Squares, Cubes, Percentages, Ratio, Profit & Loss.",
            rTask: "Basic Logic: Syllogisms, Inequalities, Blood Relations, Direction Sense.",
            eTask: "Read 1 Editorial. Practice basic grammar (Tenses, Subject-Verb)."
        };
    } else if (day <= 70) {
        return {
            phase: 2,
            phaseName: "Phase 2: Core Expansion & Mains Setup",
            qTask: "Data Interpretation: Table Charts, Bar Graphs, Pie Charts. Time/Work, Speed/Distance.",
            rTask: "Advanced Puzzles: Circular/Linear Seating, Box Puzzles, Floor Puzzles.",
            eTask: "Current Affairs & Insurance Awareness: LIC basics, IRDAI terms, 1 Descriptive Essay."
        };
    } else {
        return {
            phase: 3,
            phaseName: "Phase 3: Speed & Mocks",
            qTask: "Attempt 1 Full Quant Sectional (20 mins). Analyze weak spots.",
            rTask: "Attempt 1 Full Reasoning Sectional (20 mins). Practice skipping hard puzzles.",
            eTask: "Attempt 1 Full Prelims Mock Test. Review performance out of 70 marks."
        };
    }
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
    document.getElementById(`day-${day}`).classList.toggle('completed');
    updateProgress();
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    
    for (let i = 1; i <= totalDays; i++) {
        const data = generateSyllabus(i);
        const isChecked = completedDays.includes(i) ? 'checked' : '';
        const completedClass = completedDays.includes(i) ? 'completed' : '';
        
        const card = document.createElement('div');
        card.className = `day-card phase-${data.phase} ${completedClass}`;
        card.id = `day-${i}`;
        
        card.innerHTML = `
            <div>
                <input type="checkbox" onchange="toggleDay(${i})" ${isChecked}>
            </div>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <strong style="font-size: 18px;">Day ${i}</strong>
                    <span style="color: #666; font-size: 14px;">${data.phaseName}</span>
                </div>
                <div class="task-grid">
                    <div class="task-box">
                        <div class="task-title">Quant (45 Mins)</div>
                        ${data.qTask}
                    </div>
                    <div class="task-box">
                        <div class="task-title">Reasoning (45 Mins)</div>
                        ${data.rTask}
                    </div>
                    <div class="task-box" style="grid-column: 1 / -1; background: #eef2f5;">
                        <div class="task-title">English / GK (30 Mins)</div>
                        ${data.eTask}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

renderTimeline();
updateProgress();