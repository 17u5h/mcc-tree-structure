# Древовидная структура элементов

![image](https://user-images.githubusercontent.com/102058870/226372321-5a0918d7-22e4-4ab7-b6f2-e57df2c124e3.png)

В интерфейсе доступны функции создания, редактирования, удаление элемента и сброс до начального состояния

### Создание элемента:
Происходит при нажатии кнопки "Add".

Если не выбрать ни один элемент из существующих, то создание новых будет происходить в корневой каталог

Если выбрать какой-либо элемент, то создание будет происходить относительно "родителя"

### Редактирование элемента:

Редактирование названия элемента возможно при его выделении и нажатии на кнопку "Edit", либо при двойном клике по элементу

Сохранение названия происходит либо при потере фокуса, либо при нажатии Enter

### Удаление элемента:

Возможно при предварительном выборе этого элемента, а затем при нажатии кнопки "Remove"

При удалении "родителя", все дочерние элементы также удаляются

### Кнопка "Reset" 

Cбрасывает дерево элементов до исходного.
