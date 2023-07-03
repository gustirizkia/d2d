<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = $request->q;
        $data['user'] = User::where('roles', 'user')
                ->when($q, function($query)use($q){
                   return $query->where(function($result)use($q){
                        return $result->where("name", "LIKE", "%$q%")->orWhere("email", "LIKE", "%$q%");
                    });
                })
                ->orderBy('id', 'desc')->paginate(12);

        return view('pages.user.user', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('pages.user.user-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:users,email|email',
            'phone' => 'required|unique:users,phone',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        $data = $request->except('_token');
        $data['password'] = Hash::make($request->password);

        $user = User::create($data);

        return redirect()->route('admin.user.index')->with('success', "Berhasil tambah user");

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = User::findOrFail($id);

        return view('pages.user.user-edit', compact('item'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'email' => 'required|email',
            'phone' => 'required',
            'name' => 'required|string',
        ]);

        $validasi = [
            'name' => 'required|string'
        ];
        $user = User::findOrFail($id);

        if($request->email !== $user->email){
            $validasi['email'] = 'required|unique:users,email|email';
        }

        if($request->phone !== $user->phone){
            $validasi['phone'] = 'required|unique:users,phone';
        }

        $request->validate($validasi);
        // dd($request->all());
        $data = $request->except(['_token', '_method']);
        if($request->password){
            $data['password'] = Hash::make($request->password);
        }else{
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('admin.user.index')->with('success', "Berhasil update data user");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}