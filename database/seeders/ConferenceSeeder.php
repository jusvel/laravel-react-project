<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConferenceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("conferences")->truncate();

        $faker = Factory::create('lt_LT');
        for($i = 0;$i<20;$i++){
            DB::table("conferences")->insert([
                "title" => $faker->sentence(3),
                "description" => $faker->paragraph(3),
                "date" => $faker->dateTimeThisYear,
                "address" => $faker->address,
                "city" => $faker->city,
                "number_of_participants" => $faker->numberBetween(10, 100),
                "organizer" => $faker->name
            ]);
        }
    }
}
