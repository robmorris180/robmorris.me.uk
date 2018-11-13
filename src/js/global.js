function switchTheme(e) {

    const variant = e.target.dataset.switch;
    const root = document.documentElement;

    if (variant === 'dark') {
        root.style.setProperty('--black', 'white');
        root.style.setProperty('--white', 'black');
        e.target.dataset.switch = 'light';
    } else {
        root.style.setProperty('--black', 'black');
        root.style.setProperty('--white', 'white');
        e.target.dataset.switch = 'dark';
    }
}

document.querySelector('.switcher').addEventListener('click', switchTheme);