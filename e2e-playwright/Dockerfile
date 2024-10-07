FROM mcr.microsoft.com/playwright:v1.47.2-focal 

WORKDIR /e2e-tests

# Copie des tests E2E
COPY . .

# Installer les dépendances
RUN npm install

RUN npm install pg

# Installer les navigateurs Playwright
RUN npx playwright install


# Exécuter les tests Playwright
CMD ["npx", "playwright", "test"]
