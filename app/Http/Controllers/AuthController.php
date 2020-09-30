<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json($user);
    }

    public function login(Request $request) {

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();


            $token = $user->createToken($request->email)->accessToken;

            return response()->json([
                'token' => $token
            ]);
        } else {
            return response()->json(['message' => 'Пользователь не найден!'], 404);
        }

    }

    public function check(Request $request) {
        $user = Auth::user();
        return $user;
    }
}
