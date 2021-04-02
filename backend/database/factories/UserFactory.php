<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => $this->faker->unique()->userName,
            'password' => '$2y$10$k0i6F4T9Wux/06k2/A6AKO/jlCUwF4qgdsIiTUVkGNV2tuAVbQFV.', // pass
            'deleted_at' => $this->faker->numberBetween(0, 5) ? null : $this->faker->dateTimeThisYear
        ];
    }
}