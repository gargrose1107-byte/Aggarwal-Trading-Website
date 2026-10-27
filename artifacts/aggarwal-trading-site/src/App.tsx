import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Factory,
  Menu,
  Moon,
  PackageCheck,
  PencilRuler,
  Search,
  ShieldCheck,
  Sun,
  Truck,
  Users,
  X,
} from 'lucide-react';
import sourceHtml from '../../../attached_assets/Aggarwal_Trading_–_Quality_Plastic_Hardware_1793087636789.html?raw';

type Product = {
  name: string;
  category: string;
  image: string;
  description: string;
  price: string;
  pack: string;
  options: string;
};

const sourceProductSection = sourceHtml.match(/const P=\[([\s\S]*?)\];/)?.[1] ?? '';
const productPattern =
  /\{n:"([^"]*)",c:"([^"]*)",i:"(data:image\/[^"]+)",d:"([^"]*)",p:"([^"]*)",k:"([^"]*)",o:"([^"]*)"\}/g;
const products: Product[] = Array.from(sourceProductSection.matchAll(productPattern), (match) => ({
  name: match[1],
  category: match[2],
  image: match[3],
  description: match[4],
  price: match[5],
  pack: match[6],
  options: match[7],
}));
const logoImage =
  sourceHtml.match(/class="brand"[\s\S]*?<img[^>]*src="([^"]+)"/)?.[1] ?? '';
const heroImage =
  sourceHtml.match(/class="hero-img"[\s\S]*?<img[^>]*src="([^"]+)"/)?.[1] ?? '';
const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];

const principles = [
  {
    title: 'Product quality',
    copy: 'Precision-moulded parts built for everyday load and repeat use.',
  },
  {
    title: 'Practical design',
    copy: 'Fittings shaped for easy fitting on real production lines and job sites.',
  },
  {
    title: 'Dependable service',
    copy: 'Consistent supply and clear communication on every order.',
  },
  {
    title: 'Long-term value',
    copy: 'Fair pricing and reliable products that keep customers coming back.',
  },
];

const reasons = [
  {
    title: 'Durable materials',
    copy: 'Tough plastics that resist wear, moisture and daily handling.',
    icon: ShieldCheck,
  },
  {
    title: 'Wide range',
    copy: 'Legs, brackets, caps, grommets, clips and plugs from one supplier.',
    icon: Boxes,
  },
  {
    title: 'Bulk-ready',
    copy: 'Standard pack sizes for quick counting, dispatch and restocking.',
    icon: PackageCheck,
  },
  {
    title: 'Custom options',
    copy: 'Colours, sizes and moulded variants made to your requirement.',
    icon: PencilRuler,
  },
];

const customerTypes = [
  'Furniture manufacturers',
  'Hardware dealers',
  'Retailers',
  'Industrial customers',
  'Interior contractors',
];

const servedDetails = [
  'Manufacturer & trader',
  'Bulk and retail supply',
  'Consistent quality, every batch',
  'Dealer-friendly pricing',
];

function App() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return window.localStorage.getItem('aggarwal-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    document.title = 'Aggarwal Trading – Quality Plastic Hardware | Where Trust Begins';
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content =
      'Aggarwal Trading manufactures and supplies precision-moulded plastic furniture fittings, brackets, legs, caps, bushes and wall plugs.';
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('aggarwal-theme', theme);
    } catch {
      // The theme remains usable even when browser storage is unavailable.
    }
  }, [theme]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = filter === 'All' || product.category === filter;
      const matchesSearch =
        !query ||
        [product.name, product.category, product.description, product.options]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const selectProduct = (name: string) => {
    setSelectedProduct(name);
    setFormMessage('');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('n') ?? '');
    const phone = String(formData.get('p') ?? '');
    const product = String(formData.get('s') ?? '');
    const quantity = String(formData.get('q') ?? '');
    const message = String(formData.get('m') ?? '');
    const body = `Name: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nMessage: ${message}`;
    const mailto = `mailto:info@aggarwaltrading.com?subject=${encodeURIComponent(
      `Enquiry: ${product}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setFormMessage(
      'Your email app should open with the enquiry ready to send. Nothing is sent from this website.',
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site" id="top">
      <div className="topline">
        <div className="wrap topline-inner">
          <span>Precision-moulded plastic furniture fittings</span>
          <span>Built on dependable supply and long-term relationships</span>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top" aria-label="Aggarwal Trading home">
            <img src={logoImage} alt="Aggarwal Trading logo" />
            <span>
              <strong>AGGARWAL TRADING</strong>
              <small>WHERE TRUST BEGINS</small>
            </span>
          </a>
          <nav id="main-navigation" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#products" onClick={closeMenu}>Products</a>
            <a href="#why" onClick={closeMenu}>Why us</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="button" href="#contact" onClick={closeMenu}>Get a quote</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              data-testid="button-theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              data-testid="button-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <div className="reveal">
              <span className="eyebrow">A dependable hardware partner</span>
              <h1 id="hero-title">
                Quality plastic hardware. <span>Reliable solutions.</span> Lasting relationships.
              </h1>
              <p className="hero-copy">
                Precision-moulded plastic components for furniture makers, hardware dealers,
                retailers and industrial buyers: durable, practical and priced for volume.
              </p>
              <div className="hero-ctas">
                <a className="button" href="#products">
                  View products &amp; prices <ArrowDownRight size={17} />
                </a>
                <a className="button button-outline" href="#contact">Request a quote</a>
              </div>
              <div className="hero-footnote">
                <CheckCircle2 size={16} />
                <span>Useful fittings. Clear pricing. Reliable supply.</span>
              </div>
            </div>
            <div className="hero-art reveal reveal-delay">
              <img src={heroImage} alt="Aggarwal Trading – Where Trust Begins" />
              <div className="hero-stamp">Quality plastic hardware</div>
            </div>
          </div>
          <div className="trust-strip">
            <div className="wrap trust-inner">
              {servedDetails.map((detail, index) => {
                const Icon = [Factory, Truck, ShieldCheck, Users][index];
                return (
                  <span key={detail}>
                    <Icon size={17} aria-hidden="true" /> {detail}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-heading">
          <div className="wrap about-layout">
            <div className="about-copy">
              <div className="section-head">
                <span className="eyebrow">About Aggarwal Trading</span>
                <h2 id="about-heading">Small components. Big impact on the finished product.</h2>
              </div>
              <p>
                Aggarwal Trading is a plastic hardware manufacturing and trading business
                specializing in durable, functional and precision-moulded plastic components for
                furniture and hardware applications. We supply furniture manufacturers, hardware
                dealers, retailers and industrial customers.
              </p>
              <p>
                Our range includes plastic furniture fittings, brackets, caps, bushes, mounting
                components, wall plugs and other essential accessories. With a focus on quality,
                practical design and dependable service, we deliver hardware that combines
                functionality, durability and value.
              </p>
              <blockquote>Aggarwal Trading: Where Quality Meets Reliability.</blockquote>
            </div>
            <div className="pillars" aria-label="Our commitments">
              {principles.map((principle) => (
                <article className="pillar" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="products" aria-labelledby="products-heading">
          <div className="wrap">
            <div className="catalog-top">
              <div className="section-head">
                <span className="eyebrow">Furniture &amp; hardware fittings</span>
                <h2 id="products-heading">Our products</h2>
                <p>
                  Browse the range with indicative prices and pack sizes. Prices are per piece and
                  vary with order volume, colour and size.
                </p>
              </div>
              <div className="catalog-count" aria-live="polite" data-testid="text-product-count">
                Showing {visibleProducts.length} of {products.length} products
              </div>
            </div>
            <div className="catalog-tools">
              <div className="filters" role="group" aria-label="Filter products by category">
                {categories.map((category) => (
                  <button
                    className="filter-button"
                    type="button"
                    key={category}
                    aria-pressed={filter === category}
                    data-testid={`filter-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <label className="search-wrap">
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                  data-testid="input-product-search"
                />
              </label>
            </div>
            <div className="product-grid" aria-live="polite">
              {visibleProducts.length ? (
                visibleProducts.map((product) => (
                  <article className="product-card" key={product.name} data-testid={`card-product-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    <div className="product-photo">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>
                    <div className="product-body">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-options">Available: {product.options}</div>
                      <div className="product-meta">
                        <div><span>Price per piece</span><strong>{product.price}</strong></div>
                        <div><span>Pack quantity</span><strong>{product.pack}</strong></div>
                      </div>
                      <button
                        className="button button-navy"
                        type="button"
                        data-testid={`button-enquire-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        onClick={() => selectProduct(product.name)}
                      >
                        Enquire now <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-results" role="status">
                  <strong>No matching products</strong>
                  Try another product name or select a different category.
                </div>
              )}
            </div>
            <p className="catalog-note">
              Prices are indicative, in Indian rupees (₹), excluding GST and freight. Custom sizes,
              colours and moulded parts are available on request.
            </p>
          </div>
        </section>

        <section className="section why" id="why" aria-labelledby="why-heading">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">A supply relationship you can count on</span>
              <h2 id="why-heading">Why customers choose Aggarwal Trading</h2>
              <p>Trust is built one dependable order at a time.</p>
            </div>
            <div className="why-grid">
              {reasons.map(({ title, copy, icon: Icon }) => (
                <article className="why-item" key={title}>
                  <span><Icon size={18} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="serve-section" aria-labelledby="serve-heading">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Made to work across your supply chain</span>
              <h2 id="serve-heading">Who we serve</h2>
            </div>
            <div className="serve-list">
              {customerTypes.map((customer) => <span key={customer}>{customer}</span>)}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="wrap contact-layout">
            <div className="contact-info">
              <div className="section-head">
                <span className="eyebrow">Start a conversation</span>
                <h2 id="contact-heading">Request a quote</h2>
                <p>Tell us what you need and we will reply with pricing and availability.</p>
              </div>
              <dl>
                <dt>Phone / WhatsApp</dt><dd>+91 XXXXX XXXXX</dd>
                <dt>Email</dt><dd>info@aggarwaltrading.com</dd>
                <dt>Address</dt><dd>Your business address, City, State, PIN</dd>
                <dt>Business hours</dt><dd>Mon–Sat, 10:00 AM – 7:00 PM</dd>
              </dl>
            </div>
            <form className="quote-form" onSubmit={submitEnquiry}>
              <div className="form-row">
                <label>
                  Name
                  <input name="n" required autoComplete="name" data-testid="input-name" />
                </label>
                <label>
                  Phone
                  <input name="p" type="tel" required autoComplete="tel" data-testid="input-phone" />
                </label>
              </div>
              <label>
                Product
                <select
                  name="s"
                  value={selectedProduct}
                  onChange={(event) => setSelectedProduct(event.target.value)}
                  data-testid="select-product"
                >
                  {products.map((product) => (
                    <option key={product.name} value={product.name}>{product.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Quantity required
                <input name="q" placeholder="e.g. 5,000 pcs" data-testid="input-quantity" />
              </label>
              <label>
                Message
                <textarea
                  name="m"
                  rows={3}
                  placeholder="Size, colour or other requirements"
                  data-testid="input-message"
                />
              </label>
              <button className="button" type="submit" data-testid="button-submit-enquiry">
                Prepare email enquiry <ArrowRight size={16} />
              </button>
              <p className="form-status" role="status" data-testid="status-enquiry">{formMessage}</p>
              <p className="form-disclaimer">
                Your email app will be used to send this enquiry. This website does not submit or
                store your details.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div className="footer-brand">
              <strong>AGGARWAL TRADING</strong><br />
              <em>Where Trust Begins</em>
            </div>
            <p>Quality Plastic Hardware. Reliable Solutions. Lasting Relationships.</p>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="footer-bottom">© 2026 Aggarwal Trading. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
