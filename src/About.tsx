import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, FileSpreadsheet, Sparkles, ShieldCheck, Quote } from 'lucide-react';
import classes from './About.module.scss';

const highlights = [
  {
    title: 'Presné výpočty v reálnom čase',
    description: 'Záznam príchodov, odchodov a prestávok automaticky prepočíta vyťaženie aj rozdiely oproti plánu.',
    icon: Clock,
  },
  {
    title: 'Stabilné a bezpečné spracovanie',
    description: 'Všetky dáta ostávajú vo vašom prehliadači. Žiadne servery, žiadne prenosy, GDPR bez starostí.',
    icon: ShieldCheck,
  },
  {
    title: 'Excel & PDF pripravené na podpis',
    description: 'Exporty vo formátoch CSV, XLSX a PDF zachovajú formát, diakritiku a odporúčané podpisové riadky.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Moderný zážitok pre tím',
    description: 'Intuitívne ovládanie, sviatky prepočítané vopred a jasný prehľad o špecifických režimoch.',
    icon: Sparkles,
  },
];

const testimonials = [
  {
    quote:
      'Vďaka Vykazujeme máme internú dochádzku pripravenú na podpis za pár minút. Prestali sme manuálne opravovať chyby.',
    name: 'Lucia K.',
    role: 'HR manažérka, logistika',
  },
  {
    quote:
      'Export do Excelu je prehľadný aj pri skrátených úväzkoch. Konečne nemusím vysvetľovať kolegom, ako si majú počítať prestávku.',
    name: 'Peter M.',
    role: 'Vedúci oddelenia výroby',
  },
  {
    quote:
      'Páči sa mi, že všetko beží offline. Dáta zamestnancov nikam neposielame a pritom máme špičkový výsledok.',
    name: 'Zuzana B.',
    role: 'Personálna riaditeľka',
  },
];

export default function About(): JSX.Element {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonialCount = testimonials.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonialCount);
    }, 6000);

    return () => window.clearInterval(id);
  }, [testimonialCount]);

  return (
    <div className="space-y-10">
      <section className={`${classes.hero} text-slate-50 shadow-2xl`}>        
        <span className={`${classes.floatingOrb}`} aria-hidden="true" />
        <span className={`${classes.floatingOrb}`} aria-hidden="true" />
        <div className="relative z-10 px-6 py-14 sm:px-10 md:px-16 lg:px-20">
          <div className="max-w-4xl space-y-6">
            <span className={`${classes.brand} inline-flex font-heading uppercase tracking-[0.45em] text-xs md:text-sm rounded-full px-6 py-2`}>Vykazujeme</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight">
              Dochádzka, ktorá pôsobí profesionálne a spoľahlivo
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-slate-200/90">
              Zaznamenajte pracovné dni, sviatky aj špecifické režimy bez kompromisov. Vykazujeme spája dlhoročnú
              prax v dochádzke so súčasným dizajnom, aby bol výsledný dokument pripravený na podpis okamžite.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="/attendance"
                className="group inline-flex items-center gap-2 rounded-full bg-sky-400/90 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-300"
              >
                Začať s dochádzkou
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="/tutorials"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 font-semibold text-slate-50 transition hover:bg-white/10"
              >
                Pozrieť návody
              </a>
              <span className="text-sm text-slate-100/80">Bez registrácie, dáta zostávajú u vás.</span>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className={`${classes.glassCard} rounded-3xl p-6 text-slate-900`}>
                  <Icon className="h-8 w-8 text-sky-500" aria-hidden="true" />
                  <h3 className="font-heading mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600/90">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[3fr_2fr] items-start">
        <div className={`${classes.quoteCard} relative overflow-hidden rounded-3xl p-8 lg:p-10 text-slate-800`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-heading text-2xl font-semibold text-slate-900">Hlasy spokojných tímov</p>
              <p className="text-sm text-slate-600/80">Krátke svedectvá firiem, ktoré už Vykazujeme používajú denne.</p>
            </div>
            <Quote className="h-10 w-10 text-sky-500" aria-hidden="true" />
          </div>
          <div className="relative mt-8 min-h-[160px]">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`absolute inset-0 transform rounded-2xl bg-white/70 p-6 shadow-sm transition-all duration-700 ${
                  activeTestimonial === index ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                aria-hidden={activeTestimonial === index ? 'false' : 'true'}
              >
                <p className="text-base md:text-lg text-slate-700">“{testimonial.quote}”</p>
                <p className="mt-6 font-heading text-sm font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">{testimonial.role}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                className={`h-2.5 w-8 rounded-full transition ${
                  activeTestimonial === index ? 'bg-sky-500' : 'bg-slate-300/70 hover:bg-slate-400'
                }`}
                aria-label={`Zobraziť referenciu ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl">
            <h2 className="font-heading text-xl font-semibold text-slate-900">Prečo firmy veria Vykazujeme</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Prispôsobenie prestávok aj výnimiek bez komplikácií.</li>
              <li>• Denné aj mesačné prehľady v jednom rozhraní.</li>
              <li>• Intuitívny dizajn, ktorý využijú aj kolegovia bez školenia.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-sky-200 bg-sky-50/90 p-6 shadow-lg">
            <h3 className="font-heading text-lg font-semibold text-slate-900">Potrebujete viac informácií?</h3>
            <p className="mt-3 text-sm text-slate-600">
              Pozrite si detailné odpovede v časti FAQ alebo nám napíšte. Radi vám poradíme, ako nastaviť dochádzku pre
              váš tím.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/faq"
                className="inline-flex items-center justify-center rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Kontakt
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
