<?php
use Framework\Request;
use Framework\Validator;

class Todo extends Controller
{

    private $data;

    function __construct()
    {
        $this->data = [];
    }

    public function index()
    {
        if (Request::get()) {
            $this->data['data'] = $this->model('Todo_model')->get_all();
            $this->data['status'] = 200;
            $this->data['message'] = empty($this->data['data']) ? 'No todo found' : '';
            $this->toJson($this->data);
        } else {
            $this->emptyRoute();
        }
    }

    public function filter()
    {
        if (Request::get()) {
            $status = Request::getParams('status');
            $this->data['data'] = $this->model('Todo_model')->get_all_by_status($status);
            $this->data['status'] = 200;
            $this->data['message'] = empty($this->data['data']) ? 'No todo found' : '';
            $this->toJson($this->data);
        } else {
            $this->emptyRoute();
        }
    }

    public function detail()
    {
        if (Request::get()) {
            $id = Request::getParams('id');
            $this->data['data'] = $this->model('Todo_model')->get_by_id($id);
            $this->data['status'] = 200;
            $this->data['message'] = empty($this->data['data']) ? $message['hello'] . 'No todo found' : '';
            $this->toJson($this->data);
        } else {
            $this->emptyRoute();
        }
    }

    public function add()
    {
        if (Request::post()) {
            $postData = Request::postBody();

            $validators = [];
            $validators[] = Validator::checkRequired($postData['description']);
            $validators[] = Validator::filterString($postData['description']);

            if (Validator::check($validators)) {
                $this->data['data'] = $this->model('Todo_model')->insert($postData);
                $this->data['status'] = 200;
                $this->data['message'] = !empty($this->data['data']) ? 'Todo inserted successfully' : 'Operation failed';
                $this->toJson($this->data);
            } else {
                $this->data['data'] = false;
                $this->data['status'] = 400;
                $this->data['message'] = 'Validation failed';
                $this->toJson($this->data);
            }
        } else {
            $this->emptyRoute();
        }
    }

    public function edit()
    {
        if (Request::post()) {
            $postData = Request::postBody();

            $validators = [];
            $validators[] = Validator::checkRequired($postData['id']);
            $validators[] = Validator::checkRequired($postData['description']);
            $validators[] = Validator::filterString($postData['description']);

            if ((int)$postData['status'] == 1) {
                $postData['status'] = true;
            } else {
                $postData['status'] = false;
            }

            if (Validator::check($validators)) {
                $this->data['data'] = $this->model('Todo_model')->update($postData);
                $this->data['status'] = 200;
                $this->data['message'] = !empty($this->data['data']) ? 'Todo updated successfully' : 'Operation failed';
                $this->toJson($this->data);
            } else {
                $this->data['data'] = false;
                $this->data['status'] = 400;
                $this->data['message'] = 'Validation failed';
                $this->toJson($this->data);
            }
        } else {
            $this->emptyRoute();
        }
    }

    public function delete($id)
    {
        if (Request::delete()) {
            $id = Request::getParams('id');
            if ($this->model('Todo_model')->delete($id) === 1) {
                $this->data['data'] = true;
                $this->data['status'] = 200;
                $this->data['message'] = 'Todo deleted successfully';
                $this->toJson($this->data);
                return;
            }
            $this->data['data'] = false;
            $this->data['status'] = 404;
            $this->data['message'] = 'No todo found';
            $this->toJson($this->data);
        } else {
            $this->emptyRoute();
        }
    }

    public function deleteCompleted()
    {
        if (Request::delete()) {
            if ($this->model('Todo_model')->deleteCompleted() > 0) {
                $this->data['data'] = true;
                $this->data['status'] = 200;
                $this->data['message'] = 'Todo deleted successfully';
                $this->toJson($this->data);
                return;
            }
            $this->data['data'] = false;
            $this->data['status'] = 404;
            $this->data['message'] = 'No todo found';
            $this->toJson($this->data);
        } else {
            $this->emptyRoute();
        }
    }

    public function emptyRoute()
    {
        $this->data['data'] = false;
        $this->data['status'] = 404;
        $this->data['message'] = 'Route not found';
        $this->toJson($this->data);
    }
}
