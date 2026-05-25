import { defineConfig } from "vite";
import { resolve } from "path"; // 1. Adicione essa importação no topo

export default defineConfig({
  // Mantém a sua porta padrão que já estava aí
  server: {
    port: 3000,
  },
  // 2. Adicione este bloco build inteirinho aqui embaixo
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cardapio: resolve(__dirname, "cardapio.html"),
        nossaraiz: resolve(__dirname, "nossaraiz.html"),
        carnes: resolve(__dirname, "carnes.html"),
        petiscos: resolve(__dirname, "petiscos.html"),
        drinks: resolve(__dirname, "drinks.html"),
        reservas: resolve(__dirname, "reservas.html"),
      },
    },
  },
});
