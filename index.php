<?php
$f3 = require('lib/base.php');
F3::set('DEBUG',3);
F3::set('AUTOLOAD','data/');
F3::set('DB',
    new DB\SQL(
        'mysql:host=localhost;port=3306;dbname=mobile2',
        'mob2',
        '123qweQWE'
    )
);


require_once __DIR__.'/silex/vendor/autoload.php';
require_once 'twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

function checkrights($access) {
    $principal = explode("@",$_SERVER['REMOTE_USER']);
    $login = $principal[0];
    $rights = new DB\SQL\Mapper(F3::get('DB'), 'rights');
    $rights->load("login = \"$login\"");
    $rightsstring = $rights->rights;
    $rightsobj = json_decode($rightsstring);
    if (property_exists($rightsobj, $access)) {
        return $rightsobj->$access;
    } else {
        return false;
    }
}

function zeroes($number) {
    if ($number < 10) {
        return "0".$number;
    } else {
        return $number;
    }
};
/*
function fired($date) {
    if ($date == "Янв  1 2001 12:00:00:000") {
        return false;
    } else {
        return true;
    }
};
*/


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

$app->get('/sssss', function() use($app) {
    $link = mssql_connect('sql02.ce.int', 'zupishe', '123asdASD');
    if (!$link || !mssql_select_db('zup_20150218', $link)) {
        die('Unable to connect or select MSSQL database!');
    }
    $query = mssql_query("
if exists (
        select * from tempdb.dbo.sysobjects o
        where o.xtype in ('U')
        and o.id = object_id(N'tempdb..#uniontable')
)
BEGIN
  DROP TABLE #uniontable;
  DROP TABLE #uniontable2;
END
SELECT _Fld4859RRef AS employee_id, _Fld4862RRef AS position_id, _Fld4864 AS event_date
INTO #uniontable
FROM [_Document223_VT4857]
UNION
SELECT _Fld3146RRef AS employee_id, _Fld3152RRef AS position_id, _Fld3148 AS event_date
FROM [_Document182_VT3144]
SELECT ut.employee_id, ut.position_id
INTO #uniontable2
FROM #uniontable AS ut
INNER JOIN (
SELECT employee_id, MAX(event_date) as dmax
FROM #uniontable
GROUP BY employee_id
) as umax ON umax.employee_id = ut.employee_id AND umax.dmax = ut.event_date

        SELECT fi._Description as fio, so._Fld1703 AS firedateorig, do._Description AS position, so._Fld1685 as truddognumber, so._Fld1686 as truddogdate, co._Fld1438 as companycode
        FROM [_Reference117] as so
        LEFT JOIN [_Reference138] AS fi ON fi._IDRRef = so._Fld1679RRef
        LEFT JOIN [_Reference80] AS co ON co._IDRRef = so._Fld1681RRef
        LEFT JOIN [#uniontable2] AS position ON position.employee_id = so._IDRRef
        LEFT JOIN [_Reference51] AS do ON do._IDRRef = position.position_id
        WHERE so._Fld1703 = '2001-01-01 00:00:00.000'
        ORDER BY so._Fld1703, fi._Description
    ");



    $companycode = array(
        "ОР-" =>	"0",
        "КЭ-" =>	"1",
        "ИНФ" =>	"0",
        "РОС" =>	"14",
        "ПЭТ" =>	"8",
        "СТК" =>	"10",
        "КБ-" =>	"4",
        "ФЛ-" =>	"12",
        "ЭСР" =>	"13",
        "ФЗ" => 	"0",
        "СИК" =>	"9",
        "ИНТ" =>	"0",
        "ПСТ" =>	"6",
        "ИФТ" =>	"2",
        "ПСП" =>	"7",
        "УБ-" =>	"11",
        "АС-" =>	"0",
        "ЛСТ" =>	"5"
    );

    $stack = array();
    $month = array(
        "Янв" => "01",
        "Фев" => "02",
        "Мар" => "03",
        "Апр" => "04",
        "Май" => "05",
        "Июн" => "06",
        "Июл" => "07",
        "Авг" => "08",
        "Сен" => "09",
        "Окт" => "10",
        "Ноя" => "11",
        "Дек" => "12",
    );

    while ($row = mssql_fetch_assoc($query)) {
        /*if (fired($row['firedateorig'])) {
            $date = explode(' ', str_replace('  ', ' ', $row['firedateorig']));
            $date2 = date_format(new DateTime(($date[2]-2000)."-".$month[$date[0]]."-".zeroes($date[1])), 'Y-m-d');
            $fired = true;
        } else {
            $date2 = '';
            $fired = false;
        } */
        $date = explode(' ', str_replace('  ', ' ', $row['truddogdate']));
        $truddogdate = date_format(new DateTime(($date[2]-2000)."-".$month[$date[0]]."-".$date[1]), 'Y-m-d');
        $truddognumber = iconv("CP1251", "UTF-8", trim($row['truddognumber']));
        $truddognumber2 = preg_replace('/[^0-9]/', '', $truddognumber);
        $rowarray = array(
            "fio" => iconv("CP1251", "UTF-8", trim($row['fio'])),
            //"fired" => $fired,
            //"firedate" => $date2,
            "position" => iconv("CP1251", "UTF-8", trim($row['position'])),
            "companycode" => $companycode[iconv("CP1251", "UTF-8", trim($row['companycode']))],
            "truddognumber" => $truddognumber2,
            "truddogdate" => $truddogdate );
        array_push($stack, $rowarray);
    }
    mssql_free_result($query);
    mssql_close($link);

return $app->json(array("success" => true, "data" => $stack));
});

$app->get('/testsim/{phonenumber}/getcurrentstate', function($phonenumber) use($app) {
    $test = new Sim();
    $result = $test-> getcurrentstate($phonenumber);
    return $app->json(array(
        "success" => true,
        "data" => $result
    ));
});


$app->get('/detail/{phonenumber}/{startdate}/{stopdate}', function($phonenumber, $startdate, $stopdate) use($app) {
    $sql = "
    SELECT abonent, calldate, calltime, duration, paysize, initiator, receiver, action_description, service_description, type

    FROM detail_raw
    WHERE calldate >= \"$startdate\" AND calldate <= \"$stopdate\" AND abonent = \"$phonenumber\"
    ";
    $post = $app['db']->fetchAll($sql);
    return $app->json(array(
        "success" => true,
        "data" => $post
    ));
});


 

$app->get('/detailitemslist/{type}', function($type) use($app) {
    switch ($type) {
        case 'phonenumber':
            $sql = "SELECT id
                    ,phonenumber AS displaydata
                    ,phonenumber
                    FROM phonenumbers
                    ORDER BY phonenumber ASC";
            break;
        case 'fio':
            $sql = "SELECT id
                    ,fio AS displaydata
                    ,phonenumber
                    ,startdate
                    ,if((stopdate IS NULL), CURDATE(), stopdate) as stopdate
                    ,if ((stopdate IS NULL), '', 'hidden') as misc
                    FROM holders
                    WHERE fio <> 'резерв' AND fio <> 'для QR кодов' AND fio <> 'Объект'
                    ORDER BY displaydata ASC";
            break;
        default:
            $sql = '';
    }
    if (strlen($sql)>0) {
        $post = $app['db']->fetchAll($sql);
        return $app->json(array(
            "success" => true,
            "data" => $post
        ));
    } else {
        return $app->json(array(
            "success" => false,
        ),404);
    }
});

$app->get('/testsim/{phonenumber}/setblock/{state}', function($phonenumber,$state) use($app) {
    if(checkrights('block')){
        $test = new Sim();
        return $test-> setblock($phonenumber,$state);
    } else {
        return $app->json(array("errorMessage" => "Недостаточно прав"),403);
    }

});

$app->get('/testsim/{phonenumber}/settariff/{tariff}', function($phonenumber,$tariff) use($app) {
    $test = new Sim();
    return $test-> settariff($phonenumber,$tariff);
});

$app->get('/testsim/{phonenumber}/setsimnumber/{simnumber}', function($phonenumber,$simnumber) use($app) {
    $test = new Sim();
    return $test-> setsimnumber($phonenumber,$simnumber);
});

$app->get('/testsim/{phonenumber}/setholder/{holderid}', function($phonenumber, $holderid) use($app) {
    $test = new Sim();
    return $test-> setholder($phonenumber,$holderid);
});

$app->get('/testsim/endholder/{holderid}', function($holderid) use($app) {
    $test = new Sim();
    return $test-> endholder($holderid);
});

$app->get('/testsim/{phonenumber}/returnthenumber', function($phonenumber) use($app) {
    $test = new Sim();
    $res = $test-> returnthenumber($phonenumber);
    json_decode($res);
    return $res;
});

$app->get('/testsim/{phonenumber}/appenddata/{what}/{state}', function($phonenumber,$what,$state) use($app) {
    $test = new Sim();
    return $test-> appenddata($phonenumber,$what,$state);
});

$app->post('/givethenumber', function(Request $request) {
    $test = new Sim();
    return $test->givethenumber($request->get('phonenumber'), $request->get('tariffid'),$request->get('fio'),$request->get('position'),$request->get('deduction'),$request->get('pkg'),$request->get('roam'),$request->get('truddognumber'),$request->get('truddogdate'),$request->get('truddogcompanyid'),$request->get('purpose'));
});

$app->post('/transferthenumber', function (Request $request) {
    $test = new Sim();
    return $test->transferthenumber($request->get('phonenumber'),$request->get('fio'),$request->get('position'),$request->get('truddognumber'),$request->get('truddogdate'),$request->get('truddogcompanyid'),$request->get('purpose'));
});

$app->post('/sendobject', function (Request $request) {
    // получаем массив со всеми полями:
    //$vari = $request->request->all();
    $test = new Sim();
    $vari = $test-> getcurrentstate($request->get('phonenumber'));
    // инициализируем шаблон:
    $loader = new Twig_Loader_Filesystem('templates');
    $twig = new Twig_Environment($loader);
    $template = $twig->loadTemplate($request->get('template'));
    $test = $template->render($vari);
    // инициализируем почтовик
    $transport = Swift_SmtpTransport::newInstance('mail01.ce.int', 25)
        ->setUsername('')
        ->setPassword('');
    $mailer = Swift_Mailer::newInstance($transport);
    $message = Swift_Message::newInstance('сим карты')
        ->setFrom(array('Akharlamov@teploset.ru' => 'Харламов Алексей Олегович'))
        ->setTo(array(
            'Akharlamov@teploset.ru' => 'Харламов Алексей Олегович',
            'it@teploset.ru' => 'Харламов Алексей Олегович'))
        ->setContentType("text/html; charset=UTF-8")
        ->setBody($test,'text/html');
    $result = $mailer->send($message);
    return $result;
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

    return $app->json(array(
        "success" => true,
        "data" => $post
    ));
//return json_encode();
});

$app->get('/', function() use($app) {
    return file_get_contents('home.html');
});

$app->get('/pril/{phonenumber}', function($phonenumber) use($app) {
    $test = new Sim();
    $vari = $test-> getcurrentstate($phonenumber);
    $loader = new Twig_Loader_Filesystem('templates');
    $twig = new Twig_Environment($loader);
    $template = $twig->loadTemplate('pril.html');
    $test = $template->render($vari);
    return $test;
});

$app->get('/nakl/{phonenumber}', function($phonenumber) use($app) {
    $test = new Sim();
    $vari = $test-> getnakldata($phonenumber);
    $loader = new Twig_Loader_Filesystem('templates');
    $twig = new Twig_Environment($loader);
    $template = $twig->loadTemplate('nakl.html');
    $test = $template->render($vari);
    return $test;
});

$app->get('/company', function() use ($app) {
    $sql = "SELECT * FROM company";
    $post = $app['db']->fetchAll($sql);
    return json_encode(array(
        "success" => true,
        "data" => $post
    ));
});

$app->get('/tariff', function() use ($app) {
    $sql = "SELECT * FROM tariff";
    $post = $app['db']->fetchAll($sql);
    return json_encode(array(
        "success" => true,
        "data" => $post
    ));
});

$app->get('/phonenumbers', function() use ($app) {
    $sql = "SELECT phonenumber FROM phonenumbers";
    $post = $app['db']->fetchAll($sql);
    return json_encode(array(
        "success" => true,
        "data" => $post
    ));
});

$app->get('/currentuser', function() use ($app) {
    $principal = explode("@",$_SERVER['REMOTE_USER']);
    $login = $principal[0];

    $sql = "SELECT MAX(calldate) AS maxcalldate FROM detail_raw2";
    $post = $app['db']->fetchAll($sql);
    $maxcalldate = new DateTime($post[0]['maxcalldate']);
    $mincalldate = new DateTime($post[0]['maxcalldate']);
    $mincalldate = $mincalldate->modify('-1 month +1 day');

    return $app-> json(array(
        "success" => true,
        "data" => array(
            "login" => $login,
            "maxcalldate" => $maxcalldate,
            "mincalldate" => $mincalldate
            )));
});

$app->get('/current', function() use ($app) {
    $sql = "
SELECT	f1.phonenumber, f1.simnumber, f1.contract, f1.companyname, f1.blocked, ta.internalname as tariff
        ,ho.fio, ho.position
        ,ho.deduction, ho.pkg, ho.roam, ho.truddognumber, ho.truddogdate, ho.purpose
        ,co.truddogcompanyname

FROM phonenumbers AS f1
# подтягиваем ид текущего владельца
LEFT JOIN holders as ho on ho.id = f1.holderid
# подтягиваем название компании по договору
LEFT JOIN company as co on co.id = ho.truddogcompanyid
# подтягиваем название тарифа
LEFT JOIN tariff as ta on ta.id = f1.tariffid
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

$app->get('/current/{phonenumber}', function($phonenumber) use ($app) {
    $test = new Sim();
    $vari = $test-> getcurrentstate($phonenumber);
    return json_encode(array(
        "success" => true,
        "data" => $vari
   ));
});

$app->run();

?>
