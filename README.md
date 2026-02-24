# News & Reports Portal — Centro de Recursos

Centro de recursos en React + Vite + Tailwind, renderizando un dataset JSON con Informes y Eventos.

## Requisitos
- Node.js 18+ (solo para correr local)
- Docker Desktop (para correr sin Node local)

## Correr en local

git clone https://github.com/BrahianStiven/news-reports-portal.git
cd news-reports-portal
npm install
npm run dev

## Build local 

cd news-reports-portal
npm run build
npm run preview

## Correr con Docker (sin Node local)

cd news-reports-portal
docker build -t news-reports-portal .
docker run --rm -p 8080:80 news-reports-portal

Abre: **http://localhost:8080**

## Stack
- React 18 + Hooks
- Vite
- Tailwind CSS (utility-first)
- Docker (multi-stage build con Nginx)
- Dataset local: src/data/data.json

