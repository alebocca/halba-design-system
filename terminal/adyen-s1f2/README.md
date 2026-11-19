# App di pagamento Adyen sull'S1F2: tema halba e logo dello scontrino

File per i terminali Adyen collegati a halba (primo modello: Castles S1F2). halba li applica con la Management API di
Adyen quando il terminale viene collegato. Requisiti di Adyen: software del terminale 1.120 o successivo; chiave API
della connessione con i ruoli *Management API — Terminal themes read and write* (tema) e *Management API — Terminal
settings read and write* (scontrino).

| File | Uso in Adyen | Requisito di Adyen | File |
| --- | --- | --- | --- |
| `halba-adyen-app-logo.svg` | Tema, `logo` (`model=ALL`) | SVG. Serve l'autorizzazione di Adyen al conto, altrimenti resta il logo di Adyen | Simbolo: anello `#f4f4f1`, punto `#a99cff`, per il tema scuro |
| `halba-adyen-home-720x1280.mp4` | Tema, `homeScreen` (`model=S1F2`) | MP4/PNG/JPEG, max 720 × 1280, max 10 MB | Loop di 12 s, circa 2 MB |
| `halba-adyen-home-720x1280.png` | Alternativa fissa a `homeScreen` | come sopra | Sfondo scuro, alone viola, simbolo nel terzo alto, senza testo |
| `halba-adyen-after-720x1280.png` | Tema, `afterPayment` (`model=S1F2`) | come sopra | Simbolo più grande, senza testo (niente traduzioni) |
| `halba-receipt-logo-384x240.bmp` | Impostazioni del terminale, `receiptOptions.logo` (Base64) | BMP, 384 × 240 (L × A), sotto 256 KB | 1 bit, nero puro su bianco, simbolo e "halba" su una riga (circa 350 px), 12 KB |
| `halba-receipt-logo-384x240.png` | Anteprima del logo dello scontrino | — | Stesso logo in PNG a 1 bit |

- **Modalità del tema**: `dark`, come la schermata a riposo dell'app halba (il terminale è sempre acceso). Adyen non
  permette di scegliere i colori: tasti e schermate di pagamento restano i suoi.
- **Sull'S1F2 non esistono** `idleScreen` né `shopperEngagement`.
- **Logo dello scontrino del merchant**: il merchant lo carica dalla dashboard (PNG, JPG o BMP); halba lo porta a
  384 × 240 in bianco e nero a 1 bit. Senza logo del merchant, halba usa `halba-receipt-logo-384x240.bmp`.

## Da verificare sul terminale

1. La posizione del simbolo nella schermata iniziale: Adyen non pubblica le aree sicure, quindi va spostato se i suoi
   elementi lo coprono.
2. Il tema scuro e l'aspetto del logo SVG sullo sfondo di Adyen.
3. Il logo dello scontrino stampato su carta vera: nitidezza e centratura.
