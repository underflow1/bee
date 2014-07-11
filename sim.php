<?php

require_once 'lib/base.php';
F3::set('AUTOLOAD','app/data/');
F3::set('DB',
    new DB(
        'mysql:host=localhost;port=3306;dbname=mobile2',
        'mob2',
        '123qweQWE'
    )
);


class sim {

} 