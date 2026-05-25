/**
 * ========================================
 * LGPD Cookie Consent Manager - Premium
 * Sistema de Consentimento de Cookies
 * ========================================
 */

class LGPDConsentManager {
  constructor() {
    this.storageKey = 'cumaru_lgpd_consent';
    this.consent = this.getStoredConsent();
    this.analyticsBlocked = true;
    this.isCustomizing = false;
    
    // IDs dos elementos
    this.elements = {
      banner: 'lgpd-banner',
      overlay: 'lgpd-overlay',
      acceptAll: 'lgpd-accept-all',
      reject: 'lgpd-reject',
      customize: 'lgpd-customize',
      savePreferences: 'lgpd-save-preferences',
      cancelCustomize: 'lgpd-cancel-customize',
      customPanel: 'lgpd-customize-panel',
      analyticsCheckbox: 'analytics-cookies'
    };
    
    this.init();
  }

  /**
   * Inicializa o sistema de consentimento
   */
  init() {
    // Se já tem consentimento, não mostrar banner
    if (this.consent) {
      this.applyConsent(this.consent);
      return;
    }

    // Inserir banner na página
    this.insertBannerHTML();
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
    
    // Mostrar banner após delay
    setTimeout(() => this.showBanner(), 1500);
  }

  /**
   * Insere o HTML do banner na página
   */
  insertBannerHTML() {
    const bannerHTML = `
      <!-- LGPD Cookie Consent Banner - Premium Design -->
      <div id="${this.elements.banner}" class="lgpd-banner" role="dialog" aria-labelledby="lgpd-title" aria-describedby="lgpd-description">
        <div class="lgpd-container">
          <!-- Header com ícone -->
          <div class="lgpd-header">
            <div class="lgpd-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#d9c1a0"/>
                <circle cx="12" cy="12" r="10" stroke="#d9c1a0" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <h3 id="lgpd-title" class="lgpd-title">Sua Privacidade é Nossa Prioridade</h3>
          </div>

          <!-- Conteúdo principal -->
          <div class="lgpd-content">
            <p id="lgpd-description" class="lgpd-description">
              Utilizamos cookies essenciais para garantir a melhor experiência em nosso site. 
              Ao aceitar, você permite o uso de analytics para melhorar nossos serviços e 
              oferecer conteúdo personalizado.
            </p>
            
            <!-- Links de políticas -->
            <div class="lgpd-links">
              <a href="#politica-privacidade" class="lgpd-link" aria-label="Ler Política de Privacidade">
                Política de Privacidade
              </a>
              <span class="lgpd-separator">•</span>
              <a href="#politica-cookies" class="lgpd-link" aria-label="Ler Política de Cookies">
                Política de Cookies
              </a>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="lgpd-actions">
            <button id="${this.elements.acceptAll}" class="lgpd-btn lgpd-btn-primary" aria-label="Aceitar todos os cookies">
              Aceitar Todos
            </button>
            
            <button id="${this.elements.customize}" class="lgpd-btn lgpd-btn-secondary" aria-label="Personalizar preferências de cookies">
              Personalizar
            </button>
            
            <button id="${this.elements.reject}" class="lgpd-btn lgpd-btn-tertiary" aria-label="Rejeitar cookies não essenciais">
              Rejeitar
            </button>
          </div>

          <!-- Painel de personalização -->
          <div id="${this.elements.customPanel}" class="lgpd-customize-panel" role="tabpanel">
            <h4 class="lgpd-panel-title">Personalizar Cookies</h4>
            
            <div class="lgpd-cookie-category">
              <div class="lgpd-category-header">
                <label for="essential-cookies" class="lgpd-category-label">
                  <span class="lgpd-category-name">Cookies Essenciais</span>
                  <span class="lgpd-category-desc">Necessários para o funcionamento do site</span>
                </label>
                <input type="checkbox" id="essential-cookies" checked disabled class="lgpd-checkbox">
              </div>
            </div>

            <div class="lgpd-cookie-category">
              <div class="lgpd-category-header">
                <label for="${this.elements.analyticsCheckbox}" class="lgpd-category-label">
                  <span class="lgpd-category-name">Analytics</span>
                  <span class="lgpd-category-desc">Nos ajudam a melhorar o site</span>
                </label>
                <input type="checkbox" id="${this.elements.analyticsCheckbox}" class="lgpd-checkbox">
              </div>
            </div>

            <div class="lgpd-panel-actions">
              <button id="${this.elements.savePreferences}" class="lgpd-btn lgpd-btn-primary">
                Salvar Preferências
              </button>
              <button id="${this.elements.cancelCustomize}" class="lgpd-btn lgpd-btn-tertiary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div id="${this.elements.overlay}" class="lgpd-overlay" aria-hidden="true"></div>
    `;

    // Inserir antes do fechamento do body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Botão Aceitar Todos
    const acceptBtn = document.getElementById(this.elements.acceptAll);
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptAll());
    }

    // Botão Rejeitar
    const rejectBtn = document.getElementById(this.elements.reject);
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.reject());
    }

    // Botão Personalizar
    const customizeBtn = document.getElementById(this.elements.customize);
    if (customizeBtn) {
      customizeBtn.addEventListener('click', () => this.showCustomizePanel());
    }

    // Salvar Preferências
    const saveBtn = document.getElementById(this.elements.savePreferences);
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveCustomPreferences());
    }

    // Cancelar Personalização
    const cancelBtn = document.getElementById(this.elements.cancelCustomize);
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.hideCustomizePanel());
    }

    // Overlay
    const overlay = document.getElementById(this.elements.overlay);
    if (overlay) {
      overlay.addEventListener('click', () => this.hideCustomizePanel());
    }

    // Navegação por teclado
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  /**
   * Mostra o banner principal
   */
  showBanner() {
    const banner = document.getElementById(this.elements.banner);
    if (banner) {
      banner.classList.add('show');
      this.trapFocus(banner);
    }
  }

  /**
   * Esconde o banner principal
   */
  hideBanner() {
    const banner = document.getElementById(this.elements.banner);
    if (banner) {
      banner.classList.remove('show');
      this.removeFocusTrap(banner);
    }
  }

  /**
   * Aceita todos os cookies
   */
  acceptAll() {
    const consentData = {
      essential: true,
      analytics: true,
      marketing: false,
      timestamp: Date.now(),
      version: '1.0'
    };

    this.saveConsent(consentData);
    this.applyConsent(consentData);
    this.hideBanner();
    this.showSuccessFeedback('Todos os cookies aceitos');
  }

  /**
   * Rejeita cookies não essenciais
   */
  reject() {
    const consentData = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: '1.0'
    };

    this.saveConsent(consentData);
    this.applyConsent(consentData);
    this.hideBanner();
    this.showSuccessFeedback('Apenas cookies essenciais aceitos');
  }

  /**
   * Mostra painel de personalização
   */
  showCustomizePanel() {
    const panel = document.getElementById(this.elements.customPanel);
    const overlay = document.getElementById(this.elements.overlay);
    
    if (panel && overlay) {
      panel.classList.add('show');
      overlay.classList.add('show');
      this.isCustomizing = true;
    }
  }

  /**
   * Esconde painel de personalização
   */
  hideCustomizePanel() {
    const panel = document.getElementById(this.elements.customPanel);
    const overlay = document.getElementById(this.elements.overlay);
    
    if (panel && overlay) {
      panel.classList.remove('show');
      overlay.classList.remove('show');
      this.isCustomizing = false;
    }
  }

  /**
   * Salva preferências personalizadas
   */
  saveCustomPreferences() {
    const analyticsCheckbox = document.getElementById(this.elements.analyticsCheckbox);
    const analyticsEnabled = analyticsCheckbox ? analyticsCheckbox.checked : false;

    const consentData = {
      essential: true,
      analytics: analyticsEnabled,
      marketing: false,
      timestamp: Date.now(),
      version: '1.0',
      customized: true
    };

    this.saveConsent(consentData);
    this.applyConsent(consentData);
    this.hideCustomizePanel();
    this.hideBanner();
    this.showSuccessFeedback('Preferências salvas com sucesso');
  }

  /**
   * Salva consentimento no localStorage
   */
  saveConsent(consentData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(consentData));
      this.consent = consentData;
    } catch (error) {
      console.error('Erro ao salvar consentimento:', error);
    }
  }

  /**
   * Recupera consentimento do localStorage
   */
  getStoredConsent() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Erro ao recuperar consentimento:', error);
      return null;
    }
  }

  /**
   * Aplica o consentimento
   */
  applyConsent(consentData) {
    // Se analytics foi aceito, carregar scripts
    if (consentData.analytics && this.analyticsBlocked) {
      this.loadAnalyticsScripts();
      this.analyticsBlocked = false;
    }

    // Disparar evento personalizado para outras partes do sistema
    const event = new CustomEvent('lgpdConsentUpdated', {
      detail: { consent: consentData }
    });
    document.dispatchEvent(event);
  }

  /**
   * Carrega scripts de analytics
   */
  loadAnalyticsScripts() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'denied'
      });
    }

    // Google Tag Manager
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        'event': 'consent_update',
        'analytics_storage': 'granted',
        'ad_storage': 'denied'
      });
    }

    // Meta Pixel
    if (typeof fbq !== 'undefined') {
      fbq('consent', 'grant');
    }

    console.log('Analytics scripts loaded with consent');
  }

  /**
   * Manipulação de navegação por teclado
   */
  handleKeyboard(e) {
    // ESC para fechar painel de personalização
    if (e.key === 'Escape' && this.isCustomizing) {
      this.hideCustomizePanel();
    }
  }

  /**
   * Focus trap para acessibilidade
   */
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  /**
   * Remove focus trap
   */
  removeFocusTrap(element) {
    // Remove listeners específicos se necessário
  }

  /**
   * Mostra feedback de sucesso
   */
  showSuccessFeedback(message) {
    // Criar elemento de feedback temporário
    const feedback = document.createElement('div');
    feedback.className = 'lgpd-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--lgpd-burgundy);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: "Oswald", sans-serif;
      font-size: 0.9rem;
      z-index: 10000;
      animation: lgpd-feedback-slide 0.3s ease-out;
    `;

    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
      @keyframes lgpd-feedback-slide {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(feedback);

    // Remover após 3 segundos
    setTimeout(() => {
      feedback.style.animation = 'lgpd-feedback-slide 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(feedback);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }

  /**
   * Método público para verificar consentimento
   */
  hasConsent(category) {
    return this.consent && this.consent[category] === true;
  }

  /**
   * Método público para atualizar consentimento
   */
  updateConsent(newConsent) {
    this.saveConsent(newConsent);
    this.applyConsent(newConsent);
  }
}

// Inicializar o sistema quando o script for carregado
const lgpdManager = new LGPDConsentManager();

// Disponibilizar globalmente para outras partes do sistema
window.LGPDConsentManager = LGPDConsentManager;
window.lgpdManager = lgpdManager;
