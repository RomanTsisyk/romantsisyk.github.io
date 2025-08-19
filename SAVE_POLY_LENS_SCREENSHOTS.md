# 📸 Інструкція для збереження скріншотів HP Poly Lens

## Створіть папку для зображень:
```bash
mkdir -p assets/images/poly-lens
```

## Збережіть скріншоти з наступними іменами:

1. **Перше зображення** (Poly Voyager 60 - головний екран):
   - Зберегти як: `assets/images/poly-lens/voyager-main.webp`
   - Показує: Connected статус, батарея Left 90%, Right 20%, Case 80%

2. **Друге зображення** (Quick Guide):
   - Зберегти як: `assets/images/poly-lens/quick-guide.webp`
   - Показує: Інтерактивний гайд з навушниками

3. **Третє зображення** (Find My Device - карта):
   - Зберегти як: `assets/images/poly-lens/find-device-map.webp`
   - Показує: Локацію на карті

4. **Четверте зображення** (Find My Device - звук):
   - Зберегти як: `assets/images/poly-lens/find-device-sound.webp`
   - Показує: Sending tone екран

5. **П'яте зображення** (Disconnected статус):
   - Зберегти як: `assets/images/poly-lens/disconnected.webp`
   - Показує: Last Known Battery 34%, Disconnected

6. **Шосте зображення** (Settings меню):
   - Зберегти як: `assets/images/poly-lens/settings.webp`
   - Показує: Language, General, Software (з badge), Network, etc.

7. **Сьоме зображення** (Software Update):
   - Зберегти як: `assets/images/poly-lens/update.webp`
   - Показує: Update available, версії 1.0.20 → 1.0.21

## Оновлення HTML файлів:

### Для poly lens portfolio/index.html:
- Оновити hero section з реальним скріншотом
- Додати carousel з усіма скріншотами
- Оновити назву на HP Poly Lens

### Для головної сторінки index.html:
- Оновити картку HP Poly Lens з реальним превью

## Кольорова схема HP Poly:
```css
--hp-blue: #0066CC;
--poly-blue: #00B4D8;
--background: #F5F5F7;
--text-dark: #1D1D1F;
--success-green: #34C759;
--battery-low: #FF9500;
```

## Ваша роль в проекті:
- **Android розробка** - основна платформа
- **iOS підтримка** - протягом місяця для feature parity
- **Bluetooth шар** - комунікація з пристроями
- **UI компоненти** - управління пристроями
- **Find My Device** - функціонал пошуку
- **OTA Updates** - оновлення прошивки
