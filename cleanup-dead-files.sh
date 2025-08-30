#!/bin/bash

# Скрипт для очищення мертвих файлів веб-сайту
# Автор: Claude AI Assistant
# Дата: $(date)

echo "🧹 Початок очищення мертвих файлів..."

# Створити резервну копію
echo "📦 Створення бекапу..."
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="../backup_${timestamp}"
cp -r . "$backup_dir"
echo "✅ Бекап створено в $backup_dir"

# Фаза 1: Видалення застарілих HTML файлів в корені
echo "🔴 Фаза 1: Видалення застарілих HTML файлів..."
files_to_remove=(
    "android-portfolio - fixed manually.html"
    "earnly-portfolio.html"
    "job-recruiter-portfolio.html"
    "netti-portfolio-page.html"
    "3d-effects-demo.html"
    "test-styles.html"
)

for file in "${files_to_remove[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "❌ Видалено: $file"
    else
        echo "⚠️  Файл не знайдено: $file"
    fi
done

# Фаза 2: Видалення застарілих скриптів
echo "🔴 Фаза 2: Видалення застарілих скриптів..."
scripts_to_remove=(
    "add-navigation-to-all.js"
    "fix-navigation.js"
    "migrate-all-projects.js"
    "migrate-project.js"
    "UPDATE_FILTERS.js"
)

for script in "${scripts_to_remove[@]}"; do
    if [ -f "$script" ]; then
        rm "$script"
        echo "❌ Видалено: $script"
    else
        echo "⚠️  Файл не знайдено: $script"
    fi
done

echo "✅ Фаза 1 та 2 завершені!"
echo "🔍 Перевірте роботу сайту перед продовженням"
echo "📝 Для продовження видалення папок запустіть cleanup-phase2.sh"

# Створити скрипт для фази 2
cat > cleanup-phase2.sh << 'EOF'
#!/bin/bash

echo "🔴 Фаза 3: Видалення дубльованих папок проектів..."

# УВАГА: Перед запуском переконайтесь що всі посилання в index.html 
# вказують на папку /projects/ а не на ці старі папки!

folders_to_remove=(
    "earnly portfolio"
    "followmymoney-portfolio"
    "netti portfolio-demo" 
    "poly lens portfolio"
    "portfolio adapter"
    "portfolio fels"
    "portfolio kasa stefczyka"
    "main-portfolio"
    "portfolio-demo"
)

for folder in "${folders_to_remove[@]}"; do
    if [ -d "$folder" ]; then
        echo "⚠️  Готуюсь видалити папку: $folder"
        read -p "Продовжити? (y/N): " confirm
        if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
            rm -rf "$folder"
            echo "❌ Видалено папку: $folder"
        else
            echo "⏭️  Пропущено: $folder"
        fi
    else
        echo "⚠️  Папка не знайдена: $folder"
    fi
done

echo "✅ Фаза 3 завершена!"
EOF

chmod +x cleanup-phase2.sh

echo "🎉 Скрипт створено! Наступні кроки:"
echo "1. Перевірте роботу сайту"
echo "2. Запустіть cleanup-phase2.sh для видалення папок"
echo "3. Зробіть git commit для збереження змін"
