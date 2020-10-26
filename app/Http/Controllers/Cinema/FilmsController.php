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
            ->select('id', 'hall', 'time', 'film')
            ->get();
        $result = [];

        foreach ($grid as $item) {
            $result[$item->film][] = [
                'gridId' => $item->id,
                'film' => $item->film,
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

    public function getSessionInfo($gridId) {
        $seats = DB::table('seat')
            ->where('gridId', $gridId)
            ->get();
        return $seats;
    }

    public function getHallInfo($hallId) {
        $hall = DB::table('hall')
            ->where('id', $hallId)
            ->get();
        return $hall;
    }
}
