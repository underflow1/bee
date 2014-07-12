<?php
require __DIR__.'/lib/base.php';
F3::set('DEBUG',3);
F3::set('DB',
    new DB\SQL(
        'mysql:host=localhost;port=3306;dbname=mobile2',
        'mob2',
        '123qweQWE'
)
);

/*
 phonenumbers:
	phonenumber
	simnumber
	tariff
	blocked
	contract
	companyname
holders:
	fio
	position
	deduction
	pkg
	roam
 */

class Sim {

    function Sim ($get) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
            $phonenumber->load("phonenumber = $get");
            $holders->load("id = $phonenumber->holderid");

        $currentstate = array(
            'phonenumber' => $phonenumber->phonenumber,
            'simnumber' => $phonenumber->simnumber,
	        'tariff' => $phonenumber->tariff,
	        'blocked' => $phonenumber->blocked,
	        'contract' => $phonenumber->contract,
	        'companyname' => $phonenumber->companyname,
            'fio' => $holders->fio,
	        'position' => $holders->position,
	        'deduction' => $holders->deduction,
	        'pkg' => $holders->pkg,
	        'roam' => $holders->roam
        );

        $result = array ('success' => true, 'data' => $currentstate);
         echo json_encode($result);
    }
}

$test = new Sim(9032299469);

/*



*/