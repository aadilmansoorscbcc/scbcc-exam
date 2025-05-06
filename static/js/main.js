async function searchCandidate() {
    const query = document.getElementById('searchInput').value.trim();
    const candidateDetails = document.getElementById('candidateDetails');
    candidateDetails.innerHTML = '';

    if (!query) {
        candidateDetails.innerHTML = '<p class="message">Please enter a Roll No or Reg No.</p>';
        return;
    }

    try {
        const response = await fetch('https://your-odoo-instance.com/exam/search_candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const candidate = await response.json();

        if (!candidate) {
            candidateDetails.innerHTML = '<p class="message">No candidate found.</p>';
            return;
        }

        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.innerHTML = `
            <h3>${candidate.name || 'N/A'}</h3>
            <p>S.No: ${candidate.sno || 'N/A'}</p>
            <p>Roll No: ${candidate.rollNo || 'N/A'}</p>
            <p>Reg No: ${candidate.regNo || 'N/A'}</p>
            <p>Room: ${candidate.roomNo || 'Not Assigned'}</p>
            <p>Bench: ${candidate.benchNo || 'Not Assigned'}</p>
            <p>Subject: ${candidate.subject || 'N/A'}</p>
            <p>College Code: ${candidate.collegeCode || 'N/A'}</p>
            <p>Gender: ${candidate.gender === 'm' ? 'Male' : candidate.gender === 'f' ? 'Female' : 'N/A'}</p>
            <p class="message">For bench positioning, see the room chart of your assigned room.</p>
        `;
        candidateDetails.appendChild(card);
    } catch (error) {
        console.error('Error:', error);
        candidateDetails.innerHTML = '<p class="message">Error fetching data. Please try again later.</p>';
    }
}