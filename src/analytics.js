// Analytics & LGPD Consent Management
class AnalyticsManager {
  constructor() {
    this.consent = this.getConsent();
    this.isInitialized = false;
  }

  // LGPD Consent Management
  getConsent() {
    return localStorage.getItem("lgpd-consent");
  }

  setConsent(consented) {
    localStorage.setItem("lgpd-consent", consented ? "granted" : "denied");
    this.consent = consented ? "granted" : "denied";

    if (consented && !this.isInitialized) {
      this.initializeAnalytics();
    } else if (!consented && this.isInitialized) {
      this.removeAnalytics();
    }
  }

  showConsentBanner() {
    if (this.consent) return;

    const banner = document.createElement("div");
    banner.id = "lgpd-banner";
    banner.innerHTML = `
      <div class="lgpd-banner-content">
        <p>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência e analisar o uso do site. 
          Ao continuar navegando, você concorda com nossa <a href="#politica-privacidade">Política de Privacidade</a>.
        </p>
        <div class="lgpd-buttons">
          <button id="lgpd-accept" class="lgpd-btn lgpd-accept">Aceitar Todos</button>
          <button id="lgpd-reject" class="lgpd-btn lgpd-reject">Rejeitar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Event listeners
    document.getElementById("lgpd-accept").addEventListener("click", () => {
      this.setConsent(true);
      this.hideBanner();
    });

    document.getElementById("lgpd-reject").addEventListener("click", () => {
      this.setConsent(false);
      this.hideBanner();
    });
  }

  hideBanner() {
    const banner = document.getElementById("lgpd-banner");
    if (banner) {
      banner.style.opacity = "0";
      setTimeout(() => banner.remove(), 300);
    }
  }

  // Google Analytics 4
  initializeAnalytics() {
    if (this.isInitialized || this.consent !== "granted") return;

    // Google Analytics 4 -
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-WC2QGCBDMQ";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WC2QGCBDMQ', {
        'anonymize_ip': true,
        'cookie_domain': 'auto',
        'cookie_flags': 'SameSite=Lax;Secure'
      });
    `;
    document.head.appendChild(script2);

    /* ========================================
   GOOGLE TAG MANAGER (GTM) - TEMPORARIAMENTE DESATIVADO
   ========================================
   
   MOTIVO: Desativado temporariamente conforme solicitação.
   STATUS: Código preservado para futura reativação.
   
   COMO REATIVAR:
   1. Remover este bloco de comentários
   2. Substituir GTM-XXXXXXX pelo Container ID real
   3. Testar funcionamento no Google Tag Assistant
   
   NOTA: GTM é útil para gerenciar múltiplos scripts de terceiros
   ========================================
   
    // Google Tag Manager - Substitua GTM-XXXXXXX com seu Container ID
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" 
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);

    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXX');
    `;
    document.head.appendChild(gtmScript);
   */

    /* ========================================
   META PIXEL (FACEBOOK) - TEMPORARIAMENTE DESATIVADO
   ========================================
   
   MOTIVO: Desativado temporariamente conforme solicitação.
   STATUS: Código preservado para futura reativação.
   
   COMO REATIVAR:
   1. Remover este bloco de comentários
   2. Substituir XXXXXXXXXXXXXXXXXXXX pelo Pixel ID real
   3. Testar funcionamento no Facebook Pixel Helper
   
   NOTA: Meta Pixel é essencial para campanhas de marketing no Facebook/Instagram
   ========================================
   
    // Meta Pixel - Substitua XXXXXXXXXXXXXXXXXXXX com seu Pixel ID
    const metaPixel = document.createElement('script');
    metaPixel.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'XXXXXXXXXXXXXXXXXX');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaPixel);
   */

    this.isInitialized = true;
  }

  removeAnalytics() {
    // Remove analytics cookies and scripts if consent is withdrawn
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (
        name.includes("_ga") ||
        name.includes("_gid") ||
        name.includes("_fbp")
      ) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }

  // Event Tracking
  trackEvent(eventName, parameters = {}) {
    if (this.consent !== "granted" || !this.isInitialized) return;

    // Google Analytics 4
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, parameters);
    }

    // Meta Pixel - TEMPORARIAMENTE DESATIVADO
    // Para reativar: remover comentários e garantir que fbq esteja disponível
    // if (typeof fbq !== 'undefined') {
    //   fbq('trackCustom', eventName, parameters);
    // }

    console.log("Event tracked:", eventName, parameters);
  }

  // Specific business events
  trackReservationClick() {
    this.trackEvent("reservation_click", {
      event_category: "engagement",
      event_label: "reserve_table",
    });
  }

  trackOrderClick() {
    this.trackEvent("order_click", {
      event_category: "engagement",
      event_label: "order_now",
    });
  }

  trackScrollDepth(depth) {
    this.trackEvent("scroll_depth", {
      event_category: "engagement",
      event_label: `${depth}%`,
    });
  }

  trackTimeOnPage(seconds) {
    this.trackEvent("time_on_page", {
      event_category: "engagement",
      event_label: `${Math.floor(seconds / 60)}min`,
      value: seconds,
    });
  }
}

// Initialize Analytics Manager
const analytics = new AnalyticsManager();

// Show consent banner on page load
document.addEventListener("DOMContentLoaded", () => {
  analytics.showConsentBanner();

  // Track button clicks
  const reserveButtons = document.querySelectorAll(
    'a[href*="reservas"], .btn-reserve',
  );
  reserveButtons.forEach((button) => {
    button.addEventListener("click", () => analytics.trackReservationClick());
  });

  const orderButtons = document.querySelectorAll('a[href*="wa.me"]');
  orderButtons.forEach((button) => {
    button.addEventListener("click", () => analytics.trackOrderClick());
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100,
    );
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (
        scrollPercent === 25 ||
        scrollPercent === 50 ||
        scrollPercent === 75 ||
        scrollPercent === 90
      ) {
        analytics.trackScrollDepth(scrollPercent);
      }
    }
  });

  // Track time on page
  let timeOnPage = 0;
  setInterval(() => {
    timeOnPage += 10;
    if (timeOnPage % 60 === 0) {
      analytics.trackTimeOnPage(timeOnPage);
    }
  }, 10000);
});

export default analytics;
