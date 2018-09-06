<?php
include 'db.php';
include 'ensar.php';

class Kayit
{
    private $db;

    public function __construct()
    {
        $this->db = new DB();
    }

    public function kayitlariGetir($pTablo, $pSiralamaAlani, $pWhereSarti)
    {
        $netice = [];
        $ekler = array();
        //$a = array('where'=>array('id'=>$_GET['id']), 'order_by'=>array('id'=>$_GET['id']),);

        if ($pSiralamaAlani != null) {
            $ekler[] = array('order_by' => $pSiralamaAlani);
        }

        if ($pWhereSarti != null) {
            $ekler[] = array('where ' => $pWhereSarti);

        }

        $records = $this->db->getRows($pTablo, $ekler);
        if ($records) {
            $netice = $records;
        }
        return $netice;
    }
    public function kayitSil($pTablo, $pOKytNo)
    {
        $sartlar['OKytNo'] = $pOKytNo;
        $netice = $this->db->delete($pTablo, $sartlar);
        $cevab = Ensar::cevabHazirla('Tamam', 'Kayıt silindi.');
        return $cevab;
    }
    public function kayitYap($pTablo, $pVeriler, $pKayitNevi)
    {
        if (isset($pVeriler['Isim']) && isset($pVeriler['Soyisim']) && isset($pVeriler['RbtGruplar'])) {
            $RbtGruplar = (int) $pVeriler['RbtGruplar'];
            if (strlen($pVeriler['Isim']) > 2 && strlen($pVeriler['Soyisim']) > 1 && $RbtGruplar > 0) {
                $pVeriler['Isim'] = Ensar::kelimeBaslariBuyukHarfYap($pVeriler['Isim']);
                $pVeriler['Soyisim'] = Ensar::buyukHarfYap($pVeriler['Soyisim']);
                if ($pKayitNevi == 'Yeni') {
                    $netice = $this->db->insert($pTablo, $pVeriler);
                    $cevab = Ensar::cevabHazirla('Tamam', 'Kayıt yapıldı.');
                } else {
                    $sartlar['OKytNo'] = $pVeriler['OKytNo'];
                    $netice = $this->db->update($pTablo, $pVeriler, $sartlar);
                    $cevab = Ensar::cevabHazirla('Tamam','Düzeltme yapıldı.');
                }
                $cevab['OKytNo'] = $netice['OKytNo'];
                $cevab['Kayitlar'] = $netice;
            } else {
                $cevab = Ensar::cevabHazirla('Hata', 'İsim 3, Soyisim 2 karakterden küçük olamaz, Grubu boş geçemezsiniz!');
            }
        } else {
            $cevab = Ensar::cevabHazirla('Hata','Eksik veri!');
        }
        return $cevab;
    }

}
