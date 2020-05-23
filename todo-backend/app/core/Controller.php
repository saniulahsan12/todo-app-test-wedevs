<?php

class Controller
{
    public function toJson($data = [])
    {
        header('Content-Type: application/json');
        echo json_encode($data, JSON_NUMERIC_CHECK);
    }

    public function model($model)
    {
        require './app/models/' . $model . '.php';
        return new $model;
    }
}
