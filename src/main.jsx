import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Import CSS directly to keep existing styles
import '/assets/css/main.css';
import '/assets/css/app.css';

// Bundle JSON so it's available in dev and prod builds
import enJson from '/assets/i18n/en.json';
import grJson from '/assets/i18n/gr.json';
import projectsData from '/assets/js/projects.json';

function getTranslations(locale = 'en') {
    return locale === 'gr' ? grJson : enJson;
}

function useI18n(locale) {
    const [t, setT] = useState({});
    useEffect(() => {
        try {
            setT(getTranslations(locale));
        } catch (_) {
            setT({});
        }
    }, [locale]);
    return (key, fallback) => t[key] ?? fallback ?? key;
}

function Intro({ t }) {
    return (
        <div id="intro">
            <h1>{t('intro.title', "I'm Alex")}</h1>
            <h2>{t('intro.subtitle', 'and this is my Portfolio')}</h2>
            <p>{t('intro.tagline', 'Showcase of my projects and abilities')}</p>
            <ul className="actions">
                <li><a href="#main" className="button icon solid solo fa-arrow-down">{t('intro.cta', 'Continue')}</a></li>
            </ul>
        </div>
    );
}

function Nav() {
    return (
        <nav id="nav">
            <ul className="icons">
                <li><a href="https://www.linkedin.com/in/alexios-kola/" aria-label="LinkedIn" className="icon brands fa-linkedin"><span className="label">LinkedIn</span></a></li>
                <li><a href="https://github.com/alexkola94" aria-label="GitHub" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
            </ul>
        </nav>
    );
}

function ProjectCard({ p }) {
    return (
        <article className={p.featured ? 'post featured' : undefined}>
            {p.featured && (
                <header className="major">
                    <h2>{p.title}</h2>
                    <p>{p.desc}</p>
                </header>
            )}
            <a href={p.link} className={p.featured ? 'image main' : 'image fit'}>
                <img src={p.image} alt={p.title} loading="lazy" onLoad={(e) => e.currentTarget.classList.add('loaded')} />
            </a>
            <ul className="actions special">
                {p.repo ? (
                    <li><a href={p.repo} className="button" aria-label={`Open repository for ${p.title}`}>Check it out</a></li>
                ) : (
                    <li><a href={p.link} className="button" aria-label={`Open project ${p.title}`}>Open</a></li>
                )}
            </ul>
        </article>
    );
}

function PostsGrid({ items }) {
    const featured = items.find(p => p.featured);
    const rest = items.filter(p => !p.featured);
    return (
        <div id="main">
            {featured && <ProjectCard p={featured} />}
            <section className="posts">
                {rest.map(p => (<ProjectCard key={p.title} p={p} />))}
            </section>
        </div>
    );
}

function Footer({ t }) {
    return (
        <footer id="footer">
            <section className="split contact">
                <section className="alt">
                    <h3>{t('footer.address', 'Address')}</h3>
                    <p>Sokratous 66 Athens Kallithea</p>
                </section>
                <section>
                    <h3>{t('footer.phone', 'Phone')}</h3>
                    <p><a href="tel:6987164394">(698) 716-4394</a></p>
                </section>
                <section>
                    <h3>{t('footer.email', 'Email')}</h3>
                    <p><a href="mailto:kola.alfons.alexios@gmail.com">kola.alfons.alexios@gmail.com</a></p>
                </section>
                <section>
                    <h3>{t('footer.social', 'Social')}</h3>
                    <ul className="icons alt">
                        <li><a href="https://www.linkedin.com/in/alexios-kola/" aria-label="LinkedIn" className="icon brands alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
                        <li><a href="https://github.com/alexkola94" aria-label="GitHub" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
                    </ul>
                </section>
            </section>
        </footer>
    );
}

function Copyright() {
    return (
        <div id="copyright">
            <ul>
                <li>&copy; A.Kola</li>
            </ul>
        </div>
    );
}

function Wrapper({ children }) {
    return (
        <div id="wrapper" className="fade-in">
            <div className="bg"></div>
            {children}
        </div>
    );
}

function App() {
    const [locale, setLocale] = useState('en');
    const [items, setItems] = useState(projectsData || []);
    const t = useI18n(locale);
    useEffect(() => {
        setTimeout(() => document.body.classList.remove('is-preload'), 100);
    }, []);
    return (
        <Wrapper>
            <Intro t={t} />
            <div className="locale-switch">
                <button
                    className={`locale-toggle ${locale}`}
                    role="switch"
                    aria-checked={locale==='gr'}
                    aria-label="Toggle language"
                    onClick={() => setLocale(locale === 'en' ? 'gr' : 'en')}
                >
                    <span className="label left">EN</span>
                    <span className="label right">GR</span>
                    <span className="knob"></span>
                </button>
            </div>
            <Nav />
            <PostsGrid items={items} />
            <Footer t={t} />
            <Copyright />
        </Wrapper>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);


