// App.jsx - React entry rendering the portfolio using existing CSS for a smooth upgrade
// Loads translations and renders Intro, Nav, Main, and Footer components.

const { useEffect, useMemo, useState } = React;

// Simple i18n loader (can be extended for multiple locales)
async function loadTranslations(locale = 'en') {
    const res = await fetch(`assets/i18n/${locale}.json`, { cache: 'no-store' });
    return res.json();
}

async function loadProjects() {
    const res = await fetch('assets/js/projects.json', { cache: 'no-store' });
    return res.json();
}

function useI18n(locale) {
	const [t, setT] = useState({});
	useEffect(() => {
		loadTranslations(locale).then(setT).catch(() => setT({}));
	}, [locale]);
	return (key, fallback) => t[key] ?? fallback ?? key;
}

// Projects are now loaded from JSON

function Intro({ t }) {
	return (
		<div id="intro">
			<h1>{t('intro.title', "I'm Alex")}</h1>
			<h2>{t('intro.subtitle', 'and this is my Portfolio')}</h2>
			<p>{t('intro.tagline', 'Showcase of my projects and abilities')}</p>
			<ul className="actions">
				<li><a href="#header" className="button icon solid solo fa-arrow-down scrolly">{t('intro.cta', 'Continue')}</a></li>
			</ul>
		</div>
	);
}

function Nav() {
	return (
		<nav id="nav">
			<ul className="icons">
				<li><a href="https://www.linkedin.com/in/alexios-kola/" className="icon brands fa-linkedin"><span className="label">LinkedIn</span></a></li>
				<li><a href="https://github.com/alexkola94" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
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
				<img src={p.image} alt={p.title} />
			</a>
			<ul className="actions special">
				{p.repo ? (
					<li><a href={p.repo} className="button">Check it out</a></li>
				) : (
					<li><a href={p.link} className="button">Open</a></li>
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
						<li><a href="https://www.linkedin.com/in/alexios-kola/" className="icon brands alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
						<li><a href="https://github.com/alexkola94" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
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
	// Keep parallax behavior: we rely on CSS and existing main.js, so just wrap.
	return <div id="wrapper" className="fade-in">{children}</div>;
}

function App() {
	const [locale, setLocale] = useState('en');
	const [items, setItems] = useState([]);
	const t = useI18n(locale);
	useEffect(() => {
		// Smooth fade-in similar to template once React mounts
		setTimeout(() => document.body.classList.remove('is-preload'), 100);
		loadProjects().then(setItems).catch(() => setItems([]));
	}, []);
	return (
		<Wrapper>
			<Intro t={t} />
			<div style={{ position: 'sticky', top: 0, zIndex: 3, display: 'flex', justifyContent: 'flex-end', width: 'calc(100% - 4rem)', maxWidth: '72rem', margin: '0 auto' }}>
				<div className="box" style={{ backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.6)', border: 'none' }}>
					<button className={`button small${locale==='en' ? ' primary' : ''}`} onClick={() => setLocale('en')}>EN</button>
					<button className={`button small${locale==='gr' ? ' primary' : ''}`} onClick={() => setLocale('gr')} style={{ marginLeft: '0.5rem' }}>GR</button>
				</div>
			</div>
			<Nav />
			<PostsGrid items={items} />
			<Footer t={t} />
			<Copyright />
		</Wrapper>
	);
}

const rootElement = document.getElementById('root');
if (rootElement) {
	// Remove the original static markup to avoid duplicate UI when React mounts
	const staleWrapper = document.getElementById('wrapper');
	if (staleWrapper && staleWrapper.parentNode) {
		staleWrapper.parentNode.removeChild(staleWrapper);
	}
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}


