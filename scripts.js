window.onload = function() {
  const form = document.getElementById('resume-form');
  const formSection = document.getElementById('form-section');
  const resumeSection = document.getElementById('generated-resume');
  const editButton = document.getElementById('edit-resume');
  const downloadButton = document.getElementById('download-pdf');

  // Check if username exists in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  
  if (username) {
    const resumeData = JSON.parse(localStorage.getItem(username));
    if (resumeData) {
      loadResume(resumeData);
      formSection.classList.add('hidden');
      resumeSection.classList.remove('hidden');
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const username = document.getElementById('username').value;

    const resumeData = {
      name, email, phone, experience, education, skills, username
    };

    // Save data to localStorage
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Redirect to unique URL with username
    window.location.href = `?username=${username}`;
  });

  // Load resume data into HTML
  function loadResume(resumeData) {
    document.getElementById('user-name').textContent = resumeData.name;
    document.getElementById('user-email').textContent = resumeData.email;
    document.getElementById('user-phone').textContent = resumeData.phone;
    document.getElementById('user-experience').textContent = resumeData.experience;
    document.getElementById('user-education').textContent = resumeData.education;

    // Update skills
    const skillsList = document.getElementById('user-skills');
    skillsList.innerHTML = ''; 
    resumeData.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill.trim();
      skillsList.appendChild(li);
    });
  }


  if (editButton) {
    // Edit button to show form again
    editButton.addEventListener('click', function() {
      const resumeData = JSON.parse(localStorage.getItem(username));

      // Populate form with resume details
      document.getElementById('name').value = resumeData.name;
      document.getElementById('email').value = resumeData.email;
      document.getElementById('phone').value = resumeData.phone;
      document.getElementById('experience').value = resumeData.experience;
      document.getElementById('education').value = resumeData.education;
      document.getElementById('skills').value = resumeData.skills.join(', ');

      // Hide resume and show form
      resumeSection.classList.add('hidden');
      formSection.classList.remove('hidden');
    });
  }

  if (downloadButton) {
    // Download PDF
    downloadButton.addEventListener('click', function() {
      const resumeElement = document.getElementById('generated-resume');
      html2pdf().from(resumeElement).set({
        margin: 1,
        filename: `${username}_resume.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' }
      }).save();
    });
  }
};
