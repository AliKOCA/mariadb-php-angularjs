<?php
//http://www.php.net/manual/en/mbstring.installation.php
//sudo apt-get install php7.0-mbstring
//sudo systemctl restart apache2
class Ensar
{
    public static function cevabHazirla($pDurum, $pMesaj)
    {
        $cevab['Durum'] = $pDurum;
        $cevab['Mesaj'] = $pMesaj;
        return $cevab;
    }


    public static function turkceHarfleriBuyukYap($pGlnStr)
    {
        $trKarakterlerDizisi = array('ı' => 'I', 'i' => 'İ', 'ü' => 'Ü',
            'ş' => 'Ş', 'ç' => 'Ç', 'ğ' => 'Ğ', 'ö' => 'Ö');
        $pGlnStr = strtr($pGlnStr, $trKarakterlerDizisi);
        return $pGlnStr;
    }
    
    public static function buyukHarfYap($pGlnStr)
    {
        return strtoupper(self::turkceHarfleriBuyukYap($pGlnStr));
    }

    public static function turkceHarfleriKucukYap($pGlnStr)
    {
        $trKarakterlerDizisi = array('I' => 'ı', 'İ' => 'i', 'Ü' => 'ü',
            'Ş' => 'ş', 'Ç' => 'ç', 'Ğ' => 'ğ', 'Ö' => 'ö');
        $pGlnStr = strtr($pGlnStr, $trKarakterlerDizisi);
        return $pGlnStr;
    }

    public static function kucukHarfYap($pGlnStr)
    {
        return strtolower(self::turkceHarfleriKucukYap($pGlnStr));
    }

    public static function strParcala($pGlnStr)
    {
        for ($i = 0; $i < strlen($pGlnStr); $i++) {
            $karakter = $pGlnStr[$i];
            echo $karakter . '<br>';
        }
        return true;
    }

    public static function cumleBasiniBuyukHarfYap($metin)
    {
        $k_uzunluk = mb_strlen($metin, "UTF-8");
        $ilkKarakter = mb_substr($metin, 0, 1, "UTF-8");
        $kalan = mb_substr($metin, 1, $k_uzunluk - 1, "UTF-8");
        return mb_strtoupper($ilkKarakter, "UTF-8") . mb_strtolower($kalan, "UTF-8");
    }

    
    //i de mesele çıkarıyor.
    public static function kelimeBaslariBuyukHarfYap($pGlnStr)
    {
        $pGlnStr = self::kucukHarfYap($pGlnStr);
        return mb_convert_case(mb_strtolower($pGlnStr), MB_CASE_TITLE, "UTF-8");
    }

    public static function kelimeBaslariBuyukHarfYap2($pGlnStr)
    {
        $pGlnStr = self::kucukHarfYap($pGlnStr);
        $evvelkiBosluk = true;
        $yeniStr = '';

        for ($i = 0; $i < strlen($pGlnStr); $i++) {
            $karakter = $pGlnStr[$i];
            //echo $karakter . '<br>' ;
            if ($evvelkiBosluk) {
                $yeniStr .= self::buyukHarfYap($karakter);
                //echo 'KB: ' . self::turkceHarfleriBuyukYap($karakter) . '<br>';
            } else {
                $yeniStr .= $karakter;
            }
            if ($karakter == ' ') {
                $evvelkiBosluk = true;
            } else {
                $evvelkiBosluk = false;
            }
        }
        return $yeniStr;
    }
}
