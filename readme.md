## О проекте

Данный проект является демонстрационным и написан с использованием [Laravel](https://laravel.com/) + [Vue](https://vuejs.org/) и библиотеки [leaflet](https://leafletjs.com/). Проект позволяет отображать карту местности и перемещаться по ней. На карту можно добавлять маркеры с указанием дополнительных данных и, по клику на маркер, выводить эти данные.

## Запуск проекта

Для развертывания и запуска проекта выполните следующие действия:

- `git clone git@github.com:dosim86/map-marker.git map`
- `cd map`
- `cp .env.example .env`
- `nano .env` - <small>*необходимо указать учетную запись для доступа к mysql*</small>
- `composer install`
- `composer dump-autoload`
- `php artisan mysql:createdb`
- `php artisan migrate --seed`
- `php artisan key:generate`
- `php artisan serve` - <small>*перейти по указанному адресу*</small>
