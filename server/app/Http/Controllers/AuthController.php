<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $email = $request->email;
        $typeUser = DB::table('users')->where("email", $email)->value('typeUser');
        $photo = DB::table('users')->where("email", $email)->value('photo_profile');

        $name = DB::table('users')->where("email", $email)->value('name');

        if (Auth::attempt($credentials)) {
            DB::table('users')->where("email", $email)->update([
                'is_authentified' => 1
            ]);
            $user = Auth::guard('api')->user();
            $token = JWTAuth::fromUser($user, ['foo' => 'bar']);
            Auth::guard('api')->login($user);
            return response()->json(['success' => true, 'token' => $token, 'typeUser' => $typeUser, 'name' => $name, 'email' => $email, 'photo' => $photo]);
        } else {
            return response()->json(['success' => false]);
        }


    }

    public function logout(Request $request)
    {
        DB::table('users')->where("email", $request->email)->update([
            'is_authentified' => 0
        ]);
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);

    }

    public function checkAuth()
    {
        $users = DB::table('users')->selectRaw('is_authentified')->get();
        $res = [];
        foreach ($users as $user) {
            array_push($res, $user->is_authentified);
        }
        if (in_array(true, $res) || in_array(1, $res)) {
            return response()->json(['is_authentified' => true]);
        } else {
            return response()->json(['is_authentified' => false]);

        }
        // return response()->json(['is_authentified' => $is_authentified]);

    }

    public function addUser(Request $request)
    {
        try {
            // Create a new user instance with the submitted data
            $user = new User;
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->typeUser = $request['userType'];
            $user->email_verified_at = now();
            $user->password = Hash::make($request['password']);
            $user->remember_token = \Str::random(10);

            $file = $request->file('photo');
            if (isset($file)) {
                $name = time() . '.' . $file->extension();
                $file->storeAs('profile', $name);
            } else {
                $name = 'unset.jpg';
            }


            $user->photo_profile = $name;

            $user->save();

            // Redirect the user to a success page or do something else
            $successMsg = "L'utilisateur " . $request['name'] . " a été ajouté avec success";
            return response()->json(['success' => $successMsg]);
        } catch (\Throwable $th) {
            error_log($th);
        }
    }

    public function getPhoto($photoName)
    {
        $path = storage_path('app/profile/' . $photoName);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function listUsers()
    {
        $listU = User::all();
        return response()->json(["listUsers" => $listU]);
    }
}