# Horizonte Village — Next.js konsept

[Horizonte Village](https://horizonte-village.com/) referans alınarak Next.js App Router, React, TypeScript ve GSAP ile hazırlanmış duyarlı konsept uygulaması.

## Çalıştırma

Node.js 20.9 veya üzeri gerekir.

```bash
npm ci
npm run dev
```

Önizleme: http://localhost:3000

```bash
npm run lint   # TypeScript kontrolü
npm run build # Üretim derlemesi
npm start     # Üretim sunucusu
```

## Kapsam

- Referanstaki iki aşamalı organik maskelerle villa/rezidans açılış seçimi; çizilerek açılan harita, yükleme sayacı, orijinal Canela ve Apercu Mono fontları.
- Masaüstünde 360 karelik orijinal kamera dizisini kaydırmayla işleyen canvas hero; mobilde yatay ilerleyen manzara.
- Harf bazında hero geçişleri, 1.2 saniyelik maske galerisi, sürüklenebilir konum kartları, çizilen harita rotaları ve sesle ilerleyen mimari metin.
- Panorama, iç mekân sekmeleri ve bilgi noktaları, sosyal alan kartları, rehber yazıları ve inşaat ilerleme pencereleri.
- Özgün SVG sınırlarıyla 23 villa ve 4 rezidans bloğunu içeren sürüklenebilir genel plan; izometrik kat seçimi, 12 yerel kat görseli ve daire sınırları.
- Gerçek referans verileriyle 23 villa, 31 rezidans; oda/kat türü filtreleri ve 54 ayrı detay sayfası.
- Kat planı değiştirme, büyütme/sürükleme, indirme ve paylaşma.
- Referans ölçülerinde 1.2 saniyelik menü geçişi, dalga düğmeleri, mobil menü, çerez tercihi ve dört adımlı konut seçim akışı.

## Sayfalar

- `/`: ana deneyim
- `/selection?category=villas`: villa kataloğu
- `/selection?category=residences`: rezidans kataloğu
- `/selection/[slug]`: konut planları ve detayları
- `/genplan`: etkileşimli genel plan
- `/privacy-policy`, `/terms-of-use`: referans metinleri

## Entegrasyon sınırları

Bu repo ön yüz konseptidir. Satış CRM'i veya e-posta gönderim sunucusu içermez. İletişim ve seçim formları gerçek bir satış kaydı göndermez; yerel tercih kaydı / e-posta uygulamasına yönlendirme kullanır. İspanyolca sürüm, agent portal, sosyal bağlantılar ve 360° tur orijinal harici servislere yönlenir.

## Doğrulama

TypeScript ve üretim derlemesi kontrol edildi. Masaüstü ve 390 × 844 mobil tarayıcıda hero, menü, galeri, oda filtresi, iç mekân sekmesi, genel planın yatay sürüklenmesi ve blok detayları kontrol edildi.

## Kaynak yapısı

`app/` sayfaları; `components/` etkileşimli bölümleri; `lib/` referans içerik ve konut verilerini; `public/` yerel font, SVG, görsel, ses ve kamera karelerini içerir.

Referans marka, metin ve medya ilgili hak sahiplerine aittir. Public repo içeriği, bu varlıkların ticari yeniden kullanım hakkını sağlamaz.
