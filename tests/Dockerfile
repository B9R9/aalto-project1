FROM denoland/deno:latest

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le dossier shopping-list dans le conteneur
COPY ../shopping-list /app/shopping-list

# Copiez le dossier test dans le conteneur
COPY . /app/test

# Commande pour exécuter les tests
CMD ["deno", "test", "--allow-net", "--allow-read", "--allow-env", "/app/test"]
