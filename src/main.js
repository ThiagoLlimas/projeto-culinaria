// Carrossel Interativo - Cumaru Restaurante
document.addEventListener("DOMContentLoaded", function () {
  // Guard clause para elementos do carrossel
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const titleElement = document.getElementById("slideTitle");
  const descriptionElement = document.getElementById("slideDescription");
  const currentSlideElement = document.getElementById("currentSlide");
  const overlayTextElement = document.getElementById("overlayText");

  // Só executa lógica do carrossel se os elementos existirem
  if (
    prevBtn &&
    nextBtn &&
    titleElement &&
    descriptionElement &&
    currentSlideElement &&
    overlayTextElement
  ) {
    // Dados dos slides
    const slides = [
      {
        id: 1,
        title: "A Essência da Culinária Brasileira em sua Forma Mais Nobre",
        description:
          "O Cumaru resgata a verdadeira alma da gastronomia nacional, unindo ingredientes nativos e técnicas contemporâneas. Uma viagem de sabores que vai desde os clássicos petiscos de boteco até os mais sofisticados cortes na brasa para nossos clientes.",
        overlay: "CARRO CHEFE",
        images: [
          "./src/assets/img-principal-menu1.webp",
          "./src/assets/img2-menu1.webp",
          "./src/assets/img3-menu1.webp",
          "./src/assets/img4-primeiro-menu.webp",
        ],
      },
      {
        id: 2,
        title: "Cortes Nobres e o Verdadeiro Sabor da Brasa",
        description:
          "Nossa parrilla é o coração do Cumaru. Selecionamos os melhores cortes premium, preparados no fogo e na fumaça para garantir uma suculência inigualável e aquele sabor defumado que todo brasileiro ama.",
        overlay: "NA BRASA",
        images: [
          "./src/assets/img-principal-churrasco.webp",
          "./src/assets/img-churrasco1.webp",
          "./src/assets/img-churrasco-3.webp",
          "./src/assets/churrasco4.webp",
        ],
      },
      {
        id: 3,
        title: "Alta Coquetelaria com a Alma do Brasil",
        description:
          "Nossa carta de drinks é uma celebração aos sabores tropicais. Das caipirinhas clássicas com cachaças artesanais a coquetéis defumados e autorais, cada gole é uma experiência refrescante.",
        overlay: "MIXOLOGIA",
        images: [
          "./src/assets/img-coquetel1.webp",
          "./src/assets/img-coquetel-2.webp",
          "./src/assets/img-principal-coquetel.webp",
          "./src/assets/img-coquetel-3.webp",
        ],
      },
      {
        id: 4,
        title: "A Arte de Compartilhar: Tábuas e Antepastos",
        description:
          "Uma seleção rigorosa de queijos nobres, charcutaria artesanal, frutas frescas e bruschettas exclusivas. A pedida perfeita para harmonizar com nossa carta de vinhos e celebrar bons momentos à mesa.",
        overlay: "PARA DIVIDIR",
        images: [
          "./src/assets/img-principal-culinaria.webp",
          "./src/assets/img-petisco-2.webp",
          "./src/assets/img-petiscos-4.webp",
          "./src/assets/img-petiscos-3.webp",
        ],
      },
    ];

    // Estado atual
    let currentSlideIndex = 0;

    // Imagens
    const mainImg = document.querySelector(".photo-main .photo-img");
    const img2 = document.getElementById("slideImg2");
    const img3 = document.getElementById("slideImg3");
    const img4 = document.getElementById("slideImg4");

    // Função para atualizar o slide
    function updateSlide() {
      const currentSlide = slides[currentSlideIndex];

      // Atualizar texto
      titleElement.textContent = currentSlide.title;
      descriptionElement.textContent = currentSlide.description;
      overlayTextElement.textContent = currentSlide.overlay;

      // Atualizar contador com formatação
      currentSlideElement.textContent = currentSlide.id
        .toString()
        .padStart(2, "0");

      // Atualizar imagens
      if (mainImg) mainImg.src = currentSlide.images[0];
      if (img2) img2.src = currentSlide.images[1];
      if (img3) img3.src = currentSlide.images[2];
      if (img4) img4.src = currentSlide.images[3];

      // Atualizar alt das imagens
      if (mainImg) mainImg.alt = `${currentSlide.overlay} - Imagem Principal`;
      if (img2) img2.alt = `${currentSlide.overlay} - Imagem 2`;
      if (img3) img3.alt = `${currentSlide.overlay} - Imagem 3`;
      if (img4) img4.alt = `${currentSlide.overlay} - Imagem 4`;
    }

    // Função para navegar para o próximo slide
    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlide();
    }

    // Função para navegar para o slide anterior
    function prevSlide() {
      currentSlideIndex =
        (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSlide();
    }

    // Event listeners
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Navegação por teclado (opcional)
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    });

    // Auto-play (opcional - comentado para não interferir)
    setInterval(nextSlide, 5000); // Muda slide a cada 5 segundos

    // Inicializar com o primeiro slide
    updateSlide();
  }

  // Guard clause para menu mobile
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".main-nav ul");
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
});

// Formulário de Contato - Web3Forms
const form = document.getElementById("form-contato");
const result = document.getElementById("form-result");

if (form && result) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Enviando mensagem...";
    result.style.color = "#D9C1A0"; // Cor dourada do tema

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML =
            "Mensagem enviada com sucesso! Em breve entraremos em contato.";
          result.style.color = "#4CAF50"; // Verde de sucesso
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.style.color = "#F44336"; // Vermelho de erro
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML =
          "Ocorreu um erro ao enviar. Tente novamente mais tarde.";
        result.style.color = "#F44336";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.innerHTML = "";
        }, 5000); // Apaga a mensagem após 5 segundos
      });
  });
}
