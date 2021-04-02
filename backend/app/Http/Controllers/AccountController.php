<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Account\RegisterRequest;
use App\Http\Requests\Account\LoginRequest;
use App\Http\Requests\Account\ChangePasswordRequest;
use App\Models\User;

class AccountController extends Controller
{
	public function register(RegisterRequest $request)
	{
		return User::firstOrCreate($request->only(['username','name', 'password']));
    }
	
	public function login(LoginRequest $request)
	{
		return Auth::attempt($request->only(['username', 'password'])) ? Auth::user()->username : response()->json(['error' => 'Unauthenticated.'], 401);
	}

	public function user()
	{
		return Auth::user()->username;
	}

	public function logout()
	{
		return Auth::guard('web')->logout();
	}

	public function changePassword(ChangePasswordRequest $request)
	{
		return Auth::user()->update($request->only(['password']));
	}
}
