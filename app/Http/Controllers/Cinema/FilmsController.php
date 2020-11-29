<?php


namespace App\Http\Controllers\Cinema;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class FilmsController extends Controller
{
    public function getFilmsByDay($year, $month, $day) {
        $grid = DB::table('grid')
            ->where('year', $year)
            ->where('month', $month)
            ->where('day', $day)
            ->select('id', 'hall', 'time', 'film')
            ->orderBy('time')
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

    public function generateQR(Request $request) {
        $ticket = 'Фильм: '. $request->name
            . '|Места: '. $request->seats
            . '|Зал: '. $request->hall
            . '|Сеанс: '. $request->time
            . '|Стоимость: '. $request->price
            . '|Сеанс '. $request->sess;
        $qr = QrCode::format('png')->encoding('UTF-8')->generate($ticket);
        return base64_encode($qr);
    }

    public function booking(Request $request) {
        $selected = explode(',', $request->selected);
        DB::table('seat')
            ->where('gridId', $request->gridId)
            ->whereIn('idInHall', $selected)
            ->update(['type' => 'taken']);

        return DB::table('seat')
            ->where('gridId', $request->gridId)
            ->whereIn('idInHall', $selected)
            ->get();

    }

    public function getHalls() {
        return DB::table('hall')
            ->get();
    }

    public function createHall(Request $request) {
        DB::table('hall')
            ->insertOrIgnore([
                "id" => $request->id,
                "rows" => $request->rows,
                "columns" => $request->columns,
                "price" => $request->price,
                "priceVip" => $request->priceVip,
                "active" => false,
                ]);
        $this->createSeats($request->rows, $request->columns, $request->id);
        return "Success";
    }

    private function createSeats($rows, $columns, $hall) {
        $seats = [];
        //standart, disabled, taken, vip
        for($i = 1;$i <= $rows * $columns;$i++){
            $seats[] = ['seatId' => $i, 'hallId' => $hall, 'type' => 'standart'];
        }
        DB::table('seatsconfig')->insertOrIgnore($seats);
        return "Success";
    }

    public function deleteHall(Request $request) {
        $id = $request->id;
        DB::table('hall')
            ->where('id', $id)
            ->delete();
        DB::table('seatsConfig')
            ->where('hallId', $id)
            ->delete();
        DB::table('grid')
            ->where('hall', $id)
            ->delete();
        DB::table('seat')
            ->where('hall', $id)
            ->delete();
        return "Success";
    }

    public function getSeatsConfig($id) {
        return DB::table('seatsconfig')
            ->where('hallId', $id)
            ->get();
    }

    public function saveSeats(Request $request) {
        foreach($request->seats as $row) {
            if(is_array($row)) {
                foreach($row as $seat) {
                    DB::table('seatsconfig')
                        ->where('hallId', $request->id)
                        ->where('seatId', $seat["id"])
                        ->update(["type" => $seat["type"]]);
                }
            }
        }
        return "Success";
    }

    public function setPrice(Request $request) {
        DB::table('hall')
            ->where('id', $request->id)
            ->update([
                "price" => $request->price,
                "priceVip" => $request->priceVip
            ]);
        return "Success";
    }

    public function getFilms() {
        return DB::table('film')
            ->get();
    }

    public function getGrid() {
        return DB::table('grid')
            ->orderBy('time')
            ->get();
    }

    public function addFilm(Request $request) {
        DB::table('film')
            ->insertOrIgnore([
                    'name' => $request->name,
                    'description' => $request->description,
                    'poster' => 'i/poster1.jpg',
                    'country' => $request->country,
                    'duration' => $request->duration,
                ]);
        return "Success";
    }

    public function addShowtime(Request $request) {
        DB::table('grid')
            ->insertOrIgnore([
                'hall' => $request->hall,
                'year' => 2020,
                'month' => 10,
                'day' => 30,
                'time' => $request->time,
                'film' => $request->film
            ]);

        $gridId = DB::table('grid')->max('id');

        $seats = DB::table('seatsconfig')
            ->where("hallId", $request->hall)
            ->get();

        foreach($seats as $seat) {
            DB::table('seat')
                ->insertOrIgnore([
                    "idInHall" => $seat->seatId,
                    "hall" => $request->hall,
                    "gridId" => $gridId,
                    "type" => $seat->type
                ]);
        }

        return "Success";
    }

    public function deleteShowtime(Request $request) {
        $id = $request->id;
        DB::table('grid')
            ->where("id", $id)
            ->delete();

        DB::table('seat')
            ->where("gridId", $id)
            ->delete();

        return "Success";
    }

    public function delMovie(Request $request) {
        $id = $request->id;
        $grids = DB::table('grid')
            ->where('film', $id)
            ->get('id');

        $gridIds = [];
        foreach ($grids as $value) $gridIds[] = $value->id;

        DB::table('seat')
            ->whereIn('gridId', $gridIds)
            ->delete();

        DB::table('grid')
            ->where('film', $id)
            ->delete();

        DB::table('film')
            ->where('id', $id)
            ->delete();

        return "Success";
    }
}
