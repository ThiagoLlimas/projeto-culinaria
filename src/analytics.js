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

  // Google Analytics 4 - GA4 is now loaded directly in HTML files
  // This method is kept for LGPD consent management only
  initializeAnalytics() {
    if (this.isInitialized || this.consent !== "granted") return;

    // GA4 is initialized via HTML tags for proper Google Analytics validation
    // This method only marks analytics as initialized for consent tracking
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
