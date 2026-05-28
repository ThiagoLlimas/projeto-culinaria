// SEO & Performance Optimizations
class SEOManager {
  constructor() {
    this.init();
  }

  init() {
    this.addStructuredData();
    this.optimizeImages();
    this.preloadCriticalResources();
    this.setupCanonicalURL();
    this.addMetaViewport();
  }

  // JSON-LD Structured Data for Restaurant
  addStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Cumaru",
      description:
        "Restaurante premium especializado em culinária brasileira de fusão, unindo ingredientes nativos e técnicas contemporâneas.",
      url: "https://cumaru-receitas.netlify.app",
      telephone: "+55 11 99999-0000",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
      },
      openingHours: ["Mo-Su 18:30-23:30"],
      servesCuisine: ["Brasileira", "Fusão", "Contemporânea"],
      priceRange: "$$$",
      image: [
        "https://cumaru-receitas.netlify.app/src/assets/img-principal-menu1.webp",
      ],
      menu: "https://cumaru-receitas.netlify.app/cardapio.html",
      acceptsReservations: true,
      reservationUrl: "https://cumaru-receitas.netlify.app/reservas.html",
      sameAs: ["https://instagram.com/cumaru", "https://facebook.com/cumaru"],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
  }

  // Image Optimization
  optimizeImages() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      // Add loading="lazy" to images below the fold
      if (!img.loading) {
        img.loading = "lazy";
      }

      // Add error handling
      img.onerror = function () {
        this.style.display = "none";
        console.warn("Image failed to load:", this.src);
      };

      // Add proper alt text if missing
      if (!img.alt || img.alt.trim() === "") {
        img.alt = "Imagem do restaurante Cumaru";
      }
    });
  }

  // Preload Critical Resources
  preloadCriticalResources() {
    // Preload critical CSS
    const criticalCSS = document.createElement("link");
    criticalCSS.rel = "preload";
    criticalCSS.href = "/src/style.css";
    criticalCSS.as = "style";
    document.head.appendChild(criticalCSS);

    // Preload main JavaScript
    const mainJS = document.createElement("link");
    mainJS.rel = "preload";
    mainJS.href = "/src/main.js";
    mainJS.as = "script";
    document.head.appendChild(mainJS);

    // Preload hero images
    const heroImages = [
      "/src/assets/img-principal-menu1.webp",
      "/src/assets/img2-menu1.webp",
      "/src/assets/img3-menu1.webp",
      "/src/assets/img4-primeiro-menu.webp",
    ];

    heroImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      document.head.appendChild(link);
    });
  }

  // Setup Canonical URL
  setupCanonicalURL() {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.href;
    document.head.appendChild(canonical);
  }

  // Add Meta Viewport
  addMetaViewport() {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
      "width=device-width, initial-scale=1.0, maximum-scale=5.0";
    document.head.appendChild(viewport);
  }

  // Dynamic Meta Tags
  updateMetaTags(pageData) {
    const defaults = {
      title: "Cumaru - Restaurante de Culinária Brasileira Premium",
      description:
        "Experimente a essência da culinária brasileira em sua forma mais nobre. O Cumaru une ingredientes nativos e técnicas contemporâneas.",
      image: "/src/assets/img-principal-menu1.webp",
      url: window.location.href,
    };

    const data = { ...defaults, ...pageData };

    // Update title
    document.title = data.title;

    // Update or create meta description
    this.updateOrCreateMeta("description", data.description);

    // Open Graph
    this.updateOrCreateMeta("og:title", data.title, "property");
    this.updateOrCreateMeta("og:description", data.description, "property");
    this.updateOrCreateMeta("og:image", data.image, "property");
    this.updateOrCreateMeta("og:url", data.url, "property");
    this.updateOrCreateMeta("og:type", "website", "property");
    this.updateOrCreateMeta("og:site_name", "Cumaru", "property");

    // Twitter Cards
    this.updateOrCreateMeta("twitter:card", "summary_large_image");
    this.updateOrCreateMeta("twitter:title", data.title);
    this.updateOrCreateMeta("twitter:description", data.description);
    this.updateOrCreateMeta("twitter:image", data.image);

    // Additional SEO meta tags
    this.updateOrCreateMeta(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    );
    this.updateOrCreateMeta("author", "Cumaru Restaurante");
    this.updateOrCreateMeta("language", "pt-BR");
    this.updateOrCreateMeta("geo.region", "BR");
    this.updateOrCreateMeta("geo.placename", "Brasil");
  }

  updateOrCreateMeta(name, content, attribute = "name") {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  // Performance Monitoring
  setupPerformanceMonitoring() {
    // Core Web Vitals monitoring
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log("FID:", entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log("CLS:", clsValue);
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    }
  }
}

// Initialize SEO Manager
const seo = new SEOManager();

export default seo;
