
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const isOpen = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
});

const navLinks = document.querySelectorAll('.nav-menu a');


const heroText = document.querySelector('#hero p');
heroText.textContent = '저를 소개하는 웹페이지에 오신 것을 환영합니다!';


heroText.innerHTML = '저를 소개하는 웹페이지에 <span>오신 것을 환영합니다!</span>';

const heroButton = document.querySelector('#hero button');

heroButton.addEventListener('click', () => {
    heroButton.classList.toggle('test-style');
});


const contactForm = document.querySelector('#contact form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    const nameError = document.querySelector('#name-error');
    const emailError = document.querySelector('#email-error');
    const messageError = document.querySelector('#message-error');

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    if (nameInput.value.trim() === '') {
        nameError.textContent = '이름을 입력해주세요.';
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = '이메일을 입력해주세요.';
    } else if (!emailInput.validity.valid) {
        emailError.textContent = '올바른 이메일 형식으로 입력해주세요.';
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = '문의 내용을 입력해주세요.';
    }
    if (
    nameInput.value.trim() !== '' &&
    emailInput.value.trim() !== '' &&
    emailInput.validity.valid &&
    messageInput.value.trim() !== ''
) {
    const successMessage = document.querySelector('#success-message');
    successMessage.textContent = '문의가 성공적으로 제출되었습니다.';
    contactForm.reset();
}
});

window.addEventListener('scroll', () => {
    console.log('웹페이지를 스크롤하고 있습니다.');
});

const nameInput = document.querySelector('#name');

nameInput.addEventListener('input', () => {
    console.log('이름 입력창의 내용이 변경되었습니다.');
});

const scrollTopButton = document.querySelector('#scroll-top');

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 60) {
        nav.classList.add('scrolled');
        console.log(nav.className);
    } else {
        nav.classList.remove('scrolled');
    }
});

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

const themeToggle = document.querySelector('#theme-toggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
}});
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.5
});

sections.forEach((section) => {
    section.classList.add('hidden-section');
    observer.observe(section);
});

const projectsMessage = document.querySelector('#projects-message');
const projectsGrid = document.querySelector('.projects-grid');

const loadProjects = async () => {
    try {
        projectsMessage.textContent = '프로젝트를 불러오는 중...';

        const response = await fetch('https://api.github.com/users/fbgksgh/repos');

        if (!response.ok) {
            throw new Error('GitHub API 요청에 실패했습니다.');
        }

        const projects = await response.json();

        if (projects.length === 0) {
            projectsMessage.textContent = '표시할 프로젝트가 없습니다.';
            return;
        }

        projectsGrid.innerHTML = projects.map(({ name, description, html_url }) => `
            <article class="project-card">
                <h3>${name}</h3>
                <p>${description || '프로젝트 설명이 없습니다.'}</p>
                <a href="${html_url}" target="_blank" rel="noopener noreferrer">
                    GitHub에서 보기
                </a>
            </article>
        `).join('');

        projectsMessage.textContent = '';
    } catch (error) {
        projectsMessage.textContent = '프로젝트를 불러올 수 없습니다.';

        const retryButton = document.createElement('button');
        retryButton.textContent = '다시 시도';
        retryButton.addEventListener('click', loadProjects);

        projectsMessage.appendChild(retryButton);

        console.error(error);
    }
};

loadProjects();