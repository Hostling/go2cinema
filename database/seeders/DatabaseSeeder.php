<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


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

        function generateSeats($rows, $columns, $hall, $gridId) {
            $seats = [];
            //standart, disabled, taken, vip
            for($i = 1;$i <= $rows * $columns;$i++){
                $seats[] = ['idInHall' => $i, 'hall' => $hall, 'type' => 'standart', 'gridId' => $gridId];
            }
            return $seats;
        }

        function createSeats2Hall($rows, $columns, $hall) {
        $seats = [];
        //standart, disabled, taken, vip
        for($i = 1;$i <= $rows * $columns;$i++){
            $seats[] = ['seatId' => $i, 'hallId' => $hall, 'type' => 'standart'];
        }
        return $seats;
        }

        DB::table('seatsconfig')->insertOrIgnore(createSeats2Hall(10, 8, 1));
        DB::table('seatsconfig')->insertOrIgnore(createSeats2Hall(7, 12, 2));

        // Генерим места в 2 залах
        $hall1Seats = generateSeats(10, 8, 1, 1);
        $hall1Seats2 = generateSeats(10, 8, 1, 2);
        $hall1Seats3 = generateSeats(10, 8, 1,3);
        $hall1Seats4 = generateSeats(10, 8, 1,4);
        $hall1Seats5 = generateSeats(10, 8, 1,5);
        $hall1Seats6 = generateSeats(10, 8, 1,6);
        $hall1Seats7 = generateSeats(10, 8, 1,7);
        $hall1Seats8 = generateSeats(10, 8, 1,8);
        $hall2Seats = generateSeats(7, 12, 2,9);
        $hall2Seats2 = generateSeats(7, 12, 2,10);
        $hall2Seats3 = generateSeats(7, 12, 2,11);
        $hall2Seats4 = generateSeats(7, 12, 2,12);
        $hall2Seats5 = generateSeats(7, 12, 2,13);

        DB::table('seat')->insertOrIgnore($hall1Seats);
        DB::table('seat')->insertOrIgnore($hall1Seats2);
        DB::table('seat')->insertOrIgnore($hall1Seats3);
        DB::table('seat')->insertOrIgnore($hall1Seats4);
        DB::table('seat')->insertOrIgnore($hall1Seats5);
        DB::table('seat')->insertOrIgnore($hall1Seats6);
        DB::table('seat')->insertOrIgnore($hall1Seats7);
        DB::table('seat')->insertOrIgnore($hall1Seats8);
        DB::table('seat')->insertOrIgnore($hall2Seats);
        DB::table('seat')->insertOrIgnore($hall2Seats2);
        DB::table('seat')->insertOrIgnore($hall2Seats3);
        DB::table('seat')->insertOrIgnore($hall2Seats4);
        DB::table('seat')->insertOrIgnore($hall2Seats5);

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
            ['id' => 1, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '9:00', 'film' => 1],
            ['id' => 2, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '11:00', 'film' => 1],
            ['id' => 3, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '14:00', 'film' => 1],
            ['id' => 4, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '16:00', 'film' => 1],
            ['id' => 5, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '18:00', 'film' => 2],
            ['id' => 6, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '19:00', 'film' => 3],
            ['id' => 7, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '20:00', 'film' => 2],
            ['id' => 8, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '21:20', 'film' => 1],
            ['id' => 9, 'hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '23:00', 'film' => 1],
            ['id' => 10, 'hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '12:00', 'film' => 2],
            ['id' => 11, 'hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '15:00', 'film' => 3],
            ['id' => 12, 'hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '16:30', 'film' => 2],
            ['id' => 13, 'hall' => 2, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '20:00', 'film' => 1],
        ]);
    }
}
