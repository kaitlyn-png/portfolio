(() => {
    const THEME_KEY = "portfolio-theme";
    const THEME_LIGHT = "light";
    const THEME_DARK = "dark";

    function getSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
                return savedTheme;
            }
        } catch (error) {
            return null;
        }
        return null;
    }

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return THEME_DARK;
        }
        return THEME_LIGHT;
    }

    function applyTheme(theme) {
        document.body.classList.remove("theme-light", "theme-dark");
        document.body.classList.add(theme === THEME_DARK ? "theme-dark" : "theme-light");
    }

    function buildThemeToggleButton() {
        const button = document.createElement("button");
        button.type = "button";
        button.id = "theme-toggle";
        button.className = "theme-toggle";

        const icon = document.createElement("span");
        icon.className = "theme-toggle-icon";
        icon.setAttribute("aria-hidden", "true");

        button.appendChild(icon);
        return button;
    }

    function setButtonLabel(button, theme) {
        const nextTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        button.setAttribute("aria-label", "switch to " + nextTheme + " mode");
        button.title = "switch to " + nextTheme + " mode";
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            return;
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        const footer = document.getElementById("footer");
        if (!footer) {
            return;
        }

        const button = buildThemeToggleButton();
        footer.appendChild(button);

        let activeTheme = getSavedTheme() || getSystemTheme();
        applyTheme(activeTheme);
        setButtonLabel(button, activeTheme);

        button.addEventListener("click", () => {
            activeTheme = activeTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
            applyTheme(activeTheme);
            setButtonLabel(button, activeTheme);
            saveTheme(activeTheme);

            button.classList.remove("is-animating");
            void button.offsetWidth;
            button.classList.add("is-animating");
        });

        button.addEventListener("animationend", () => {
            button.classList.remove("is-animating");
        });
    });
})();