<?php

namespace App\Repositories;

use App\Models\User;

/**
 * @extends BaseRepository<Post>
 */
class UserRepository extends BaseRepository
{
    /**
     * 使うモデルを設定
     */
    public function model(): string
    {
        return User::class;
    }

    public function findByEmail(string $email): User
    {
        $query = $this->model->newQuery();
        $query->where('email', $email);

        return $query->firstOrFail();
    }
}
