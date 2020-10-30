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
}
