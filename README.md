# Alaya Division — Web Fase 1

Sitio de marca Alaya Division (Next.js App Router + Tailwind + Vercel).

## Desarrollo

```bash
npm install
npm run dev
```

Copia `.env.example` a `.env.local` y configura Resend:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_TO`
- `RESEND_AUDIENCE_ID` (opcional; si falta, la newsletter notifica por email a `RESEND_TO`)
- `NEXT_PUBLIC_SITE_URL`

Sin `RESEND_API_KEY`, los formularios responden en modo desarrollo (log en consola).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/new` | Novedades |
| `/apparel` | Coming Soon + lookbook |
| `/surf` | Hub surf |
| `/surf/boards` | Catálogo |
| `/surf/shapers` | Shapers |
| `/pide-cita` | Formulario de cita |
| `/built-on-connection` | Blog editorial |
| `/about` `/contact` `/aviso-legal` `/customer-service` | Footer |

## Deploy Vercel

1. Importar el repo en Vercel
2. Añadir variables de entorno
3. Deploy — framework Next.js detectado automáticamente

## Checklist pre-lanzamiento (25·09)

- [ ] Dominio + DNS
- [ ] Env Resend en producción
- [ ] Probar `/api/appointment` y `/api/newsletter`
- [ ] Sustituir imágenes Unsplash por assets de marca
- [ ] Completar datos fiscales en Aviso Legal
- [ ] Lighthouse móvil
