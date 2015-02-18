
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
        $company = new DB\SQL\Mapper(F3::get('DB'), 'company');
        $tariff = new DB\SQL\Mapper(F3::get('DB'), 'tariff');
            $phonenumber->load("phonenumber = ".$get);
            $holders->load("id = ".$phonenumber->holderid);
            $company->load("id = ".$holders->truddogcompanyid);
            $tariff->load("id = ".$phonenumber->tariffid);
        $currentstate = array(
            'phonenumber' => $phonenumber->phonenumber,
            'simnumber' => $phonenumber->simnumber,
	        'tariff' => $tariff->internalname,
            'operatorsname' => $tariff->operatorsname,
	        'blocked' => $phonenumber->blocked,
	        'contract' => $phonenumber->contract,
	        'companyname' => $phonenumber->companyname,
            'fio' => $holders->fio,
	        'position' => $holders->position,
	        'deduction' => $holders->deduction,
	        'pkg' => $holders->pkg,
	        'roam' => $holders->roam,
            'truddognumber' => $holders->truddognumber,
            'truddogdate' => $holders->truddogdate,
            'purpose' => $holders->purpose,
            'truddogcompanyname' => $company->truddogcompanyname,
            'director' => $company->director,
            'directorspos' => $company->directorspos,
            'directorstd' => $company->directorstd,
            'directorsposstd' => $company->directorsposstd
        );
        return $currentstate;
    }

    function getnakldata ($get) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $phonenumber->load("phonenumber = ".$get);
        $holders->load("id = ".$phonenumber->holderid);
        $holderfio = $holders -> fio;
        $holders->load("id = ".$phonenumber->prevholderid);
        $prevholderfio = $holders -> fio;
        $currentstate = array(
            'phonenumber' => $phonenumber->phonenumber,
            'date' => date("Y-m-d"),
            'holderfio' => $holderfio,
            'prevholderfio' => $prevholderfio
        );
        return $currentstate;
    }

    function appenddata($number,$what,$state) {
        $append = new DB\SQL\Mapper(F3::get('DB'), 'ph_'.$what.'s');
        $append->phonenumber = $number;
        $append->startdate = date("Y-m-d");
        $append->starttime = date("H:i:s");
        $append->$what = $state;
        $append->save();
        if ($append->_id > 0 ) {
            $result = array ('success' => true, 'msg' => 'appended', 'id' => $append->_id);
        } else {
            $result = array ('success' => false);
        }
        return json_encode($result);
    }

    function settariff ($number, $state) {
        $phonenumbers = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumbers->load('phonenumber ='.$number);
        if ($phonenumbers->tariffid <> $state) {
            $phonenumbers->tariffid = $state;
            $phonenumbers-> save();
            $appendresult = json_decode(Sim::appenddata($number,'tariff',$state));
            $result = array ('success' => true, 'msg' => 'Tariff successfully applied', 'appendresult'=> $appendresult->{'success'}, 'appendmsg'=> $appendresult->{'msg'},'appended_id' => $appendresult->{'id'});
        } else {
            $result = array ('success' => false, 'msg' => 'Sim card has the same tariff');
        }
        return json_encode($result);
    }

    function setblock($number,$state) {
        $phonenumbers = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumbers->load('phonenumber ='.$number);
        if ($phonenumbers->blocked <> $state) {
            $phonenumbers->blocked = $state;
            $phonenumbers-> save();
            $appendresult = json_decode(Sim::appenddata($number,'block',$state));
            if ($state > 0) {
                $result = array ('success' => true, 'msg' => 'Sim card succesfully blocked', 'appendresult'=> $appendresult->{'success'}, 'appendmsg'=> $appendresult->{'msg'},'appended_id' => $appendresult->{'id'});
            } else {
                $result = array ('success' => true, 'msg' => 'Sim card block removed', 'appendresult'=> $appendresult->{'success'}, 'appendmsg'=> $appendresult->{'msg'},'appended_id' => $appendresult->{'id'});
            }
        } else {
            if ($state > 0) {$result = array ('success' => false, 'msg' => 'Sim card is already blocked');}
                else {$result = array ('success' => false, 'msg' => 'Sim card is not blocked');}
        }
        return json_encode($result);
    }

    function setsimnumber ($number, $state) {
        $phonenumbers = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumbers->load('phonenumber ='.$number);
        if ($phonenumbers->simnumber <> $state) {
            $phonenumbers->simnumber = $state;
            $phonenumbers-> save();
            $appendresult = json_decode(Sim::appenddata($number,'simnumber',$state));
            $result = array ('success' => true, 'msg' => 'Simnumber successfully applied', 'appendresult'=> $appendresult->{'success'}, 'appendmsg'=> $appendresult->{'msg'},'appended_id' => $appendresult->{'id'});
        } else {
            $result = array ('success' => false, 'msg' => 'Sim card has the same simnumber');
        }
        return json_encode($result);
    }

    function appendholder ($number, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompanyid,$purpose) {
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders-> phonenumber = $number;
        $holders-> startdate = date("Y-m-d");
        $holders-> starttime = date("H:i:s");
        $holders-> fio = $fio;
        $holders-> position = $position;
        $holders-> deduction = $deduction;
        $holders-> pkg = $pkg;
        $holders-> roam = $roam;
        $holders-> truddognumber = $truddognumber;
        $holders-> truddogdate = $truddogdate;
        $holders-> truddogcompanyid = $truddogcompanyid;
        $holders-> purpose = $purpose;
        $holders-> save();
        if ($holders->_id > 0 ) {
            $result = array ('success' => true, 'msg' => 'New holder appended', 'appended_id' => $holders->_id);
        } else {
            $result = array ('success' => false, 'msg' => 'New holder not appended');
        }
        return json_encode($result);
    }

    function endholder ($holderid) {
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$holderid);
        if ($holders->stopdate == "" AND $holders->id == $holderid) {
            $holders->stopdate= date("Y-m-d");
            $holders->stoptime= date("H:i:s");
            $holders->save();
            $result = array ('success' => true, 'msg' => 'Holder was ended');
        } else {
            if ($holders->stopdate <> "") {
                $result = array ('success' => false, 'msg' => 'Holder is already ended');
            } else {
                $result = array ('success' => false, 'msg' => 'Holder was not ended');
            }
        }
        return json_encode($result);
    }

    function setholder($number,$holderid) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$holderid);
        if ($phonenumber->holderid == $holderid) {
            $result = array ('success' => false, 'msg' => 'Sim card has the same owner');
        } else {
            if ($holders-> stopdate > 0) {
                $result = array ('success' => false, 'msg' => 'Holder is ended');
            } else {
                if ($holders->id <> $holderid) {
                    $result = array ('success' => false, 'msg' => 'Holder is not present');
                } else {
                    $phonenumber-> prevholderid = $phonenumber-> holderid;
                    $phonenumber-> holderid = $holderid;
                    $phonenumber-> save();
                    $result = array ('success' => true, 'msg' => 'Sim card has new owner');
                }
            }
        }
        return json_encode($result);
    }

    function returnthenumber($number) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$phonenumber->holderid);
        if ($holders->fio == 'резерв') {
            $result = array ('success' => false, 'msg' => "Сим карта уже находится в резерве");
        } else {
            $setblockresult = json_decode(Sim::setblock($number, true));
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            $appendholderresult = json_decode(Sim::appendholder($number,'резерв','резерв',NULL,NULL,NULL,NULL,NULL,NULL,NULL));
            $setholderresult  = json_decode(Sim::setholder($number, $appendholderresult->{'appended_id'}));
            $result = array (
                'success' => true,
                'msg' => 'Сим карта сдана',
                'block' => $setblockresult->{'msg'},
                'end' => $endholderresult->{'msg'},
                'append' => $appendholderresult->{'msg'},
                'set' => $setholderresult->{'msg'}
            );
        }
        return json_encode($result);
    }

    function givethenumber($number, $tariff, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompanyid,$purpose) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$phonenumber->holderid);
        if ($holders->fio == 'резерв') {
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            $appendholderresult = json_decode(Sim::appendholder($number, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompanyid,$purpose));
            $setholderresult  = json_decode(Sim::setholder($number, $appendholderresult->{'appended_id'}));
            $setblockresult = json_decode(Sim::setblock($number, false));
            $settariffresult = json_decode(Sim::settariff($number, $tariff));
            $result = array (
                'success' => true,
                'block' => $setblockresult->{'msg'},
                'end' => $endholderresult->{'msg'},
                'append' => $appendholderresult->{'msg'},
                'set' => $setholderresult->{'msg'},
                'tariffmsg' => $settariffresult->{'msg'}
            );
        } else {$result = array ('success' => false, 'msg' => "Sim card is owned by $holders->fio");}
        return json_encode($result);
    }

    function transferthenumber($number, $fio, $position,$truddognumber,$truddogdate,$truddogcompanyid,$purpose) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$phonenumber->holderid);
        if ($holders->fio !== 'резерв') {
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            $appendholderresult = json_decode(Sim::appendholder($number, $fio, $position, $holders->deduction,$holders->pkg,$holders->roam,$truddognumber, $truddogdate, $truddogcompanyid, $purpose));
            $setholderresult  = json_decode(Sim::setholder($number, $appendholderresult->{'appended_id'}));
            $result = array (
                'success' => true,
                'end' => $endholderresult->{'msg'},
                'append' => $appendholderresult->{'msg'},
                'set' => $setholderresult->{'msg'},
            );
        } else {$result = array ('success' => false, 'msg' => "Сим карта находится в резерве");}
        return json_encode($result);
    }

}

