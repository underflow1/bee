
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

    function appenddata($number,$what,$state) {
//        switch ($what): tariff block simnumber
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
        if ($phonenumbers->tariff <> $state) {
            $phonenumbers->tariff = $state;
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

    function appendholder ($number, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompany,$purpose) {
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
        $holders-> truddogcompany = $truddogcompany;
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

    function givethenumber($number, $tariff, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompany,$purpose) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$phonenumber->holderid);
        if ($holders->fio == 'резерв') {
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            $appendholderresult = json_decode(Sim::appendholder($number, $fio, $position, $deduction, $pkg, $roam,$truddognumber,$truddogdate,$truddogcompany,$purpose));
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


    function transferthenumber($number, $fio, $position) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);
        $holders = new DB\SQL\Mapper(F3::get('DB'), 'holders');
        $holders->load('id='.$phonenumber->holderid);
        if ($holders->fio !== 'резерв') {
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            $appendholderresult = json_decode(Sim::appendholder($number, $fio, $position, $holders->deduction,$holders->pkg,$holders->roam));
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

/*
    function returnthenumber($number) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);

        $setblockresult = json_decode(Sim::setblock($number, true));
        if ($setblockresult->{'success'} == true) {
            $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
            if ($endholderresult->{'success'} == true) {
                $appendholderresult = json_decode(Sim::appendholder($number,'резерв','резерв',NULL,NULL,NULL));
                if ($appendholderresult->{'success'} == true) {
                    $setholderresult  = json_decode(Sim::setholder($number, $appendholderresult->{'appended_id'}));
                    if ($setholderresult->{'success'} == true) {
                        $result = array (
                            'success' => true,
                            'block' => $setblockresult->{'success'},
                            'end' => $endholderresult->{'success'},
                            'append' => $appendholderresult->{'success'},
                            'set' => $setholderresult->{'success'}
                        );
                    } else {$result = array ('success' => false, 'msg' => 'not set', 'setholdermsg' => $setholderresult->{'msg'});}
                } else {$result = array ('success' => false, 'msg' => 'not append', 'appendholdermsg' => $appendholderresult->{'msg'});}
            } else {$result = array ('success' => false, 'msg' => 'not ended', 'endholdermsg' => $endholderresult->{'msg'});}
        } else {$result = array ('success' => false, 'msg' => 'not blocked', 'blockmsg' => $setblockresult->{'msg'});}
        return json_encode($result);
    }


    function givethenumber($number, $tariff, $fio, $position, $deduction, $pkg, $roam) {
        $phonenumber = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumber-> load('phonenumber ='.$number);

        $endholderresult = json_decode(Sim::endholder($phonenumber->holderid));
        if ($endholderresult->{'success'} == true) {
            $appendholderresult = json_decode(Sim::appendholder($number, $fio, $position, $deduction, $pkg, $roam));
            if ($appendholderresult->{'success'} == true) {
                $setholderresult  = json_decode(Sim::setholder($number, $appendholderresult->{'appended_id'}));
                if ($setholderresult->{'success'} == true) {
                    $setblockresult = json_decode(Sim::setblock($number, false));
                    if ($setblockresult->{'success'} == true) {
                        $settariffresult = json_decode(Sim::settariff($number, $tariff));
                        if ($settariffresult->{'success'} == true) {
                            $result = array ('success' => true);
                        } else {$result = array ('success' => false, 'msg' => '5 end append set block tariff', 'tariffmsg' => $settariffresult->{'msg'});}
                    } else {$result = array ('success' => false, 'msg' => '4 end append set block', 'blockmsg' => $setblockresult->{'msg'});}
                } else {$result = array ('success' => false, 'msg' => '3 end append set', 'setholdermsg' => $setholderresult->{'msg'});}
            } else {$result = array ('success' => false, 'msg' => '2 end append', 'appendholdermsg' => $appendholderresult->{'msg'});}
        } else {$result = array ('success' => false, 'msg' => '1 end ', 'endholdermsg' => $endholderresult->{'msg'});}
        return json_encode($result);
    }





/*
    function getback ($number) {
        $phonenumbers = new DB\SQL\Mapper(F3::get('DB'), 'phonenumbers');
        $phonenumbers->load('phonenumber ='.$number);
        $blockresult = json_decode(Sim::block($number));
        if ($blockresult->{'success'} == true) {
            $endholderresult = json_decode(Sim::endholder($phonenumbers->holderid));
            if ($endholderresult->{'success'} == true) {
                $newholderresult = Sim::newholder($number,'резерв','резерв',NULL,NULL,NULL);
                $setholderresult = json_decode(Sim::setholder($number,$newholderresult));
                if ($setholderresult->{'success'} == true) {
                    $result = array ('success' => true, 'data' => 'blocked and ended','newholderid' => $newholderresult);
                } else $result = array ('success' => false, 'data' => 'blocked and ended but not reserved');
            } else $result = array ('success' => false, 'data' => 'blocked but not ended');
        } else $result = array ('success' => false, 'data' => 'not blocked');

        return json_encode($result);
    }

*/


}

