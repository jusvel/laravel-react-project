<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConferenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:55',
            'description' => 'required|string|max:255',
            'date' => 'required|date',
            'address' => 'required|string|max:255',
            'city'=>'required|string|max:255',
            'number_of_participants'=>'required|integer',
            'organizer'=>'required|string|max:255',
        ];
    }
}
