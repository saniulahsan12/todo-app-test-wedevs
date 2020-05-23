<?php
namespace TodoFramework;

class initiateBootloader
{
    public function load()
    {
        require_once 'config/config.php';
        require_once 'core/App.php';
        require_once 'core/Controller.php';
        require_once 'core/Database.php';
        require_once 'core/Request.php';
        require_once 'core/Validator.php';
    }
}
