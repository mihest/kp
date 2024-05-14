<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    /**
     *
     * @return JsonResponse
     */
    public function register() : JsonResponse {
        request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|string|min:6'
        ], [
            'email.required' => 'Поле \'Почта\' должно быть обязательно.',
            'email.unique' => 'Почта уже занята',
            'password.required' => 'Поле \'Пароль\' должно быть обязательно.',
            'password.confirmed' => 'Пароли не совпадают.',
            'password.string' => 'Поле \'Пароль\' должно быть строкой.',
            'password.min' => 'Минимальная длина пароля 6 символов.'
        ]);

        $user = User::create([
            'name' => request()->name,
            'email' => request()->email,
            'password' => bcrypt(request()->password),
            'role_id' => 2
        ]);
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me()
    {
        return response()->json(new UserResource(auth()->user()));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function update() {
        request()->validate([
            'current_password' => 'current_password:api',
            'password' => 'string|confirmed|string|min:6',
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email',
        ]);
        $user = auth()->user();
        $userData = request()->only(['name', 'email', 'password']);

        if (isset($userData['password'])) {
            $userData['password'] = bcrypt($userData['password']);
        }

        $user->update($userData);

        return new UserResource($user);
    }

    public function destroy() {
        $user = auth()->user();
        $user->delete();
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken(string $token)
    {
        return response()->json([
            'user' => new UserResource(auth()->user()),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
