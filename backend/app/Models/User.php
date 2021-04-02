<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use SoftDeletes, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = ['password'];

    public function setPasswordAttribute($value)
    {
        if($value) $this->attributes['password'] = Hash::needsRehash($value) ? Hash::make($value) : $value;
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, RoomUser::class);
    }
    
}
