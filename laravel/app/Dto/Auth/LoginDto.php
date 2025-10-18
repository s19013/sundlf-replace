<?php

namespace App\Dto\Auth;

use App\Models\User;

class LoginDto
{
    public function __construct(
        public readonly string $name,
    ) {}

    public static function fromModel(User $user): self
    {
        return new LoginDto(
            $user->name,
        );
    }
}
