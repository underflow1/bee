<?php
//require __DIR__.'/lib/base.php';
$f3 = require('lib/base.php');
//include "Mail.php";
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

$app->get('/testsim/{phonenumber}/getcurrentstate', function($phonenumber) use($app) {
    $test = new Sim();
    $result = $test-> getcurrentstate($phonenumber);
    return json_encode(array(
        "success" => true,
        "data" => $result
    ));
});

$app->get('/testsim/{phonenumber}/setblock/{state}', function($phonenumber,$state) use($app) {
    $test = new Sim();
    return $test-> setblock($phonenumber,$state);
});

$app->get('/testsim/{phonenumber}/settariff/{tariff}', function($phonenumber,$tariff) use($app) {
    $test = new Sim();
    return $test-> settariff($phonenumber,$tariff);
});

$app->get('/testsim/{phonenumber}/setsimnumber/{simnumber}', function($phonenumber,$simnumber) use($app) {
    $test = new Sim();
    return $test-> setsimnumber($phonenumber,$simnumber);
});

//$app->get('/testsim/{phonenumber}/appendholder/{fio}/{position}/{deduction}/{pkg}/{roam}', function($phonenumber,$fio,$position,$deduction,$pkg,$roam) use($app) {
//    $test = new Sim();
//    return $test-> appendholder($phonenumber, $fio, $position, $deduction, $pkg, $roam);
//});

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

//$app->get('/testsim/{phonenumber}/givethenumber/{tariff}/{fio}/{position}/{deduction}/{pkg}/{roam}', function($phonenumber, $tariff, $fio, $position, $deduction, $pkg, $roam) use($app) {
//    $test = new Sim();
//    return $test-> givethenumber($phonenumber, $tariff, $fio, $position, $deduction, $pkg, $roam);
//});

$app->post('/givethenumber', function(Request $request) {
    $test = new Sim();
    return $test->givethenumber($request->get('phonenumber'), $request->get('tariffid'),$request->get('fio'),$request->get('position'),$request->get('deduction'),$request->get('pkg'),$request->get('roam'),$request->get('truddognumber'),$request->get('truddogdate'),$request->get('truddogcompanyid'),$request->get('purpose'));
});

$app->post('/transferthenumber', function (Request $request) {
    $test = new Sim();
    return $test->transferthenumber($request->get('phonenumber'),$request->get('fio'),$request->get('position'));
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


$app->post('/sendemail2', function (Request $request) {
    $transport = Swift_SmtpTransport::newInstance('mail01.ce.int', 25)
        ->setUsername('')
        ->setPassword('');
    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance($request->get('subject'))
        ->setFrom(array('it@teploset.ru' => 'Харламов Алексей Олегович'))
        ->setTo(array('it@teploset.ru'))
        ->setContentType("text/html; charset=UTF-8")
        ->setBody(
            '<html>' .
            ' <head></head>' .
            ' <body>' .
            '<span style=font-size:10.0pt;font-family:Arial,sans-serif>' .
            $request->get('phonenumber') .' '. $request->get('action') . '<br>' .
            '</span>' .
            '</body>' .
            '</html>',
            'text/html'
        );
     $result = $mailer->send($message);

    return json_encode(array(
        "success" => true,
        "data" => $result
    ));
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
    $sql = "SELECT login, rights FROM rights WHERE login = \"$login\" LIMIT 1";
    $post = $app['db']->fetchAll($sql);
    $falseresult = '{"return":false,"block":false,"transfer":false,"give":false,"changesim":false,"changeplan":false,"pril":false}';
    if (!empty($post)) {
        return json_encode(array(
            "success" => true,
            "data" => $post[0]
        ));
    } else {
        return json_encode(array(
            "success" => false,
            "data" => array("login" => $login, "rights" => $falseresult )
        ));
    }
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
/*
    $sql = "
SELECT	f1.phonenumber, f1.simnumber, f1.contract, f1.companyname, f1.blocked, ta.internalname as tariff
        ,ho.fio, ho.position
        ,ho.deduction, ho.pkg, ho.roam, ho.truddognumber, ho.truddogdate, ho.purpose
        ,co.truddogcompanyname, co.director, co.directorspos

FROM phonenumbers AS f1
# подтягиваем ид текущего владельца
LEFT JOIN holders as ho on ho.id = f1.holderid
# подтягиваем название компании по договору
LEFT JOIN company as co on co.id = ho.truddogcompanyid
# подтягиваем название тарифа
LEFT JOIN tariff as ta on ta.id = f1.tariffid
WHERE f1.phonenumber = \"$phonenumber\"
";

    $post = $app['db']->fetchAll($sql);
*/
    return json_encode(array(
        "success" => true,
        "data" => $vari
    ));
});

$app->run();

?>
