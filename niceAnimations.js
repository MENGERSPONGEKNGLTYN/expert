// Показываем прелоадер при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Имитируем загрузку
    setTimeout(function() {
        // Скрываем прелоадер
        document.getElementById('preloader').style.opacity = '0';

        // Показываем основное содержимое
        document.getElementById('content').classList.remove('hidden');

        // Удаляем прелоадер из DOM после анимации
        setTimeout(function() {
            document.getElementById('preloader').remove();
        }, 600);

        // Инициализируем систему
        initSystem();
    }, 0);
});


// Обработчики для модального окна
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("preferencesModal");
    const modalHeader = document.getElementById("modalHeader");
    const preferencesBtn = document.getElementById("showPreferencesBtn");
    const materialsBtn = document.getElementById("showMaterialsBtn");

    // Показываем модальное окно при нажатии кнопки
    preferencesBtn.onclick = function() {
        modal.style.display = "block";
        modalHeader.innerHTML = 'Добавленные предпочтения';
        showAllPreferences(); // Заполняем таблицу предпочтений
    }

    // Показываем модальное окно при нажатии кнопки
    materialsBtn.onclick = function() {
        modal.style.display = "block";
        modalHeader.innerHTML = 'Список материалов';
        showAllMaterials(); // Заполняем таблицу предпочтений
    }


    // Закрываем при клике вне окна
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});