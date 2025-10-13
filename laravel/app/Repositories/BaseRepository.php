<?php

namespace App\Repositories;

use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Model;

/**
 * @template TModel of \Illuminate\Database\Eloquent\Model
 */
abstract class BaseRepository
{
    /**
     * @var TModel
     */
    protected $model;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @throws \Exception
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->makeModel();
    }

    /**
     * Configure the Model.
     * 使うモデルを設定
     *
     * @return string
     */
    abstract public function model();

    /**
     * モデルを作成
     *
     * @throws \Exception
     */
    public function makeModel(): void
    {
        $model = $this->app->make($this->model());

        if (! $model instanceof Model) {
            throw new \Exception("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }

        /** @var TModel $model */
        $this->model = $model;
    }

    /**
     * Create model record.
     *
     * @param  array<string,mixed>  $input
     * @return TModel
     */
    public function create(array $input): Model
    {
        /** @var TModel */
        return $this->model->newQuery()->create($input);
    }

    // 補完が効くように@return TModelとかく
    /**
     * Find model record for given id.
     *
     * @param  array<int, string>  $columns
     * @param  array<string>  $relations
     * @return TModel
     */
    public function find(int $id, array $columns = ['*'], array $relations = []): Model
    {
        $query = $this->model->newQuery();

        // ! empty よりも確実だしphpstanに怒られない
        if (count($relations) > 0) {
            $query->with($relations);
        }

        /** @var TModel */
        return $query->findOrFail($id, $columns);
    }

    /**
     * Update model record for given id.
     *
     * @param  array<string,mixed>  $input
     */
    public function update(array $input, int $id): bool
    {
        $query = $this->model->newQuery();

        $model = $query->findOrFail($id);

        return $model->update($input);
    }

    public function delete(int $id): ?bool
    {
        $query = $this->model->newQuery();

        $model = $query->findOrFail($id);

        return $model->delete();
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     *
     * @param  array<string,mixed>  $attributes
     * @param  array<string,mixed>  $values
     * @return TModel
     */
    public function updateOrCreate(array $attributes, array $values = []): Model
    {
        $query = $this->model->newQuery();

        /** @var TModel */
        return $query->updateOrCreate($attributes, $values);
    }
}
