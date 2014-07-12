<?php
include "Mail.php";

function emailHtml($from, $subject, $message, $to) {
    $host = "mail01.ce.int";
    $from = "it@teploset.ru";
    $headers = array(
        'MIME-Version' => "1.0",
        'Content-type' => "text/html; charset=UTF-8",
        'From' => $from, 'To' => $to,
        'Subject' => $subject,
        'X-Mailer' => "Microsoft Office Outlook 12.0"
    );
    $smtp = Mail::factory('smtp', array ('host' => $host, 'auth' => false));
    $mail = $smtp->send($to, $headers, $message);
    if (PEAR::isError($mail)) {
        return 0;
    } else {
        return 1;
    }
}

require_once __DIR__.'/silex/vendor/autoload.php';

function validateDate($date)
{
    $format = 'Y-m-d';
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}


$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'dbname' => 'mobile2',
        'host' => 'localhost',
        'user' => 'mob2',
        'password' => '123qweQWE',
        'charset' => 'utf8'
    ),
));

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;


$app->post('/test_ajax', function (Request $request) {
    $message = $request->get('act');
    return json_encode(array(
        "success" => true,
        "msg" => $message."asfffffffffffffffsdfasdf"
    ));
});



$app->get('/', function() use($app) {
    return file_get_contents('home.html');
});


$app->get('/phonenumbers', function() use ($app) {

    $sql = "SELECT phonenumber FROM phonenumbers";

    $post = $app['db']->fetchAll($sql);

    return json_encode(array(
        "success" => true,
        "data" => $post
    ));

});

$app->get('/sendemail', function() use ($app) {

$message = "HUYAMBA";


$res = emailHtml("it@teploset.ru", "сим карты", $message, "it@teploset.ru, ab@teploset.ru");

    return json_encode(array(
        "success" => true,
        "data" => $res
    ));

});


$app->get('/simback/{phonenumber}/{date_end}', function($phonenumber, $date_end) use ($app) {
    $sql = "
    SELECT cardholderid, MAX(startdate) as startdate, MAX(starttime) as starttime
    FROM ev_owners
    WHERE phonenumber = $phonenumber AND stopdate IS NULL
    ORDER BY startdate DESC;

    INSERT INTO ph_tariff (phonenumber, startdate, starttime, tariff) values
    ($phonenumber, now(), now(), NULL);
"
    ;

    $fired_user_id =  $app['db']-> fetchassoc($sql);
    $fired_user_id = $fired_user_id[cardholderid];
    $time_end = date("H:i:s");
    if  (validateDate($date_end) != true){
        $date_end = date("Y-m-d");
    }


$message = "
<p class=MsoNormal><span style='font-family:\"Arial\",\"sans-serif\"'>
$phonenumber установить блокировку<o:p></o:p></span></p>
<p class=MsoNormal style='margin-bottom:12.0pt'><span style='font-size:10.0pt;
font-family:\"Arial\",\"sans-serif\";color:#244061;mso-fareast-language:RU'>С
уважением,<br>
<br>
Харламов Алексей Олегович<br>
директор по информационным технологиям<br>
дирекция информационных технологий<br>
Комэнерго<br>
127591г. Москва, Дубнинская, 77<br>
+7 495 785-7516 доб.1201 – телефон <br>
+7 495 785-7515 – факс<br>
+7 968 459-7356 – мобильный<br>
</span><span style='font-size:10.0pt;font-family:\"Arial\",\"sans-serif\";
color:blue;mso-fareast-language:RU'><a href=\"mailto:kharlamov.a@teploset.ru\">kharlamov.a@teploset.ru</a></span><span
style='font-size:10.0pt;font-family:\"Arial\",\"sans-serif\";color:#244061;
mso-fareast-language:RU'> – e-mail<o:p></o:p></span></p>
<p class=MsoNormal><o:p>&nbsp;</o:p></p>
";


    switch ($fired_user_id){
        case 433:{

	$res = emailHtml("it@teploset.ru", "сим карты", $message, "it@teploset.ru, afilin@teploset.ru");

            return json_encode(array(
                "success" => true,
                "data" => "reserved number,$date_end"
            ));
        }
        default: {

	$message = "$phonenumber установить блокировку";

        $sql = "
            # 1 Р·Р°РІРµСЂРёС€РёС‚СЊ РїСЂРµРґС‹РґСѓС‰РёР№ owner Рё РІРѕР·РІСЂР°С‰РµРЅРёРµ РІ СЂРµР·РµСЂРІ
            UPDATE ev_owners SET stopdate=\"$date_end\", stoptime = \"$time_end\"
            WHERE phonenumber = $phonenumber AND stopdate IS NULL AND cardholderid <> 433
            ORDER BY startdate, startdate DESC
            LIMIT 1;

            INSERT INTO ev_owners (phonenumber, cardholderid, startdate, starttime) values
            ($phonenumber, 433, \"$date_end\", \"$time_end\");

            # 2 СѓСЃС‚Р°РЅРѕРІРёС‚СЊ Р±Р»РѕРєРёСЂРѕРІРєСѓ
            INSERT INTO ev_blocks (phonenumber, startdate, starttime) values
            ($phonenumber, \"$date_end\", \"$time_end\");

            # 3 Р·Р°РІРµСЂС€РёС‚СЊ СЂРѕСѓРјРёРЅРі РµСЃР»Рё РµСЃС‚СЊ
            UPDATE ev_roam
            SET stopdate = \"$date_end\"
            WHERE phonenumber = $phonenumber AND stopdate IS NULL
            ORDER BY startdate DESC
            LIMIT 1;

            # 4 СѓРґР°Р»РёС‚СЊ РїР°РєРµС‚ С‚СЂР°С„РёРєР° РµСЃР»Рё РµСЃС‚СЊ
            UPDATE ev_traffic
            SET stopdate = \"$date_end\"
            WHERE phonenumber = $phonenumber AND stopdate IS NULL
            ORDER BY startdate DESC
            LIMIT 1;

            # СѓРІРѕР»РёС‚СЊ РІР»Р°РґРµР»СЊС†Р° РІ cardholders fired
            UPDATE cardholders
            SET fired = \"$date_end\"
            WHERE id = $fired_user_id";

        $post = $app['db']->prepare($sql);
        $post = $app['db']->executeUpdate($sql);

	$res = emailHtml("it@teploset.ru", "сим карты", $message, "it@teploset.ru");

        return json_encode(array(
            "success" => true,
            "data" => $fired_user_id,$date_end,$res
        ));
        }
    }

});


$app->get('/months/{date_begin}/{date_end}', function($date_begin, $date_end) use ($app) {
    $sql = "
SELECT  total.phonenumber, total.summa
        ,total.fio, total.position, total.deduction, total.companyname
FROM (
SELECT  main.phonenumber, main.cardholderid, SUM(de.paysize) as summa
        ,cardholders.fio, cardholders.position, deduction, companynames.companyname
FROM
    (SELECT  phonenumber, cardholderid
        ,if ((startdate < \"$date_begin\"), \"$date_begin\", startdate) as reportperiodstart
        ,if (starttime IS NULL, 0, starttime) as starttime
        ,if ((stopdate > \"$date_end\" OR stopdate IS NULL), \"$date_end\", stopdate) as reportperiodstop
        ,if (stoptime IS NULL, '23:59:59', stoptime) as stoptime
        ,deduction
    FROM ev_owners
    WHERE   (startdate < \"$date_begin\" AND stopdate IS NULL OR stopdate > \"$date_end\") OR
            (startdate < \"$date_begin\" AND stopdate >= \"$date_begin\" AND stopdate <= \"$date_end\") OR
            (startdate >= \"$date_begin\" AND startdate <= \"$date_end\" AND stopdate IS NULL) OR
            (startdate >= \"$date_begin\" AND startdate <= \"$date_end\" AND stopdate >= \"$date_begin\" AND stopdate <= @date_end)
    GROUP BY cardholderid
    ) AS main

LEFT JOIN detail_raw2 AS de ON
    de.abonent = main.phonenumber
    AND de.calldate between main.reportperiodstart AND main.reportperiodstop
#РІС‹С‡РµСЃС‚СЊ СЂР°Р·РіРѕРІРѕСЂС‹ РІРЅСѓС‚СЂРё РєРѕРјРїР°РЅРёРё
#    AND NOT (receiver IN (SELECT phonenumber FROM phonenumbers) AND initiator IN (SELECT phonenumber FROM phonenumbers))

INNER JOIN cardholders ON cardholders.id = main.cardholderid
INNER JOIN ph_contracts ON ph_contracts.phonenumber = main.phonenumber
INNER JOIN contracts ON contracts.id = ph_contracts.contractid
INNER JOIN companynames ON companynames.id = contracts.companynameid
GROUP BY main.cardholderid
) AS total
WHERE total.cardholderid <> 433 AND total.deduction > 0 OR total.summa > 50
ORDER BY total.companyname, total.fio
";

    $post = $app['db']->fetchAll($sql);

return json_encode(array(
        "success" => true,
        "data" => $post
    ));

});




$app->get('/current', function() use ($app) {

    $sql = "
SELECT	f1.phonenumber, f1.simnumber, f1.contract, f1.companyname, f1.blocked, f1.tariff
        ,ho.fio, ho.position
        ,ho.deduction, ho.pkg, ho.roam

FROM phonenumbers AS f1
# подтягиваем ид текущего владельца
LEFT JOIN holders as ho on ho.id = f1.holderid
# тут можно зафигачить по одному номеру
#WHERE f1.phonenumber =9684599322
WHERE f1.own IS NULL
ORDER BY f1.companyname, f1.blocked, ho.fio ASC
";

    $post = $app['db']->fetchAll($sql);

    return json_encode(array(
        "success" => true,
        "data" => $post
    ));

});




$app->run();

?>
