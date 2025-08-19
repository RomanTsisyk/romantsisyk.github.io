# 📁 Переіменування папок для консистентності

## Потрібно переіменувати:

1. **portfolio adapter** → **vehicle-connectivity**
   - Це Vehicle Connectivity App (500K+ users, GlobalLogic)
   
2. **poly lens portfolio** → **poly-lens** 
   - HP Poly Lens Enterprise App

3. **earnly portfolio** → **earnly**
   - Earnly App

4. **netti portfolio-demo** → **netti**
   - Netti App

5. **portfolio fels** → **fels**
   - Fels App

6. **portfolio kasa stefczyka** → **kasa-stefczyka**
   - Kasa Stefczyka App

## Структура після переіменування:

```
projects/
├── vehicle-connectivity/    (500K+ users) ⭐ TOP PROJECT
├── million-kotlin/          (1M+ users) ⭐ TOP PROJECT - NEEDS CREATION
├── poly-lens/              (HP Enterprise)
├── earnly/
├── netti/
├── fels/
├── kasa-stefczyka/
├── job-recruiter/
├── sms-hub/                (GSM Billing) - NEEDS CREATION
├── romant-apps/            (Educational) - NEEDS CREATION
└── training-suite/         (Fitness) - NEEDS CREATION
```

## Навігація буде оновлена в navigation.js:

```javascript
this.projects = [
    // TOP PROJECTS
    { id: 'vehicle-connectivity', name: 'Vehicle Connectivity', path: 'vehicle-connectivity', color: '#1976D2', users: '500K+' },
    { id: 'million-kotlin', name: 'Million User App', path: 'million-kotlin', color: '#FFD700', users: '1M+' },
    
    // EXISTING PROJECTS
    { id: 'poly-lens', name: 'HP Poly Lens', path: 'poly-lens', color: '#9C27B0' },
    { id: 'earnly', name: 'Earnly', path: 'earnly', color: '#00C853' },
    { id: 'netti', name: 'Netti', path: 'netti', color: '#007AFF' },
    // ... etc
]
```

## Всі сторінки зберігають:
✅ Темний дизайн
✅ Градієнтні орби
✅ Паралакс ефекти
✅ Анімації
✅ Сучасний вигляд

## Що змінюється:
📝 Тільки контент (назви, опис, метрики)
🔗 Додається єдина навігація між проектами
