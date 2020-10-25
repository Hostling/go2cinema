<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Table;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Нужно выполнить php artisan passport:key && php artisan passport:client --personal для возможности генерации токенов
        // Учетка админа
        DB::table('users')->insertOrIgnore([
            'name' => 'AdminGoogle',
            'email' => 'admin@google.com',
            'password' => '$2y$10$Pxcnb1VijwDsJqlEElWJMOkYRftbckm4cJiVNYl5gM/.Z0qARDFNW', //123456
        ]);

        // 2 зала
        DB::table('hall')->insertOrIgnore([
            ['id' => 1, 'rows' => 10, 'columns' => 8, 'price' => 300, 'priceVip' => 400, 'active' => false],
            ['id' => 2, 'rows' => 7, 'columns' => 12, 'price' => 350, 'priceVip' => 500, 'active' => true],
        ]);

        function generateSeats($rows, $columns, $hall) {
            $seats = [];
            for($i = 1;$i <= $rows * $columns;$i++){
                $seats[] = ['idInHall' => $i, 'hall' => $hall, 'type' => 'normal'];
            }
            return $seats;
        }

        // Генерим места в 2 залах
        $hall1Seats = generateSeats(10, 8, 1);
        $hall2Seats = generateSeats(7, 12, 2);

        DB::table('seat')->insertOrIgnore($hall1Seats);
        DB::table('seat')->insertOrIgnore($hall2Seats);

        // Фильмы

        DB::table('film')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'Звёздные войны XXIII: Атака клонированных клонов',
                'description' => 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.',
                'poster' => 'i/poster1.jpg',
                'country' => 'США',
                'duration' => 130,
            ],[
                'id' => 2,
                'name' => 'Альфа',
                'description' => '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
                'poster' => 'i/poster2.jpg',
                'country' => 'Франция',
                'duration' => 96,
            ],[
                'id' => 3,
                'name' => 'Хищник',
                'description' => 'Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.',
                'poster' => 'i/poster1.jpg',
                'country' => 'Канада, США',
                'duration' => 101,
            ],
        ]);

        // Сетка фильмов

        DB::table('grid')->insertOrIgnore([
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '9:00', 'film' => 1],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '16:00', 'film' => 1],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '18:00', 'film' => 1],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '3:00', 'film' => 1],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '11:00', 'film' => 2],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '14:00', 'film' => 3],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '16:30', 'film' => 2],
            ['hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '20:20', 'film' => 1],
            ['hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '10:00', 'film' => 1],
            ['hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '12:00', 'film' => 2],
            ['hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '15:00', 'film' => 3],
            ['hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '16:30', 'film' => 2],
            ['hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '20:00', 'film' => 1],
        ]);
    }
}
