<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConferenceRequest;
use App\Http\Resources\ConferenceResource;
use App\Models\Conference;

class ConferenceController extends Controller
{
    public function index()
    {
        return Conference::all();
    }

    public function show(Conference $conference)
    {
        return $conference;
    }

    public function store(StoreConferenceRequest $request)
    {
        $data = $request->validated();
        $conference = Conference::create($data);

        return response(new ConferenceResource($conference), 201);
    }

    public function update(StoreConferenceRequest $request, Conference $conference)
    {
        $data = $request->validated();
        $conference->update($data);

        return response()->json($conference, 200);
    }

    public function delete(Conference $conference)
    {
        $conference->delete();

        return response()->json(null, 204);
    }
}
