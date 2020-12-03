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

        $hall1Seats1 = generateSeats(10, 8, 1, 14);
        $hall1Seats21 = generateSeats(10, 8, 1, 15);
        $hall1Seats31 = generateSeats(10, 8, 1, 16);
        $hall1Seats41 = generateSeats(10, 8, 1,17);
        $hall1Seats51 = generateSeats(10, 8, 1,18);
        $hall1Seats61 = generateSeats(10, 8, 1,19);
        $hall1Seats71 = generateSeats(10, 8, 1,20);
        $hall1Seats81 = generateSeats(10, 8, 1,21);
        $hall2Seats1 = generateSeats(7, 12, 2,22);
        $hall2Seats21 = generateSeats(7, 12, 2,23);
        $hall2Seats31 = generateSeats(7, 12, 2,24);
        $hall2Seats41 = generateSeats(7, 12, 2,25);
        $hall2Seats51 = generateSeats(7, 12, 2,26);

        $hall1Seats2 = generateSeats(10, 8, 1, 27);
        $hall1Seats22 = generateSeats(10, 8, 1, 28);
        $hall1Seats32 = generateSeats(10, 8, 1,29);
        $hall1Seats42 = generateSeats(10, 8, 1,30);
        $hall1Seats52 = generateSeats(10, 8, 1,31);
        $hall1Seats62 = generateSeats(10, 8, 1,32);
        $hall1Seats72 = generateSeats(10, 8, 1,33);
        $hall1Seats82 = generateSeats(10, 8, 1,34);
        $hall2Seats2 = generateSeats(7, 12, 2,35);
        $hall2Seats22 = generateSeats(7, 12, 2,36);
        $hall2Seats32 = generateSeats(7, 12, 2,37);
        $hall2Seats42 = generateSeats(7, 12, 2,38);
        $hall2Seats52 = generateSeats(7, 12, 2,39);

        $hall1Seats3 = generateSeats(10, 8, 1, 40);
        $hall1Seats23 = generateSeats(10, 8, 1, 41);
        $hall1Seats33 = generateSeats(10, 8, 1,42);
        $hall1Seats43 = generateSeats(10, 8, 1,43);
        $hall1Seats53 = generateSeats(10, 8, 1,44);
        $hall1Seats63 = generateSeats(10, 8, 1,45);
        $hall1Seats73 = generateSeats(10, 8, 1,46);
        $hall1Seats83 = generateSeats(10, 8, 1,47);
        $hall2Seats3 = generateSeats(7, 12, 2,48);
        $hall2Seats23 = generateSeats(7, 12, 2,49);
        $hall2Seats33 = generateSeats(7, 12, 2,50);
        $hall2Seats43 = generateSeats(7, 12, 2,51);
        $hall2Seats53 = generateSeats(7, 12, 2,52);

        $hall1Seats4 = generateSeats(10, 8, 1, 53);
        $hall1Seats24 = generateSeats(10, 8, 1, 54);
        $hall1Seats34 = generateSeats(10, 8, 1,55);
        $hall1Seats44 = generateSeats(10, 8, 1,56);
        $hall1Seats54 = generateSeats(10, 8, 1,57);
        $hall1Seats64 = generateSeats(10, 8, 1,58);
        $hall1Seats74 = generateSeats(10, 8, 1,59);
        $hall1Seats84 = generateSeats(10, 8, 1,60);
        $hall2Seats4 = generateSeats(7, 12, 2,61);
        $hall2Seats24 = generateSeats(7, 12, 2,62);
        $hall2Seats34 = generateSeats(7, 12, 2,63);
        $hall2Seats44 = generateSeats(7, 12, 2,64);
        $hall2Seats54 = generateSeats(7, 12, 2,65);

        $hall1Seats5 = generateSeats(10, 8, 1, 66);
        $hall1Seats25 = generateSeats(10, 8, 1, 67);
        $hall1Seats35 = generateSeats(10, 8, 1,68);
        $hall1Seats45 = generateSeats(10, 8, 1,69);
        $hall1Seats55 = generateSeats(10, 8, 1,70);
        $hall1Seats65 = generateSeats(10, 8, 1,71);
        $hall1Seats75 = generateSeats(10, 8, 1,72);
        $hall1Seats85 = generateSeats(10, 8, 1,73);
        $hall2Seats5 = generateSeats(7, 12, 2,74);
        $hall2Seats25 = generateSeats(7, 12, 2,75);
        $hall2Seats35 = generateSeats(7, 12, 2,76);
        $hall2Seats45 = generateSeats(7, 12, 2,77);
        $hall2Seats55 = generateSeats(7, 12, 2,78);

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

        DB::table('seat')->insertOrIgnore($hall1Seats1);
        DB::table('seat')->insertOrIgnore($hall1Seats21);
        DB::table('seat')->insertOrIgnore($hall1Seats31);
        DB::table('seat')->insertOrIgnore($hall1Seats41);
        DB::table('seat')->insertOrIgnore($hall1Seats51);
        DB::table('seat')->insertOrIgnore($hall1Seats61);
        DB::table('seat')->insertOrIgnore($hall1Seats71);
        DB::table('seat')->insertOrIgnore($hall1Seats81);
        DB::table('seat')->insertOrIgnore($hall2Seats1);
        DB::table('seat')->insertOrIgnore($hall2Seats21);
        DB::table('seat')->insertOrIgnore($hall2Seats31);
        DB::table('seat')->insertOrIgnore($hall2Seats41);
        DB::table('seat')->insertOrIgnore($hall2Seats51);

        DB::table('seat')->insertOrIgnore($hall1Seats2);
        DB::table('seat')->insertOrIgnore($hall1Seats22);
        DB::table('seat')->insertOrIgnore($hall1Seats32);
        DB::table('seat')->insertOrIgnore($hall1Seats42);
        DB::table('seat')->insertOrIgnore($hall1Seats52);
        DB::table('seat')->insertOrIgnore($hall1Seats62);
        DB::table('seat')->insertOrIgnore($hall1Seats72);
        DB::table('seat')->insertOrIgnore($hall1Seats82);
        DB::table('seat')->insertOrIgnore($hall2Seats2);
        DB::table('seat')->insertOrIgnore($hall2Seats22);
        DB::table('seat')->insertOrIgnore($hall2Seats32);
        DB::table('seat')->insertOrIgnore($hall2Seats42);
        DB::table('seat')->insertOrIgnore($hall2Seats52);

        DB::table('seat')->insertOrIgnore($hall1Seats3);
        DB::table('seat')->insertOrIgnore($hall1Seats23);
        DB::table('seat')->insertOrIgnore($hall1Seats33);
        DB::table('seat')->insertOrIgnore($hall1Seats43);
        DB::table('seat')->insertOrIgnore($hall1Seats53);
        DB::table('seat')->insertOrIgnore($hall1Seats63);
        DB::table('seat')->insertOrIgnore($hall1Seats73);
        DB::table('seat')->insertOrIgnore($hall1Seats83);
        DB::table('seat')->insertOrIgnore($hall2Seats3);
        DB::table('seat')->insertOrIgnore($hall2Seats23);
        DB::table('seat')->insertOrIgnore($hall2Seats33);
        DB::table('seat')->insertOrIgnore($hall2Seats43);
        DB::table('seat')->insertOrIgnore($hall2Seats53);

        DB::table('seat')->insertOrIgnore($hall1Seats4);
        DB::table('seat')->insertOrIgnore($hall1Seats24);
        DB::table('seat')->insertOrIgnore($hall1Seats34);
        DB::table('seat')->insertOrIgnore($hall1Seats44);
        DB::table('seat')->insertOrIgnore($hall1Seats54);
        DB::table('seat')->insertOrIgnore($hall1Seats64);
        DB::table('seat')->insertOrIgnore($hall1Seats74);
        DB::table('seat')->insertOrIgnore($hall1Seats84);
        DB::table('seat')->insertOrIgnore($hall2Seats4);
        DB::table('seat')->insertOrIgnore($hall2Seats24);
        DB::table('seat')->insertOrIgnore($hall2Seats34);
        DB::table('seat')->insertOrIgnore($hall2Seats44);
        DB::table('seat')->insertOrIgnore($hall2Seats54);

        DB::table('seat')->insertOrIgnore($hall1Seats5);
        DB::table('seat')->insertOrIgnore($hall1Seats25);
        DB::table('seat')->insertOrIgnore($hall1Seats35);
        DB::table('seat')->insertOrIgnore($hall1Seats45);
        DB::table('seat')->insertOrIgnore($hall1Seats55);
        DB::table('seat')->insertOrIgnore($hall1Seats65);
        DB::table('seat')->insertOrIgnore($hall1Seats75);
        DB::table('seat')->insertOrIgnore($hall1Seats85);
        DB::table('seat')->insertOrIgnore($hall2Seats5);
        DB::table('seat')->insertOrIgnore($hall2Seats25);
        DB::table('seat')->insertOrIgnore($hall2Seats35);
        DB::table('seat')->insertOrIgnore($hall2Seats45);
        DB::table('seat')->insertOrIgnore($hall2Seats55);

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
            ['id' => 1, 'hall' => 1, 'year' => 2020, 'month' => 10, 'day' => 30, 'time' => '09:00', 'film' => 1],
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

            ['id' => 14, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '09:00', 'film' => 1],
            ['id' => 15, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '11:00', 'film' => 1],
            ['id' => 16, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '14:00', 'film' => 1],
            ['id' => 17, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '16:00', 'film' => 1],
            ['id' => 18, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '18:00', 'film' => 2],
            ['id' => 19, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '19:00', 'film' => 3],
            ['id' => 20, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '20:00', 'film' => 2],
            ['id' => 21, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '21:20', 'film' => 1],
            ['id' => 22, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '23:00', 'film' => 1],
            ['id' => 23, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '12:00', 'film' => 2],
            ['id' => 24, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '15:00', 'film' => 3],
            ['id' => 25, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '16:30', 'film' => 2],
            ['id' => 26, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 1, 'time' => '20:00', 'film' => 1],

            ['id' => 27, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '09:00', 'film' => 1],
            ['id' => 28, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '11:00', 'film' => 1],
            ['id' => 29, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '14:00', 'film' => 1],
            ['id' => 30, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '16:00', 'film' => 1],
            ['id' => 31, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '18:00', 'film' => 2],
            ['id' => 32, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '19:00', 'film' => 3],
            ['id' => 33, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '20:00', 'film' => 2],
            ['id' => 34, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '21:20', 'film' => 1],
            ['id' => 35, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '23:00', 'film' => 1],
            ['id' => 36, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '12:00', 'film' => 2],
            ['id' => 37, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '15:00', 'film' => 3],
            ['id' => 38, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '16:30', 'film' => 2],
            ['id' => 39, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 2, 'time' => '20:00', 'film' => 1],

            ['id' => 40, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '09:00', 'film' => 1],
            ['id' => 41, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '11:00', 'film' => 1],
            ['id' => 42, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '14:00', 'film' => 1],
            ['id' => 43, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '16:00', 'film' => 1],
            ['id' => 44, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '18:00', 'film' => 2],
            ['id' => 45, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '19:00', 'film' => 3],
            ['id' => 46, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '20:00', 'film' => 2],
            ['id' => 47, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '21:20', 'film' => 1],
            ['id' => 48, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '23:00', 'film' => 1],
            ['id' => 49, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '12:00', 'film' => 2],
            ['id' => 50, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '15:00', 'film' => 3],
            ['id' => 51, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '16:30', 'film' => 2],
            ['id' => 52, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 3, 'time' => '20:00', 'film' => 1],

            ['id' => 53, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '09:00', 'film' => 1],
            ['id' => 54, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '11:00', 'film' => 1],
            ['id' => 55, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '14:00', 'film' => 1],
            ['id' => 56, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '16:00', 'film' => 1],
            ['id' => 57, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '18:00', 'film' => 2],
            ['id' => 58, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '19:00', 'film' => 3],
            ['id' => 59, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '20:00', 'film' => 2],
            ['id' => 60, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '21:20', 'film' => 1],
            ['id' => 61, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '23:00', 'film' => 1],
            ['id' => 62, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '12:00', 'film' => 2],
            ['id' => 63, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '15:00', 'film' => 3],
            ['id' => 64, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '16:30', 'film' => 2],
            ['id' => 65, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 4, 'time' => '20:00', 'film' => 1],

            ['id' => 66, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '09:00', 'film' => 1],
            ['id' => 67, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '11:00', 'film' => 1],
            ['id' => 68, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '14:00', 'film' => 1],
            ['id' => 69, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '16:00', 'film' => 1],
            ['id' => 70, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '18:00', 'film' => 2],
            ['id' => 71, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '19:00', 'film' => 3],
            ['id' => 72, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '20:00', 'film' => 2],
            ['id' => 73, 'hall' => 1, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '21:20', 'film' => 1],
            ['id' => 74, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '23:00', 'film' => 1],
            ['id' => 75, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '12:00', 'film' => 2],
            ['id' => 76, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '15:00', 'film' => 3],
            ['id' => 77, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '16:30', 'film' => 2],
            ['id' => 78, 'hall' => 2, 'year' => 2020, 'month' => 11, 'day' => 5, 'time' => '20:00', 'film' => 1],

        ]);
    }
}
