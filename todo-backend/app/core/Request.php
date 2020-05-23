<?php
namespace Framework;

class Request
{
    public static function get()
    {
        return $_SERVER['REQUEST_METHOD'] === 'GET';
    }

    public static function post()
    {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }

    public static function delete()
    {
        return $_SERVER['REQUEST_METHOD'] === 'DELETE';
    }

    public static function getParams($key = '')
    {
        return !empty($key) ? $_GET[$key] : $_GET;
    }

    public static function postBody($key = '')
    {
        return !empty($key) ? $_POST[$key] : $_POST;
    }

    public static function requestVar($key = '')
    {
        return !empty($key) ? $_REQUEST[$key] : $_REQUEST;
    }
}
