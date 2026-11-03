import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/00002.jpeg";
import profilePhoto from "@/assets/001.jpeg";
import { projects, gallery, stats, testimonials, contact, type Category } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MK — Developer & Graphics Designer" },
      {
        name: "description",
        content: "Portfolio of MK: web development, graphics design, UI/UX and digital branding.",
      },
      { property: "og:title", content: "MK — Developer & Graphics Designer" },
      { property: "og:description", content: "Creating digital experiences that matter." },
    ],
  }),
  component: Index,
});

const nav = ["Home", "About", "Services", "Portfolio", "Contact"];
const filters: ("All" | Category)[] = [
  "All",
  "Graphics Design",
  "Branding",
];
const services = [
  {
    t: "Web Development",
    i: [
      "Business websites",
      "E-commerce platforms",
      "Web applications",
      "Business management systems",
      "Admin dashboards",
      "Responsive websites",
      "Database integration",
      "Website maintenance",
    ],
  },
  {
    t: "Graphics Design",
    i: [
      "Logo design",
      "Visual identity",
      "Posters & flyers",
      "Business cards",
      "Marketing graphics",
      "Social media designs",
      "Advertising materials",
    ],
  },
  {
    t: "UI/UX Design",
    i: [
      "Website interfaces",
      "Dashboard interfaces",
      "Wireframes",
      "Prototypes",
      "UX optimization",
    ],
  },
  {
    t: "Digital Branding",
    i: [
      "Brand identity systems",
      "Visual communication",
      "Creative direction",
      "Brand consistency",
    ],
  },
];
const skills = {
  "Web Development": [
    "html5",
    "css3",
    "javascript",
    "react",
    "vite",
    "tailwindcss",
    "php",
    "supabase",
    "mysql",
    "postgresql",
    "git",
    "github",
  ],
  "Graphic Design": ["adobephotoshop", "adobeillustrator", "figma", "canva"],
};
const steps = [
  ["Discovery", "Understanding project goals and requirements."],
  ["Strategy", "Planning the technical and creative direction."],
  ["Design", "Developing visual concepts and user experiences."],
  ["Development", "Building functional, responsive digital products."],
  ["Delivery", "Testing, optimizing and launching."],
];

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <path
        d="M8 30V10l7 11 7-11v20M26 10v20M26 21l7-11M28.5 18L34 30"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="label-mono text-muted-foreground">
      <span className="text-primary">{n}</span> — {children}
    </p>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [lb, setLb] = useState<number | null>(null);
  const [aboutPhotoVisible, setAboutPhotoVisible] = useState(false);
  const aboutPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
      for (const id of nav.map((n) => n.toLowerCase()).reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(id);
          break;
        }
      }
    };
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const photo = aboutPhotoRef.current;
    if (!photo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAboutPhotoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(photo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((lb + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLb((lb - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb]);

  const shown = projects.filter((p) => filter === "All" || p.category === filter);
  const btn = "label-mono inline-flex items-center gap-3 border px-6 py-4 transition-colors";

  return (
    <div className="overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#home" className="flex items-center gap-3">
            <Monogram className="h-9 w-9 text-foreground" />
            <span className="label-mono hidden sm:block">MK-Dev & Graphics</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className={`group label-mono relative py-1 transition-colors duration-300 hover:text-primary focus-visible:text-primary ${active === n.toLowerCase() ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ${active === n.toLowerCase() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"}`}
                />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <span className="label-mono hidden items-center gap-2 text-muted-foreground lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Available
            </span>
            <a
              href="#contact"
              className={`${btn} hidden border-primary px-4 py-2.5 text-primary hover:bg-primary hover:text-primary-foreground md:inline-flex`}
            >
              Let's Talk
            </a>
            <button
              className="label-mono md:hidden"
              onClick={() => setMenu(!menu)}
              aria-label="Menu"
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-border bg-background px-6 py-8 md:hidden">
            {nav.map((n, i) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                onClick={() => setMenu(false)}
                className="flex items-baseline gap-4 border-b border-border py-4 font-display text-3xl transition-all duration-300 hover:translate-x-1 hover:text-primary focus-visible:text-primary"
              >
                <span className="label-mono text-primary">0{i + 1}</span>
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-12"
      >
        <div className="reveal lg:col-span-7">
          <p className="label-mono text-primary">Independent Digital Creative</p>
          <p className="label-mono mt-3 text-muted-foreground">MK-Dev & Graphics Designer</p>
          <h1 className="display-xl mt-8">
            Creating
            <br />
            <span className="font-serif italic font-normal text-primary">digital</span> experiences
            <br />
            that matter.
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            I am a web developer and graphics designer passionate about building beautiful digital
            experiences and creating impactful visual identities.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className={`${btn} border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary`}
            >
              Explore my work →
            </a>
            <a href="#contact" className={`${btn} border-border hover:border-foreground`}>
              Start a project
            </a>
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <div className="absolute -inset-4 border border-border" />
          <img
            src={heroImage}
            alt="Back view of a person wearing a Run Africa Tours shirt in a forest"
            width={1024}
            height={1280}
            className="relative aspect-[4/5] w-full object-cover"
          />
          <p className="label-mono absolute -bottom-10 right-0 text-muted-foreground">
            Fig. 01 — Code × Form
          </p>
        </div>
        <div className="label-mono absolute bottom-8 left-6 right-6 hidden justify-between text-muted-foreground md:flex">
          <span>↓ Scroll</span>
          <span>{contact.location}</span>
          <span>Development · Design · UI/UX · Branding</span>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="portfolio" className="border-t border-border py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="01">Portfolio</Label>
          <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="display-lg">
              Selected <span className="font-serif italic font-normal">work</span>
            </h2>
            <p className="max-w-sm text-muted-foreground">
              A curated collection of digital experiences, creative concepts and visual identities.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`label-mono border px-4 py-2 transition-colors ${filter === f ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
                <article key={p.name + i} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-card p-3 sm:p-4">
                  <span className="label-mono absolute right-5 top-5 z-10 rounded-full border border-primary/50 bg-background/95 px-3 py-2 text-[0.58rem] leading-none text-primary shadow-lg backdrop-blur-sm">
                    Design · TSh 12,000
                  </span>
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-[auto_1fr_auto]">
                    <span className="label-mono text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl">{p.name}</h3>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground">{p.description}</p>
                      <p className="label-mono mt-4 text-muted-foreground">{p.tools.join(" / ")}</p>
                    </div>
                    <div className="label-mono text-right text-muted-foreground">
                      <p>{p.category}</p>
                      <p className="mt-1">{p.year}</p>
                      <div className="mt-3 flex justify-end gap-3">
                        {p.live && (
                          <a href={p.live} className="text-primary">
                            Live ↗
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} className="text-primary">
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* GRAPHICS EXHIBITION */}
      <section className="border-t border-border bg-secondary py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="02">Exhibition</Label>
          <h2 className="display-lg mt-6">
            Visual stories.
            <br />
            <span className="font-serif italic font-normal text-primary">Creative impact.</span>
          </h2>
          <p className="label-mono mt-6 max-w-2xl leading-loose text-muted-foreground">
            Logos · Brand identity · Posters · Flyers · Social media · Business cards · Advertising
            · Promotional
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <button
                key={g.title}
                onClick={() => setLb(i)}
                className="group relative aspect-[4/5] overflow-hidden bg-card text-left"
              >
                <span className="label-mono absolute right-3 top-3 z-10 rounded-full border border-primary/50 bg-background/95 px-3 py-2 text-[0.58rem] leading-none text-primary shadow-lg backdrop-blur-sm">
                  Design · TSh 12,000
                </span>
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="label-mono text-primary">{g.category}</p>
                  <p className="mt-1 text-xl">{g.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lb !== null && gallery[lb] && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 p-6 backdrop-blur"
          onClick={() => setLb(null)}
        >
          <img
            src={gallery[lb]!.image}
            alt={gallery[lb]!.title}
            className="max-h-[78vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className="mt-6 flex w-full max-w-3xl items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="label-mono"
              onClick={() => setLb((lb - 1 + gallery.length) % gallery.length)}
            >
              ← Prev
            </button>
            <div className="text-center">
              <p className="label-mono text-primary">{gallery[lb]!.category}</p>
              <p className="text-xl">{gallery[lb]!.title}</p>
            </div>
            <button className="label-mono" onClick={() => setLb((lb + 1) % gallery.length)}>
              Next →
            </button>
          </div>
          <button className="label-mono absolute right-6 top-6" onClick={() => setLb(null)}>
            Close ✕
          </button>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="border-t border-border py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div
            ref={aboutPhotoRef}
            className={`about-photo relative ${aboutPhotoVisible ? "is-visible" : ""}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card shadow-2xl shadow-black/20">
              <img
                src={profilePhoto}
                alt="Portrait beside a waterfall"
                loading="lazy"
                className="h-full w-full object-cover object-[center_42%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent px-6 pb-6 pt-20">
                <span className="label-mono text-primary">{contact.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Label n="03">About</Label>
            <h2 className="display-lg mt-6">
              Design minded.
              <br />
              <span className="font-serif italic font-normal">Technology driven.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              I work where code meets craft — combining web development, graphics design, UI/UX and
              digital branding. I love solving problems creatively, turning ideas into products that
              work beautifully and identities that people remember.
            </p>
            <div className="mt-12 grid grid-cols-2 border-l border-t border-border">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-r border-border p-6">
                  <p className="font-display text-4xl text-primary">{s.value}</p>
                  <p className="label-mono mt-2 text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="04">Services</Label>
          <h2 className="display-lg mt-6">
            What I <span className="font-serif italic font-normal text-primary">do</span>
          </h2>
          <div className="mt-16 border-t border-border">
            {services.map((s, i) => (
              <div
                key={s.t}
                className="group grid gap-6 border-b border-border py-10 transition-colors hover:bg-card md:grid-cols-12 md:px-4"
              >
                <span className="label-mono text-primary md:col-span-1">0{i + 1}</span>
                <h3 className="text-3xl transition-transform duration-500 group-hover:translate-x-3 md:col-span-5 md:text-5xl">
                  {s.t}
                </h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground md:col-span-6">
                  {s.i.map((x) => (
                    <li key={x}>— {x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-border bg-secondary py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="05">Toolkit</Label>
          <h2 className="display-lg mt-6">
            Skills & <span className="font-serif italic font-normal">technology</span>
          </h2>
          {Object.entries(skills).map(([group, list]) => (
            <div key={group} className="mt-14">
              <p className="label-mono mb-6 text-muted-foreground">{group}</p>
              <div className="grid grid-cols-3 border-l border-t border-border sm:grid-cols-4 lg:grid-cols-6">
                {list.map((s) => (
                  <div
                    key={s}
                    className="group flex flex-col items-center gap-3 border-b border-r border-border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${s}/e3c27d`}
                      alt=""
                      loading="lazy"
                      className="h-8 w-8 opacity-75 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <span className="label-mono text-center text-[0.62rem] transition-colors duration-300 group-hover:text-primary">
                      {s.replace("adobe", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="06">Process</Label>
          <h2 className="display-lg mt-6">
            Creative <span className="font-serif italic font-normal text-primary">workflow</span>
          </h2>
          <div className="relative mt-16 grid gap-10 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-3 hidden h-px bg-border md:block" />
            {steps.map(([t, d], i) => (
              <div key={t} className="reveal relative" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="relative block h-6 w-6 rounded-full border border-primary bg-background" />
                <p className="label-mono mt-6 text-primary">0{i + 1}</p>
                <h3 className="mt-2 text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-secondary py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Label n="07">Kind words</Label>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure key={i} className="border-l border-primary pl-8">
                <blockquote className="font-serif text-3xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="label-mono mt-6 text-muted-foreground">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <Label n="08">Contact</Label>
            <h2 className="display-xl mt-6">
              Let's build
              <br />
              <span className="font-serif italic font-normal text-primary">something</span> great.
            </h2>
            <div className="label-mono mt-12 space-y-3 text-muted-foreground">
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-primary">
                  {contact.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contact.phone}`} className="hover:text-primary">
                  {contact.phone}
                </a>
              </p>
              <p>{contact.location}</p>
            </div>
          </div>
          <form
            className="space-y-6 self-end"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry — ${f.get("name")}`)}&body=${encodeURIComponent(`${f.get("message")}\n\n${f.get("name")} · ${f.get("email")}`)}`;
            }}
          >
            {[
              ["name", "Your name", "text"],
              ["email", "Email address", "email"],
            ].map(([n, l, t]) => (
              <input
                key={n}
                name={n}
                type={t}
                required
                placeholder={l}
                maxLength={120}
                className="w-full border-b border-border bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            ))}
            <textarea
              name="message"
              required
              rows={4}
              maxLength={2000}
              placeholder="Tell me about your project"
              className="w-full resize-none border-b border-border bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              className={`${btn} border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary`}
            >
              Send message →
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="label-mono mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-10 text-muted-foreground md:flex-row">
          <span className="flex items-center gap-3">
            <Monogram className="h-6 w-6 text-foreground" />
            MK-Dev & Graphics Designer
          </span>
          <span className="credit-line">
            © {new Date().getFullYear()} — Crafted by <span className="credit-name">Zeph-codes</span>
          </span>
          <a href="#home" className="hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
