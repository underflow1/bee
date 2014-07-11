<?php

require_once 'lib/base.php';
$db= new DB\SQL(
    'mysql:host=localhost;port=3306;dbname=mobile2',
    'mob2',
    '123qweQWE'
);




$ph= new DB\SQL\Mapper($db, 'ph_tariff');
$ph->phonenumber=1231231122;
$ph->save();
echo $id =$ph->_id;

class sim {

}
