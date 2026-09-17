import type { SiteConfig } from "./types";

/**
 * Contenido de este sitio (Iara Yael Baudino).
 * Para vender la plantilla: cloná el repo y cambiá este archivo
 * o editá todo desde /admin.
 */
export const site: SiteConfig = {
  photographer: {
    name: "Iara Yael Baudino",
    role: "Fotografía",
    location: "Buenos Aires",
    available: true,
    availabilityLabel: "Disponible",
    instagram: "@iarayaelbaudino",
    instagramUrl: "https://instagram.com/iarayaelbaudino",
    email: "hola@iarayaelbaudino.com",
  },
  seo: {
    title: "Iara Yael Baudino — Fotografía",
    description:
      "Fotografía y dirección visual. Retratos, editorial y documental con base en Buenos Aires.",
  },
  nav: [
    { id: "galeria", href: "#galeria", label: "mi Trabajo" },
    { id: "sobre-mi", href: "#sobre-mi", label: "Sobre mí" },
    { id: "contacto", href: "#contacto", label: "Contacto" },
  ],
  hero: {
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Fotografía cinematográfica urbana en contraluz",
    focusX: 50,
    focusY: 50,
  },
  gallery: {
    title: "Obras Recientes",
    categories: [
      { id: "all", label: "Todos" },
      { id: "retratos", label: "Retratos" },
      { id: "editorial", label: "Editorial" },
      { id: "documental", label: "Documental" },
      { id: "producto", label: "Producto" },
    ],
    works: [
      {
        id: "sombras-concreto",
        title: "Sombras en el Concreto / Retratos 2025",
        meta: "Serie 01 — 35mm • Buenos Aires",
        alt: "Retrato editorial dramático con sombras marcadas en concreto",
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1800&q=80",
        category: "retratos",
        span: "md:col-span-8",
        aspect: "aspect-[16/10]",
        grayscale: true,
      },
      {
        id: "crepusculo-urbano",
        title: "Crepúsculo Urbano / Editorial de Moda",
        meta: "Editorial • Edición impresa",
        alt: "Silueta arquitectónica en crepúsculo editorial de moda",
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
        category: "editorial",
        span: "md:col-span-4",
        aspect: "aspect-[2/3]",
      },
      {
        id: "forma-vacio",
        title: "Forma y Vacío / Naturaleza Muerta",
        meta: "Estudio • Impresión de archivo",
        alt: "Bodegón de hormigón brutalista y cerámica pura",
        src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80",
        category: "producto",
        span: "md:col-span-5",
        aspect: "aspect-square",
      },
      {
        id: "detras-escena",
        title: "Detrás de Escena / Serie Documental",
        meta: "Ensayo de cámara",
        alt: "Escena documental íntima en camerinos y teatro",
        src: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1800&q=80",
        category: "documental",
        span: "md:col-span-6",
        aspect: "aspect-[16/10]",
        grayscale: true,
      },
    ],
  },
  about: {
    title: "Sobre mí",
    bio: "Soy Iara Yael Baudino. Trabajo la fotografía como un espacio entre la luz, el silencio y los cuerpos que habitan una ciudad. Con base en Buenos Aires, armo retratos, piezas editoriales y series documentales con una mirada íntima y precisa. Este sitio es mi archivo vivo.",
    portrait:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    portraitAlt: "Retrato de Iara Yael Baudino",
    rows: [
      {
        label: "Ubicación",
        value: "Buenos Aires, Argentina • Disponible para viajar",
      },
      {
        label: "Enfoque",
        value: "Retratos • Editorial • Eventos • Documental",
      },
      {
        label: "Agenda",
        value: "Abierta para encargos y colaboraciones",
        muted: true,
      },
    ],
  },
  contact: {
    title: "HABLEMOS.",
    subtitle: "¿Tenés un proyecto, una idea o una historia que querés contar?",
    availabilityNote: "Agenda abierta",
    projectTypes: [
      { value: "editorial", label: "Editorial de Moda / Portada" },
      { value: "retrato", label: "Retrato de Artista / Personal" },
      { value: "campana", label: "Campaña Comercial / Marca" },
      { value: "documental", label: "Ensayo Documental / Cobertura" },
      { value: "otro", label: "Otro Proyecto Especial" },
    ],
  },
};
