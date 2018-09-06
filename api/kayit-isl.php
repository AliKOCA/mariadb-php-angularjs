<?php
include 'object/kayit.php';

$kayit = new Kayit();
$data['Durum'] = 'Evvel';
$data['Mesaj'] = 'Hiç bir işlem yapılmadı!';
$inputJSON = file_get_contents('php://input');
$parametreler = json_decode($inputJSON, true);
//echo $parametreler['IslemNevi'];
//exit();
/*
$data['Durum'] = 'Tecrübe';
$data['İşlemNevi'] = $parametreler['IslemNevi'];
 */
if (isset($parametreler['IslemNevi'])) {
    $islemNevi = $parametreler['IslemNevi'];
    if (isset($parametreler['Tablo'])) {
        $pTablo = $parametreler['Tablo'];
    }
    switch ($islemNevi) {
        case "KayitListesi":
            $pWhereSarti = '';
            if($pTablo == 'Telefonlar'){
                $pWhereSarti = 'RbtFihrist = ' . $parametreler['RbtFihrist'];
            }
            try {
                $Kayitlar = $kayit->kayitlariGetir($pTablo, 'OKytNo', $pWhereSarti);

                if ($Kayitlar) {
                    $data['Kayitlar'] = $Kayitlar;
                    $data['Durum'] = 'Tamam';
                } else {
                    $data['Kayitlar'] = array();
                    $data['Durum'] = 'Hata';
                }

            } catch (Exception $e) {
                $data['Durum'] = 'Hata';
                $data['Mesaj'] = $e->getMessage();
            }

            break;
        case "Ekle":
            if ($pTablo === 'Fihrist') {
                try {
                    $eklenecekFihrist = $parametreler['EklenecekFihrist'];
                    $data = $kayit->kayitYap($pTablo, $eklenecekFihrist, 'Yeni');
                } catch (Exception $e) {
                    $data['Durum'] = 'Hata';
                    $data['Mesaj'] = $e->getMessage();
                }
            }
            break;
        case "Duzelt":
            if ($pTablo === 'Fihrist') {
                try {
                    $eklenecekFihrist = $parametreler['EklenecekFihrist'];
                    $data = $kayit->kayitYap($pTablo, $eklenecekFihrist, 'Duzelt');
                } catch (Exception $e) {
                    $data['Durum'] = 'Hata';
                    $data['Mesaj'] = $e->getMessage();
                }
            }
            break;
        case "Sil":
            if ($pTablo === 'Fihrist') {
                try {
                    $OKytNo = $parametreler['OKytNo'];
                    $data = $kayit->kayitSil($pTablo, $OKytNo);
                } catch (Exception $e) {
                    $data['Durum'] = 'Hata';
                    $data['Mesaj'] = $e->getMessage();
                }
            }
            break;
        default:
            $data['Durum'] = 'Hata';
            $data['Mesaj'] = 'Geçersiz İşlem Nevi!';
    }
} else {
    $data['Durum'] = 'Hata';
    $data['Mesaj'] = 'IslemNevi Yok!';
}
echo json_encode($data);
