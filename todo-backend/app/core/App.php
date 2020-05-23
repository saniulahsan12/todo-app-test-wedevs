<?php

class App
{
    protected $controller = 'Home';
    protected $method = 'index';
    protected $params = [];

    public function __construct()
    {
        $url = $this->parse_url();
        
        // Controller
        if (file_exists('./app/controllers/' . ucfirst($url['route'][0]) . '.php')) {
            $this->controller = ucfirst($url['route'][0]);
            unset($url['route'][0]);
        }

        require_once './app/controllers/' . $this->controller . '.php';
        $this->controller = new $this->controller;
        
        // Method
        if (isset($url['route'][1])) {
            if (method_exists($this->controller, $url['route'][1])) {
                $this->method = $url['route'][1];
            }
            unset($url['route'][1]);
        }

        // Params
        if (!empty($url)) {
            $this->params = $url['params'];
        }
        
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parse_url()
    {
        if (isset($_GET['url'])) {
            $url = $_GET['url'];
            $params = $_GET;
            unset($params['url']);
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            $output = [
                'route' => $url,
                'params' => $params
            ];
            return $output;
        }
    }
}
