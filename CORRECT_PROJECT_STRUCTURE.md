# ✅ Правильна структура проектів

## Існуючі папки та їх справжні назви:

### 1. **portfolio adapter/** → **Mercedes Adapter**
- Це Vehicle Connectivity App 
- 500K+ users
- GlobalLogic (Hitachi Group)
- Папка залишається `portfolio adapter`
- В навігації: `mercedes-adapter`

### 2. **portfolio fels/** → **Follow MyMoney**  
- Фінансовий трекер
- Папка залишається `portfolio fels`
- В навігації: `follow-mymoney`

### 3. **poly lens portfolio/** → **HP Poly Lens**
- Enterprise communication app
- HP Inc / Poly
- Папка: `poly lens portfolio`

### 4. **earnly portfolio/** → **Earnly**
- Залишається як є

### 5. **netti portfolio-demo/** → **Netti**
- Залишається як є

### 6. **portfolio kasa stefczyka/** → **Kasa Stefczyka**
- Залишається як є

### 7. **job-recruiter-portfolio.html** → **Job Recruiter**
- Потребує створення папки

## Нові проекти для створення:

### 8. **Million-User Kotlin App**
- 1M+ users
- Потребує створення з нуля
- Папка: `million-kotlin/`

### 9. **SMS HUB**
- GSM Billing Ltd
- 80% test coverage
- Потребує створення

### 10. **RomanT Educational Apps**
- Legacy e-book apps
- Потребує створення

### 11. **Training Suite**
- Fitness startup
- Потребує створення

## Навігація в navigation.js:

```javascript
this.projects = [
    // TOP PROJECTS
    { 
        id: 'mercedes-adapter', 
        name: 'Mercedes Adapter', 
        path: 'portfolio-adapter',  // існуюча папка
        color: '#1976D2',
        metrics: { users: '500K+' }
    },
    { 
        id: 'million-kotlin', 
        name: 'Million User App', 
        path: 'million-kotlin',     // нова папка
        color: '#FFD700',
        metrics: { users: '1M+' }
    },
    
    // EXISTING
    { id: 'poly-lens', name: 'HP Poly Lens', path: 'poly-lens', color: '#9C27B0' },
    { id: 'earnly', name: 'Earnly', path: 'earnly', color: '#00C853' },
    { id: 'netti', name: 'Netti', path: 'netti', color: '#007AFF' },
    { id: 'follow-mymoney', name: 'Follow MyMoney', path: 'fels', color: '#2196F3' },
    { id: 'kasa-stefczyka', name: 'Kasa Stefczyka', path: 'kasa-stefczyka', color: '#4CAF50' },
    { id: 'job-recruiter', name: 'Job Recruiter', path: 'job-recruiter', color: '#FF5722' }
]
```

## Що НЕ потрібно міняти:

✅ **Стилі** - всі темні теми з градієнтами залишаються
✅ **Анімації** - паралакс ефекти працюють
✅ **Структура HTML** - красиві сторінки не чіпаємо

## Що потрібно оновити:

📝 **Контент** - назви, описи, метрики
🔗 **Навігація** - єдина система переходів
📊 **Дані** - актуальна інформація з roman-tsisyk.com
