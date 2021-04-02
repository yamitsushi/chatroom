<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\SendMessage;
use App\Models\Message;
use App\Models\Room;

class MessageController extends Controller
{
    public function getMessage(Request $request, Room $room)
    {
        return $room->messages()->get()->load('user');
    }

    public function postMessage(Request $request, Room $room)
    {
        $message = $request->only(['message']);
        $message['user_id'] = Auth::user()->id;
        $new = $room->messages()->create($message);

        broadcast(new SendMessage($new->load('user')));
        return response()->json(['status' => 'success']);
    }
}