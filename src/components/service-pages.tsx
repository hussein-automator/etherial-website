import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/etherial";
import { fetchProjects } from "@/lib/wix";
import { SERVICE_SILOS, getService, type SiloSlug } from "@/lib/service-silos";

function Breadcrumbs({ section, service }: { section: SiloSlug; service?: string }) {
  const parent = SERVICE_SILOS[section];
  const child = service ? getService(section, service) : undefined;
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="u-reveal">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li>{child ? <Link to="/$section" params={{ section }} className="u-reveal">{parent.name}</Link> : <span aria-current="page">{parent.name}</span>}</li>
        {child && <><li aria-hidden="true">/</li><li aria-current="page" className="text-ink">{child.name}</li></>}
      </ol>
    </nav>
  );
}

function ProjectGallery({ category, label }: { category: string; label: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const { data: projects = [] } = useQuery({
    queryKey: ["wix-projects", category],
    queryFn: () => fetchProjects(category),
    enabled: ready,
    retry: false,
  });
  return (
    <section className="mt-20 border-t border-rule pt-12" aria-label="Project photographs">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-3xl text-ink">Project gallery</h2>
        {projects.length === 0 && <p className="text-sm text-muted-foreground">Project photography to be supplied.</p>}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <figure key={p.id} className="frame-fold overflow-hidden rounded-[48px_6px_48px_6px] bg-linen">
            {p.image ? <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" /> : <ImagePlaceholder label={`${p.title} — photo to be supplied`} />}
            <figcaption className="p-4"><p className="text-sm font-semibold text-ink">{p.title}</p>{p.description && <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>}</figcaption>
          </figure>
        ))}
        {projects.length === 0 && <ImagePlaceholder label={`${label} — project photo (client to supply)`} />}
      </div>
    </section>
  );
}

export function ServicePage({ section, service }: { section: SiloSlug; service?: string }) {
  const parent = SERVICE_SILOS[section];
  const child = service ? getService(section, service) : undefined;
  const content = child ?? parent;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <Breadcrumbs section={section} service={service} />
      <header className="mt-12 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass">{child ? parent.name : "Portfolio / Services"}</p>
        <h1 className="font-display mt-4 text-4xl leading-tight text-ink md:text-6xl">{content.title}</h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{content.intro}</p>
        <Link to="/contact" className="btn-liquid mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-primary-foreground">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
      </header>
      {!child && (
        <section className="mt-20 border-t border-rule pt-12" aria-label={`${parent.name} services`}>
          <h2 className="font-display text-3xl text-ink">Explore {parent.name.toLowerCase()}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {Object.entries(parent.children).map(([slug, item]) => (
              <Link key={slug} to="/$section/$service" params={{ section, service: slug }} className="group block">
                <ImagePlaceholder label={`${item.name} — photo (client to supply)`} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div><h3 className="font-display text-2xl text-ink">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.intro}</p></div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-brass" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <ProjectGallery category={child ? service ?? parent.wixCategory : parent.wixCategory} label={content.title} />
      {child && <div className="mt-12 border-t border-rule pt-8"><Link to="/$section" params={{ section }} className="u-reveal text-sm font-medium text-ink">Explore all {parent.name.toLowerCase()}</Link></div>}
    </div>
  );
}