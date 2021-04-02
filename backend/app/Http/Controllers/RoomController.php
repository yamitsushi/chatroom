<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Room;
use App\Models\User;

class RoomController extends Controller
{
    public function getRooms()
    {
        return Auth::user()->rooms()->get()->load(['users:id,name']);
    }

    public function postRoom(Request $request)
    {
        $room = Room::firstOrCreate($request->only('name'));
        $room->users()->sync($this->getUsersID($request->users));
        return Room::with(['users'])->find($room->id);
    }

    public function updateRoom(Request $request, Room $room)
    {
        $room->update($request->only('name'));
        $room->users()->sync($this->getUsersID($request->users));
        
        return Room::with(['users'])->find($room->id);
    }
    
	private function getUsersID($users)
	{
        array_push($users, Auth::user()->name);
		return User::whereIn('name', $users)->pluck('id');
	}
}
