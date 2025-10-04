<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json = file_get_contents('../goods.json');
    $json = json_decode($json, true);

    $name  = htmlspecialchars($_POST['ename']);
    $phone = htmlspecialchars($_POST['ephone']);
    $email = htmlspecialchars($_POST['email']);
    $cart  = $_POST['cart'];

    $message = '<h1>Заказ в магазине</h1>';
    $message .= '<p>Телефон: ' . $phone . '</p>';
    $message .= '<p>Почта: ' . $email . '</p>';
    $message .= '<p>Клиент: ' . $name . '</p>';

    $sum = 0;
    foreach ($cart as $id => $count) {
        $itemName = isset($json[$id]['name']) ? $json[$id]['name'] : 'Неизвестный товар';
        $itemCost = isset($json[$id]['cost']) ? $json[$id]['cost'] : 0;
        $total = $count * $itemCost;
        $sum += $total;
        $message .= $itemName . ' --- ' . $count . ' шт. --- ' . $total . ' руб.<br>';
    }
    $message .= '<p><b>Всего: ' . $sum . ' руб.</b></p>';

    $to = "fil.fomin.15@gmail.com"; // ← твоя почта
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: Nail Shop <no-reply@nailshop.com>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    $body = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>' . $message . '</body></html>';

    if (mail($to, 'Заказ в магазине', $body, $headers)) {
        echo 1;
    } else {
        echo 0;
    }
}
?>
