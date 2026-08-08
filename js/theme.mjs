// OPC-TNC Theme & Workstyle Preset System
export function initTheme(onThemeChangeCallback) {
    const savedTheme = localStorage.getItem('tnc-theme') || 'light';
    const savedStyle = localStorage.getItem('tnc-office-style') || 'creative';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeLabel(savedTheme);
    if (onThemeChangeCallback) {
        onThemeChangeCallback(savedStyle, savedTheme);
    }
}

export function toggleTheme(currentStyle, applyColorsCallback) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('tnc-theme', nextTheme);
    updateThemeLabel(nextTheme);

    if (applyColorsCallback) {
        applyColorsCallback(currentStyle, nextTheme);
    }
    return nextTheme;
}

export function updateThemeLabel(theme) {
    const label = document.getElementById('theme-label');
    if (label) label.textContent = theme === 'dark' ? 'TỐI' : 'SÁNG';
}
