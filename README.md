## Дипломный проект по профессии веб-разработчика в Нетологии

Сделано на Laravel + React

Развернуто на Heroku: https://go2cinemabackend.herokuapp.com/

Для генерации QR кодов необходима php библиотека Imagick

### После разворачивания выполнить команды:

1) Генерация ключей laravel: php artisan passport:key
2) Миграции + заполнение БД начальной информацией: php artisan migrate:fresh --seed
3) Генерация клиента для токенов: php artisan passport:client --personal
