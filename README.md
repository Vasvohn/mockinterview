# MockInterview

Copilote discret pour les entretiens, les levées de fonds et les négociations en visio.

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Cette version simule le flux audio et le non-verbal. Le micro et la webcam ne sont pas utilisés. Le plan et le quota mensuel restent dans le navigateur.

Les offres payantes ouvrent Paddle Checkout. Copier `.env.example` vers `.env.local`, puis renseigner le jeton client, les prix `pri_…` et le secret du webhook `/api/paddle/webhook`. En sandbox, le paiement test utilise la carte `4242 4242 4242 4242`.
