<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'description'=>$this->description,
            'date'=>$this->date,
            'address'=>$this->address,
            'city'=>$this->city,
            'number_of_participants'=>$this->number_of_participants,
            'organizer'=>$this->organizer,
        ];
    }
}
