<?php
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

    function getcurrentstate ($get) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
            $phonenumber->load("phonenumber = ".$get);
            $holders->load("id = ".$phonenumber->holderid);

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
        return json_encode($result);
    }

    function block($get) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
            $phonenumber->load('phonenumber ='.$get);
        if ($phonenumber->blocked == true) {
            $result = array ('success' => false, 'data' => 'Sim card was already blocked');
        } else {
            $phonenumber->blocked = true;
            $phonenumber-> save();
            $result = array ('success' => true, 'data' => 'Sim card succesfully blocked');
        }
        return json_encode($result);
    }

    function settariff ($get, $tariff) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber->load('phonenumber ='.$get);
        $ph_tariff = new DB\SQL\Mapper(F3::get('DB'), 'ph_tariff');

        if ($phonenumber->tariff == $tariff) {
            $result = array ('success' => false, 'data' => 'Sim card has the same tariff');
        } else {
            $phonenumber->tariff = $tariff;
            $phonenumber-> save();
            $ph_tariff->phonenumber = $get;
            $ph_tariff->startdate = date("Y-m-d");
            $ph_tariff->starttime = date("H:i:s");
            $ph_tariff->tariff = $tariff;
            $ph_tariff->save();
            $result = array ('success' => true, 'data' => 'Tariff successfully applied');
        }
        return json_encode($result);
    }

    function setnewsimnumber ($get, $simnumber) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber->load('phonenumber ='.$get);
        $ph_simnumbers = new DB\SQL\Mapper(F3::get('DB'), 'ph_simnumbers');

            $phonenumber->simnumber = $simnumber;
            $phonenumber-> save();
            $ph_simnumbers->phonenumber = $get;
            $ph_simnumbers->startdate = date("Y-m-d");
            $ph_simnumbers->starttime = date("H:i:s");
            $ph_simnumbers->simnumber = $simnumber;
            $ph_simnumbers->save();
            $result = array ('success' => true, 'data' => 'Sim card was replaced');

        return json_encode($result);
    }
}


