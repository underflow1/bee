<?php
require __DIR__.'/lib/base.php';
use DB\SQL\Mapper as Mapper;
F3::set('DEBUG',3);
$db = new DB\SQL(
    'mysql:host=localhost;port=3306;dbname=mobile2',
    'mob2',
    '123qweQWE'
);


class Sim extends Mapper {

    function Sim ($get) {
        $phonenumber = new DB\SQL\Mapper($db, 'phonenumbers');
    }
}

$test = new Sim(9032299469);