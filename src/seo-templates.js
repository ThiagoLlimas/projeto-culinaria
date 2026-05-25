// SEO Templates for different pages
export const seoTemplates = {
  cardapio: {
    title: "Cardápio - Cumaru Restaurante | Nossa Culinária Brasileira Premium",
    description:
      "Conheça nosso cardápio completo com pratos autorais que celebram a culinária brasileira. Desde petiscos gourmet até cortes premium na brasa.",
    keywords:
      "cardápio restaurante, pratos brasileiros, comida gourmet, Vitória ES, culinária premium",
    image: "/src/assets/img-principal-menu1.webp",
  },
  nossaraiz: {
    title: "Nossa Raiz - Cumaru | A História por Trás da Culinária Brasileira",
    description:
      "Descubra a história e filosofia do Cumaru. Resgatamos tradições culinárias brasileiras com técnicas contemporâneas.",
    keywords:
      "história restaurante, filosofia culinária, tradição brasileira, conceito restaurante",
    image: "/src/assets/img-principal-menu1.webp",
  },
  carnes: {
    title: "Carnes na Brasa - Cumaru | Os Melhores Cortes Brasileiros",
    description:
      "Experimente nossas carnes premium selecionadas e preparadas na brasa. Picanha, costela, filé e muito mais com toques brasileiros.",
    keywords:
      "carnes na brasa, churrasco brasileiro, cortes premium, restaurante de carne, picanha",
    image: "/src/assets/carne-queijo.webp",
  },
  petiscos: {
    title: "Petiscos Gourmet - Cumaru | A Melhor Comida Brasileira",
    description:
      "Nossos petiscos elevam a tradição dos botecos brasileiros ao nível gourmet. Coxinha, bolinho de bacalhau e muito mais.",
    keywords:
      "petiscos gourmet, comida de boteco, salgados brasileiros, bar restaurante, petiscaria",
    image: "/src/assets/img2-menu1.webp",
  },
  drinks: {
    title: "Drinks - Cumaru | Caipirinhas e Bebidas Brasileiras",
    description:
      "Nossa seleção de drinks autorais com ingredientes brasileiros. Caipirinhas premium, cachaças artesanais e muito mais.",
    keywords:
      "drinks brasileiros, caipirinha, cachaça artesanal, coquetéis, bar restaurante",
    image: "/src/assets/bebida-com-laranja.webp",
  },
};

// Function to generate SEO meta tags for a specific page
export function generateSEOHead(pageKey, url) {
  const template = seoTemplates[pageKey];
  if (!template) return "";

  return `
    <!-- SEO Meta Tags -->
    <title>${template.title}</title>
    <meta name="description" content="${template.description}" />
    <meta name="keywords" content="${template.keywords}" />
    <meta name="author" content="Cumaru Restaurante" />
    <meta name="language" content="pt-BR" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${template.title}" />
    <meta property="og:description" content="${template.description}" />
    <meta property="og:image" content="https://cumaru-restaurante.com.br${template.image}" />
    <meta property="og:url" content="https://cumaru-restaurante.com.br${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Cumaru" />
    <meta property="og:locale" content="pt_BR" />
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${template.title}" />
    <meta name="twitter:description" content="${template.description}" />
    <meta name="twitter:image" content="https://cumaru-restaurante.com.br${template.image}" />
    
    <!-- Geolocation SEO -->
    <meta name="geo.region" content="BR" />
    <meta name="geo.placename" content="Brasil" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://cumaru-restaurante.com.br${url}" />
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Font Preload -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Oswald:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Oswald:wght@400;500;600;700&display=swap" /></noscript>
    
    <!-- Critical CSS Preload -->
    <link rel="preload" href="/src/style.css" as="style" />
    <link rel="preload" href="/src/lgpd-banner.css" as="style" />
    
    <!-- Critical JS Preload -->
    <link rel="preload" href="/src/main.js" as="script" />
    <link rel="preload" href="/src/seo.js" as="script" />
    <link rel="preload" href="/src/analytics.js" as="script" />
    
    <!-- Hero Images Preload -->
    <link rel="preload" href="${template.image}" as="image" />
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/src/style.css" />
    <link rel="stylesheet" href="/src/lgpd-banner.css" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  `;
}

// Function to generate accessibility improvements
export function generateAccessibilityMarkup() {
  return `
    role="banner"
    aria-label="Navegação principal"
    role="navigation"
    aria-label="Navegação principal"
    role="menubar"
    role="none"
    role="menuitem"
    role="contentinfo"
    aria-expanded="false"
    aria-label="Abrir menu mobile"
    aria-required="true"
    aria-live="polite"
    role="status"
  `;
}
