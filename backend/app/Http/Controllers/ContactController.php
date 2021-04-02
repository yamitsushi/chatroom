<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Contact\PostRequest;
use App\Http\Requests\Contact\PatchRequest;
use App\Models\User;
use App\Models\Contact;

class ContactController extends Controller
{
	public function getUsers($skip)
	{
		return response()->json(User::all()->skip($skip)->take(1000));
	}

	public function getContacts($skip)
	{
		return response()->json(Contact::all()->skip($skip)->take(1000));
	}


    public function postContact(PostRequest $request)
	{
        $contact = $request->only(['nickname', 'name']);
        $contact['user_id'] = User::where('name', $request->name)->first()->id;


		$contact = Contact::firstOrCreate($contact);
        return response()->json(Contact::find($contact->id));
	}

	public function patchContact(PatchRequest $request, Contact $contract)
	{
        $contract->update($request->only('nickname'));
        
        return response()->json(Contact::find($contract->id));
	}

	public function deleteContact(Request $request, Contact $contract)
	{
		return response()->json($contract->delete());
	}

}
