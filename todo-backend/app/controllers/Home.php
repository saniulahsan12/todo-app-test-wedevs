<?php

class Home extends Controller
{
    private $data;

    function __construct()
    {
        $this->data = [];
    }

    public function index()
    {
        $this->data['data'] = [
            'routes' => [
                'list_all_todo' => [
                    'url' => '/todo-backend/?url=todo',
                    'method' => 'GET'
                ],
                'list_all_todo_by_status' => [
                    'url' => '/todo-backend/?url=todo/filter&status=1',
                    'method' => 'GET'
                ],
                'get_todo_by_id' => [
                    'url' => '/todo-backend/?url=todo/detail&id=22',
                    'method' => 'GET'
                ],
                'delete_todo' => [
                    'url' => '/todo-backend/?url=todo/delete&id=22',
                    'method' => 'DELETE'
                ],
                'delete_completed_todo' => [
                    'url' => '/todo-backend/?url=todo/deleteCompleted',
                    'method' => 'DELETE'
                ],
                'insert_todo' => [
                    'url' => '/todo-backend/?url=todo/add',
                    'method' => 'POST',
                    'post_data' => [
                        'description' => 'Have a nice day'
                    ]
                ],
                'edit_todo' => [
                    'url' => '/todo-backend/?url=todo/edit',
                    'method' => 'POST',
                    'post_data' => [
                        'description' => 'Have a rainy day',
                        'id' => 12,
                        'status' => 1
                    ]
                ],
            ],
            'configuration' => 'follow the path /app/config/config.php',
            'database_dump' => 'wedevs_todo.sql'
        ];
        $this->data['status'] = 200;
        $this->data['message'] = 'API application for a simple OOP PHP & MYSQL based MVC framework';

        $this->toJson($this->data);
    }
}
