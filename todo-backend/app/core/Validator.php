<?php

namespace Framework;

class Validator
{
    public static function checkRequired($field)
    {
        if (!empty($field)) {
            return $field;
        } else {
            return false;
        }
    }

    public static function filterString($field)
    {
        // Sanitize string
        $field = filter_var(trim($field), FILTER_SANITIZE_STRING);
        if (!empty($field)) {
            return $field;
        } else {
            return false;
        }
    }

    public static function check($fields)
    {
        // check for false values
        foreach ($fields as $field) {
            if ($field != true) {
                return false;
            }
        }

        return true;
    }
}
