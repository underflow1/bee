<?php
include "mailclass.php";

class kemail {

    function sendEmailHtml($from, $subject, $message, $to) {
    $host = "mail01.ce.int";
    $from = "it@teploset.ru";
    $headers = array(
        'MIME-Version' => "1.0",
        'Content-type' => "text/html; charset=UTF-8",
        'From' => $from, 'To' => $to,
        'Subject' => $subject,
        'X-Mailer' => "Microsoft Office Outlook 12.0"
    );

    $smtp = mailclass::factory('smtp', array ('host' => $host, 'auth' => false));
    $mail = $smtp->send($to, $headers, $message);
    if (PEAR::isError($mail)) {
        return 0;
    } else {
        return 1;
    }
}

}

//$res = emailHtml::sendEmailHtml("it@teploset.ru", "сим карты", 'asdf', "it@teploset.ru, afilin@teploset.ru");