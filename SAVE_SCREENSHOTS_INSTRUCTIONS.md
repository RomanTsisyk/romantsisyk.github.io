# 📸 Інструкція для збереження скріншотів Mercedes Adapter

## Крок 1: Створіть папку для зображень
```bash
mkdir -p assets/images/mercedes-adapter
```

## Крок 2: Збережіть скріншоти з наступними іменами:

1. **Перше зображення** (Statistics - 18,194 km):
   - Зберегти як: `assets/images/mercedes-adapter/statistics.png`

2. **Друге зображення** (The upgrade for your Mercedes-Benz):
   - Зберегти як: `assets/images/mercedes-adapter/upgrade.png`

3. **Третє зображення** (Main dashboard with car):
   - Зберегти як: `assets/images/mercedes-adapter/cockpit-main.png`

4. **Четверте зображення** (Fuel Level - 144 km / 10 l):
   - Зберегти як: `assets/images/mercedes-adapter/fuel-level.png`

5. **П'яте зображення** (Trip List with map):
   - Зберегти як: `assets/images/mercedes-adapter/trip-list.png`

6. **Шосте зображення** (Cockpit real-time analysis):
   - Зберегти як: `assets/images/mercedes-adapter/cockpit-realtime.png`

7. **Сьоме зображення** (Car Health Monitor):
   - Зберегти як: `assets/images/mercedes-adapter/car-health.png`

8. **Восьме зображення** (Driving Score 87%):
   - Зберегти як: `assets/images/mercedes-adapter/driving-score.png`

## Крок 3: Оптимізація зображень (опційно)

Для кращої продуктивності можна оптимізувати зображення:

```bash
# Встановити інструмент оптимізації
npm install -g imagemin-cli

# Оптимізувати всі PNG файли
imagemin assets/images/mercedes-adapter/*.png --out-dir=assets/images/mercedes-adapter/
```

## Крок 4: Перевірка

Відкрийте `portfolio adapter/index.html` у браузері та переконайтеся, що всі зображення відображаються правильно:

1. Hero section - головний екран з автомобілем
2. Screenshots carousel - всі 8 скріншотів
3. Головна сторінка - превью проекту

## ✅ Результат

Після збереження всіх скріншотів ваш Mercedes Adapter проект буде мати:

- **Реальні скріншоти** замість placeholder зображень
- **Професійний вигляд** з актуальним інтерфейсом додатку
- **Правильну кольорову схему** (#00B4D8 cyan blue)
- **Достовірні метрики** (18,194 km, 87% Driver Score, тощо)

## 🎨 Кольорова схема з додатку:

```css
--mercedes-dark: #1A1A1A;    /* Темний фон */
--mercedes-blue: #00B4D8;    /* Основний синій */
--mercedes-accent: #00D2BE;  /* Акцентний бірюзовий */
--mercedes-white: #FFFFFF;   /* Білий текст */
--mercedes-gray: #B8BCC8;    /* Сірий текст */
```

Ці кольори вже інтегровані в `portfolio adapter/styles.css`!
