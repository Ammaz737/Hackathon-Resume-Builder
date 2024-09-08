function toggleSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = section.style.display === 'block' ? 'none' : 'block';
    }
}
