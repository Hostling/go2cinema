<?php


namespace App\Http\Controllers\Cinema;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class FilmsController extends Controller
{
    public function getFilmsByDay($year, $month, $day) {
        $grid = DB::table('grid')
            ->where('year', $year)
            ->where('month', $month)
            ->where('day', $day)
            ->select('hall', 'time', 'film')
            ->get();
        $result = [];

        foreach ($grid as $item) {
            $result[$item->film][] = [
                'hall' => $item->hall,
                'time' => $item->time,
            ];
        }
        return $result;
    }

    public function filmInfo($id) {
        $film = DB::table('film')
            ->where('id', $id)
            ->get();
        return $film;
    }
}
