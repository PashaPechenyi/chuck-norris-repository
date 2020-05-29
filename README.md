# Chuck Norris Jokes
## Created by React.js with (Redux, Sass)
## You can peruce with the completed test task by the following link: https://pashapechenyi.github.io/chuck-norris-repository/
## Логика добавления шуток в блок избранных:
### * При получении шуток для вывода в общий блок с шутками добавляем каждому обькту с данными о шутке свойство isFavourite со значением false, после чего проверяем существует ли эта шутка уже в блоке избранных, если существует- то меняем isFavourite на true.     
### * При нажатии на иконку добавления/удаления шутки из блока избранных- ищем данную шутку по id в основном блоке всех шуток: если она там есть- меняем значение свойства isFavourite на противоположный. 
### * После чего вызываем action добавления/удаления шутки из блока избранных (передаем в аргументы id и сам обьект шутки (id передаем потому что по нему мы будем удалять шутку так как при удалении обькт шутки будет равен undefined). 
### * После чего в редьюсере проверяем есть ли шутка с данным id в блоке избранных шуток: если есть-удалить, если же ее нет-добавить в массив получиный обьект с шуткой.
### * После чего рендерим блоки с шутками перебирая массивы основных шуток и избранных шуток.