# Guide: Ladda upp ReviewPeak till Vercel

## Steg 1: Initiera Git-repository

Öppna terminalen i projektmappen och kör:

```bash
cd /Users/billyholm/Desktop/App-ideer/ReviewPeak
git init
git add .
git commit -m "Initial commit - ReviewPeak"
```

## Steg 2: Skapa ett GitHub-repository

1. Gå till [github.com](https://github.com) och logga in
2. Klicka på "New repository"
3. Namnge ditt repository (t.ex. "reviewpeak")
4. **LÄMNA alla checkboxar tomma** (skapa INTE README, .gitignore eller license)
5. Klicka på "Create repository"

## Steg 3: Koppla ditt lokala projekt till GitHub

Kör dessa kommandon i terminalen (ersätt `DITT_ANVÄNDARNAMN` med ditt GitHub-användarnamn):

```bash
git remote add origin https://github.com/DITT_ANVÄNDARNAMN/reviewpeak.git
git branch -M main
git push -u origin main
```

Du kommer att bli ombedd att logga in på GitHub första gången.

## Steg 4: Ladda upp till Vercel

### Alternativ A: Via Vercel-webbplats (Enklast)

1. Gå till [vercel.com](https://vercel.com)
2. Klicka på "Sign Up" och logga in med ditt GitHub-konto
3. Klicka på "Add New..." → "Project"
4. Välj ditt GitHub-repository (reviewpeak)
5. Vercel kommer automatiskt att upptäcka att det är ett Next.js-projekt
6. Klicka på "Deploy"
7. Efter några minuter får du en länk som ser ut som: `https://reviewpeak-xxx.vercel.app`

### Alternativ B: Via Vercel CLI (Avancerat)

Om du föredrar kommandorad:

```bash
npm i -g vercel
vercel login
vercel
```

Följ instruktionerna som visas.

## Steg 5: Automatisk deployment

När du pushar nya ändringar till GitHub kommer Vercel automatiskt att bygga och deploya din app!

---

## Tips

- Din app kommer att ha en gratis Vercel-domän
- Du kan lägga till en egen domän senare i Vercel-inställningarna
- Alla ändringar du gör och pushar till GitHub kommer automatiskt att deployas

