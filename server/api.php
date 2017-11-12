<?php
header('Access-Control-Allow-Origin: *');
if(!empty($_GET['id']))
{
	if(!empty($_GET['searchTerm'])) {
		$searchTerm=$_GET['searchTerm'];
	}
	
	$id=$_GET['id'];
	$docs = get_docs($id, $searchTerm);
	
	if(empty($docs))
	{
		response(404, "Resource not found", null);
	}
	else
	{
		response(200, "OK", $docs);
	}
	
}
else
{
	Response(400, "Eh", null);
}

function response($status,$status_message,$data)
{	
	$json_response = json_encode($data);
	
	echo $json_response;
	

}

function get_docs($i, $s)
{
	$docsToReturn = array();
	if (($handle = fopen("MSV.csv", "r")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, "|")) !== FALSE) {
			$num = count($data);
			$utfKonto = utf8ize($data[4]);
			
			if ($i == $data[0] && empty($s)) {
				$docsToReturn = addDocument($docsToReturn, $data);
			} else if($i == $data[0] && strpos(strtolower($utfKonto), strtolower($s)) !== false) {
				$docsToReturn = addDocument($docsToReturn, $data);
			}


		}
		fclose($handle);
	}
	return $docsToReturn;	
}
function addDocument($array, $data) {
	$d = utf8ize($data);
	$docToAdd = new Document($d[0], $d[1], $d[2],$d[3],$d[4],$d[5],$d[6],$d[7],$d[8],$d[9],$d[10],$d[11],$d[12],$d[13],$d[14],$d[15]);
	$array[] = $docToAdd;
	
	return $array;
}
function utf8ize($d) {
    if (is_array($d)) 
        foreach ($d as $k => $v) 
            $d[$k] = utf8ize($v);

     else if(is_object($d))
        foreach ($d as $k => $v) 
            $d->$k = utf8ize($v);

     else 
        return utf8_encode($d);

    return $d;
}

class Document {
	var $refnummer;
	var $id;
	var $bId;
	var $udskriftsDato;
	var $dokType;
	var $visRaadgiver;
	var $synligNetbank;
	var $sletDato;
	var $fejlMarkeret;
	var $forsendelsesKode;
	var $n1;
	var $n1_value;
	var $n2;
	var $n2_value;
	var $tekst;
	var $tekst_value;

	public function __construct($refnummer, $id, $bId, $udskriftsDato, $dokType, $visRaadgiver, $synligNetbank, $sletDato, $fejlMarkeret, $forsendelsesKode, $n1, $n1_value, $n2, $n2_value, $tekst, $tekst_value) {
		$this->refnummer = $refnummer;
		$this->id = $id;
		$this->bId = $bId;
        $this->udskriftsDato = $udskriftsDato;
        $this->dokType = $dokType;
		$this->visRaadgiver = $visRaadgiver;
		$this->synligNetbank = $synligNetbank;
		$this->sletDato = $sletDato;
		$this->fejlMarkeret = $fejlMarkeret;
        $this->forsendelsesKode = $forsendelsesKode;
        $this->n1 = $n1;
		$this->n1_value = $n1_value;
		$this->n2 = $n2;
        $this->n2_value = $n2_value;
        $this->tekst = $tekst;
		$this->tekst_value = $tekst_value;
    }
}
?>